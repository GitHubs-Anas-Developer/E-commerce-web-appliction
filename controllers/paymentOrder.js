const Razorpay = require("razorpay");
const PaymentOrder = require("../models/paymentModels");
require("dotenv").config();



const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


const createOrder = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { amount, currency, receipt, userId } = req.body;

    // Validate request data
    if (!amount || !userId || !receipt) {
      return res.status(400).json({
        success: false,
        message: "Amount, User ID, and Receipt are required.",
      });
    }


    const options = {
      amount: amount , // Convert to paise
      currency: currency || "INR",
      receipt,
    };

    const razorpayOrder = await razorpay.orders.create(options);
    console.log("Razorpay Order Created:", razorpayOrder);

    const paymentOrder = new PaymentOrder({
      userId,
      razorpayOrderId: razorpayOrder.id,
      amount,
      currency: razorpayOrder.currency,
      receipt: razorpayOrder.receipt,
      status: "created",
    });
    console.log("paymentOrder",paymentOrder);
    

    const savedOrder = await paymentOrder.save();
    res.status(201).json({
      success: true,
      message: "Order created successfully.",
      order: savedOrder,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order.",
      error: error.message,
    });
  }
};


module.exports = { createOrder };
