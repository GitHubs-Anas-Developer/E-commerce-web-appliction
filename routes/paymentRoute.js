const express = require("express");

const router = express.Router();

const requireSignIn = require("../middleware/authMiddleware");
const { createOrder } = require("../controllers/paymentOrder");

router.post("/createOrder", createOrder);

module.exports = router;
