import React, { useContext, useState } from "react";
import OrderContext from "../../context/OrderContextApi";
import "./Orders.css";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Ensure this import is present
import axios from "axios";

function Orders() {
  const { products, handleViewProduct } = useContext(OrderContext);
  const [paymentRecipt, setPaymentRecipt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownloadReceipt = async (prodId) => {
    const product = products.find((product) => product._id === prodId);
    if (!product) return;

    setLoading(true);
    setError(null);
    setPaymentRecipt(null); // Reset receipt before fetching

    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/order/${prodId}`);
      setPaymentRecipt(response.data.data);
      generatePDF(response.data.data, product); // Pass the product reference
    } catch (error) {
      setError("Failed to fetch receipt. Please try again.");
      console.error("Error fetching receipt:", error);
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = (receipt, product) => { // Accept product as parameter
    const doc = new jsPDF();
    const headers = ["Field", "Value"];
    const data = [
      ["Product Name", product.title],
      ["Order ID", receipt._id],
      ["Amount", `${receipt.amount}`],
      ["Currency", receipt.currency],
      ["Receipt ID", receipt.receipt],
      ["Status", receipt.status],
      ["Razorpay Order ID", receipt.razorpayOrderId],
      ["User ID", receipt.userId],
      ["Product ID", receipt.prodId],
      ["Created At", new Date(receipt.createdAt).toLocaleString()],
      ["Updated At", new Date(receipt.updatedAt).toLocaleString()],
    ];

    doc.setFontSize(18);
    doc.text("Order Receipt", 14, 10);
    doc.setFontSize(12);
    const startY = 30;

    doc.autoTable({
      head: [headers],
      body: data,
      startY: startY,
      theme: 'grid',
      styles: { 
        cellPadding: 5, 
        fontSize: 12,
      },
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: [255, 255, 255],
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
    });

    doc.save(`receipt_${receipt._id}.pdf`);
  };

  return (
    <div className="order-container">
      <h1>Ordered Products</h1>
      {error && <p className="error-message">{error}</p>} {/* Error message */}
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        products.map((product) => (
          <div key={product._id} className="order-card">
            <h3 className="order-title">{product.title}</h3>
            <div className="order-content">
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/images/${product.images[0]?.filename}`}
                alt={product.title}
                className="order-image"
              />
              <div className="order-actions">
                <button
                  onClick={() => handleDownloadReceipt(product._id)}
                  className="btn-download"
                  disabled={loading} // Disable button during loading
                >
                  {loading ? "Generating..." : "Download Receipt"}
                </button>
                <Link to={"/orderTracking"}>
                  <button className="btn-track">Track Order</button>
                </Link>

                <Link to={"/viewReceipt"}>
                  <button
                    onClick={() => handleViewProduct(product._id)}
                    className="btn-view"
                  >
                    View
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
