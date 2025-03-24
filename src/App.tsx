import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import AuctionsPage from './pages/AuctionsPage';
import SellDevicePage from './pages/SellDevicePage';
import Footer from './components/Footer';

const App = () => {
  const location = useLocation();
  const showNavbarAndFooter = location.pathname !== '/';

  return (
    <div className="min-h-screen flex flex-col">
      {showNavbarAndFooter && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/auctions" element={<AuctionsPage />} />
          <Route path="/sell" element={<SellDevicePage />} />
        </Routes>
      </main>
      {showNavbarAndFooter && <Footer />}
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;