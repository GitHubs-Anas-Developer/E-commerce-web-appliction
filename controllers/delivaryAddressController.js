const DeliveryAddress = require("../models/delivaryAddress"); // Adjust the path as needed

// Create a new delivery address
const createDeliveryAddress = async (req, res) => {
  try {
    const {
      userId,
      firstName,
      lastName,
      streetAddress,
      apartmentNumber,
      place,
      district,
      city,
      landmark,
      postalCode,
      phoneNumber,
    } = req.body; // Destructure the request body

    // Validate required fields
    if (
      !userId ||
      !firstName ||
      !lastName ||
      !streetAddress ||
      !apartmentNumber ||
      !place ||
      !district ||
      !city ||
      !postalCode ||
      !phoneNumber
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Create a new delivery address
    const newAddress = new DeliveryAddress({
      userId,
      firstName,
      lastName,
      streetAddress,
      apartmentNumber,
      place,
      district,
      city,
      landmark,
      postalCode,
      phoneNumber,
    });

    console.log(newAddress);

    // Save the delivery address to the database
    await newAddress.save();

    return res.status(201).json({
      success: true,
      message: "Delivery address created successfully.",
      address: newAddress,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get delivery address by user ID
const getDelivaryAddress = async (req, res) => {
  try {
    const { id } = req.params;

    // Find delivery addresses by userId
    const addresses = await DeliveryAddress.find({ userId: id });

    // Check if addresses exist for the user
    if (!addresses || addresses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No delivery addresses found for this user.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Delivery addresses retrieved successfully.",
      address: addresses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createDeliveryAddress, getDelivaryAddress };
