const multer = require("multer");
const path = require("path");
const Attachment = require("../models/attachmentModel");
const Portfolio = require("../models/portfolioModel");
const sequelize = require("../config/db");

// Configure Multer for File Uploads (Resume)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Uploads directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const upload = multer({ storage: storage });

/**
 * Create or Update Resume and Portfolio Links
 */
exports.createOrUpdateProfile = [
  upload.single("file"), // Handles file upload
  async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const { userId, githubLink, linkedInLink } = req.body;
      const { file } = req; // Uploaded file

      // If a file is uploaded, save resume
      let attachment = null;
      if (file) {
        attachment = await Attachment.create(
          {
            userId, // Updated to match DB schema
            fileName: file.originalname,
            filePath: file.path,
            mimeType: file.mimetype,
            fileSize: file.size,
          },
          { transaction }
        );
      }

      // Update or create portfolio links
      const portfolioData = {};
      if (githubLink) portfolioData.githubLink = githubLink;
      if (linkedInLink) portfolioData.linkedInLink = linkedInLink;

      if (Object.keys(portfolioData).length > 0) {
        await Portfolio.upsert(
          { userId, ...portfolioData }, // Insert or update
          { transaction }
        );
      }

      await transaction.commit();
      res.status(201).json({ message: "Profile updated successfully", attachment });
    } catch (error) {
      await transaction.rollback();
      console.error("Error:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  },
];

/**
 * Get Profile Data (Resume & Portfolio Links)
 */
exports.getProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    // Get Resume File
    const attachment = await Attachment.findOne({ where: { userId } });

    // Get Portfolio Links
    const portfolio = await Portfolio.findOne({ where: { userId } });

    res.status(200).json({ attachment, portfolio });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update Portfolio Links
 */
exports.updatePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const { githubLink, linkedInLink } = req.body;

    await Portfolio.update(
      { githubLink, linkedInLink },
      { where: { id } }
    );

    res.status(200).json({ message: "Portfolio link updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete Resume or Portfolio Link
 */
exports.deleteProfileData = async (req, res) => {
  const { type, id } = req.params;

  try {
    if (type === "resume") {
      await Attachment.destroy({ where: { id } });
      res.status(200).json({ message: "Resume deleted successfully" });
    } else if (type === "portfolio") {
      await Portfolio.destroy({ where: { id } });
      res.status(200).json({ message: "Portfolio link deleted successfully" });
    } else {
      res.status(400).json({ message: "Invalid type provided" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
