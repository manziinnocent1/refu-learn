const express = require("express");
const router = express.Router();

// Import your controller functions
const {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
} = require("../controllers/application.controller");

// 1. Routes for the collection (/applications)
router.get("/applications", getAllApplications);
router.post("/applications", createApplication);

// 2. Routes for a specific item (/applications/:id)
router.get("/applications/:id", getApplicationById);
router.put("/applications/:id", updateApplication);
router.delete("/applications/:id", deleteApplication);

module.exports = router;
