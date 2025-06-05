import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import http from "http";           // <-- Add this
import { fileURLToPath } from "url";
import hotelRoutes from './routes/hotelRoutes.js';
import { setupSocket } from './socket/socket.js';
import reviewRoutes from './routes/reviewRoutes.js';
import indianBeachRoutes from "./routes/indianBeachRoutes.js";
import tourRoutes from "./routes/tourRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import stripeRoutes from "./routes/StripeRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import messageRoutes from './routes/messageRoutes.js';
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
dotenv.config();

const app = express();

// Needed to resolve __dirname with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Serve static images from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use("/api/indianbeaches", indianBeachRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/gallery", galleryRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/messages', messageRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

// Create HTTP server for socket.io
const server = http.createServer(app);

// Setup socket.io with the server
setupSocket(server);

// Test route
app.get("/", (req, res) => res.send("🌴 Beachify API is running..."));

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));  // <-- Use server.listen
  })
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));
