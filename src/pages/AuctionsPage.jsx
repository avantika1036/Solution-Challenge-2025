import React, { useState } from 'react';
import { Timer, ArrowUp, Search } from 'lucide-react';

const auctions = [
  {
    id: 1,
    name: 'MacBook Pro 16"',
    currentBid: 1250,
    timeLeft: '2h 15m',
    bids: 23,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400',
    condition: 'Used - Excellent'
  },
  {
    id: 2,
    name: 'iPad Pro 12.9"',
    currentBid: 650,
    timeLeft: '4h 30m',
    bids: 15,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=400',
    condition: 'Refurbished'
  },
  {
    id: 3,
    name: 'Sony WH-1000XM4',
    currentBid: 180,
    timeLeft: '1h 45m',
    bids: 12,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=400',
    condition: 'Used - Like New'
  }
];

const AuctionsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen  bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Live Auctions</h1>
          <p className="text-gray-600">Bid on quality refurbished electronics at great prices</p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search auctions..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        {/* Auctions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {auctions.map(auction => (
            <div key={auction.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
              <div className="relative">
                <img 
                  src={auction.image} 
                  alt={auction.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-black/70 text-white px-3 py-1 rounded-full flex items-center">
                  <Timer className="h-4 w-4 mr-1" />
                  {auction.timeLeft}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{auction.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{auction.condition}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Current Bid</p>
                    <p className="text-xl font-bold text-green-600">${auction.currentBid}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total Bids</p>
                    <p className="text-xl font-bold">{auction.bids}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Enter bid amount"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    Bid
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuctionsPage;