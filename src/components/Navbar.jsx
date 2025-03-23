import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, Search, ShoppingCart, UserCircle } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-green-700 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/home" className="flex items-center space-x-2">
              <Recycle className="h-8 w-8" />
              <span className="text-xl font-bold">EcoTech Market</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <Link to="/marketplace" className="hover:text-green-200">Marketplace</Link>
              <Link to="/sell" className="hover:text-green-200">Sell Device</Link>
              <Link to="/auctions" className="hover:text-green-200">Auctions</Link>
              <Link to="/recycle" className="hover:text-green-200">Recycle</Link>
              <Link to="/start" className="hover:text-green-200">Start Page</Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-green-600">
              <Search className="h-5 w-5" />
            </button>
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