const express = require("express");
const {
  createCategory,
  getCategoryAll,
} = require("../controllers/categoryController");
const upload = require("../helper/multer");

const router = express.Router();

// Route to handle category creation with multiple file uploads
router.post("/createCategory", upload.array("images", 10), createCategory);
router.get("/category", getCategoryAll);

module.exports = router;
