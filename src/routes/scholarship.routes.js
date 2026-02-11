const express = require("express");
const router = express.Router();

// Import the controller functions
const {
  getAllScholarships,
  getScholarshipById,
  createScholarship,
  updateScholarship,
  deleteScholarship,
} = require("../controllers/scholarship.controller");

// Routes for the scholarship collection
// These will be mounted at /api/scholarships in your server.js
router.get("/getallschorlaships", getAllScholarships);
router.post("/createscholarship", createScholarship);

// Routes for specific scholarships
router.get("/getscholarship:id", getScholarshipById);
router.put("/updatescholarship:id", updateScholarship);
router.delete("/deletescholarship:id", deleteScholarship);

module.exports = router;
