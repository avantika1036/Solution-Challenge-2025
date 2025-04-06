import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, SlidersHorizontal,
  Smartphone, Laptop, Tv, Headphones, Monitor, Printer, Watch
} from 'lucide-react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const categories = [
  { name: 'All', icon: null },
  { name: 'Smartphone', icon: Smartphone },
  { name: 'Laptop', icon: Laptop },
  { name: 'TV', icon: Tv },
  { name: 'Audio', icon: Headphones },
  { name: 'Desktop', icon: Monitor },
  { name: 'Other', icon: Printer },
  { name: 'Wearables', icon: Watch },
];

const MarketplacePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Firestore devices
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'devices'));
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDevices(items);
      } catch (err) {
        console.error('Error fetching devices:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  // Filtering logic
  const filteredDevices = devices.filter((device) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      device.category?.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      searchQuery.trim() === '' ||
      device.title?.toLowerCase().includes(searchQuery.toLowerCase());

    const isFixed = device.listingType === 'fixed';

    return matchesCategory && matchesSearch && isFixed;
  });

  return (
    <div className="min-h-screen bg-gray-900 py-8 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search for devices..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button className="ml-4 flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-300 text-gray-800">
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
                className={`flex flex-col items-center p-4 rounded-xl border transition-colors duration-150 ${
                  selectedCategory === name
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

        {/* Fixed Price Listings */}
        <div>
          <h2 className="text-xl font-semibold mb-4">For Sale (Fixed Price)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full text-center text-gray-400">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-green-500 mx-auto mb-2"></div>
                Fetching products...
              </div>
            ) : filteredDevices.length === 0 ? (
              <div className="col-span-full text-center text-gray-400">
                <p>No devices found.</p>
                <p>Try adjusting your search or category filter.</p>
              </div>
            ) : (
              filteredDevices.map((device) => (
                <Link
                  to={`/device/${device.id}`}
                  key={device.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition text-black"
                >
                  <img
                    src={device.images?.[0] || '/placeholder-image.jpg'}
                    alt={device.title}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">{device.title}</h3>
                      <span className="text-lg font-bold text-green-600">${device.price}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{device.condition}</p>
                    <div className="bg-gray-100 p-2 rounded text-sm">
                      <p className="text-gray-600">🌱 EcoPoints: {device.ecoPoints}</p>
                      <p className="text-gray-600">🌍 CO₂ Saved: {device.co2Reduced} kg</p>
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
