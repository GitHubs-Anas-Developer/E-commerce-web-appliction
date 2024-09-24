import "./Navbar.css";
import {
  CiHeart,
  CiShoppingCart,
  CiSearch,
  CiUser,
} from "react-icons/ci";
import { BiCategory } from "react-icons/bi";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContextApi";
import { Link } from "react-router-dom";

function Navbar() {
  const { user, logout, login } = useContext(AuthContext);

  return (
    <nav className="navbar custom-navbar">
      <div className="container-fluid">
        {/* Brand Logo */}
        <Link className="navbar-brand" to="/">
          <h6 className="brand-logo">LOGOS</h6>
        </Link>

        {/* Search Bar */}
        <div className="search-container">
          <input
            className="search-input"
            type="search"
            placeholder="Search for products, brands, and more"
            aria-label="Search"
          />
          <button className="search-btn" type="submit">
            <CiSearch />
          </button>
        </div>

        {/* Right Side Icons */}
        <div className="navbar-icons">
          {/* Wishlist */}
          <Link className="nav-links" to="/wishlist">
            <CiHeart className="navigation-icon" />
          </Link>

          {/* Categories */}
          <Link className="nav-links" to="/category">
            <BiCategory className="navigation-icon" />
          </Link>

          {/* Cart */}
          <Link className="nav-links cart-icon" to="/cart">
            <CiShoppingCart className="navigation-icon" />
            <span className="cart-count">0</span>
          </Link>

          {/* User Dropdown */}
          <div className="dropdown ms-2">
            <button
              className="btn account-btn"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <CiUser className="user-icon" />
              <span>{user ? user.name : "Login"}</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {user ? (
                <>
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={logout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <button className="dropdown-item" onClick={login}>
                    Login
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
