import express from "express";
import cloudinary from "../Configuration/cloudinaryCloud.js";
import upload from "../controllers/imgUploadController.js"; // Assuming the file upload middleware is correct
import mongoose from "mongoose";
const gallery = express.Router();

// POST route for file upload
gallery.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const db = global.dbClient.db(process.env.dbName);
    const collectionExists = await db
      .listCollections({ name: process.env.gallery })
      .hasNext();
    if (!collectionExists) {
      await db.createCollection(process.env.gallery);
      console.log("Collection created");
    }
    console.log("Collection created");
    const file = req.file.path;

    const uploadResult = await cloudinary.uploader
      .upload(file)
      .catch((error) => {
        console.log(error);
      });

    console.log(uploadResult);
    const fileInfo = {
      filename: uploadResult.secure_url,
      created_at: new Date().toDateString(),
      updated_at: new Date().toDateString(),
    };

    const result = await db.collection(process.env.gallery).insertOne(fileInfo);
    console.log("File information inserted:", result);
    res.status(200).send({message : 'File uploaded successfully'});
  } catch (e) {
    console.error(e);
    res.status(500).send("Server Error");
  }
});

gallery.get("/getdata", async (req, res) => {
  try {
    const db = global.dbClient.db(process.env.dbName); // Replace with your database name
    const collection = db.collection(process.env.gallery); // Your collection name

    // Fetch all contacts
    const data = await collection.find({}).toArray();

    // Send the contacts as a JSON response
    res.status(200).json(data);
  } catch (err) {
    // Handle errors and send an error message
    res.status(500).send("Error fetching contacts: " + err.message);
  }
});

gallery.put("/update/:id", upload.single("file"), async (req, res) => {
  try {
    const db = global.dbClient.db(process.env.dbName); // Replace with your database name
    const collection = db.collection(process.env.gallery); // Your collection name

    // Fetch the document by ID and include only the 'filename' field
    const fullDataByID = await collection.findOne(
      { _id: new mongoose.Types.ObjectId(req.params.id) },
      { projection: { filename: 1 } }
    );

    if (!fullDataByID) {
      return res.status(404).send("Document not found");
    }

    // Extract the public ID part of the filename to delete the existing image in Cloudinary
    const extractedPart = fullDataByID.filename.split("/").pop().split(".")[0];

    // Delete the old image from Cloudinary
    await cloudinary.uploader.destroy(extractedPart);

    // Upload the new image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path);

    // Update the database document with the new image URL and updated timestamp
    const updateDB = await collection.updateOne(
      { _id: new mongoose.Types.ObjectId(req.params.id) },
      { $set: { filename: uploadResult.secure_url, updated_at: new Date().toDateString() } }
    );

    // Check if the update was successful
    if (updateDB.matchedCount === 0) {
      return res.status(400).send("Failed to update the document.");
    }

    // Send a success response
    res.status(200).json({ message: "Image updated successfully." });
  } catch (error) {
    console.error("Error during update:", error);
    res.status(500).send("An error occurred while updating the image.");
  }
});

gallery.delete("/delete/:id", async (req, res) => {
  try {
    const db = global.dbClient.db(process.env.dbName); // Replace with your database name
    const collection = db.collection(process.env.gallery); // Your collection name
    // Fetch the document by ID and include only the 'filename' field
    const fullDataByID = await collection.findOne(
      { _id: new mongoose.Types.ObjectId(req.params.id) },
      { projection: { filename: 1 } }
    );

    if (!fullDataByID) {
      return res.status(404).send("Document not found");
    }

    // Extract the public ID part of the filename to delete the existing image in Cloudinary
    const extractedPart = fullDataByID.filename.split("/").pop().split(".")[0];

    // Delete the old image from Cloudinary
    await cloudinary.uploader.destroy(extractedPart);
    const result = await collection.deleteOne({
      _id: new mongoose.Types.ObjectId(req.params.id),
    });
    res.json({ message: 'Successfully delete ' ,result});
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

export default gallery;
