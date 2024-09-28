const WishListModel = require("../models/wishListModel");
const mongoose = require("mongoose");
const ProductModel = require("../models/ProductModel");

const createWishListController = async (req, res) => {
  const { userId, productId, name, image } = req.body; // Expecting userId and productId from the request body
  console.log("Received request body:", req.body);

  // Validate incoming data
  if (!userId || !productId) {
    return res.status(400).json({
      success: false,
      message: "userId and productId are required.",
    });
  }

  try {
    // Fetch the product details
    const product = await ProductModel.findById(productId);
    console.log("Fetched product:", product); // Log the fetched product for debugging

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if the wishlist item already exists for the user
    const existingWishList = await WishListModel.findOne({
      userId: new mongoose.Types.ObjectId(userId),
      productId: new mongoose.Types.ObjectId(productId),
    });

    if (existingWishList) {
      return res.status(400).json({
        success: false,
        message: "Product is already in the wishlist",
      });
    }

    // Create a new wishlist entry
    const newWishList = new WishListModel({
      userId: new mongoose.Types.ObjectId(userId),
      productId: new mongoose.Types.ObjectId(productId),
      name: name, // Ensure this is being populated
      image: {
        path: product.images[0]?.path || "", // Handle safely
        filename: product.images[0]?.filename || "", // Handle safely
      },
    });

    // Log newWishList before saving to ensure all fields are populated
    console.log("New wishlist item:", newWishList);

    // Save the wishlist item to the database
    const savedWishlist = await newWishList.save();

    return res.status(201).json({
      success: true,
      message: "Product added to wishlist",
      data: savedWishlist,
    });
  } catch (error) {
    console.error("Error in createWishListController:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error, please try again later.",
      error: error.message,
    });
  }
};

const getWishList = async (req, res) => {
  try {
    const { id } = req.params; // Extract user ID from request parameters

    // Find the wishlist items for the user
    const wishList = await WishListModel.find({ userId: id });

    // Log the retrieved wishlist for debugging
    console.log("Retrieved wishlist:", wishList);

    // Check if the wishlist is empty
    if (!wishList || wishList.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found or is empty.",
      });
    }

    // Return the wishlist items
    return res.status(200).json({
      success: true,
      wishList,
    });
  } catch (error) {
    console.error("Error in getWishList:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error, please try again later.",
      error: error.message,
    });
  }
};

const wishListRemove = async (req, res) => {
  try {
    const { id } = req.params; // Corrected from req.prams to req.params

    // Remove the item from the wishlist using the correct field
    const removeItem = await WishListModel.deleteOne({ _id: id }); // Assuming you are using the MongoDB _id field

    // Check if any document was deleted
    if (removeItem.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Wishlist item not found or already deleted.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Wishlist item deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error, please try again later.",
      error: error.message,
    });
  }
};

module.exports = {
  createWishListController,
  getWishList,
  wishListRemove,
};
