import React, { useContext } from "react";
import ProductContext from "../../context/AllProducts";
import "./Products.css";

function Products() {
  const { productsAll, loading, addToWishlist } = useContext(ProductContext);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="product-list">
      {productsAll.length > 0 ? (
        productsAll.map((product) => (
          <div key={product._id} className="product-card">
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/images/${product.images[0].filename}`}
              alt={product.title}
              className="product-image"
            />
            <div className="product-details">
              <h6 className="product-title">{product.title}</h6>
              <p className="product-price">₹{product.price}</p>
              {product.offerPrice && (
                <p className="offer-price">₹{product.offerPrice}</p>
              )}
              {product.discountPercentage && (
                <p className="discount">{product.discountPercentage}% OFF</p>
              )}
              <button className="add-to-cart">Add to Cart</button>
              <button
                className="add-to-wishlist"
                onClick={() => addToWishlist(product)}
              >
                Add to Wishlist
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
}

export default Products;
