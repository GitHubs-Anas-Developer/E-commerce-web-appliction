const express = require("express");
const {
  createDeliveryAddress,
  getDelivaryAddress,
} = require("../controllers/delivaryAddressController");

const router = express.Router();
const requireSignIn = require("../middleware/authMiddleware");

router.post("/createDelivaryAddress", requireSignIn, createDeliveryAddress);
router.get("/delivaryAddress/:id", requireSignIn, getDelivaryAddress);

module.exports = router;
