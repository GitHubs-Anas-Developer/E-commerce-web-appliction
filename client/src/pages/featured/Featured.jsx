import React, { useContext } from "react";
import "./Featured.css"; // Custom styles
import FeatureContext from "../../context/FeatureContextApi";
import { CiShoppingCart, CiHeart } from "react-icons/ci";

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
            feature.map((item) => (
              <div key={item._id} className="featured-item">
                <img
                  src={`http://localhost:8050/images/${item.images[0]?.filename}`}
                  alt={item.title}
                  className="featured-image"
                />
                <h6 className="item-title">{item.title}</h6>
                {item.offerPrice && (
                  <p className="price">{formatPrice(item.price)}</p>
                )}
                {item.discountPercentage && (
                  <p className="discount">
                    {formatDiscount(item.discountPercentage)} OFF
                  </p>
                )}
                <p className="offer-price">
                  {formatOfferPrice(item.offerPrice)}
                </p>

                <div className="featured-item-icons">
                  <CiHeart className="icon heart-icon" />
                  <CiShoppingCart className="icon cart-icon" />
                </div>
              </div>
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
