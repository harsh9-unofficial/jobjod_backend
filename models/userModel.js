const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Login = require("./loginModel");

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Login", // The target model is 'Login'
      key: "id",
    },
  },
  fullName: { type: DataTypes.STRING, allowNull: false },
  gender: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.INTEGER, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  birthDate: { type: DataTypes.DATEONLY, allowNull: false },
},
{
  timestamps: true, // Store createdAt and updatedAt automatically
  tableName: "users", // Ensure the table name is correct
});


User.belongsTo(Login, { foreignKey: "userId" });
Login.hasMany(User, { foreignKey: "userId" });

module.exports = User;
