const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    images: [
      {
        filename: {
          type: String,
        },
        path: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true } // Timestamps for createdAt and updatedAt
);

module.exports = mongoose.model("Category", categorySchema);
