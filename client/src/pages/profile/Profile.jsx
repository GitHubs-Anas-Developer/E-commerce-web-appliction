import React, { useContext, useEffect } from "react";
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
import { useNavigate, Link } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  // Navigate to login page if user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
    }
  };

  return (
    <div className="profile-container">
      {user && (
        <>
          <div className="profile-header">
            <FaRegUserCircle className="profile-avatar" aria-label="User Avatar" />
            <div className="profile-info">
              <h1>{user.name}</h1>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="profile-menu">
            <MenuItem icon={<FaClipboardList />} title="My Orders" description="View, track, cancel, return orders" link="/orders" />
            <MenuItem icon={<FaLanguage />} title="Change Language" description="English, Hindi & more" />
            <MenuItem icon={<RiCustomerService2Fill />} title="Customer Care" description="Get in touch with us" />
            <MenuItem icon={<FaCog />} title="Account Settings" description="Payments & others" />
            <MenuItem icon={<FaAddressCard />} title="Address" link="/userAddress" />
            <MenuItem icon={<div className="icon-policies"></div>} title="Legal Policies" />
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

// Menu item component to reduce redundancy
const MenuItem = ({ icon, title, description, link }) => (
  <div className="menu-item">
    {link ? (
      <Link to={link} className="menu-link">
        {icon}
        <div>
          <span>{title}</span>
          {description && <p>{description}</p>}
        </div>
      </Link>
    ) : (
      <>
        {icon}
        <div>
          <span>{title}</span>
          {description && <p>{description}</p>}
        </div>
      </>
    )}
  </div>
);

export default Profile;
