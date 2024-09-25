import React, { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductContext from "../../context/AllProducts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./SubCategoryProducts.css";

function SubCategoryProducts() {
  const { id } = useParams();
  const {
    subcategoryProducstId,
    subProducts,
    loadingSubProducts,
    errorSubProducts,
    addToCart,
    addToWishlist,
  } = useContext(ProductContext);

  useEffect(() => {
    subcategoryProducstId(id);
  }, [id, subcategoryProducstId]);

  // Handle loading state
  if (loadingSubProducts) {
    return <div className="loading">Loading subcategory products...</div>;
  }

  // Handle error state
  if (errorSubProducts) {
    return (
      <div className="error">
        Error: {errorSubProducts}
        <button onClick={() => subcategoryProducstId(id)}>Retry</button>
      </div>
    );
  }

  return (
    <div className="subcategory-products-container">
      <h2 className="subcategory-title">Products in this Subcategory</h2>
      {subProducts.length > 0 ? (
        <div className="sub-products-product-list">
          {subProducts.map((product) => (
            <div key={product._id} className="sub-productsproduct-card">
              <Link className="Links" to={`/productDetails/${product._id}`}>
              <p className="sub-products-product-discount">
                    Discount:{" "}
                    <span className="sub-products-discount-percentage">
                      {product.discountPercentage}%
                    </span>
                  </p>
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/images/${product.images[0]?.filename}`}
                  alt={""}
                  className="sub-products-product-image"
                />
                <div className="product-actions-container">
                  <button
                    className="cart-button"
                    onClick={() => addToCart(product)}
                    aria-label={`Add ${product.title} to Cart`}
                  >
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </button>
                  <button
                    className="wishlist-button"
                    onClick={() => addToWishlist(product)}
                    aria-label={`Add ${product.title} to Wishlist`}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                </div>
                <div className="sub-products-product-details">
                  <h3 className="sub-products-product-name">{product.title}</h3>
                  <p className="sub-products-product-price">
                    <span className="price">₹{product.price}</span>
                  </p>

                  <p className="sub-products-product-offer-price">
                    <span className="sub-products-offer-price">
                      ₹{product.offerPrice}
                    </span>
                  </p>

                 
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available in this subcategory.</p>
      )}
    </div>
  );
}

export default SubCategoryProducts;
