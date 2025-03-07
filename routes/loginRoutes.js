const express = require("express");
const router = express.Router();
const { createLogin, getToken } = require("../controllers/loginController");

router.post("/verify-otp", createLogin);
// router.post("/verify-otp", getToken);

module.exports = router;
