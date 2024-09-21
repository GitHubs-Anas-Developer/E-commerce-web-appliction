import React, { useState } from "react";
import "./AdminSidebar.css"; // Ensure this file contains your desired styles
import {
  FaHome,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : "expanded"}`}>
      <div className="sidebar-header">
        <h2 className={`sidebar-logo ${isCollapsed ? "collapsed" : "expanded"}`}>
          Admin Panel
        </h2>
        <button className="toggle-btn" onClick={handleToggle}>
          {isCollapsed ? "▶" : "◀"}
        </button>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/" className="nav-item">
              <FaHome />
              <span className={`nav-label ${isCollapsed ? "collapsed" : "expanded"}`}>
                Dashboard
              </span>
            </Link>
          </li>
          <li>
            <Link to="/category" className="nav-item">
              <FaBox />
              <span className={`nav-label ${isCollapsed ? "collapsed" : "expanded"}`}>
                Create Category
              </span>
            </Link>
          </li>
          <li>
            <Link to="/Subcategory" className="nav-item">
              <FaBox />
              <span className={`nav-label ${isCollapsed ? "collapsed" : "expanded"}`}>
                Create SubCategory
              </span>
            </Link>
          </li>
          <li>
            <Link to="/products" className="nav-item">
              <FaBox />
              <span className={`nav-label ${isCollapsed ? "collapsed" : "expanded"}`}>
                Products
              </span>
            </Link>
          </li>
          <li>
            <Link to="/feature" className="nav-item">
              <FaBox />
              <span className={`nav-label ${isCollapsed ? "collapsed" : "expanded"}`}>
              Featured
              </span>
            </Link>
          </li>
          <li>
            <Link to="/orders" className="nav-item">
              <FaShoppingCart />
              <span className={`nav-label ${isCollapsed ? "collapsed" : "expanded"}`}>
                Orders
              </span>
            </Link>
          </li>
          <li>
            <Link to="/customers" className="nav-item">
              <FaUsers />
              <span className={`nav-label ${isCollapsed ? "collapsed" : "expanded"}`}>
                Customers
              </span>
            </Link>
          </li>
          <li>
            <Link to="/settings" className="nav-item">
              <FaCog />
              <span className={`nav-label ${isCollapsed ? "collapsed" : "expanded"}`}>
                Settings
              </span>
            </Link>
          </li>
          <li>
            <Link to="/logout" className="nav-item">
              <FaSignOutAlt />
              <span className={`nav-label ${isCollapsed ? "collapsed" : "expanded"}`}>
                Logout
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AdminSidebar;
