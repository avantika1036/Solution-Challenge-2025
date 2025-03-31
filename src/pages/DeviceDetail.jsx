import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const DeviceDetail = () => {
  const { id } = useParams();
  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const docRef = doc(db, "devices", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDevice(docSnap.data());
        } else {
          console.error("Device not found!");
        }
      } catch (error) {
        console.error("Error fetching device details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevice();
  }, [id]);

  if (loading) return <p className="text-white">Loading...</p>;
  if (!device) return <p className="text-white">Device not found!</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <img src={device.images[0]} alt={device.title} className="w-full h-60 object-cover rounded-lg" />
        <h1 className="text-3xl font-bold mt-4">{device.title}</h1>
        <p className="text-lg text-gray-400">{device.condition}</p>
        <p className="text-green-400 text-2xl font-bold">${device.price}</p>
        <p className="mt-4">{device.description}</p>
      </div>
    </div>
  );
};

export default DeviceDetail;
