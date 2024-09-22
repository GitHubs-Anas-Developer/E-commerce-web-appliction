const express = require("express");
const upload = require("../helper/multer");
const {
  createProduct,
  getProductAll,
  getOneProduct,
} = require("../controllers/productController");
const router = express.Router();

// Route for creating a product (uploading multiple images)
router.post("/products", upload.array("images", 10), createProduct);

// Route for retrieving all products
router.get("/products", getProductAll);

// Route for retrieving a single product by ID
router.get("/product/:id", getOneProduct);

module.exports = router;
