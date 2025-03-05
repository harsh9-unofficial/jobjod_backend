const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./userModel");

const Experience = sequelize.define("Experience", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  companyName: { type: DataTypes.STRING, allowNull: false },
  jobTitle: { type: DataTypes.STRING, allowNull: false },
  industry: { type: DataTypes.STRING, allowNull: false },
  department: { type: DataTypes.STRING, allowNull: false },
  startDate: { type: DataTypes.DATEONLY, allowNull: false },
  endDate: { type: DataTypes.DATEONLY, allowNull: false },
  employmentType: { type: DataTypes.STRING, allowNull: false },
  noticePeriod: { type: DataTypes.STRING, allowNull: false },
});

Experience.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Experience, { foreignKey: "userId" });

module.exports = Experience;
