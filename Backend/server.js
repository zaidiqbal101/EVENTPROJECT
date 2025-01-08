import path from 'path';
import { fileURLToPath } from 'url';
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import MongoDB from "./models/db.js";
import contactRoutes from "./routes/contactRouter.js";
import inquiries from "./routes/inquiriesRouter.js";
import gallery from "./routes/galleryRoutes.js";
import blogRoutes from "./routes/bolgRouter.js";
dotenv.config(); // Load environment variables from a .env file

const PORT = process.env.PORT || 1200;
const app = express();
app.use(cors())
// Middleware to parse JSON
app.use(express.json());
app.use(bodyParser.json());

// Parse incoming requests with urlencoded payloads
app.use(bodyParser.urlencoded({ extended: true }));
// Connect to MongoDB
const __filename = fileURLToPath(import.meta.url); // Convert module URL to file path
const __dirname = path.dirname(__filename); // Get the directory name from the file path
app.use('/assets', express.static(path.join(__dirname, 'assets')));

const dbUrl = process.env.mongodbURL;
MongoDB({ url: dbUrl });

// Simple route for testing
app.get("/", (req, res) => {
  console.log(new Date().toDateString());

  const filePath = './assets/file-1736311864622-956990541-Screenshot 2024-12-30 115122.png';

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error('File does not exist:', filePath);
      return;
    }

    // File exists, proceed to delete
    fs.unlink(filePath, (err) => {
      if (err) throw err;
      console.log('File deleted!');
    });
  });

  // This line should be after the async operations
  res.send("Welcome to my Node.js server!");
});

app.use("/contact",contactRoutes);

app.use("/inquiries", inquiries);

app.use("/gallery" ,gallery);

app.use("/blog",blogRoutes);
// 404 handler - must be defined **after** all routes
app.use((req, res) => {
  res.status(404).send("Route not found");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
