import mongoose, { Schema } from 'mongoose';

const auctionSchema = new Schema({
  name: { type: String, required: true },
  currentBid: { type: Number, required: true, default: 0 },
  timeLeft: { type: String, required: true },
  bids: { type: Number, required: true, default: 0 },
  image: { type: String},
  condition: { type: String, required: true },
});

export const Auction = mongoose.model('Auction', auctionSchema);