const express = require("express");
const router = express.Router();

// Import the controller functions
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/job.controller");

// Routes for the job collection
// Base path will be defined in server.js (e.g., /api/jobs)
router.get("/getalljobs", getAllJobs);
router.post("/createjob", createJob);

// Routes for specific jobs
router.get("/getjob/:id", getJobById);
router.put("/updatejob/:id", updateJob);
router.delete("/deletejob/:id", deleteJob);

module.exports = router;
