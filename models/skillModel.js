const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Import your Sequelize instance

const Skill = sequelize.define(
  "Skill",
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
    skill: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true, // If you want createdAt and updatedAt to be automatically managed
  }
);

module.exports = Skill;
