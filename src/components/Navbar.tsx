import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Recycle, ShoppingCart, UserCircle, Leaf } from 'lucide-react';

const Navbar: React.FC = () => {
  const [showEcoPoints, setShowEcoPoints] = useState<boolean>(false);
  
  // Calculate EcoPoints based on CO₂ reduced (1kg CO₂ = 10 EcoPoints)
  const co2Reduced = 24.3; // kg (get from user data)
  const ecoPoints = Math.round(co2Reduced * 10);

  return (
    <nav className="bg-green-700 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Recycle className="h-8 w-8" />
              <span className="text-xl font-bold">EcoTech Market</span>
            </Link>
          </div>

          {/* Navigation Links */}
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
                className="flex items-center space-x-1 bg-green-600 px-3 py-1 rounded-full hover:bg-green-500"
              >
                <Leaf className="h-4 w-4" />
                <span>{ecoPoints} EcoPoints</span>
              </button>
              
              {/* Simple Points Breakdown */}
              {showEcoPoints && (
                <div className="absolute right-0 mt-2 w-48 bg-green-800 p-3 rounded shadow-lg">
                  <p className="text-sm">
                    You've reduced <strong>{co2Reduced}kg CO₂</strong>
                  </p>
                  <p className="text-xs mt-1">
                    (1kg CO₂ = 10 EcoPoints)
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* User Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-green-600">
              <ShoppingCart className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-green-600">
              <UserCircle className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;