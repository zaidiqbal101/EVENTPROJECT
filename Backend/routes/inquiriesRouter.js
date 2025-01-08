import express from 'express';

const inquiries = express.Router();

inquiries.get('/', async (req, res) => {
  try {
    const db = global.dbClient.db('test'); // Replace with your database name
    const collection = db.collection('eventinquiries'); // Your collection name

    // Fetch all contacts
    const contacts = await collection.find({}).toArray();

    // Send the contacts as a JSON response
    res.status(200).json(contacts);
  } catch (err) {
    // Handle errors and send an error message
    res.status(500).send('Error fetching contacts: ' + err.message);
  }
});

export default inquiries;
