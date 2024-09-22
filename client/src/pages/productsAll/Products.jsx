import React, { useContext } from "react";
import ProductContext from "../../context/AllProducts";
import "./Products.css";

function Products() {
  const { productsAll, loading } = useContext(ProductContext);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="product-list">
      {productsAll.length > 0 ? (
        productsAll.map((product) => (
          <div key={product._id} className="product-card">
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/images/${product.images[0].filename}`} // Update for production
              alt={product.title}
              onError={(e) => { e.target.onerror = null; e.target.src = 'path/to/placeholder-image.jpg'; }}
            />
            <h3>{product.title}</h3>
            <p>Price: {product.price}</p>
            {product.offerPrice && (
              <p className="offer-price">Offer: {product.offerPrice}</p>
            )}
            <p className="discount">Discount: {product.discountPercentage}%</p>
            <p className="description">{product.description}</p>
          </div>
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
}

export default Products;
