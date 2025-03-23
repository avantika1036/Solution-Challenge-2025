import React from 'react';
import { ArrowRight, Laptop, Phone, Tv } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="flex flex-col bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80")' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 max-w-2xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Reduce, Reuse, Resell – A Smarter Way to Handle E-Waste
          </h1>
          <p className="text-xl mb-8">
            Join the sustainable tech revolution. Buy, sell, and recycle electronics responsibly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition flex items-center">
              Sell Your Device
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="bg-white text-green-800 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition">
              Browse Products
            </button>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <div className="flex justify-center mb-4">
                <Phone className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-4xl font-bold mb-2">2.5M+</h3>
              <p className="text-green-600">Devices Recycled</p>
            </div>
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <div className="flex justify-center mb-4">
                <Laptop className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-4xl font-bold mb-2">74M</h3>
              <p className="text-green-600">Tons of E-Waste by 2030</p>
            </div>
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <div className="flex justify-center mb-4">
                <Tv className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-4xl font-bold mb-2">500K+</h3>
              <p className="text-green-600">Active Users</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;