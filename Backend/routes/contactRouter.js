
import express from 'express';
const contactRoutes = express.Router();

contactRoutes.get('/', async (req, res) => {
  try {
    const db = global.dbClient.db(process.env.dbName); // Replace with your database name
    const collection = db.collection(process.env.contact); // Your collection name

    // Fetch all contacts
    const contacts = await collection.find({}).toArray();

    // Send the contacts as a JSON response
    res.status(200).json(contacts);
  } catch (err) {
    // Handle errors and send an error message
    res.status(500).send('Error fetching contacts: ' + err.message);
  }
});

// Export the router
export default contactRoutes;

