import React, { useContext, useEffect, useState } from "react";
import "./ProductDetails.css"; // Import the CSS file for styling
import { useParams } from "react-router-dom";
import ProductContext from "../../context/AllProducts"; // Import your context
import { Link } from "react-router-dom";
function ProductDetails() {
  const { id } = useParams(); // Get the product ID from the URL
  const { productId, product } = useContext(ProductContext); // Destructure context values

  useEffect(() => {
    // Call the productId function and pass the ID as an argument
    productId(id);
  }, [id, productId]); // Run the effect when 'id' changes

  const [selectedImage, setSelectedImage] = useState(0);

  // Check if product is loaded
  if (!product || !product.images) {
    return <div>Loading...</div>; // Render a loading state while the product is being fetched
  }

  return (
    <div className="product-details">
      <h1 className="product-details-title">Product Details</h1>
      <div className="product-details-wrapper">
        {/* Product Images Section */}
        <div className="product-details-images">
          <div className="product-image-display">
            <img
              src={`http://localhost:8050/images/${product.images[selectedImage].filename}`} // Use the selected image filename
              alt="Selected product"
            />
          </div>
          <div className="product-image-gallery">
            {product.images.map((img, index) => (
              <img
                key={img._id}
                src={`http://localhost:8050/images/${img.filename}`} // Use the filename
                alt={`product-img-${index}`}
                className={`product-thumbnail ${
                  index === selectedImage ? "active" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="product-details-info">
          <h2 className="product-details-title">{product.title}</h2>
          <div className="product-details--reviews">
            <span className="product-details-rating">{product.rating} ★</span>
            <span className="product-details-reviews">
              {product.reviews} Ratings
            </span>
          </div>
          <div className="product-details-price-info">
            <span className="product-details-original-price">
              ₹{product.price}
            </span>
            
            <span className="product-details-current-price">
              ₹{product.offerPrice}
            </span>
            <span className="product-details-discount-info">
              {product.discountPercentage}% off
            </span>
          </div>
          <div className="product-details-actions">
            <button className="btn product-details-add-to-cart">
              Add to Cart
            </button>
            <Link className="Link" to={`/delivaryAddress/${product._id}`}>
              <button className="btn product-details-buy-now">Buy Now</button>
            </Link>
          </div>
          <div className="product-details-description">
            <h3>About this Product:</h3>
            <p className="product-details-about">{product.about}</p>
            <p className="product-details-description">{product.description}</p>
          </div>
          <div className="product-details-list">
            <h3>Key Features:</h3>
            <ul className="product-features">
              {product.features &&
                product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
