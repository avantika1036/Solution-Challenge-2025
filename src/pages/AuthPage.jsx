import { useState } from "react";
import { auth, googleProvider } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login & register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(""); // For register
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
    <div className="container">
      <div className="auth-section">
        <h1>E-Waste Exchange</h1>

        {/* Tabs */}
        <div className="tabs">
          <div
            className={`tab ${isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </div>
          <div
            className={`tab ${!isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </div>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleAuth}>
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>

        <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      </div>

      <div className="content-section">
        <h2>Welcome to E-Waste Exchange</h2>
        <p>
          Join our growing community of environmentally conscious users in
          responsibly managing electronic waste.
        </p>

        <div className="divider"></div>

        <h3>Why Choose Us?</h3>
        <ul>
          <li>✅ AI-Powered Auction System</li>
          <li>✅ Verified Network of Recyclers</li>
          <li>✅ Smart Pricing for Maximum Profit</li>
          <li>✅ Track Your Environmental Impact</li>
          <li>✅ Secure & Compliant Transactions</li>
        </ul>
      </div>
    </div>
  );
};

export default AuthPage;
