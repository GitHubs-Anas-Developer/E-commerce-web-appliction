import "./Navbar.css";
import {
  CiHeart,
  CiShoppingCart,
  CiSearch,
  CiUser,
} from "react-icons/ci";
import { BsBox } from "react-icons/bs";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContextApi";

function Navbar() {
  const { user, logout, login } = useContext(AuthContext);

  return (
    <nav className="navbar custom-navbar">
      <div className="container-fluid">
        {/* Brand Logo */}
        <a className="navbar-brand" href="#">
          <h6 className="brand-logo">LOGOS</h6>
        </a>

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
          <a className="nav-links" href="#">
            <CiHeart className="navigation-icon" />
          </a>
          {/* Orders */}
          <a className="nav-links" href="#">
            <BsBox className="navigation-icon" />
          </a>
          {/* Cart */}
          <a className="nav-links cart-icon" href="#">
            <CiShoppingCart className="navigation-icon" />
            <span className="cart-count">0</span>
          </a>

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
                    <a className="dropdown-item" href="#">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={logout}>
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <li>
                  <a className="dropdown-item" href="#" onClick={login}>
                    Login
                  </a>
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
