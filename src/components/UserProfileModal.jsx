import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { UserCircle, Mail, Phone, MapPin } from "lucide-react";

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

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (auth.currentUser) {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(userDocRef, user, { merge: true });

      await updateProfile(auth.currentUser, {
        displayName: user.name,
      });
    }
    setIsEditing(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-400 text-white p-6 rounded-t-lg flex flex-col items-center">
          <UserCircle className="h-16 w-16 mb-2" />
          <h2 className="text-2xl font-bold">{user.name || "Guest User"}</h2>
          <p className="text-sm">{user.email}</p>
        </div>

        {/* Profile Details */}
        <div className="p-6">
          {isEditing ? (
            <>
              <label className="block mb-4">
                <span className="text-sm font-medium">Name</span>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mt-1"
                />
              </label>
              <label className="block mb-4">
                <span className="text-sm font-medium">Phone</span>
                <input
                  type="tel"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mt-1"
                />
              </label>
              <label className="block mb-4">
                <span className="text-sm font-medium">Address</span>
                <input
                  type="text"
                  name="address"
                  value={user.address}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mt-1"
                />
              </label>
              <div className="flex justify-between">
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center mb-4">
                <Mail className="h-5 w-5 text-green-600 mr-2" />
                <p className="text-sm">
                  <strong>Email:</strong> {user.email}
                </p>
              </div>
              <div className="flex items-center mb-4">
                <Phone className="h-5 w-5 text-green-600 mr-2" />
                <p className="text-sm">
                  <strong>Phone:</strong> {user.phone || "Not provided"}
                </p>
              </div>
              <div className="flex items-center mb-4">
                <MapPin className="h-5 w-5 text-green-600 mr-2" />
                <p className="text-sm">
                  <strong>Address:</strong> {user.address || "Not provided"}
                </p>
              </div>
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
    </div>
  );
};

export default UserProfileModal;
