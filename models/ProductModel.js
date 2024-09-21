const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  offerPrice: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
  about: { type: String },
  description: { type: String },
  images: [String], // Array of strings for image paths
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
