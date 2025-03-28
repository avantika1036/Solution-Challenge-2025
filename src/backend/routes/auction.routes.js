import express from 'express';
import { Auction } from '../models/auction.model.js';

const router = express.Router();
console.log("Auction router initialized");

// Get all auctions
router.get('/', async (req, res) => {
  try {
    const auctions = await Auction.find();
    res.status(200).json(auctions);
  } catch (error) {
    console.error("Error fetching auctions:", error);
    res.status(500).json({ error: 'Failed to fetch auctions' });
  }
});

// Place a bid
router.post('/:id/bid', async (req, res) => {
  console.log('Bid endpoint hit:', req.params.id, req.body); // Debugging log
  const { id } = req.params;
  const { bid } = req.body;

  try {
    const auction = await Auction.findById(id);
    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }

    if (bid <= auction.currentBid) {
      return res.status(400).json({ error: 'Bid amount must be higher than the current bid' });
    }

    auction.currentBid = bid;
    auction.bids += 1;
    await auction.save();

    res.json(auction);
  } catch (error) {
    console.error('Error placing bid:', error); // Debugging log
    res.status(500).json({ error: 'Failed to place bid' });
  }
});



      
      
router.post('/create', async (req, res) => {
    try {
      console.log("Request Body:", req.body); // Debugging
      if (!req.body.name || !req.body.currentBid) {
        return res.status(400).json({ error: "Missing required fields" });
      }
 
      const newAuction = new Auction(req.body);
      await newAuction.save();
      res.status(201).json(newAuction);
    } catch (error) {
      console.error("Auction creation failed:", error);
      res.status(500).json({ error: "Failed to create auction" });
    }
 });
 
      
  
  

export default router;
