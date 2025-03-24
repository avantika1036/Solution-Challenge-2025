import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Recycle, Search, ShoppingCart, UserCircle } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);

  const handleClick = () => {
    navigate('/');
  };

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  return (
    <nav className="bg-green-700 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button onClick={handleClick} className="flex items-center space-x-2">
              <Recycle className="h-8 w-8" />
              <span className="text-xl font-bold">EcoTech Market</span>
            </button>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <Link to="/marketplace" className="hover:text-green-200">Marketplace</Link>
              <Link to="/sell" className="hover:text-green-200">Sell Device</Link>
              <Link to="/auctions" className="hover:text-green-200">Auctions</Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* <button className="p-2 rounded-full hover:bg-green-600" onClick={handleSearchClick}>
              <Search className="h-5 w-5" />
            </button> */}
            <button className="p-2 rounded-full hover:bg-green-600">
              <ShoppingCart className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-green-600">
              <UserCircle className="h-5 w-5" />
            </button>
          </div>
        </div>
        {showSearch && (
          <div className="mt-2">
            <input
              type="text"
              className="w-full p-2 rounded-md bg-gray-200 text-black"
              placeholder="Search..."
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;