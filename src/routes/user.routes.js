const express = require("express");
const router = express.Router();

// Import the controller functions
const {
  register,
  login,
  getProfile,
  updateProfile,
  deleteProfile,
  logout,
} = require("../controllers/user.controller");

// Note: You will eventually create an authMiddleware to protect these routes
// const { protect } = require("../middleware/auth.middleware");

// Public Routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// Protected Routes (Users can only see/edit their own data)
// In the future, you would use: router.get("/profile/:id", protect, getProfile);
router.get("/profile/:id", getProfile);
router.put("/update/:id", updateProfile);
router.delete("/delete/:id", deleteProfile);

module.exports = router;
