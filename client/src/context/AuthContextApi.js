import React, { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode"; // Correct default import
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cookies, removeCookie] = useCookies(["token"]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = cookies.token;

        if (token) {
          console.log("Token:", token);

          const decodedToken = jwtDecode(token);
          const userId = decodedToken._id;

          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/user/${userId}`
          );

          setUser(response.data.user);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (cookies.token) {
      fetchUserDetails();
    } else {
      setLoading(false);
    }
  }, [cookies.token]);

  const logout = () => {
    removeCookie("token", { path: "/" });
    setUser(null);
    navigate("/login"); // Redirect to login page after logout
  };

  const login = () => {
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
