const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Assuming you have a sequelize instance setup

// Define the Attachment model
const Attachment = sequelize.define(
  "Attachment",
  {
    // File name
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Path where the file is stored (e.g., local file path or cloud storage URL)
    filePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // MIME type of the file
    mimeType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Size of the file (optional)
    fileSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Store the created and updated timestamps
    tableName: "attachments",
  }
);

// Sync the model with the database (make sure this runs when the app starts)
Attachment.sync();

module.exports = Attachment;
