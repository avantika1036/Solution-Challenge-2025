import React, { useState } from 'react';
import { Upload, Plus, Trash2, Leaf } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const categories = [
  'Smartphone', 'Laptop', 'Tablet', 'Desktop', 'TV', 'Audio', 'Wearables', 'Other'
];

const conditions = [
  'New', 'Used - Like New', 'Used - Good', 'Used - Fair', 'For Parts'
];

// Impact calculator
const calculateImpact = (category, condition) => {
  const IMPACT_VALUES = {
    Smartphone: { co2: 85, waste: 0.5 },
    Laptop: { co2: 300, waste: 1.2 },
    Tablet: { co2: 50, waste: 0.3 },
    default: { co2: 40, waste: 0.4 }
  };

  const CONDITION_FACTORS = {
    'New': 1,
    'Used - Like New': 0.9,
    'Used - Good': 0.7,
    'Used - Fair': 0.5,
    'For Parts': 0.2
  };

  const base = IMPACT_VALUES[category] || IMPACT_VALUES.default;
  const factor = CONDITION_FACTORS[condition] || 0.5;

  return {
    co2Reduced: (base.co2 * factor).toFixed(1),
    wasteDiverted: (base.waste * factor).toFixed(1),
    ecoPoints: Math.round(base.co2 * factor * 10) // 10 points per kg CO₂
  };
};

const SellDevicePage = () => {
  const { register, handleSubmit, watch } = useForm();
  const [images, setImages] = useState([]);
  const [impact, setImpact] = useState({ co2Reduced: 0, wasteDiverted: 0, ecoPoints: 0 });
  const navigate = useNavigate();

  // Watch category and condition fields
  const category = watch('category');
  const condition = watch('condition');

  // Calculate impact when category/condition changes
  React.useEffect(() => {
    if (category && condition) {
      setImpact(calculateImpact(category, condition));
    }
  }, [category, condition]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files.map(file => URL.createObjectURL(file))]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    console.log('Form data:', data);
    try {
      const formData = new FormData();
  
      // Append all form fields
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
  
      // Append images
      images.forEach((image, index) => {
        formData.append(`images[${index}]`, image); // Use actual file objects
      });
  
      // Send the form data to the server
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/devices`, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        console.log('Device submitted successfully');
        navigate('/marketplace'); // Redirect on success
      } else {
        console.error('Failed to submit the form:', await response.text());
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 text-white">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">Sell Your Device</h1>
        <p className="text-gray-400 mb-8">List your electronic device for sale or auction</p>

        <div className="bg-gray-800 rounded-xl shadow-lg p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Product Images (Max 6)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {images.map((url, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-600">
                    <img src={url} alt="preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {images.length < 6 && (
                  <label className="aspect-square rounded-lg border-2 border-dashed border-gray-600 flex flex-col items-center justify-center cursor-pointer hover:border-green-500 hover:bg-gray-700 transition">
                    <Upload className="h-8 w-8 text-gray-400" />
                    <span className="mt-2 text-sm text-gray-400">Upload Image</span>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      multiple
                      onChange={handleImageUpload} 
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Product Title
              </label>
              <input
                type="text"
                {...register('title', { required: true })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white"
                placeholder="e.g., iPhone 13 Pro Max 256GB"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Category
                </label>
                <select
                  {...register('category', { required: true })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Condition
                </label>
                <select
                  {...register('condition', { required: true })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white"
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
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  min="0"
                  {...register('price', { required: true })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white"
                  placeholder="Enter price"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Listing Type
                </label>
                <select 
                  {...register('listingType')}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white"
                >
                  <option value="fixed">Fixed Price</option>
                  <option value="auction">Auction</option>
                </select>
              </div>
            </div>

            {/* Environmental Impact */}
            <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="h-5 w-5 text-green-400" />
                <h3 className="font-semibold text-green-400">Environmental Impact</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 p-3 rounded">
                  <p className="text-sm text-gray-400">CO₂ Reduced</p>
                  <p className="text-xl font-bold">{impact.co2Reduced} kg</p>
                </div>
                <div className="bg-gray-800 p-3 rounded">
                  <p className="text-sm text-gray-400">Waste Diverted</p>
                  <p className="text-xl font-bold">{impact.wasteDiverted} kg</p>
                </div>
              </div>
              <div className="mt-3 bg-green-900/30 p-3 rounded border border-green-800">
                <p className="text-sm text-green-400">You'll earn</p>
                <p className="text-2xl font-bold text-green-400">{impact.ecoPoints} EcoPoints</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <textarea
                rows={4}
                {...register('description', { required: true })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white"
                placeholder="Describe your device's features, condition, and any included accessories..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Create Listing
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellDevicePage;