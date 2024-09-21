const express = require("express");
const {
  createSubCategory,
  getSubCategory,
  getSubCategoriesByCategoryId,
} = require("../controllers/subCategoryController");
const upload = require("../helper/multer"); // Ensure this path is correct

const router = express.Router();

// Corrected route path and method
router.post(
  "/createSubCategory",
  upload.array("images", 10),
  createSubCategory
);
router.get("/SubCategory", getSubCategory);
router.get('/subcategories/category/:categoryId', getSubCategoriesByCategoryId);

module.exports = router;
