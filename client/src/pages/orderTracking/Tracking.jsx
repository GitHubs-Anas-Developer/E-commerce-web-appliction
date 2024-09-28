import React, { useState } from "react";
import axios from "axios";
import "./Tracking.css";

function Tracking() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [error, setError] = useState("");

  const handleTrackOrder = async () => {
    const apiKey = "scivtznz-i45d-r536-l898-j81ivzoun56b"; // Replace with your TrackingMore API key

    try {
      const response = await axios.get(`/v2/trackings/${trackingNumber}`, {
        headers: {
          "Content-Type": "application/json",
          "Trackingmore-Api-Key": apiKey,
        },
      });
      setTrackingInfo(response.data.data); // Adjust the path according to your API response structure
      setError("");
    } catch (err) {
      setError("Unable to track the order. Please check the tracking number.");
      setTrackingInfo(null);
    }
  };

  return (
    <div className="tracking-container">
      <h1>Track Your Order</h1>
      <input
        type="text"
        placeholder="Enter Tracking Number"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
      />
      <button onClick={handleTrackOrder}>Track Order</button>

      {error && <p className="error">{error}</p>}

      {trackingInfo && (
        <div className="tracking-info">
          <h2>Tracking Details</h2>
          <p>Status: {trackingInfo.status}</p>
          <p>Carrier: {trackingInfo.carrier}</p>
          <p>Expected Delivery: {trackingInfo.expected_delivery}</p>
          <p>Signed By: {trackingInfo.signed_by || "N/A"}</p>
        </div>
      )}
    </div>
  );
}

export default Tracking;
