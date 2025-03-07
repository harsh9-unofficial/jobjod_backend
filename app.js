const express = require("express");
const app = express();
const sequelize = require("./config/db");
const cors = require("cors");

// Import routes
const userRoutes = require("./routes/userRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const educationRoutes = require("./routes/educationRoutes");
const skillRoutes = require("./routes/skillRoutes");
const attachmentRoutes = require("./routes/attachmentRoutes");
const preferenceRoutes = require("./routes/preferenceRoutes");
const loginRoutes = require("./routes/loginRoutes");

app.use(express.json());
app.use(cors());

app.use("/api/otp", loginRoutes); // OTP based login/signup
app.use("/api/users", userRoutes); // Public routes for user login
app.use("/api/experiences", experienceRoutes); // Protected routes for experiences
app.use("/api/education", educationRoutes); // Protected routes for education
app.use("/api/skills", skillRoutes); // Protected routes for skills
app.use("/api/attachments", attachmentRoutes); // Protected routes for attachments
app.use("/api/preferences", preferenceRoutes); // Protected routes for preference

// Sync database
sequelize.sync({ force: false }).then(() => {
  console.log("Database synced");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
