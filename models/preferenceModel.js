const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./userModel");

const Preference = sequelize.define("Preference", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  employmentType: { type: DataTypes.STRING, allowNull: false },
  workplace: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  shift: { type: DataTypes.STRING, allowNull: false },
});

Preference.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Preference, { foreignKey: "userId" });

module.exports = Preference;
