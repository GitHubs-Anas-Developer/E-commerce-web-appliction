const express = require("express");
const {
  createCart,
  getCart,
  updateCartQuantity,
  removeItemFromCart,
} = require("../controllers/cartController");

const router = express.Router();

const requireSignIn = require("../middleware/authMiddleware");

router.post("/newCart", requireSignIn, createCart);

router.get("/carts/:id", requireSignIn, getCart);

router.put("/cart/update/:id", requireSignIn, updateCartQuantity); // Route for updating quantity

router.delete("/cart/remove/:id", requireSignIn, removeItemFromCart);

module.exports = router;
