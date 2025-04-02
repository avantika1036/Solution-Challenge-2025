import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const EnvironmentalImpactPage = () => {
  // Sample data - replace with real user data
  const impactData = {
    co2Reduced: 24.3, // kg
    wasteDiverted: 18.7, // kg
    itemsRecycled: 32,
    monthlyData: [
      { month: 'Jan', co2: 3.2, waste: 2.1 },
      { month: 'Feb', co2: 4.1, waste: 2.8 },
      { month: 'Mar', co2: 5.6, waste: 3.4 },
      { month: 'Apr', co2: 6.2, waste: 4.0 },
      { month: 'May', co2: 5.3, waste: 3.7 },
    ]
  };

  // Bar Chart Data
  const barData = {
    labels: ['CO₂ Reduced (kg)', 'Waste Diverted (kg)', 'Items Recycled'],
    datasets: [
      {
        label: 'Your Impact',
        data: [
          impactData.co2Reduced,
          impactData.wasteDiverted,
          impactData.itemsRecycled
        ],
        backgroundColor: [
          'rgba(34, 197, 94, 0.7)',
          'rgba(22, 163, 74, 0.7)',
          'rgba(21, 128, 61, 0.7)'
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(22, 163, 74, 1)',
          'rgba(21, 128, 61, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  // Line Chart Data
  const lineData = {
    labels: impactData.monthlyData.map(item => item.month),
    datasets: [
      {
        label: 'CO₂ Reduced (kg)',
        data: impactData.monthlyData.map(item => item.co2),
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        tension: 0.3,
      },
      {
        label: 'Waste Diverted (kg)',
        data: impactData.monthlyData.map(item => item.waste),
        borderColor: 'rgba(22, 163, 74, 1)',
        backgroundColor: 'rgba(22, 163, 74, 0.2)',
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="bg-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-green-400 mb-8">Your Environmental Impact</h1>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-green-50 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-green-800">CO₂ Reduced</h3>
            <p className="text-2xl font-bold text-green-600">
              {impactData.co2Reduced} kg
            </p>
            <p className="text-sm text-green-500 mt-1">
              Equivalent to {Math.round(impactData.co2Reduced * 1.6)} miles not driven
            </p>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-green-800">Waste Diverted</h3>
            <p className="text-2xl font-bold text-green-600">
              {impactData.wasteDiverted} kg
            </p>
            <p className="text-sm text-green-500 mt-1">
              Equivalent to {Math.round(impactData.wasteDiverted / 4)} trash bags
            </p>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-green-800">Items Recycled</h3>
            <p className="text-2xl font-bold text-green-600">
              {impactData.itemsRecycled}
            </p>
            <p className="text-sm text-green-500 mt-1">
              {Math.round(impactData.itemsRecycled / 5)} devices per month
            </p>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Total Environmental Impact
          </h2>
          <div className="h-80">
            <Bar 
              data={barData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Monthly Progress
          </h2>
          <div className="h-80">
            <Line 
              data={lineData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalImpactPage;