const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Import your Sequelize instance

const Education = sequelize.define(
  "Education",
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
    highestEducation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    degree: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specialization: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    collegeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completionYear: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    timestamps: true, // If you want createdAt and updatedAt to be automatically managed
  }
);

module.exports = Education;
