const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Assuming you have a sequelize instance setup
const User = require("../models/userModel"); // Adjust the path based on your project structure

// Define the Portfolio model
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
        model: "Users", // Ensure this matches your 'Users' table name
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
    timestamps: true, // Store createdAt and updatedAt automatically
    tableName: "portfolio", // Ensure the table name is correct
  }
);

// Establish relationships
Portfolio.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Portfolio, { foreignKey: "userId" });

// Sync the model (consider using migrations instead of sync in production)
Portfolio.sync({ alter: true }) // `alter` ensures the table is adjusted if it already exists
  .then(() => console.log("Portfolio table synced"))
  .catch((error) => console.error("Error syncing Portfolio table:", error));

module.exports = Portfolio;
