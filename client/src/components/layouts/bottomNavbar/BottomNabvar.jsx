import React, { useContext } from "react";
import { CiHome } from "react-icons/ci"; // Import home icon
import { BiCategory } from "react-icons/bi"; // Import category icon
import { CiShoppingCart, CiUser, CiHeart } from "react-icons/ci"; // Import shopping cart icon
import { Link } from "react-router-dom";
import "./BottomNavbar.css"; // Import CSS file for styling
import WishListContext from "../../../context/WishListContextApi";
import CartContextApi from "../../../context/CartContextApi";
import AuthContext from "../../../context/AuthContextApi";

function BottomNavbar() {
  const { WishListCount } = useContext(WishListContext);
  const { cartCount } = useContext(CartContextApi);
  const {user} = useContext(AuthContext)

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
        <Link to={"/wishlist"}>
          <CiHeart className="nav-icon" />
          <span className="wishlist-count">{WishListCount}</span>
        </Link>
        <span className="nav-label">Wishlist</span>
      </div>

      <div className="nav-item">
        <Link to={"/cart"}>
          <CiShoppingCart className="nav-icon" />
          <span className="cart-count">{cartCount}</span>

        </Link>
        <span className="nav-label">Cart</span>
      </div>
      <div className="nav-item">
        <Link to={"/profile"}>
          <CiUser className="nav-icon" />
        </Link>
        <span className="nav-label">{user ? user.name : "Profile"}</span>
      </div>
    </div>
  );
}

export default BottomNavbar;
