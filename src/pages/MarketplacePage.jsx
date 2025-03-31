import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Smartphone, Laptop, Tv, Headphones, Monitor, Printer, Watch } from 'lucide-react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const categories = [
  { name: 'All', icon: null },
  { name: 'Smartphones', icon: Smartphone },
  { name: 'Laptops', icon: Laptop },
  { name: 'TVs', icon: Tv },
  { name: 'Audio', icon: Headphones },
  { name: 'Monitors', icon: Monitor },
  { name: 'Printers', icon: Printer },
  { name: 'Wearables', icon: Watch },
];

const MarketplacePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch devices from Firestore
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'devices'));
        const devicesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDevices(devicesList);
      } catch (error) {
        console.error('Error fetching devices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  // Filter products based on category, search query, and listing type (fixed or auction)
  const filteredDevices = devices.filter((device) => {
    const matchesCategory =
      selectedCategory === 'All' || device.category?.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      searchQuery.trim() === '' || device.title?.toLowerCase().includes(searchQuery.toLowerCase());

    // We only want to display devices that are for sale at a fixed price
    const matchesListingType = device.listingType === 'fixed';

    return matchesCategory && matchesSearch && matchesListingType;
  });

  return (
    <div className="min-h-screen bg-gray-900 py-8 text-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search for devices..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-300 text-gray-800">
            <SlidersHorizontal className="h-5 w-5" />
            Filters
          </button>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
            {categories.map(({ name, icon: Icon }) => (
              <button
                key={name}
                onClick={() => setSelectedCategory(name)}
                className={`flex flex-col items-center p-4 rounded-xl border transition-colors duration-150
                  ${selectedCategory === name
                    ? 'border-green-500 bg-green-600 text-white'
                    : 'border-gray-200 bg-gray-800 text-gray-300 hover:border-green-500 hover:bg-green-700 hover:text-white'
                  }`}
              >
                {Icon && <Icon className="h-6 w-6 mb-2" />}
                <span className="text-sm">{name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Fixed Price Devices */}
        <div>
          <h2 className="text-xl font-semibold mb-4">For Sale (Fixed Price)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-green-500"></div>
                <p className="ml-3 text-gray-400">Fetching products...</p>
              </div>
            ) : filteredDevices.length === 0 ? (
              <div className="text-center text-gray-400">
                <p>No fixed price devices found.</p>
                <p>Try adjusting your search or category filter.</p>
              </div>
            ) : (
              filteredDevices.map((device) => (
                <Link to={`/device/${device.id}`} key={device.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition">
                  <img
                    src={device.images?.[0] || '/placeholder-image.jpg'}
                    alt={device.title || 'No Image'}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />

                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-black">{device.title}</h3>
                      <span className="text-lg font-bold text-green-600">${device.price || 'N/A'}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{device.condition}</p>
                    <div className="mt-2 bg-gray-100 p-2 rounded-md">
                      <p className="text-xs text-gray-600">Eco Points: {device.impact?.ecoPoints || 0}</p>
                      <p className="text-xs text-gray-600">CO₂ Saved: {device.impact?.co2Reduced} kg</p>
                    </div>
                    <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                      View Details
                    </button>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;
