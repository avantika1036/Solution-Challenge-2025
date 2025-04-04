import React, { useState } from "react";
import { auth, googleProvider } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Spline from "@splinetool/react-spline";
import { AtSign, Key, User } from "lucide-react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login & register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(""); // For registration
  const [isSplineLoaded, setIsSplineLoaded] = useState(false); // Track Spline loading state
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert("✅ Login Successful!");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("✅ Registration Successful!");
      }
      navigate("/marketplace");
    } catch (error) {
      alert("❌ Error: " + error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("✅ Signed in with Google!");
      navigate("/marketplace");
    } catch (error) {
      alert("❌ Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-gray-700 relative overflow-hidden text-white">
      {/* Animated Particles */}
      <div className="absolute inset-0 z-0">
        <div className="w-[200px] h-[200px] bg-green-500 rounded-full blur-3xl opacity-30 absolute top-10 left-10 animate-pulse"></div>
        <div className="w-[300px] h-[300px] bg-blue-500 rounded-full blur-3xl opacity-30 absolute bottom-10 right-10 animate-pulse"></div>
      </div>

      {/* Login/Register Section */}
      <div className="relative z-10 w-full lg:w-1/2 max-w-md bg-gray-800 bg-opacity-60 backdrop-blur-lg text-white rounded-3xl shadow-2xl p-10 transform transition duration-500 hover:scale-105 m-4">
        <h1 className="text-4xl font-extrabold text-center mb-4 text-green-400">
          E-Waste Exchange
        </h1>
        <p className="text-center text-gray-300 mb-8">
          Join the Movement to Save the Planet
        </p>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div
            className={`cursor-pointer px-6 py-2 transition ${
              isLogin
                ? "border-b-4 border-green-400 font-bold text-green-400"
                : "text-gray-400 hover:text-green-400"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </div>
          <div
            className={`cursor-pointer px-6 py-2 transition ${
              !isLogin
                ? "border-b-4 border-green-400 font-bold text-green-400"
                : "text-gray-400 hover:text-green-400"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </div>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleAuth} className="space-y-6">
          {!isLogin && (
            <div className="relative">
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-700 text-white shadow-md hover:shadow-lg transition"
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          )}
          <div className="relative">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-700 text-white shadow-md hover:shadow-lg transition"
            />
            <AtSign className="absolute left-4 top-3/4 transform -translate-y-2/4 h-5 w-5 text-gray-400" />
          </div>
          <div className="relative">
            <label className="block  text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-700 text-white shadow-md hover:shadow-lg transition"
            />
            <Key className="absolute left-4 top-3/4 transform -translate-y-2/4 h-5 w-5 text-gray-400" />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-3 rounded-lg hover:from-green-500 hover:to-green-600 transition font-semibold shadow-md hover:shadow-lg"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="text-center my-6 text-gray-400">or</div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-lg hover:from-red-600 hover:to-red-700 transition font-semibold shadow-md hover:shadow-lg"
        >
          Sign in with Google
        </button>
      </div>

      {/* Spline 3D Scene Section */}
      <div className="relative z-10 w-full lg:w-1/2 h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center m-4">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-gray-800 opacity-50 rounded-lg"></div>
        {/* Show spinner while Spline is loading */}
        {!isSplineLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <Spline
          scene="https://prod.spline.design/0eIL9kOwuhW7bUjy/scene.splinecode"
          onLoad={() => setIsSplineLoaded(true)} // Set loading state to true when loaded
          hideUI
        />
      </div>
    </div>
  );
};

export default AuthPage;
