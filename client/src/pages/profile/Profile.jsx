import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import {
  FaRegUserCircle,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaClipboardList,
  FaCog,
  FaLanguage,
  FaSignOutAlt,
  FaAddressCard,
} from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";
import AuthContext from "../../context/AuthContextApi";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [address, setAddress] = useState(user?.address || "No address provided");

  // Navigate to login page if user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    const logoutItem = document.querySelector(".icon-logout").parentElement;

    if (window.confirm("Are you sure you want to log out?")) {
      logoutItem.classList.add("logout-animation");
      setTimeout(() => {
        logout();
      }, 500); // Wait for the animation to complete before logging out
    }
  };

  const handleAddressChange = () => {
    const newAddress = prompt("Please enter your new address:", address);
    if (newAddress) {
      setAddress(newAddress);
    }
  };

  return (
    <div className="profile-container">
      {user && (
        <>
          <div className="profile-header">
            <FaRegUserCircle className="profile-avatar" aria-label="User Avatar" />
            <div>
              <h1>{user.name}</h1>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="profile-menu">
            <div className="menu-item">
              <FaClipboardList className="icon-orders" aria-label="My Orders" />
              <div>
                <span>My Orders</span>
                <p>View, track, cancel, return orders</p>
              </div>
            </div>

            <div className="menu-item">
              <FaLanguage className="icon-language" aria-label="Change Language" />
              <div>
                <span>Change Language</span>
                <p>English, Hindi & more</p>
              </div>
            </div>

            <div className="menu-item">
              <RiCustomerService2Fill className="icon-support" aria-label="Customer Care" />
              <div>
                <span>Customer Care</span>
                <p>Get in touch with us</p>
              </div>
            </div>

            <div className="menu-item">
              <FaCog className="icon-settings" aria-label="Account Settings" />
              <div>
                <span>Account Settings</span>
                <p>Payments & others</p>
              </div>
            </div>

            <div className="menu-item" onClick={handleAddressChange}>
              <FaAddressCard className="icon-address" aria-label="Address" />
              <div>
                <span>Address</span>
                <p>{address}</p>
              </div>
            </div>

            <div className="menu-item">
              <i className="icon-policies" aria-label="Legal Policies"></i>
              <div>
                <span>Legal Policies</span>
              </div>
            </div>

            <div className="menu-item" onClick={handleLogout}>
              <FaSignOutAlt className="icon-logout" aria-label="Logout" />
              <div>
                <span>Logout</span>
              </div>
            </div>
          </div>

          <div className="social-links">
            <span>Follow us on</span>
            <div className="social-icons">
              <FaFacebook className="social-icon" aria-label="Facebook" />
              <FaInstagram className="social-icon" aria-label="Instagram" />
              <FaTwitter className="social-icon" aria-label="Twitter" />
              <FaLinkedin className="social-icon" aria-label="LinkedIn" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
