import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Recycle, ShoppingCart, UserCircle, Leaf } from "lucide-react";
import UserProfileModal from "./UserProfileModal";
import { auth, db } from "../firebaseConfig"; 
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const [showEcoPoints, setShowEcoPoints] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [user, setUser] = useState(null);
  const [ecoPoints, setEcoPoints] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userDocRef);
  
          let updatedUser = {
            name: currentUser.displayName || "Guest", // Fetch updated displayName
            email: currentUser.email || "No Email",
            photoURL: currentUser.photoURL || null,
          };
  
          if (userSnap.exists()) {
            const userData = userSnap.data();
            updatedUser.name = userData.username || updatedUser.name; // Firestore username takes priority
          }
  
          setUser(updatedUser);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUser(null);
      }
    });
  
    return () => unsubscribe();
  }, []);
  

  return (
    <>
      <nav className="bg-green-700 text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button onClick={() => navigate("/")} className="flex items-center space-x-2">
                <Recycle className="h-8 w-8" />
                <span className="text-xl font-bold">EcoTech Market</span>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/marketplace" className="hover:text-green-200">Marketplace</Link>
              <Link to="/sell" className="hover:text-green-200">Sell Device</Link>
              <Link to="/auctions" className="hover:text-green-200">Auctions</Link>
              <Link to="/environmental-impact" className="hover:text-green-200">Environmental Impact</Link>

              {/* EcoPoints Badge */}
              <div className="relative">
                <button
                  onClick={() => setShowEcoPoints(!showEcoPoints)}
                  className="flex items-center space-x-1 bg-green-600 px-3 py-1 rounded-full hover:bg-green-500 transition-colors"
                >
                  <Leaf className="h-4 w-4" />
                  <span className="text-sm font-medium">{ecoPoints} EcoPoints</span>
                </button>

                {/* Points Tooltip */}
                {showEcoPoints && (
                  <div className="absolute right-0 mt-2 w-48 bg-green-800 p-3 rounded shadow-lg z-50">
                    <p className="text-sm">You've reduced <strong>{ecoPoints / 10}kg</strong> of CO₂</p>
                    <p className="text-xs text-green-200 mt-1">1kg CO₂ = 10 EcoPoints</p>
                  </div>
                )}
              </div>
            </div>

            {/* User Icons */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-green-600 transition-colors" aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
              </button>
              
              {/* User Profile Button */}
              <button
                className="p-2 rounded-full hover:bg-green-600 transition-colors flex items-center space-x-2"
                aria-label="User Profile"
                onClick={() => setShowProfileModal(true)}
              >
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="User Avatar" className="h-8 w-8 rounded-full" />
                ) : (
                  <UserCircle className="h-6 w-6" />
                )}
                <span className="hidden md:inline text-sm">{user?.name || "Guest"}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* User Profile Modal */}
      {showProfileModal && <UserProfileModal onClose={() => setShowProfileModal(false)} />}
    </>
  );
};

export default Navbar;
