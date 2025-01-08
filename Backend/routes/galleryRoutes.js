import express from 'express';
import upload from '../controllers/imguploadController.js'; // Assuming the file upload middleware is correct
import mongoose from 'mongoose';
import Image from '../models/galleryCollections.js'; // Your model file for image schema

const gallery = express.Router();

// POST route for file upload
gallery.post('/upload', upload.single('file'), async (req, res) => {
 
    try {
        const db = global.dbClient.db('test');
        /* create a collection to upload
         await db.createCollection('galleryCollections');
        console.log('Collection created');
         */ 
        const fileInfo = {
            filename: req.file.path,
            created_at: new Date().toDateString(),
            updated_at: new Date().toDateString(),
          };
      
          const result = await db.collection("galleryCollections").insertOne(fileInfo);
          console.log('File information inserted:', result);
        }catch (e) {
            console.error(e);
            res.status(500).send('Server Error');
        }
  
});

gallery.get('/getdata', async (req, res) => {
    try {
        const db = global.dbClient.db('test'); // Replace with your database name
        const collection = db.collection('galleryCollections'); // Your collection name
    
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
        const db = global.dbClient.db('test'); // Replace with your database name
        const collection = db.collection('galleryCollections'); // Your collection name
        const result = await collection.deleteOne({_id: new mongoose.Types.ObjectId(req.params.id)});
        res.json(result);
        console.log(`Deleted document with id: ${req.params.id}`);
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

gallery.put('/update/:id',  upload.single('file'), async (req, res) => {
    try {
        const db = global.dbClient.db('test'); // Replace with your database name
        const collection = db.collection('galleryCollections'); // Your collection name
        const result = await collection.updateOne(
            { _id: new mongoose.Types.ObjectId(req.params.id) },
            { $set: { filename: req.file.path , updated_at : new Date () }  }
          
        );
        res.json(result);
        console.log(`Updated document with id: ${req.params.id}`);
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

export default gallery;
