import React, { useContext, useEffect, useState } from "react";
import "./ProductDetails.css"; // Import the CSS file for styling
import { useParams } from "react-router-dom";
import ProductContext from "../../context/AllProducts"; // Import your context

function ProductDetails() {
  const { id } = useParams(); // Get the product ID from the URL
  const { productId, product } = useContext(ProductContext); // Destructure context values
  console.log(product); // Debugging line to check the product data

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
      <h1 className="page-head">Product Details</h1>
      <div className="product-details-container">
        {/* Product Images Section */}
        <div className="product-images">
          <div className="main-image">
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/images/${product.images[selectedImage]}`}
              alt="Selected product"
            />
          </div>
          <div className="image-gallery">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={`${process.env.REACT_APP_BACKEND_URL}/images/${img}`}
                alt={`product-img-${index}`}
                className={`thumbnail ${index === selectedImage ? "active" : ""}`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="product-info">
          <h2>{product.title}</h2>
          <div className="rating-reviews">
            <span className="rating">{product.rating} ★</span>
            <span>{product.reviews} Ratings</span>
          </div>
          <div className="price">
            <span className="current-price">₹{product.price}</span>
            <span className="original-price">₹{product.offerPrice}</span>
            <span className="discount">{product.discountPercentage}% off</span>
          </div>
          <div className="about">
            <h3>About this Product:</h3>
            <p>{product.about}</p>
            
            <p>{product.description}</p>
          </div>
          <div className="features">
            <h3>Key Features:</h3>
            <ul>
              {product.features &&
                product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
            </ul>
          </div>
          <div className="actions">
            <button className="btn add-to-cart">Add to Cart</button>
            <button className="btn buy-now">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
