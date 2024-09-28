import React, { useContext } from "react";
import "./Featured.css"; // Custom styles
import FeatureContext from "../../context/FeatureContextApi";
import { CiShoppingCart, CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";

function Featured() {
  const { feature } = useContext(FeatureContext);

  // Function to format price as currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Function to format discount percentage
  const formatDiscount = (discount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "percent",
      minimumFractionDigits: 0,
    }).format(discount / 100); // Assuming discount is a percentage value
  };
  const formatOfferPrice = (offerPrice) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(offerPrice);
  };

  return (
    <div className="featured-container">
      <h2>Featured</h2>
      <div className="featured-grid-wrapper">
        <div className="featured-grid">
          {feature.length > 0 ? (
            feature.map((product) => (
              <Link className="Link" to={`/productDetails/${product._id}`}>
                <div key={product._id} className="featured-item">
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL}/images/${product.images[0]?.filename}`}
                    alt={""}
                    className="featured-image"
                  />
                  <h6 className="item-title">{product.title}</h6>
                  {product.offerPrice && (
                    <p className="price">{formatPrice(product.price)}</p>
                  )}
                  {product.discountPercentage && (
                    <p className="discount">
                      {formatDiscount(product.discountPercentage)} OFF
                    </p>
                  )}
                  <p className="offer-price">
                    {formatOfferPrice(product.offerPrice)}
                  </p>

                  <div className="featured-item-icons">
                    <CiHeart className="icon heart-icon" />
                    <CiShoppingCart className="icon cart-icon" />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No featured items available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Featured;
