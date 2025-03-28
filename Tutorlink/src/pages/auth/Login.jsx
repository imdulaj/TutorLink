import React, { useState } from "react";
import { EyeIcon, EyeOffIcon, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import LoginImage from "../../assets/loginHero.jpg";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login Response:", data); // Debugging

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        
        // Ensure role is correctly retrieved
        const storedRole = localStorage.getItem("role");
        console.log("Stored Role:", storedRole); // Debugging
        
        // Redirect based on role
        if (storedRole && storedRole.trim() === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/home");
        }
      } else {
        setError(data.message || "Invalid email or password.");
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-form-wrapper">
          <div className="login-header">
            <div className="brand">
              <LogIn className="brand-icon" />
              <span className="brand-name">TutorLink</span>
            </div>
            <h1>Welcome Back!</h1>
            <p>Login to access your learning dashboard</p>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <EyeOffIcon className="icon" /> : <EyeIcon className="icon" />}
                </button>
              </div>
            </div>
            <button type="submit" className="login-button">Sign In</button>
            {error && <p className="error-text">{error}</p>}
            <div className="help-text">
              New to TutorLink? <Link to="/register" className="signup-link">Create an account</Link>
            </div>
          </form>
        </div>
      </div>
      <div className="login-image">
        <img src={LoginImage} alt="Login Illustration" className="side-image" />
      </div>
    </div>
  );
}
