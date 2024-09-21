const express = require("express");
const {
  registerController,
  loginController,
  userDetails
} = require("../controllers/authController");

const requireSignIn = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/user/:id", userDetails);

module.exports = router;
