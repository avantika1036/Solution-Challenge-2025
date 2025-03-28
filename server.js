import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/backend/connectDB.js'; // Only use this
import { DB_NAME } from "./constants.js";
import auctionRoutes from './src/backend/routes/auction.routes.js'; // Import auction routes

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json()); // Parse JSON request bodies
app.use(cors());

// Connect to MongoDB using connectDB.js (REMOVE THE SECOND CONNECTION)
connectDB().then(() => {
  // Start the server only after DB is connected
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}).catch((error) => {
  console.error('Failed to connect to MongoDB:', error);
});
console.log("Auction routes loaded");
 
// Routes
app.use('/api/auctions', auctionRoutes); // Use auction routes

