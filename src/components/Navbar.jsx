import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Recycle, Search, ShoppingCart, UserCircle, Menu, X } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    navigate('/');
  };

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-green-700 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button onClick={handleClick} className="flex items-center space-x-2">
              <Recycle className="h-8 w-8" />
              <span className="text-xl font-bold">EcoTech Market</span>
            </button>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <Link to="/marketplace" className="hover:text-green-200">Marketplace</Link>
              <Link to="/sell" className="hover:text-green-200">Sell Device</Link>
              <Link to="/auctions" className="hover:text-green-200">Auctions</Link>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-green-600">
              <ShoppingCart className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-green-600">
              <UserCircle className="h-5 w-5" />
            </button>

            {/* Hamburger Menu for Mobile */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-green-600"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2">
            <div className="flex flex-col space-y-2">
              <Link
                to="/marketplace"
                className="block px-4 py-2 rounded-md hover:bg-green-600"
                onClick={toggleMenu}
              >
                Marketplace
              </Link>
              <Link
                to="/sell"
                className="block px-4 py-2 rounded-md hover:bg-green-600"
                onClick={toggleMenu}
              >
                Sell Device
              </Link>
              <Link
                to="/auctions"
                className="block px-4 py-2 rounded-md hover:bg-green-600"
                onClick={toggleMenu}
              >
                Auctions
              </Link>
            </div>
          </div>
        )}

        {/* Search Bar */}
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