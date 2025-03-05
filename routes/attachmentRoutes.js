const express = require("express");
const router = express.Router();
const {
  createOrUpdateProfile,
  getProfile,
  updatePortfolio,
  deleteProfileData,
} = require("../controllers/attachmentController");

const authMiddleware = require("../middleware/authMiddleware"); // Use the authentication middleware

// Route to create or update profile with resume (file upload) and portfolio links
router.post("/", authMiddleware, createOrUpdateProfile);

// Route to get profile data (resume and portfolio links)
router.get("/:user_id", authMiddleware, getProfile);

// Route to update a portfolio link
router.put("/portfolio/:id", authMiddleware, updatePortfolio);

// Route to delete a resume or a portfolio link
router.delete("/data/:type/:id", authMiddleware, deleteProfileData);

module.exports = router;
