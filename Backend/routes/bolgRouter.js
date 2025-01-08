import express from 'express';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
const blogRoutes = express.Router();

blogRoutes.post('/addblog', async (req, res) => {
    try {
        const db = global.dbClient.db(process.env.dbName);
        // Create a collection to upload if it doesn't already exist
        const collectionExists = await db.listCollections({ name: process.env.blog }).hasNext();
        if (!collectionExists) {
            await db.createCollection(process.env.blog);
            console.log('Collection created');
        }
        
        // Assuming req.body.name is an array of names
        // const names = Array.isArray(req.body.name) ? req.body.name : [req.body.name];  // Ensure it's an array
        // Create an array of file objects with ObjectId and filename
        const fileInfos = {
            youtube_url: req.body.url, // Assuming the request body contains 'url'
            title: req.body.title, // Assuming the request body contains 'title'
            description: req.body.description, // Default description if not provided
            created_at: new Date().toDateString(), // Current timestamp for creation
            updated_at: new Date().toDateString() // Current timestamp for last updated
        };
      

        // Insert a single document with an array of fileInfos
        const result = await db.collection(process.env.blog).insertOne(fileInfos);
        console.log('File information inserted:', result);

        res.status(200).send('Files added successfully');
    } catch (e) {
        console.error(e);
        res.status(500).send('Server Error');
    }
});

blogRoutes.get('/getblog', async (req, res) => {
    try {
        const db = global.dbClient.db(process.env.dbName); // Replace with your database name
        const collection = db.collection(process.env.blog); // Your collection name
    
        // Fetch all contacts
        const data = await collection.find({}).toArray();
    
        // Send the contacts as a JSON response
        res.status(200).json(data);
      } catch (err) {
        // Handle errors and send an error message
        res.status(500).send('Error fetching contacts: ' + err.message);
      }
});

blogRoutes.put('/update/:id', async (req, res) => {
    try {
        const db = global.dbClient.db(process.env.dbName); // Replace with your database name
        const collection = db.collection(process.env.blog); // Your collection name
            const result = await collection.updateOne(
                  { _id: new mongoose.Types.ObjectId(req.params.id) },
                  { $set: { youtube_url: req.body.url, title: req.body.title, description: req.body.description, updated_at : new Date().toDateString() }  }
            );
            res.json(result);
            console.log(`Updated document with id: ${req.params.id}`);
            
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
});

blogRoutes.delete('/delete/:id', async (req, res) => {
    try {
        const db = global.dbClient.db(process.env.dbName); // Replace with your database name
        const collection = db.collection(process.env.blog); // Your collection name
        const result = await collection.deleteOne({_id: new mongoose.Types.ObjectId(req.params.id)});
        res.json(result);
        console.log(`Deleted document with id: ${req.params.id}`);
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

export default blogRoutes;