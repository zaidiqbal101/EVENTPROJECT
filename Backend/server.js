import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import MongoDB from "./models/db.js";
import inquiriesRouter from "./routes/inquiriesRouter.js";
import events from "./routes/eventRouter.js";
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
const dbUrl = process.env.mongodbURL;
MongoDB({ url: dbUrl });

// Simple route for testing
app.get("/", (req, res) => {
  console.log(new Date().toDateString());
  // This line should be after the async operations
  res.send("Welcome to my Node.js server!");
});

app.use("/inquiries",inquiriesRouter);

app.use("/event", events);

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
