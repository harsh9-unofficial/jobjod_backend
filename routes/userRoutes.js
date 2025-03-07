const express = require("express");
const router = express.Router();
const { createUser, loginNumber,getData, updateUser, deleteUser } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware"); // Use the authentication middleware

router.post("/register", authMiddleware, createUser);
router.get("/", authMiddleware, getData); // GET user data
router.put("/", authMiddleware, updateUser); // PUT update user data
router.delete("/", authMiddleware, deleteUser); // DELETE user account

module.exports = router;
