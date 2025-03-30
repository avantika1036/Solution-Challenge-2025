import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";  // Import Firebase Firestore & Auth
import { doc, getDoc, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { updateProfile } from "firebase/auth";

const UserProfileModal = ({ onClose }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
          setUser(userSnap.data());
        } else {
          // Use auth data if Firestore doesn't have extra info
          setUser({
            name: currentUser.displayName || "No Name Provided",
            email: currentUser.email || "No Email Provided",
            phone: "",
            address: "",
          });
        }
      }
    };

    fetchUserData();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Save updated details to Firestore
  const handleSave = async () => {
    if (auth.currentUser) {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(userDocRef, user, { merge: true });
  
      // ✅ Update Firebase Auth displayName to match Firestore name
      await updateProfile(auth.currentUser, {
        displayName: user.name,
      });
  
      console.log("Updated Firebase Auth displayName:", user.name);
    }
    setIsEditing(false);
  };
  
  

  // Handle Logout
  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/"; // Redirect to homepage
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold text-green-700 mb-4">User Profile</h2>

        {isEditing ? (
          <>
            <label className="block mb-2">
              Name:
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
              />
            </label>
            <label className="block mb-2">
              Email:
              <input
                type="email"
                name="email"
                value={user.email}
                className="w-full p-2 border rounded mt-1 bg-gray-200"
                disabled
              />
            </label>
            <label className="block mb-2">
              Phone:
              <input
                type="tel"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
              />
            </label>
            <label className="block mb-4">
              Address:
              <input
                type="text"
                name="address"
                value={user.address}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
              />
            </label>
            <button
              onClick={handleSave}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <p className="mb-2"><strong>Name:</strong> {user.name}</p>
            <p className="mb-2"><strong>Email:</strong> {user.email}</p>
            <p className="mb-2"><strong>Phone:</strong> {user.phone || "Not provided"}</p>
            <p className="mb-4"><strong>Address:</strong> {user.address || "Not provided"}</p>

            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-2"
            >
              Edit Profile
            </button>
          </>
        )}

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>

        <button
          onClick={onClose}
          className="w-full mt-2 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserProfileModal;
