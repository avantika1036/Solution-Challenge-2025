import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Recycle, ShoppingCart, UserCircle, Leaf } from "lucide-react";
import UserProfileModal from "./UserProfileModal";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, User as FirebaseUser, updateProfile } from "firebase/auth";

// Define User Type
interface User {
  name: string;
  email: string;
  photoURL?: string;
}

// Firestore User Data Type
interface FirebaseUserData {
  username?: string;
  email?: string;
  photoURL?: string;
  co2Reduced?: number;
}

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [showEcoPoints, setShowEcoPoints] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [ecoPoints, setEcoPoints] = useState<number>(0);

  useEffect(() => {
    const fetchUserData = async (currentUser: FirebaseUser) => {
      if (!currentUser) return;
      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userDocRef);

        let updatedUser: User = {
          name: currentUser.displayName || "Guest", // Default name
          email: currentUser.email || "No Email",
          photoURL: currentUser.photoURL || undefined,
        };

        if (userSnap.exists()) {
          const userData = userSnap.data() as FirebaseUserData;
          updatedUser.name = userData.username || updatedUser.name; // Prioritize Firestore username
          updatedUser.photoURL = userData.photoURL || updatedUser.photoURL;
          setEcoPoints(userData.co2Reduced ? Math.round(userData.co2Reduced * 10) : 0);
        }

        setUser(updatedUser); // Update state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        fetchUserData(currentUser);
      } else {
        setUser(null);
        setEcoPoints(0);
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ This function forces Firebase to refresh user data after profile update
  const refreshUserProfile = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      await currentUser.reload(); // Force Firebase to update the user profile
      setUser({
        name: currentUser.displayName || "Guest",
        email: currentUser.email || "No Email",
        photoURL: currentUser.photoURL || undefined,
      });
    }
  };

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

            {/* Navigation Links */}
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

                {/* EcoPoints Tooltip */}
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

      {/* User Profile Modal (Pass refresh function to update Navbar after save) */}
      {showProfileModal && (
        <UserProfileModal onClose={() => {
          setShowProfileModal(false);
          refreshUserProfile(); // 🔥 Refresh Navbar after profile update
        }} />
      )}
    </>
  );
};

export default Navbar;
