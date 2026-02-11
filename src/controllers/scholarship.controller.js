const Scholarship = require("../models/scholarship.model");

// get all scholarships
const getAllScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarship.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: scholarships.length,
      scholarships,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// get scholarship by id
const getScholarshipById = async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);
    if (!scholarship) {
      return res.status(404).json({ message: "Scholarship not found" });
    }
    res.status(200).json({ success: true, scholarship });
  } catch (error) {
    res.status(400).json({ message: "Invalid ID format" });
  }
};

// create scholarship
const createScholarship = async (req, res) => {
  try {
    const newScholarship = await Scholarship.create(req.body);
    res.status(201).json({
      message: "Scholarship created successfully",
      scholarship: newScholarship,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Validation failed", error: error.message });
  }
};

// update scholarship
const updateScholarship = async (req, res) => {
  try {
    const updatedScholarship = await Scholarship.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }, // Corrected options
    );

    if (!updatedScholarship) {
      return res.status(404).json({ message: "Scholarship not found" });
    }

    res.status(200).json({
      message: "Scholarship updated successfully",
      scholarship: updatedScholarship,
    });
  } catch (error) {
    res.status(400).json({ message: "Update failed", error: error.message });
  }
};

// delete scholarship
const deleteScholarship = async (req, res) => {
  try {
    const deletedScholarship = await Scholarship.findByIdAndDelete(
      req.params.id,
    );
    if (!deletedScholarship) {
      return res.status(404).json({ message: "Scholarship not found" });
    }
    res.status(200).json({ message: "Scholarship deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Delete operation failed" });
  }
};

module.exports = {
  getAllScholarships,
  getScholarshipById,
  createScholarship,
  updateScholarship,
  deleteScholarship,
};
