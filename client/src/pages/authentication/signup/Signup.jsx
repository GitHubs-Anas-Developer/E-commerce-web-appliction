import React, { useState } from "react";
import "./Signup.css"; // Import CSS file for styling
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

function Signup() {
  const navigate = useNavigate();
  const [name, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password"); // Toggle for password visibility
  const [confirmPasswordType, setConfirmPasswordType] = useState("password"); // Toggle for confirm password visibility
  const [icon, setIcon] = useState(eyeOff);
  const [confirmIcon, setConfirmIcon] = useState(eyeOff);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/register`, {
        name,
        email,
        password,
      });
      navigate("/login");

      console.log("Signup successful:", response.data);
    } catch (error) {
      console.log("Error during signup:", error);
    }
  };

  // Toggle password visibility for main password
  const handleTogglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      setIcon(eye);
    } else {
      setPasswordType("password");
      setIcon(eyeOff);
    }
  };

  // Toggle password visibility for confirm password
  const handleToggleConfirmPassword = () => {
    if (confirmPasswordType === "password") {
      setConfirmPasswordType("text");
      setConfirmIcon(eye);
    } else {
      setConfirmPasswordType("password");
      setConfirmIcon(eyeOff);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="name"
              placeholder="Enter your username"
              required
              value={name}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                type={passwordType}
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span onClick={handleTogglePassword} className="toggle-icon">
                <Icon icon={icon} size={20} />
              </span>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="password-wrapper">
              <input
                type={confirmPasswordType}
                id="confirm-password"
                name="confirm-password"
                placeholder="Confirm your password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span onClick={handleToggleConfirmPassword} className="toggle-icon">
                <Icon icon={confirmIcon} size={20} />
              </span>
            </div>
          </div>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <p className="login-link">
          Already have an account? <Link to={"/login"}>Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
