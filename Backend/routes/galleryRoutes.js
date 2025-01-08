import express from 'express';
import upload from '../controllers/imguploadController.js'; // Assuming the file upload middleware is correct
import mongoose from 'mongoose';
import Image from '../models/galleryCollections.js'; // Your model file for image schema

const gallery = express.Router();

// POST route for file upload
gallery.post('/upload', upload.single('file'), async (req, res) => {
 
    try {
        const db = global.dbClient.db(process.env.dbName);
        // create a collection to upload
          await db.createCollection(process.env.gallery);
         console.log('Collection created');
         
        const fileInfo = {
            filename: req.file.path,
            created_at: new Date().toDateString(),
            updated_at: new Date().toDateString(),
          };
      
          const result = await db.collection(process.env.gallery).insertOne(fileInfo);
          console.log('File information inserted:', result);
          res.status(200).send('File uploaded successfully');
        }catch (e) {
            console.error(e);
            res.status(500).send('Server Error');
        }
  
});

gallery.get('/getdata', async (req, res) => {
    try {
        const db = global.dbClient.db(process.env.dbName); // Replace with your database name
        const collection = db.collection(process.env.gallery); // Your collection name
    
        // Fetch all contacts
        const data = await collection.find({}).toArray();
    
        // Send the contacts as a JSON response
        res.status(200).json(data);
      } catch (err) {
        // Handle errors and send an error message
        res.status(500).send('Error fetching contacts: ' + err.message);
      }
})

gallery.delete('/delete/:id', async (req, res) => {
    try {
        const db = global.dbClient.db(process.env.dbName); // Replace with your database name
        const collection = db.collection(process.env.gallery); // Your collection name
        const data = await collection.find({}).toArray();
        console.log(data);
        
        res.json(data);
        console.log(`Deleted document with id: ${req.params.id}`);
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

gallery.put('/update/:id',  upload.single('file'), async (req, res) => {
    try {
        const db = global.dbClient.db(process.env.dbName); // Replace with your database name
        const collection = db.collection(process.env.gallery); // Your collection name
        const data = await collection.deleteOne({_id: new mongoose.Types.ObjectId(req.params.id)});
        res.json(data);
        const result = await collection.updateOne(
            { _id: new mongoose.Types.ObjectId(req.params.id) },
            { $set: { filename: req.file.path , updated_at : new Date().toDateString() }  }
          
        );
        res.json(result);
        console.log(`Updated document with id: ${req.params.id}`);
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

export default gallery;
