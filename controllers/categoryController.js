const Category = require("../models/categoryModels"); // Ensure this path is correct

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // Ensure that the name is provided and that files are uploaded
    if (!name || !req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Name and at least one image file are required",
      });
    }

    // Process the uploaded files
    const images = req.files.map((file) => ({
      filename: file.filename,
      path: file.path,
    }));

    // Logging for debugging; replace with a logging framework in production
    console.log("Uploaded images:", images);

    // Create a new category instance
    const newCategory = new Category({
      name,
      images,
    });

    // Save the new category to the database
    await newCategory.save();

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error); // Logging error
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred while creating the category",
    });
  }
};

const getCategoryAll = async (req, res) => {
  try {
    const categories = await Category.find({});

    if (!categories || categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No categories found",
      });
    }

    res.status(200).json({
      success: true,
      category: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error); // Logging error
    res.status(500).json({
      success: false,
      message:
        error.message || "An error occurred while fetching the categories",
    });
  }
};

module.exports = {
  createCategory,
  getCategoryAll,
};
