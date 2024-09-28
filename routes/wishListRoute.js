const express = require("express");

const router = express.Router(); // Use Router() for routing
const requireSignIn = require("../middleware/authMiddleware");
const { createWishListController, getWishList, wishListRemove } = require("../controllers/wishListController");

// Correct the route name to match the one in your frontend
router.post("/newWishlist", requireSignIn, createWishListController);
router.get("/newWishlist/:id",requireSignIn,  getWishList);
router.delete("/newWishlist/remove/:id",wishListRemove );


module.exports = router;
