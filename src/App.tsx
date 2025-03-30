import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import MarketplacePage from "./pages/MarketplacePage";
import AuctionsPage from "./pages/AuctionsPage";
import SellDevicePage from "./pages/SellDevicePage";
import EnvironmentalImpactPage from "./pages/EnvironmentalImpactPage";
import AuthPage from "./pages/AuthPage"; // Import Auth Page
import Footer from "./components/Footer";

const App: React.FC = () => {
  const location = useLocation();
  const showNavbarAndFooter: boolean = location.pathname !== "/auth"; // Hide navbar/footer on auth page

  return (
    <div className="min-h-screen flex flex-col">
      {showNavbarAndFooter && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/auctions" element={<AuctionsPage />} />
          <Route path="/sell" element={<SellDevicePage />} />
          <Route path="/environmental-impact" element={<EnvironmentalImpactPage />} />
          <Route path="/auth" element={<AuthPage />} /> {/* ✅ New Auth Route */}
        </Routes>
      </main>
      {showNavbarAndFooter && <Footer />}
    </div>
  );
};

const AppWrapper: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
