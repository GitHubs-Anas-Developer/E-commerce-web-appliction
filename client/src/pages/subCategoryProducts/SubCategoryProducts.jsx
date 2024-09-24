import React, { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductContext from "../../context/AllProducts";
import "./SubCategoryProducts.css";

function SubCategoryProducts() {
  const { id } = useParams();
  const {
    subcategoryProducstId,
    subProducts,
    loadingSubProducts,
    errorSubProducts,
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
    return <div className="error">Error: {errorSubProducts}</div>;
  }

  return (
    <div>
      {subProducts.length > 0 ? (
        <div className="sub-products-product-list">
          {subProducts.map((product) => (
            <Link key={product._id} className="Link" to={`/productDetails/${product._id}`}>
              <div className="sub-productsproduct-card">
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/images/${product.images[0]?.filename}`}
                  alt={product.title}
                  className="sub-products-product-image"
                />
                <h3 className="sub-products-product-name">{product.title}</h3>
                <p className="sub-products-product-price">
                  Price: <span className="price">${product.price}</span>
                </p>
                {product.offerPrice && (
                  <p className="sub-products-product-offer-price">
                    Offer Price: <span className="sub-products-offer-price">${product.offerPrice}</span>
                  </p>
                )}
                {product.discountPercentage && (
                  <p className="sub-products-product-discount">
                    Discount: <span className="sub-products-discount-percentage">{product.discountPercentage}%</span>
                  </p>
                )}
                <button className="sub-products-add-to-cart-button">Add to Cart</button>
                <button className="sub-products-add-to-wishlist-button">Add to Wishlist</button>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No products available in this subcategory.</p>
      )}
    </div>
  );
}

export default SubCategoryProducts;
