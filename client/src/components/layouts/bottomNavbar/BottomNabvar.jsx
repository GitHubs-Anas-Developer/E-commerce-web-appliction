import React from "react";
import { CiHome } from "react-icons/ci"; // Import home icon
import { BiCategory } from "react-icons/bi"; // Import category icon
import { CiShoppingCart, CiUser, CiHeart } from "react-icons/ci"; // Import shopping cart icon
import { Link } from "react-router-dom";
import "./BottomNavbar.css"; // Import CSS file for styling

function BottomNavbar() {
  return (
    <div className="bottom-navbar">
      <div className="nav-item">
        <Link to={"/"}>
          <CiHome className="nav-icon" />
        </Link>

        <span className="nav-label">Home</span>
      </div>

      <div className="nav-item">
        <Link to={"/category"}>
          <BiCategory className="nav-icon" />
        </Link>
        <span className="nav-label">Category</span>
      </div>

      <div className="nav-item">
        <CiShoppingCart className="nav-icon" />
        <span className="nav-label">Cart</span>
      </div>
      <div className="nav-item">
        <Link to={"/profile"}>
          <CiUser className="nav-icon" />
        </Link>
        <span className="nav-label">Profile</span>
      </div>
    </div>
  );
}

export default BottomNavbar;
