const express = require("express");
const upload = require("../helper/multer");
const {
  createProduct,
  getProductAll,
  getOneProduct,
  subCategoryProductsAll,
} = require("../controllers/productController");

const router = express.Router();
const requireSignIn = require("../middleware/authMiddleware");

// Route for creating a product (uploading multiple images)
router.post("/product", upload.array("images", 20), createProduct);

// Route for retrieving all products
router.get("/products", requireSignIn, getProductAll);

// Route for retrieving a single product by ID
router.get("/product/:id", getOneProduct);


router.get("/subcategoryProducts/:id", subCategoryProductsAll);

module.exports = router;
