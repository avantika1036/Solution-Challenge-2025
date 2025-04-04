import React, { useState, useEffect } from "react";
import { Timer, ArrowUp, Search } from "lucide-react";
import { db, auth } from "../firebaseConfig"; // Import Firebase auth
import { collection, getDocs, query, where, doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";

const AuctionsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [auctionData, setAuctionData] = useState([]);

  // Fetch auction data from Firestore
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const auctionQuery = query(
          collection(db, "devices"),
          where("listingType", "==", "auction")
        );
        const querySnapshot = await getDocs(auctionQuery);
        const auctions = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const createdAt = data.createdAt?.toMillis?.() || Date.now();
          const endTime = data.endTime?.toMillis?.() || createdAt + 30 * 1000;
    
          return {
            id: doc.id,
            ...data,
            totalBids: data.totalBids || 0, // Ensure totalBids is set
            endTime,
          };
        });
    
        setAuctionData(auctions);
      } catch (error) {
        console.error("Error fetching auction devices:", error);
      }
    };    

    fetchAuctions();
  }, []);

  // Function to calculate remaining time
  const getTimeLeft = (auctionEndTime) => {
    if (!auctionEndTime) return "Auction Ended";

    const now = Date.now();
    const timeDiff = auctionEndTime - now;

    if (timeDiff <= 0) return "Auction Ended";

    const seconds = Math.floor((timeDiff / 1000) % 60);
    return `${seconds}s left`;
  };

  // Start a timer to update countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setAuctionData((prevData) =>
        prevData.map((auction) => ({
          ...auction,
          timeLeft: getTimeLeft(auction.endTime),
        }))
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // ✅ Function to handle placing a bid
  const handleBid = async (auctionId, bidAmount) => {
    if (!bidAmount || bidAmount <= 0) {
      alert("Enter a valid bid amount!");
      return;
    }
  
    try {
      const user = auth.currentUser; // Get the currently logged-in user
      if (!user) {
        alert("You must be logged in to place a bid!");
        return;
      }
  
      const userId = user.uid; // Get the user's unique ID
  
      const auctionRef = doc(db, "devices", auctionId);
      const auctionSnapshot = await getDoc(auctionRef);
  
      if (!auctionSnapshot.exists()) {
        alert("Auction not found in Firestore!");
        return;
      }
  
      const auctionData = auctionSnapshot.data();
  
      // Check if the bid amount is greater than the current bid
      if (bidAmount <= (auctionData.currentBid || 0)) {
        alert("Bid amount must be greater than the current bid!");
        return;
      }
  
      const updatedTotalBids = (auctionData.totalBids || 0) + 1;
  
      // Update Firestore with the new bid and total bids
      await updateDoc(auctionRef, {
        bids: arrayUnion({
          amount: bidAmount,
          timestamp: Date.now(),
          userId: userId, // Use the logged-in user's ID
        }),
        currentBid: bidAmount, // Update the highest bid
        totalBids: updatedTotalBids, // Update bid count
      });
  
      // Update the local state to reflect the changes
      setAuctionData((prevData) =>
        prevData.map((a) =>
          a.id === auctionId
            ? { ...a, currentBid: bidAmount, totalBids: updatedTotalBids }
            : a
        )
      );
  
      // Alert the user that the bid was placed successfully
      alert(`Your bid of $${bidAmount} has been placed successfully!`);
    } catch (error) {
      console.error("Error placing bid:", error);
      alert("An error occurred while placing your bid. Please try again.");
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Live Auctions</h1>
          <p className="text-gray-600">
            Bid on quality refurbished electronics at great prices
          </p>
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
          {auctionData
            .filter(
              (auction) =>
                auction.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                auction.condition?.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((auction) => (
              <div
                key={auction.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={auction.images?.[0] || "/placeholder-image.jpg"}
                    alt={auction.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-black/70 text-white px-3 py-1 rounded-full flex items-center">
                    <Timer className="h-4 w-4 mr-1" />
                    {auction.timeLeft || "Calculating..."}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-black">{auction.title}</h3> {/* Changed color to black */}
                  <p className="text-sm text-gray-600 mb-4">{auction.condition}</p>

                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Current Bid</p>
                      <p className="text-xl font-bold text-green-600">
                        ${auction.currentBid || "N/A"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total Bids</p>
                      <p className="text-xl font-bold text-black">{auction.totalBids || "0"}</p> {/* Total Bids color already updated */}
                    </div>
                  </div>

                  {/* Bidding Section */}
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      placeholder="Enter bid amount"
                      className="w-3/5 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleBid(auction.id, parseFloat(e.target.value));
                          e.target.value = "";
                        }
                      }}
                    />
                    <button
                      className="w-2/5 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center"
                      onClick={(e) => {
                        const input = e.target.previousSibling;
                        handleBid(auction.id, parseFloat(input.value));
                        input.value = "";
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
