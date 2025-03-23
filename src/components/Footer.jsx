import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Recycle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Recycle className="h-8 w-8" />
              <span className="text-xl font-bold">EcoTech Market</span>
            </div>
            <p className="text-green-300">
              Making e-waste management sustainable and accessible for everyone.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/marketplace" className="text-green-300 hover:text-white">Marketplace</Link></li>
              <li><Link to="/sell" className="text-green-300 hover:text-white">Sell Device</Link></li>
              <li><Link to="/auctions" className="text-green-300 hover:text-white">Auctions</Link></li>
              <li><Link to="/recycle" className="text-green-300 hover:text-white">Recycle</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-green-300 hover:text-white">Help Center</Link></li>
              <li><Link to="/contact" className="text-green-300 hover:text-white">Contact Us</Link></li>
              <li><Link to="/terms" className="text-green-300 hover:text-white">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-green-300 hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-green-300 hover:text-white">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-green-300 hover:text-white">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-green-300 hover:text-white">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-green-300 hover:text-white">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-green-800 text-center text-green-300">
          <p>&copy; 2025 EcoTech Market. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;