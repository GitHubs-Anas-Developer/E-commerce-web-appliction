const featureModel = require("../models/featureProductsModel");
const createFeature = async (req, res) => {
  try {
    // Extracting data from request body
    const { title, price, offerPrice, discountPercentage, about, description } =
      req.body;

    // Validate input data
    if (
      !title ||
      !price ||
      !offerPrice ||
      !discountPercentage ||
      !req.files ||
      req.files.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required including image files",
      });
    }

    // Handling uploaded files
    const images = req.files.map((file) => ({
      filename: file.filename,
      path: file.path,
    }));

    // Creating a new feature product
    const newFeature = new featureModel({
      title,
      price,
      offerPrice,
      discountPercentage,
      about,
      description,
      images,
    });

    // Saving to database
    await newFeature.save();

    // Responding with success message and product details
    res.status(201).json({
      success: true,
      message: "Feature product created successfully",
      product: newFeature,
    });

    // Logging created product (useful for debugging)
    console.log(newFeature);
  } catch (error) {
    // Respond with error details
    res.status(500).json({
      success: false,
      message:
        error.message || "An error occurred while creating the feature product",
    });
  }
};

// Get all feature products
const getFeatureAll = async (req, res) => {
  try {
    const features = await featureModel.find({});

    // If no features are found
    if (!features || features.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No feature products found",
      });
    }

    // Responding with the found feature products
    res.status(200).json({
      success: true,
      features,
    });
  } catch (error) {
    // Respond with error details
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred while fetching features",
    });
  }
};
const getOneFeature = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id);

    // Find product by MongoDB _id
    const featureProduct = await featureModel.findOne({ _id: id });

    console.log("featureProduct", featureProduct);

    // If product is not found, return a 404 response
    if (!featureProduct) {
      return res.status(404).json({
        success: false,
        message: "Feature product not found",
      });
    }

    // Return the product data in the response
    res.status(200).json({
      success: true,
      product: featureProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error retrieving feature product: ${error.message}`,
    });
  }
};

module.exports = {
  createFeature,
  getFeatureAll,
  getOneFeature,
};
