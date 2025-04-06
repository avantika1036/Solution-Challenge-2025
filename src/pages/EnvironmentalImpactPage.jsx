import React, { useEffect, useState } from "react";
import axios from 'axios';
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
import { auth, db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

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
  const [impactData, setImpactData] = useState({
    co2Reduced: 0,
    wasteDiverted: 0,
    itemsRecycled: 0,
    monthlyData: [],
  });
  
  useEffect(() => {
    const fetchUserImpact = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;
  
      const q = query(
        collection(db, "devices"),
        where("userId", "==", currentUser.uid)
      );
  
      const querySnapshot = await getDocs(q);
  
      // ✅ Declare required vars
      const apiKey = import.meta.env.VITE_CLIMATIQ_API_KEY;
      let co2Total = 0;
      let wasteTotal = 0;
      let items = 0;
      const monthlyStats = {};
  
      const typeMap = {
        smartphone: "electronics-type_consumer_electronics_mobile_device_smartphone_consumer_electronics_production_mobile_device_smartphone",
        laptop: "electronics-type_laptop_14_inches",
        tablet: "electronics-type_tablet",
        desktop: "electronics-type_desktop",
        tv: "electronics-type_television_cameras_and_other_electronic_goods",
        audio: "electronics-type_audio_and_video_equipment_and_unrecorded_media",
        wearables: "equipment_repair-type_consumer_electronics_repair_and_maintenance",
      };
  
      for (const doc of querySnapshot.docs) {
        const data = doc.data();
        const weight = parseFloat(data.weight || 0.2);
        const rawCategory = (data.category || "").toLowerCase().trim();
        const activity_id = typeMap[rawCategory];
  
        if (!activity_id) {
          console.warn(`Unsupported category "${data.category}", skipping...`);
          wasteTotal += weight;
          items += 1;
          continue;
        }
  
        try {
          const response = await axios.post(
            "https://api.climatiq.io/estimate",
            {
              emission_factor: {
                activity_id,
              },
              parameters: {
                weight,
                weight_unit: "kg",
              },
            },
            {
              headers: {
                Authorization: `Bearer ${apiKey}`,
              },
            }
          );
  
          const co2e = response.data.co2e || 0;
          const createdAt = data.createdAt?.toDate();
  
          co2Total += co2e;
          wasteTotal += weight;
          items += 1;
  
          if (createdAt) {
            const month = createdAt.toLocaleString("default", { month: "short" });
            if (!monthlyStats[month]) {
              monthlyStats[month] = { co2: 0, waste: 0 };
            }
            monthlyStats[month].co2 += co2e;
            monthlyStats[month].waste += weight;
          }
        } catch (err) {
          console.error("Climatiq API error:", err.message);
        }
      }
  
      const monthlyData = Object.entries(monthlyStats).map(([month, stats]) => ({
        month,
        ...stats,
      }));
  
      console.log("Final impactData:", {
        co2Reduced: co2Total,
        wasteDiverted: wasteTotal,
        items,
        monthlyStats,
      });
  
      setImpactData({
        co2Reduced: co2Total.toFixed(1),
        wasteDiverted: wasteTotal.toFixed(1),
        itemsRecycled: items,
        monthlyData,
      });
    };
  
    fetchUserImpact();
  }, []);
  
  
  
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