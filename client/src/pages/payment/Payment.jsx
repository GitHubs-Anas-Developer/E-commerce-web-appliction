import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBillWave,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import "./Payment.css";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, formData } = location.state || {};

  const [product, setProduct] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("cash"); // Default payment method
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/${id}`
      );
      setProduct(response.data.product);
    } catch (error) {
      setError("Error fetching product details. Please try again later.");
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    if (paymentMethod === "online") {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [paymentMethod]);

  const handleOnlinePayment = async () => {
    setLoading(true);
    setError(null);

    const totalAmount = product.offerPrice * 100;

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/createOrder`,
        {
          amount: totalAmount,
          currency: "INR",
          receipt: `receipt_${Date.now()}`,
          userId: formData.userId,
        }
      );

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_test_oJskryUkTtXvN0",
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Your Company Name",
        description: "Payment for product",
        order_id: data.order.id,
        handler: function (response) {
          if (response.razorpay_payment_id) {
            alert("Payment Success!");
            navigate("/order-success", {
              state: { paymentMethod: "online", product, response },
            });
          } else {
            setError("Payment could not be completed. Please try again.");
          }
        },
        prefill: {
          name: formData.name || "Test User",
          email: formData.email || "test@example.com",
          contact: formData.contact || "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      setError(
        error.response
          ? `Error: ${error.response.data.error || "Payment processing error."}`
          : `Error: ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = () => {
    if (paymentMethod === "cash") {
      alert("Cash on Delivery selected. Your order will be delivered soon.");
      navigate("/order-success", { state: { paymentMethod, product } });
    } else {
      handleOnlinePayment();
    }
  };

  return (
    <div className="payment-container">
      <h2>
        <FontAwesomeIcon icon={faCreditCard} /> Complete Your Payment
      </h2>
      <p>Please review your order and choose a payment method.</p>

      {error && <p className="error-message">{error}</p>}

      {product && (
        <div className="product-details">
          {product.images && product.images.length > 0 && (
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/images/${product.images[0]?.filename}`}
              alt={product.name}
            />
          )}
          <h3>Product: {product.title}</h3>
          <p>Price: ₹{product.offerPrice || product.price}</p>
        </div>
      )}

      <div className="payment-methods">
        <h3>Select Payment Method:</h3>
        <label>
          <input
            type="radio"
            value="cash"
            checked={paymentMethod === "cash"}
            onChange={() => setPaymentMethod("cash")}
          />
          <FontAwesomeIcon icon={faMoneyBillWave} /> Cash on Delivery
        </label>
        <label>
          <input
            type="radio"
            value="online"
            checked={paymentMethod === "online"}
            onChange={() => setPaymentMethod("online")}
          />
          <FontAwesomeIcon icon={faCreditCard} /> Online Payment
        </label>
      </div>

      <button
        onClick={handlePayment}
        className="payment-button"
        disabled={loading}
      >
        {loading ? "Processing..." : "Proceed with Payment"}
      </button>
    </div>
  );
}

export default Payment;
