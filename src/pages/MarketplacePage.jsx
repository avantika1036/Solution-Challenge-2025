import React, { useState } from 'react';
import { Search, SlidersHorizontal, Smartphone, Laptop, Tv, Headphones, Monitor, Printer, Watch } from 'lucide-react';

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

const products = [
  {
    id: 1,
    name: 'iPhone 13 Pro',
    category: 'Smartphones',
    condition: 'Refurbished',
    price: 699,
    image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80&w=400',
    seller: 'TechRecycle Pro',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'MacBook Air M1',
    category: 'Laptops',
    condition: 'Used - Like New',
    price: 799,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=400',
    seller: 'GreenTech Solutions',
    rating: 4.9,
  },
  {
    id: 3,
    name: 'Samsung 4K Smart TV',
    category: 'TVs',
    condition: 'Refurbished',
    price: 549,
    image: 'https://images.unsplash.com/photo-1601944179066-29786cb9d32a?auto=format&fit=crop&q=80&w=400',
    seller: 'EcoElectronics',
    rating: 4.7,
  },
];

const MarketplacePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter products based on search query and selected category
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-900 py-8 text-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Search and Filter Section */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          {/* Search Bar */}
          <div className="flex-grow relative w-full">
            <input
              type="text"
              placeholder="Search for devices..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
          </div>

          {/* Filter Button */}
          <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-300 text-gray-800 text-sm flex items-center">
            <SlidersHorizontal className="h-4 w-4 mr-1" />
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <span className="text-lg font-bold text-green-600">
                    ${product.price}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{product.condition}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{product.seller}</span>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700 mr-1">
                      {product.rating}
                    </span>
                    <span className="text-yellow-400">★</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;
