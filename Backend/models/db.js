import mongoose from 'mongoose';

// MongoDB Connection Function
import { MongoClient } from 'mongodb';

export default function MongoDB({ url }) {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
      console.log("MongoDB connection established");
      // Save the client object to use in other parts of your app
      global.dbClient = client;
    })
    .catch((err) => {
      console.error("MongoDB error: ", err.message);
      process.exit(1); // Exit process if connection fails
    });
}
