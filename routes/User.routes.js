const express = require("express");
const router = express.Router();
const { register, login } = require("../controller/User.Controller");
const authMiddlewares = require("../middleware/authmiddleware");

// Authentication routes
router.post("/signup", register); // Register new admin user
router.post("/login", login); // Login admin user
// router.get("/me", authMiddlewares, getUser); // Get admin user details

module.exports = router;
