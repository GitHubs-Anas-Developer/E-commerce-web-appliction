const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  console.log(name, email, password);

  try {
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "You are already registered",
      });
    }

    // Hash the password
    const hashpassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new userModel({
      name,
      email,
      password: hashpassword,
    });

    // Save the new user
    const userSave = await newUser.save();

    res.status(201).json({
      success: true,
      user: userSave,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Registration error: " + error.message,
    });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const match = await bcrypt.compare(password, existingUser.password);

    if (!match) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ _id: existingUser._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    console.log(token);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
      },
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "login error: " + error.message,
    });
  }
};

const userDetails = async (req, res) => {
  // Retrieve the user ID either from the route params or the JWT
  const userId = req.params.id || req.user._id;

  try {
    // Find the user by their ID, and exclude the password field
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user details: " + error.message,
    });
  }
};
module.exports = {
  registerController,
  loginController,
  userDetails,
};
