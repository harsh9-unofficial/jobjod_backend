const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Login = require("./loginModel");
// const User = require("./userModel");

const Preference = sequelize.define(
  "Preference",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Login", // The target model is 'Login'
        key: "id",
      },
    },
    employmentType: { type: DataTypes.STRING, allowNull: false },
    workplace: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    shift: { type: DataTypes.STRING, allowNull: false },
  },
  {
    timestamps: true, // Store createdAt and updatedAt automatically
    tableName: "preferences", // Ensure the table name is correct
  }
);

Preference.belongsTo(Login, { foreignKey: "userId" });
Login.hasMany(Preference, { foreignKey: "userId" });

module.exports = Preference;
