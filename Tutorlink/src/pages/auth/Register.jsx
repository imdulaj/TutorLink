import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import "./Register.css";
import LoginImage from "../../assets/loginHero.jpg";
import { Link, useNavigate } from "react-router-dom";

export function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    registrationNumber: "", // Updated to match backend
    contactNumber: "",
    stream: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || "Registration successful!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again later.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-form-container">
        <div className="register-form-wrapper">
          <div className="register-header">
            <h1>Create an Account</h1>
          </div>
          <form onSubmit={handleSubmit} className="register-form">
            {error && <p className="error-text">{error}</p>}
            {success && <p className="success-text">{success}</p>}
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
              <label htmlFor="registrationNumber">Registration Number</label>
              <input
                id="registrationNumber"
                name="registrationNumber"
                type="text"
                value={formData.registrationNumber}
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
                pattern="\d{10}"
                title="Contact number must be exactly 10 digits"
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
                style={{ width: '420px' }}
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
              <Link to="/" className="login-link">
                Login here
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="register-image">
        <img
          src={LoginImage}
          alt="Students collaborating"
          className="side-image"
        />
      </div>
    </div>
  );
}
