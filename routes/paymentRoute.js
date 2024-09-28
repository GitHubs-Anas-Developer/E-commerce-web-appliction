const express = require("express");

const router = express.Router();

const requireSignIn = require("../middleware/authMiddleware");
const { createOrder, getOrder, getOneOrder } = require("../controllers/paymentOrder");

router.post("/createOrder", createOrder);
router.get("/orders/:id", getOrder);
router.get("/order/:id", getOneOrder);



module.exports = router;
