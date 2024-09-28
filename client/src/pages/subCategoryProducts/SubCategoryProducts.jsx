import React, { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductContext from "../../context/AllProducts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./SubCategoryProducts.css";
import CartContextApi from "../../context/CartContextApi";
import AuthContext from "../../context/AuthContextApi";

function SubCategoryProducts() {
  const { id } = useParams();
  const {
    subcategoryProducstId,
    subProducts,
    loadingSubProducts,
    errorSubProducts,
  } = useContext(ProductContext);

  const { handleToCart } = useContext(CartContextApi);
  const { user } = useContext(AuthContext);
  const userId = user ? user._id : null;

  useEffect(() => {
    subcategoryProducstId(id);
  }, [id, subcategoryProducstId]);

  // Handle loading state
  if (loadingSubProducts) {
    return <div className="loading">Loading products...</div>;
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatOfferPrice = (offerPrice) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(offerPrice);
  };

  return (
    <div className="subcategory-products-container">
      <h2 className="subcategory-title">Products in this Subcategory</h2>
      {subProducts.length > 0 ? (
        <div className="sub-products-product-list">
          {subProducts.map(({ _id, title, discountPercentage, images, price, offerPrice }) => (
            <div key={_id} className="sub-productsproduct-card">
              <Link className="Links" to={`/productDetails/${_id}`}>
                <p className="sub-products-product-discount">
                  Discount:{" "}
                  <span className="sub-products-discount-percentage">
                    {discountPercentage}%
                  </span>
                </p>
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/images/${images[0]?.filename}`}
                  alt={`Image of ${title}`}
                  className="sub-products-product-image"
                />
                <div className="product-actions-container">
                  <button
                    className="cart-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleToCart(
                        userId,
                        _id,
                        offerPrice,
                        title,
                        images[0]
                      );
                    }}
                    aria-label={`Add ${title} to Cart`}
                  >
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </button>
                  <button
                    className="wishlist-button"
                    aria-label={`Add ${title} to Wishlist`}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                </div>
                <div className="sub-products-product-details">
                  <h3 className="sub-products-product-name">{title}</h3>
                  <p className="sub-products-product-price">
                    <span className="price">{formatPrice(price)}</span>
                  </p>
                  <p className="sub-products-product-offer-price">
                    <span className="sub-products-offer-price">
                      {formatOfferPrice(offerPrice)}
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
