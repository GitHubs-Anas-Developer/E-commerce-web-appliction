const express = require("express");
const {
  createDeliveryAddress,
  getDelivaryAddress,
} = require("../controllers/delivaryAddressController");

const requireSignIn = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/createDelivaryAddress", requireSignIn, createDeliveryAddress);
router.get("/delivaryAddress/:id",requireSignIn, getDelivaryAddress);

module.exports = router;
