const Job = require("../models/job.model");

// get all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }); // Added sorting by newest first
    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error("Error in getAllJobs:", error);
    res.status(500).json({ message: "Server error while fetching jobs" });
  }
};

// get job by id
const getJobById = async (req, res) => {
  try {
    // FIXED: Changed 'job.findById' to 'Job.findById' (Capital J)
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ success: true, job });
  } catch (error) {
    res.status(400).json({ message: "Invalid job ID format" });
  }
};

// create job
const createJob = async (req, res) => {
  try {
    // Optimized: Using Job.create is shorter
    const newJob = await Job.create(req.body);
    res.status(201).json({
      message: "Job created successfully",
      job: newJob,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Validation failed", error: error.message });
  }
};

// update job
const updateJob = async (req, res) => {
  try {
    // FIXED: Changed 're.body' to 'req.body'
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    // FIXED: Variable name was misspelled as 'upodatedJob'
    res
      .status(200)
      .json({ message: "Job updated successfully", job: updatedJob });
  } catch (error) {
    res.status(400).json({ message: "Update failed", error: error.message });
  }
};

// delete job
const deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Delete operation failed" });
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
};
