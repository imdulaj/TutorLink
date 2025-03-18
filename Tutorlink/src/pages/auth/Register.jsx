import React, { useState } from "react";
import { EyeIcon, EyeOffIcon, UserPlus } from "lucide-react";
import "./Register.css";
import LoginImage from '../../assets/loginHero.jpg'


export function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    regNumber: "",
    contactNumber: "",
    stream: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registering user with:", formData);
  };

  return (
    <div className="register-container">
      <div className="register-form-container">
        <div className="register-form-wrapper">
          <div className="register-header">
            <h1>Create an Account</h1>
          </div>
          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="regNumber">Registration Number</label>
              <input
                id="regNumber"
                name="regNumber"
                type="text"
                value={formData.regNumber}
                onChange={handleChange}
                required
                placeholder="Enter your registration number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number</label>
              <input
                id="contactNumber"
                name="contactNumber"
                type="tel"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                placeholder="Enter your contact number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="stream">Stream</label>
              <select
                id="stream"
                name="stream"
                value={formData.stream}
                onChange={handleChange}
                required
                className="selection"
              >
                <option value="">Select your stream</option>
                <option value="science">Science</option>
                <option value="commerce">Commerce</option>
                <option value="arts">Arts</option>
                <option value="technology">Technology</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a password"
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

            <button type="submit" className="register-button">
              Sign Up
            </button>
            <div className="help-text">
              Already have an account?{" "}
              <a href="#" className="login-link">
                Login here
              </a>
            </div>
          </form>
        </div>
      </div>
      <div className="register-image">
        <img
          src={LoginImage}
          alt="Students collaborating in a modern learning environment"
          className="side-image"
        />
      </div>
    </div>
  );
}
