import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './connectDB.js';
import { DB_NAME } from "../constants.js";
import auctionRoutes from './routes/auction.routes.js'; // Import auction routes

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json()); // Parse JSON request bodies
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auctions', auctionRoutes); // Use auction routes

// Start the server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((error) => console.error('Failed to connect to MongoDB:', error));