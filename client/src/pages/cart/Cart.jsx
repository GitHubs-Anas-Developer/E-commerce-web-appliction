import React, { useContext } from "react";
import CartContextApi from "../../context/CartContextApi";
import "./Cart.css"; // Include a CSS file for styling

function Cart() {
  const { carts, handleRemove, updateItemQuantity } = useContext(CartContextApi);
  
;

  const handleIncrease = (productId) => {
    updateItemQuantity(productId, 1); // Increment quantity by 1
  };

  const handleDecrease = (productId) => {
    updateItemQuantity(productId, -1); // Decrement quantity by 1
  };

  return (
    <div className="super-cart">
      <h2>Your Cart</h2>
      {carts.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {carts.map((item, index) => (
              <div key={index} className="cart-item">
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/images/${item.image.filename}`} // Use the filename here
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="item-price">Price: <span>${item.price}</span></p>
                  <div className="quantity-control">
                    <button className="quantity-button" onClick={() => handleDecrease(item.productId)} disabled={item.quantity <= 1}>-</button>
                    <span className="item-quantity">{item.quantity}</span>
                    <button className="quantity-button" onClick={() => handleIncrease(item.productId)}>+</button>
                  </div>
                  <button className="remove-button" onClick={() => handleRemove(item.productId)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Cart Summary</h3>
            <p>Total Items: {carts.length}</p>
            <p>Total Price: ${carts.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
