// import React, { useState } from 'react';
// import { Timer, ArrowUp, Search } from 'lucide-react';

// const auctions = [
//   {
//     id: "67e5a714fd4227a0849dbfee",
//     name: 'MacBook Pro 16"',
//     currentBid: 1250,
//     timeLeft: '2h 15m',
//     bids: 23,
//     image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400',
//     condition: 'Used - Excellent'
//   },
//   {
//     id: "67e59a6a141ebaad556287db",
//     name: 'iPad Pro 12.9"',
//     currentBid: 650,
//     timeLeft: '4h 30m',
//     bids: 15,
//     image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=400',
//     condition: 'Refurbished'
//   },
//   {
//     id: "67e5a76cfd4227a0849dbff0",
//     name: 'Sony WH-1000XM4',
//     currentBid: 180,
//     timeLeft: '1h 45m',
//     bids: 12,
//     image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=400',
//     condition: 'Used - Like New'
//   }
// ];

// const AuctionsPage = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [auctionData, setAuctionData] = useState(auctions); // Use state to manage auction data

//   const handleBid = async (auctionId, bidAmount) => {
//     try {
//       const response = await fetch(`/api/auctions/${auctionId}/bid`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ bid: bidAmount }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to place bid');
//       }

//       const updatedAuction = await response.json();

//       // Update the auction data in the state
//       setAuctionData((prevData) =>
//         prevData.map((auction) =>
//           auction.id === auctionId ? updatedAuction : auction
//         )
//       );
//     } catch (error) {
//       console.error('Error placing bid:', error);
//       alert('Failed to place bid. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white py-8">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold mb-2">Live Auctions</h1>
//           <p className="text-gray-600">Bid on quality refurbished electronics at great prices</p>
//         </div>

//         {/* Search */}
//         <div className="relative mb-8">
//           <input
//             type="text"
//             placeholder="Search auctions..."
//             className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//         </div>

//         {/* Auctions Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {auctionData.map(auction => (
//             <div key={auction.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
//               <div className="relative">
//                 <img 
//                   src={auction.image} 
//                   alt={auction.name}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="absolute top-2 right-2 bg-black/70 text-white px-3 py-1 rounded-full flex items-center">
//                   <Timer className="h-4 w-4 mr-1" />
//                   {auction.timeLeft}
//                 </div>
//               </div>
              
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold mb-2">{auction.name}</h3>
//                 <p className="text-sm text-gray-600 mb-4">{auction.condition}</p>
                
//                 <div className="flex justify-between items-center mb-4">
//                   <div>
//                     <p className="text-sm text-gray-500">Current Bid</p>
//                     <p className="text-xl font-bold text-green-600">${auction.currentBid}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-sm text-gray-500">Total Bids</p>
//                     <p className="text-xl font-bold">{auction.bids}</p>
//                   </div>
//                 </div>

//                 <div className="flex gap-2">
//                   <input
//                     type="number"
//                     placeholder="Enter bid amount"
//                     className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
//                     onKeyDown={(e) => {
//                       if (e.key === 'Enter') {
//                         handleBid(auction.id, parseFloat(e.target.value));
//                         e.target.value = ''; // Clear input after submission
//                       }
//                     }}
//                   />
//                   <button
//                     className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center"
//                     onClick={(e) => {
//                       const input = e.target.previousSibling;
//                       handleBid(auction.id, parseFloat(input.value));
//                       input.value = ''; // Clear input after submission
//                     }}
//                   >
//                     <ArrowUp className="h-4 w-4 mr-1" />
//                     Bid
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuctionsPage;






import React, { useState, useEffect } from 'react';
import { Timer, ArrowUp, Search } from 'lucide-react';

const AuctionsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [auctionData, setAuctionData] = useState([]);

  // ✅ Fetch auction data from backend
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auctions'); // Adjust the URL if necessary
        const data = await response.json();
        console.log("Fetched Auctions:", data);
        setAuctionData(data); // Store auctions from backend
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };

    fetchAuctions();
  }, []);

  // ✅ Handle placing a bid
  const handleBid = async (auctionId, bidAmount) => {
    if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
      alert("Enter a valid bid amount!");
      return;
    }

    try {
      console.log("Placing bid for:", auctionId); // Debugging ID

      const response = await fetch(`http://localhost:5000/api/auctions/${auctionId}/bid`, { // ✅ Use full URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bid: bidAmount }),
      });

      if (!response.ok) {
        throw new Error('Failed to place bid');
      }

      const updatedAuction = await response.json();
      console.log("Bid placed successfully:", updatedAuction);

      // ✅ Update UI with new bid details
      setAuctionData((prevData) =>
        prevData.map((auction) =>
          auction._id === auctionId ? updatedAuction : auction
        )
      );

      alert('Bid placed successfully!');
    } catch (error) {
      console.error('Error placing bid:', error);
      alert('Failed to place bid. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
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
          {auctionData.map(auction => (
            <div key={auction._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
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

                {/* Bidding Section */}
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Enter bid amount"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleBid(auction._id, parseFloat(e.target.value));
                        e.target.value = ''; // Clear input after submission
                      }
                    }}
                  />
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center"
                    onClick={(e) => {
                      const input = e.target.previousSibling;
                      handleBid(auction._id, parseFloat(input.value));
                      input.value = ''; // Clear input after submission
                    }}
                  >
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
