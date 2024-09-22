const express = require("express");
const upload = require("../helper/multer");
const {
  createProduct,
  getProductAll,
} = require("../controllers/productController");
const router = express.Router();

// Route for creating a product
router.post("/createProduct", upload.array("images", 10), createProduct);

// Route for retrieving all products
router.get("/products", getProductAll);

module.exports = router;
