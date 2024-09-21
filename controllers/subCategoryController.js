const categoryModels = require("../models/categoryModels");
const SubCategory = require("../models/SubcategoryModels"); // Replace with the actual path to your SubCategory model

// Create a new subcategory
const createSubCategory = async (req, res) => {
  try {
    const { name, category } = req.body;

    if (!name || !req.files || req.files.length === 0 || !category) {
      return res.status(400).json({
        success: false,
        message:
          "Name, at least one image file, and a category ID are required",
      });
    }

    // Process the uploaded files
    const images = req.files.map((file) => ({
      filename: file.filename,
      path: file.path,
    }));

    // Create a new subcategory instance
    const newSubCategory = new SubCategory({
      name,
      images,
      category, // Include category here
    });

    await newSubCategory.save();

    // Send a success response
    res.status(201).json({
      success: true,
      message: "SubCategory created successfully",
      data: newSubCategory,
    });
  } catch (error) {
    console.error("Error creating subcategory:", error);
    res.status(500).json({
      success: false,
      message:
        error.message || "An error occurred while creating the subcategory",
    });
  }
};

// Get all subcategories
const getSubCategory = async (req, res) => {
  try {
    const subCategories = await SubCategory.find({}).populate("category");
    if (!subCategories || subCategories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No subcategories found",
      });
    }

    res.status(200).json({
      success: true,
      subCategories: subCategories,
    });
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get one subcategory by ID
const getSubCategoriesByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Find all subcategories with the provided category ID
    const subCategories = await SubCategory.find({
      category: categoryId,
    }).populate("category");

    if (!subCategories || subCategories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No subcategories found for this category",
      });
    }

    res.status(200).json({
      success: true,
      subCategories: subCategories,
    });
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSubCategory,
  getSubCategory,
  getSubCategoriesByCategoryId,
};
