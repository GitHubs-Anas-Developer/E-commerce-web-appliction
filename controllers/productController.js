const productModel = require("../models/ProductModel");

const createProduct = async (req, res) => {
  try {
    const {
      title,
      price,
      offerPrice,
      discountPercentage,
      about,
      description,
      subcategoryId,
    } = req.body;

    // Check for required fields
    if (!title || !price || !offerPrice || !discountPercentage || !subcategoryId || !req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "All fields are required, including image files",
      });
    }

    // Validate numerical fields
    const priceNum = parseFloat(price);
    const offerPriceNum = parseFloat(offerPrice);
    const discountPercentageNum = parseFloat(discountPercentage);

    if (isNaN(priceNum) || isNaN(offerPriceNum) || isNaN(discountPercentageNum)) {
      return res.status(400).json({
        success: false,
        message: "Price, offer price, and discount percentage must be valid numbers",
      });
    }

    // Handling uploaded files
    const images = req.files.map((file) => ({
      filename: file.filename,
      path: file.path,
    }));

    console.log("Uploaded images: ", images);

    // Create a new Product
    const newProduct = new productModel({
      title,
      price: priceNum,
      offerPrice: offerPriceNum,
      discountPercentage: discountPercentageNum,
      about,
      description,
      images,
      subCategory: subcategoryId,
    });

    // Save product to database
    await newProduct.save();

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error.message, error.stack);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

const getProductAll = async (req, res) => {
  try {
    const products = await productModel.find({});

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }

    res.status(200).json({
      success: true,
      products: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error.message, error.stack);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createProduct, getProductAll };
