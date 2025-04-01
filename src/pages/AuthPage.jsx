import React, { useState } from "react";
import { auth, googleProvider } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Spline from "@splinetool/react-spline";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login & register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(""); // For registration
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
        <div className="w-[200px] h-[200px] bg-gray-500 rounded-full blur-3xl opacity-20 absolute top-10 left-10 animate-pulse"></div>
        <div className="w-[300px] h-[300px] bg-gray-600 rounded-full blur-3xl opacity-20 absolute bottom-10 right-10 animate-pulse"></div>
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
            className={`cursor-pointer px-6 py-2 ${
              isLogin
                ? "border-b-4 border-green-400 font-bold text-green-400"
                : "text-gray-400"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </div>
          <div
            className={`cursor-pointer px-6 py-2 ${
              !isLogin
                ? "border-b-4 border-green-400 font-bold text-green-400"
                : "text-gray-400"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </div>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleAuth} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-700 text-white"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-700 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-700 text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-400 text-white py-3 rounded-lg hover:bg-green-500 transition font-semibold"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="text-center my-6 text-gray-400">or</div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition font-semibold"
        >
          Sign in with Google
        </button>
      </div>

      {/* Spline 3D Scene Section */}
      <div className="relative z-10 w-full lg:w-1/2 h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center m-4">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-gray-800 opacity-50 rounded-lg"></div>
        <Spline scene="https://prod.spline.design/0eIL9kOwuhW7bUjy/scene.splinecode" hideUI />
      </div>
    </div>
  );
};

export default AuthPage;
