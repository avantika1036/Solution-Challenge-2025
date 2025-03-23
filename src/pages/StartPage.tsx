import React from 'react';
import { useNavigate } from 'react-router-dom';

const StartPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/home');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to EcoTech Market</h1>
      <button
        onClick={handleStart}
        className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition"
      >
        Go to Home Page
      </button>
    </div>
  );
};

export default StartPage;