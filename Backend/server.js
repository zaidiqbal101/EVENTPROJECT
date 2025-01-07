import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import MongoDB from "./models/db.js";
import ContactDataGet from "./controllers/contactDataGet.js";
import InquiriesDataGet from "./controllers/inquiriesDataGet.js";
dotenv.config(); // Load environment variables from a .env file

const PORT = process.env.PORT || 1200;
const app = express();

// Connect to MongoDB
const dbUrl = process.env.mongodbURL;
MongoDB({ url: dbUrl });

// Middleware to parse JSON
app.use(express.json());

// Simple route for testing
app.get("/", (req, res) => {
  res.send("Welcome to my Node.js server!");
});

// API route to fetch all documents from the "contactinquiries" collection
app.get("/contacts", ContactDataGet);
app.get("/inquiries", InquiriesDataGet);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/gallery",upload.fields([{ name: "img", maxCount: 1 }]), async (req, res) => {
   
  }
);

// 404 handler - must be defined **after** all routes
app.use((req, res) => {
  res.status(404).send("Route not found");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
