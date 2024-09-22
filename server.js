const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const dataBase = require("./config/db");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoute");
const cors = require("cors");
const featureRoute = require("./routes/featureRoute");
const categoryRoute = require("./routes/categoryRoute");
const SubcategoryRoute = require("./routes/subCategoryRoute");
const ProductRoute = require("./routes/productRoute");
const path = require("path");

// Load environment variables
dotenv.config();

// Create the Express app
const app = express();

// Connect to the database
dataBase();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(express.static("public"));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", featureRoute);
app.use("/api/v1", categoryRoute);
app.use("/api/v1", SubcategoryRoute);
app.use("/api/v1", ProductRoute);

// Centralized error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong!" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT} in ${process.env.DEV_MODE} mode`.bgGreen
  );
});
