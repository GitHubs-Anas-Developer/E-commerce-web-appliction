const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WishListSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  name: { type: String, required: true },
  image: {
    filename: { type: String, required: true },
    path: { type: String, required: true },
  },
});

const WishListModel = mongoose.model("WishList", WishListSchema);

module.exports = WishListModel;
