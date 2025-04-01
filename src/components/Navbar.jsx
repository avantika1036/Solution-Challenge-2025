import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Recycle, ShoppingCart, UserCircle, Leaf, Menu, X } from "lucide-react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userDocRef);

          let updatedUser = {
            name: currentUser.displayName || "Guest",
            email: currentUser.email || "No Email",
            photoURL: currentUser.photoURL || null,
          };

          if (userSnap.exists()) {
            const userData = userSnap.data();
            updatedUser.name = userData.username || updatedUser.name;
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

            {/* Hamburger Menu for Mobile */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-full hover:bg-green-600 transition-colors"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
              {/* Cart Icon */}
              <button
                className="p-2 rounded-full hover:bg-green-600 transition-colors relative group"
                aria-label="Cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {/* Tooltip */}
                <span className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition">
                  Cart
                </span>
              </button>

              {/* User Profile Button */}
              <button
                className="p-2 rounded-full hover:bg-green-600 transition-colors flex items-center space-x-2 relative group"
                aria-label="User Profile"
                onClick={() => setShowProfileModal(true)}
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User Avatar"
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <UserCircle className="h-6 w-6" />
                )}
                <span className="hidden md:inline text-sm">{user?.name || "Guest"}</span>
                {/* Tooltip */}
                <span className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition">
                  Profile
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-green-700 text-white px-4 py-4 space-y-2">
            <Link to="/marketplace" className="block hover:text-green-200">Marketplace</Link>
            <Link to="/sell" className="block hover:text-green-200">Sell Device</Link>
            <Link to="/auctions" className="block hover:text-green-200">Auctions</Link>
            <Link to="/environmental-impact" className="block hover:text-green-200">Environmental Impact</Link>
          </div>
        )}
      </nav>

      {/* User Profile Modal */}
      {showProfileModal && <UserProfileModal onClose={() => setShowProfileModal(false)} />}
    </>
  );
};

export default Navbar;
