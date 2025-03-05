const express = require("express");
const app = express();
const sequelize = require("./config/db");

// Import routes
const userRoutes = require("./routes/userRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const educationRoutes = require("./routes/educationRoutes");
const skillRoutes = require("./routes/skillRoutes");
const attachmentRoutes = require("./routes/attachmentRoutes");

app.use(express.json());
app.use("/api/users", userRoutes); // Public routes for user login
app.use("/api/experiences", experienceRoutes); // Protected routes for experiences
app.use("/api/education", educationRoutes); // Protected routes for education
app.use("/api/skills", skillRoutes); // Protected routes for skills
app.use("/api/attachments", attachmentRoutes); // Protected routes for attachments

// Sync database
sequelize.sync({ force: false }).then(() => {
  console.log("Database synced");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
