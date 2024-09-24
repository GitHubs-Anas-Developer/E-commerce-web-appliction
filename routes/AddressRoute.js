const express = require("express");
const {
  createDeliveryAddress,
  getDelivaryAddress,
} = require("../controllers/delivaryAddressController");

const router = express.Router();
const requireSignIn = require("../middleware/authMiddleware");

router.post("/createDelivaryAddress", createDeliveryAddress);
router.get("/delivaryAddress/:id", getDelivaryAddress);

module.exports = router;
