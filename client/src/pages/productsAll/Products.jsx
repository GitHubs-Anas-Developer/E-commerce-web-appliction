import React, { useContext } from "react";
import ProductContext from "../../context/AllProducts";
import "./Products.css"; // Custom styles
import { CiShoppingCart, CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";

function Products() {
  const { productsAll, loading } = useContext(ProductContext);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

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

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="product-container">
      <h2>Products</h2>
      <div className="product-grid">
        {productsAll.length > 0 ? (
          productsAll.map((product) => (
            <Link className="Link" to={`/productDetails/${product._id}`}>
              <div key={product._id} className="product-item">
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/images/${product.images[0]?.filename}`}
                  alt={product.title}
                  className="product-image"
                />
                <h6 className="item-title">{product.title}</h6>
                {product.offerPrice && (
                  <p className="price">{formatPrice(product.price)}</p>
                )}
                <p className="offer-price">
                  {formatOfferPrice(product.offerPrice)}
                </p>
                
                {product.discountPercentage && (
                  <p className="discount">
                    {formatDiscount(product.discountPercentage)} OFF
                  </p>
                )}

                <div className="product-item-icons">
                  <CiHeart className="icon heart-icon" />
                  <CiShoppingCart className="icon cart-icon" />
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
}

export default Products;
