import React, { useState } from "react";
import { EyeIcon, EyeOffIcon, LogIn } from "lucide-react";
import "./Login.css";
import LoginImage from '../../assets/loginHero.jpg';

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt with:", {
      email,
      password,
    });
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
                  {showPassword ? (
                    <EyeOffIcon className="icon" />
                  ) : (
                    <EyeIcon className="icon" />
                  )}
                </button>
              </div>
            </div>
            <div className="form-actions">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>
            <button type="submit" className="login-button">
              Sign In
            </button>
            <div className="help-text">
              New to TutorLink?{" "}
              <a href="#" className="signup-link">
                Create an account
              </a>
            </div>
          </form>
        </div>
      </div>
      <div className="login-image">
        <img
          src={LoginImage}
          alt="Students collaborating in a modern learning environment"
          className="side-image"
        />
      </div>
    </div>
  );
}
