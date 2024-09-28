import React, { useContext } from "react";
import WishListContext from "../../context/WishListContextApi";
import './WishList.css'; // Import the CSS file

function WishList() {
  const { wishList, handleRemoveFromWishList } = useContext(WishListContext);

  return (
    <div className="wishlist-container">
      <h1>My Wishlist</h1>
      {wishList.length > 0 ? (
        <ul className="wishlist-items">
          {wishList.map(item => (
            <li key={item._id} className="wishlist-item">
              <img src={`${process.env.REACT_APP_BACKEND_URL}/images/${item.image.filename}`} alt={item.name} className="wishlist-image" />
              <div className="item-details">
                <h2 className="item-name">{item.name}</h2>
                <button className="remove-button" onClick={() => handleRemoveFromWishList(item._id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-message">Your wishlist is empty!</p>
      )}
    </div>
  );
}

export default WishList;
