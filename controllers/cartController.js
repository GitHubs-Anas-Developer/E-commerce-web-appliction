const cartModel = require("../models/cartModel");
const mongoose = require("mongoose");
const productModel = require("../models/ProductModel");

const createCart = async (req, res) => {
  try {
    const { userId, productId, price, quantity, name, image } = req.body;

    console.log(req.body);

    // Validate request body
    if (!productId || !quantity || !name || !price || !userId) {
      return res.status(400).json({
        success: false,
        message: "All product and user details are required",
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(productId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid product or user ID",
      });
    }

    // Check if the product exists
    const product = await productModel.findById({ _id: productId });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);
    let cart = await cartModel.findOne({ userId: userObjectId });

    if (cart) {
      // Check if the product is already in the cart
      const itemIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId.toString()
      );

      if (itemIndex > -1) {
        cart.products[itemIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity, name, price, image });
      }

      await cart.save();
      return res.status(200).json({ success: true, cart });
    } else {
      cart = await cartModel.create({
        userId: userObjectId,
        products: [{ productId, quantity, name, price, image }],
      });
      return res.status(201).json({ success: true, cart });
    }
  } catch (error) {
    console.error("Error creating/updating cart:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const getCart = async (req, res) => {
  try {
    const { id } = req.params; // Assuming the user ID is passed as a URL parameter

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const cart = await cartModel.findOne({ userId: id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    res.status(200).json({
      success: true,
      carts: cart, // corrected from 'carts' to 'cart'
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update the quantity of an item in the cart
const updateCartQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(productId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID or product ID",
      });
    }

    const cart = await cartModel.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const itemIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId.toString()
    );
    if (itemIndex > -1) {
      cart.products[itemIndex].quantity = quantity;
      await cart.save();
      return res.status(200).json({ success: true, cart });
    } else {
      return res.status(404).json({
        success: false,
        message: "Product not found in the cart",
      });
    }
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const removeItemFromCart = async (req, res) => {
  try {
    const { id } = req.params; // Extract userId and productId from request parameters

    // Validate ObjectId
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(productId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID or product ID",
      });
    }

    // Update the cart by pulling the product from the products array
    const updateResult = await cartModel.updateOne(
      { userId: new mongoose.Types.ObjectId(userId) }, // Match the user
      { $pull: { products: { productId: new mongoose.Types.ObjectId(id) } } } // Remove the product from the products array
    );

    // Check if any document was modified
    if (updateResult.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Item not found in the cart or already deleted.",
      });
    }

    // Respond with success message if the item was deleted
    return res.status(200).json({
      success: true,
      message: "Item deleted successfully.",
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error deleting item from cart:", error);

    // Respond with a 500 status code and the error message
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
module.exports = {
  createCart,
  getCart,
  updateCartQuantity,
  removeItemFromCart,
};
