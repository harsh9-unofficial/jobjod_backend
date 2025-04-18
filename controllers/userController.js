const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Create a new user
exports.createUser = async (req, res) => {
  const {
    userId,
    fullName,
    gender,
    email,
    phone,
    location,
    birthDate,
    pincode,
  } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Create new user
    const user = await User.create({
      userId,
      fullName,
      gender,
      email,
      phone,
      location,
      birthDate,
      pincode,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSpecificData = async (req, res) => {
  const userId = req.params.userId; // Access userId from request parameters

  try {
    // Fetch user data from the database by the provided ID
    const userData = await User.findOne({ _id: userId });

    // If the user is not found
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Return the user data in the response
    return res.status(200).json({
      success: true,
      data: userData,
    });
  } catch (error) {
    // Handle any errors
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error, please try again later.",
    });
  }
};


// // Login user and generate JWT token
// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ where: { email } });
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     // Compare password (for regular users)
//     const isValid = await bcrypt.compare(password, user.password);
//     if (!isValid) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Generate JWT token for regular user
//     const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     // Return the token
//     res.status(200).json({ role: "JobSeeker", token });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// Get user data (after validating JWT token)
exports.getData = async (req, res) => {
  try {
    const user = await User.findOne(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user data (excluding password)
exports.updateUser = async (req, res) => {
  const userId = req.params.userId; // Access userId from request parameters
  const {
    gender,
    email,
    phone,
    location,
    birthDate,
    pincode,
  } = req.body;

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await user.update({
      gender,
      email,
      phone,
      location,
      birthDate,
      pincode,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user account
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOne(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user
    await user.destroy();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
