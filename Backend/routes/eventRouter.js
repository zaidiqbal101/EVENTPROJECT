import express from 'express';
import mongoose from "mongoose";
const events = express.Router();

events.get('/getdata', async (req, res) => {
  try {
    const db = global.dbClient.db(process.env.dbName); // Replace with your database name
    const collection = db.collection(process.env.inquiry); // Your collection name

    // Fetch all contacts
     const contacts = await collection.find({}).toArray();

    // Send the contacts as a JSON response
    res.status(200).json(contacts);
  } catch (err) {
    // Handle errors and send an error message
    res.status(500).send('Error fetching contacts: ' + err.message);
  }
});

events.delete('/delete/:id', async (req, res) => {
    try {
        const db = global.dbClient.db(process.env.dbName); // Access the database
        const collection = db.collection(process.env.inquiry); // Access the collection

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

export default events;
