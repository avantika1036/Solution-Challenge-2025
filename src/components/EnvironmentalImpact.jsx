import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EnvironmentalImpact = ({ data }) => {
  const chartData = {
    labels: ['CO₂ Reduced (kg)', 'Waste Diverted (kg)', 'Items Recycled'],
    datasets: [
      {
        label: 'Your Impact',
        data: [data.co2Reduced, data.wasteDiverted, data.itemsRecycled],
        backgroundColor: [
          'rgba(74, 222, 128, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(22, 163, 74, 0.8)'
        ],
        borderColor: [
          'rgba(74, 222, 128, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(22, 163, 74, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="text-white">
      <h3 className="text-lg font-bold mb-4">Your Environmental Impact</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-2">EcoPoints Breakdown</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>CO₂ Reduction:</span>
              <span className="font-bold">{data.co2Reduced} kg</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Waste Diverted:</span>
              <span className="font-bold">{data.wasteDiverted} kg</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Items Recycled:</span>
              <span className="font-bold">{data.itemsRecycled}</span>
            </div>
          </div>
        </div>
        
        <div>
          <Bar 
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    color: '#fff'
                  }
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    color: '#fff'
                  },
                  grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                  }
                },
                x: {
                  ticks: {
                    color: '#fff'
                  },
                  grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                  }
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalImpact;