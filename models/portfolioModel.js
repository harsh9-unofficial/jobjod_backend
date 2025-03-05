const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Assuming you have a sequelize instance setup
const User = require("../models/userModel"); // Adjust the path based on your project structure

// Define the Attachment model
const Portfolio = sequelize.define(
  "Portfolio",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users", // The target model is 'Users'
        key: "id",
      },
    },
    githubLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkedInLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true, // Store the created and updated timestamps
    tableName: "portfolio",
  }
);

User.hasMany(Portfolio, { foreignKey: "userId" });
Portfolio.belongsTo(User, { foreignKey: "userId" });

// Sync the model with the database (make sure this runs when the app starts)
Portfolio.sync();

module.exports = Portfolio;
