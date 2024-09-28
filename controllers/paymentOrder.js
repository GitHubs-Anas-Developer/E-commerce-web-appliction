const Razorpay = require("razorpay");
const PaymentOrder = require("../models/paymentModels");

require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
  try {
    const { amount, currency, receipt, userId, prodId } = req.body;

    // Validate request data
    if (!amount || !userId || !receipt) {
      return res.status(400).json({
        success: false,
        message: "Amount, User ID, and Receipt are required.",
      });
    }

    const options = {
      amount: amount, // Convert to paise
      currency: currency || "INR",
      receipt,
    };

    const razorpayOrder = await razorpay.orders.create(options);
    console.log("Razorpay Order Created:", razorpayOrder);

    const paymentOrder = new PaymentOrder({
      userId,
      prodId,
      razorpayOrderId: razorpayOrder.id,
      amount,
      currency: razorpayOrder.currency,
      receipt: razorpayOrder.receipt,
      status: "created",
    });

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

const getOrder = async (req, res) => {
  try {
    const { id } = req.params; // Extracting the user ID from the request body

    console.log(id);

    // Fetch orders associated with the user ID
    const orders = await PaymentOrder.find({ userId: id });

    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this user.",
      });
    }

    // Sending the retrieved orders as a response
    res.status(200).json({
      success: true,
      orders, // The orders found for the user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message, // Send the error message
    });
  }
};

const getOneOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Order ID is required',
      });
    }

    const order = await PaymentOrder.findOne({ prodId: id });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};


module.exports = { createOrder, getOrder, getOneOrder };
