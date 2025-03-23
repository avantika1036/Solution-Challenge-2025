import React, { useState } from 'react';
import { Upload, Plus, Trash2 } from 'lucide-react';

const categories = [
  'Smartphone', 'Laptop', 'Tablet', 'Desktop', 'TV', 'Audio', 'Wearables', 'Other'
];

const conditions = [
  'New', 'Used - Like New', 'Used - Good', 'Used - Fair', 'For Parts'
];

const SellDevicePage = () => {
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files.map(file => URL.createObjectURL(file))]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">Sell Your Device</h1>
        <p className="text-gray-600 mb-8">List your electronic device for sale or auction</p>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <form className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Images
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {images.map((url, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                    <img src={url} alt="preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {images.length < 6 && (
                  <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition">
                    <Upload className="h-8 w-8 text-gray-400" />
                    <span className="mt-2 text-sm text-gray-500">Upload Image</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </label>
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Title
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., iPhone 13 Pro Max 256GB"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Condition
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select Condition</option>
                  {conditions.map(cond => (
                    <option key={cond} value={cond}>{cond}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter price"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Listing Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option>Fixed Price</option>
                  <option>Auction</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Describe your device's features, condition, and any included accessories..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Listing
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellDevicePage;