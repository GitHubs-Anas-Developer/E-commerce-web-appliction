import React, { useContext } from 'react';
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import ProductContext from '../../context/AllProducts';
import "./SearchProduct.css"

function ProductSearch() { // Changed class name to ProductSearch
  const location = useLocation();
  const { searchQuery } = location.state || { searchQuery: "" };
  const { productsAll } = useContext(ProductContext);

  // Filter products based on the search query
  const filteredProducts = productsAll.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="search-results-container">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => {
          const imageUrl = `${process.env.REACT_APP_BACKEND_URL}/images/${product.images[0].filename}`;
          const formattedPrice = product.price.toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });

          return (
            <Link
              className="search-product-link"
              to={`/productDetails/${product._id}`}
              key={product._id}
            >
              <div className="search-product-card">
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="search-product-image"
                />
                <div className="search-product-info">
                  <h4 className="search-product-title">{product.title}</h4>
                  <p className="search-product-price">₹{formattedPrice}</p>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <p className="no-products-found">No products found for "{searchQuery}"</p>
      )}
    </div>
  );
}

export default ProductSearch; // Update export to match new class name
