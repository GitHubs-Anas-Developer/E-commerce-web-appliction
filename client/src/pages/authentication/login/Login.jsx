import React, { useState } from "react";
import "./Login.css"; // Import the same CSS file used for Signup
import axios from "axios";
import { useCookies } from "react-cookie"; // Import useCookies
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setCookie] = useCookies(["token"]); // Initialize cookies state

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/login`,
        {
          email,
          password,
        }
      );

      const token = response.data.token;

      // Store token in cookies
      setCookie("token", token); // Cookie expires in 1 day by default

      navigate("/"); // Redirect to home or other page after login

      console.log(token);
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="signup-button">
            Login
          </button>
        </form>
        <p className="login-link">
          Don't have an account? <Link to={"/signup"}>Sign up here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
