const express = require("express");
const upload = require("../helper/multer");
const {
  createFeature,
  getFeatureAll,
  getOneFeature,
} = require("../controllers/featureController");

const router = express.Router();

// Route to create a feature with image upload
router.post("/createFeature",upload.array("images", 20), createFeature);

// Route to get all feature products
router.get("/feature", getFeatureAll);

// Route to get a specific feature product by ID
router.get("/feature/:id", getOneFeature);

module.exports = router;
