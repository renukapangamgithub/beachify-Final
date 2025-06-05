import React, { useState } from "react";
import "./Login.css";
import surfingImage from "../../assets/images/dogsurfing.png"; // Import image
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://beachify-final-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token in localStorage (or cookie if preferred)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect or show success
      alert("Login successful!");
      navigate("/"); // Redirect to homepage or dashboard

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Surfing Image on Left */}
        <div className="login-image">
          <img src={surfingImage} alt="Surfing" />
        </div>

        {/* Login Form on Right */}
        <div className="login-form">
          <h2 className="login-title">Login to <span>Beachify</span></h2>

          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Input */}
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Error message */}
            {error && <p className="error-message">{error}</p>}

            {/* Login Button */}
            <button type="submit" className="login-button">Login</button>

            {/* Forgot Password & Register Links */}
            <div className="form-footer">
              <a href="#">Forgot Password?</a>
              <p>Don't have an account? <a href="/signup">Sign Up</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
