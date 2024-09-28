import React, { useContext } from "react";
import ProductContext from "../../context/AllProducts";
import "./Products.css"; // Custom styles
import { CiShoppingCart, CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContextApi";
import CartContextApi from "../../context/CartContextApi";
import WishListContext from "../../context/WishListContextApi";

function Products() {
  const { productsAll, loading } = useContext(ProductContext);
  const { handleToCart } = useContext(CartContextApi);
  const { handleToWishList } = useContext(WishListContext);

  const { user } = useContext(AuthContext);

  const userId = user ? user._id : null;

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
                  alt={""}
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
                  <CiHeart
                    className="icon heart-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleToWishList(
                        userId,
                        product._id,
                        product.title,
                        product.images[0]
                      );
                    }}
                  />

                  <CiShoppingCart
                    className="icon cart-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleToCart(
                        userId,
                        product._id,
                        product.offerPrice,
                        product.title,
                        product.images[0]
                      );
                    }}
                  />
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
