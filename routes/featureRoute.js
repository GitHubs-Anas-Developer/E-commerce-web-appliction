const express = require("express");
const upload = require("../helper/multer");
const {
  createFeature,
  getFeatureAll,
} = require("../controllers/featureController");

const router = express.Router();

router.post("/createFeature", upload.array("images", 10), createFeature);
router.get("/feature", getFeatureAll);

module.exports = router;
