import React, { useContext } from 'react';
import OrderContext from '../../context/OrderContextApi';
import "./Receipt.css";

function Receipt() {
  const { order } = useContext(OrderContext);

  // Log the order data for debugging purposes
  console.log("Receipt Order:", order);

  // Format the amount in INR currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="receipt-wrapper">
      {order ? (
        <div className="receipt-box">
          <h2 className="receipt-header">Order Receipt</h2>
          <div className="receipt-detail">
            <strong>Order ID:</strong> <span>{order._id}</span>
          </div>
          <div className="receipt-detail">
            <strong>Amount:</strong> <span>{formatCurrency(order.amount)}</span>
          </div>
          <div className="receipt-detail">
            <strong>Receipt:</strong> <span>{order.receipt}</span>
          </div>
          <div className="receipt-detail">
            <strong>Status:</strong> <span>{order.status}</span>
          </div>
          <div className="receipt-detail">
            <strong>Razorpay Order ID:</strong> <span>{order.razorpayOrderId}</span>
          </div>
          <div className="receipt-detail">
            <strong>User ID:</strong> <span>{order.userId}</span>
          </div>
          <div className="receipt-detail">
            <strong>Product ID:</strong> <span>{order.prodId}</span>
          </div>
          <div className="receipt-detail">
            <strong>Created At:</strong> <span>{new Date(order.createdAt).toLocaleString()}</span>
          </div>
          <div className="receipt-detail">
            <strong>Updated At:</strong> <span>{new Date(order.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      ) : (
        <p className="receipt-no-order">No order details available. Please select an order.</p>
      )}
    </div>
  );
}

export default Receipt;
