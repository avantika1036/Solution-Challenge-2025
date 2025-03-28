import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Recycle, ShoppingCart, UserCircle, Leaf } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [showEcoPoints, setShowEcoPoints] = useState(false);
  
  // Calculate EcoPoints (1kg CO₂ = 10 points)
  const co2Reduced = 24.3; // Get from user data
  const ecoPoints = Math.round(co2Reduced * 10);

  return (
    <nav className="bg-green-700 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/')} 
              className="flex items-center space-x-2"
            >
              <Recycle className="h-8 w-8" />
              <span className="text-xl font-bold">EcoTech Market</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/marketplace" className="hover:text-green-200">
              Marketplace
            </Link>
            <Link to="/sell" className="hover:text-green-200">
              Sell Device
            </Link>
            <Link to="/auctions" className="hover:text-green-200">
              Auctions
            </Link>
            
            {/* Environmental Impact Link */}
            <Link to="/environmental-impact" className="hover:text-green-200">
              Environmental Impact
            </Link>
            
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
                  <p className="text-sm">
                    You've reduced <strong>{co2Reduced}kg</strong> of CO₂
                  </p>
                  <p className="text-xs text-green-200 mt-1">
                    1kg CO₂ = 10 EcoPoints
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* User Icons */}
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 rounded-full hover:bg-green-600 transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
            <button 
              className="p-2 rounded-full hover:bg-green-600 transition-colors"
              aria-label="User Profile"
            >
              <UserCircle className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;