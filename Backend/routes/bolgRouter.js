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

        res.status(200).send({ message: 'Successfully add vlog ' });
    } catch (e) {
        console.error(e);
        res.status(500).send('Server Error');
    }
});

blogRoutes.get('/getblog', async (req, res) => {
    try {
        const db = global.dbClient.db(process.env.dbName); // Access the database
        const collection = db.collection(process.env.blog); // Access the collection
    
        // Fetch all blog posts (documents) from the collection
        const data = await collection.find({}).toArray();
        
        // If no data is found, send an empty array
        if (data.length === 0) {
            return res.status(404).json({ message: 'No blog posts found' });
        }

        // Send the fetched data as a JSON response
        res.status(200).json(data);
    } catch (err) {
        // Handle errors and send a detailed error message
        console.error('Error fetching blog posts:', err);
        res.status(500).json({ message: 'Error fetching blog posts', error: err.message });
    }
});

// blogRoutes.put('/update/:id', async (req, res) => {
//     try {
//         const db = global.dbClient.db(process.env.dbName); // Replace with your database name
//         const collection = db.collection(process.env.blog); // Your collection name
//             const result = await collection.updateOne(
//                   { _id: new mongoose.Types.ObjectId(req.params.id) },
//                   { $set: { youtube_url: req.body.url, title: req.body.title, description: req.body.description, updated_at : new Date().toDateString() }  }
//             );
//             res.status(200).json({ message: 'Successfully update ' });
//             console.log(`Updated document with id: ${req.params.id}`);
            
//         } catch (err) {
//             console.error(err);
//             res.status(500).send('Server Error');
//         }
// });

blogRoutes.put('/update/:id', async (req, res) => {
    try {
        const db = global.dbClient.db(process.env.dbName); // Replace with your database name
        const collection = db.collection(process.env.blog); // Your collection name
        const result = await collection.updateOne(
            { _id: new mongoose.Types.ObjectId(req.params.id) },
            {
                $set: {
                    youtube_url: req.body.url,   // Make sure you're using the correct field name here
                    title: req.body.title,
                    description: req.body.description,
                    updated_at: new Date().toDateString(),
                }
            }
        );
        if (result.modifiedCount > 0) {
            res.status(200).json({ message: 'Successfully updated' });
            console.log(`Updated document with id: ${req.params.id}`);
        } else {
            res.status(400).json({ message: 'No changes made' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

blogRoutes.delete('/delete/:id', async (req, res) => {
    try {
        const db = global.dbClient.db(process.env.dbName); // Access the database
        const collection = db.collection(process.env.blog); // Access the collection

        // Validate the ID before using it
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        // Attempt to delete the document
        const result = await collection.deleteOne({ _id: new mongoose.Types.ObjectId(req.params.id) });

        // Check if a document was deleted
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Document not found' });
        }

        res.status(200).json({ message: 'Successfully deleted', id: req.params.id });
        console.log(`Deleted document with id: ${req.params.id}`);
    } catch (err) {
        console.error('Error during deletion:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});


export default blogRoutes;