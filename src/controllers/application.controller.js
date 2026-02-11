const Application = require("../models/application.model.js");

// get all applications
const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    res
      .status(200)
      .json({ success: true, count: applications.length, applications });
  } catch (error) {
    console.error("Error in getAllApplications:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// get application by id
const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({ success: true, application });
  } catch (error) {
    res.status(400).json({ message: "Invalid ID format or Server Error" });
  }
};

// create application
const createApplication = async (req, res) => {
  try {
    const newApplication = await Application.create(req.body); // Shorter than new + save()
    res
      .status(201)
      .json({ message: "Created successfully", application: newApplication });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Validation failed", error: error.message });
  }
};

// update application
const updateApplication = async (req, res) => {
  try {
    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }, // Added runValidators to ensure update follows schema
    );
    if (!updatedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({
      message: "Updated successfully",
      application: updatedApplication,
    });
  } catch (error) {
    res.status(400).json({ message: "Update failed", error: error.message });
  }
};

// delete application
const deleteApplication = async (req, res) => {
  try {
    const deletedApplication = await Application.findByIdAndDelete(
      req.params.id,
    );
    if (!deletedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Delete failed" });
  }
};

// Simplified Export
module.exports = {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
};
