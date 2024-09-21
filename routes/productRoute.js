const express = require("express");
const upload = require("../helper/multer");
const { createProduct } = require("../controllers/productController");
const router = express.Router();

router.post("/createProduct", upload.array("images", 10), createProduct);

module.exports = router;
