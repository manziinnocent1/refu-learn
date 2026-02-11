const Course = require("../models/course.model");

// get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({
      success: true,
      count: courses.length,
      courses,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// get course by id
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ success: true, course });
  } catch (error) {
    // Handling invalid MongoDB ObjectIDs specifically
    res.status(400).json({ message: "Invalid Course ID format" });
  }
};

// create course
const createCourse = async (req, res) => {
  try {
    // Using Course.create is more concise than 'new' and 'save'
    const newCourse = await Course.create(req.body);
    res.status(201).json({
      message: "Course created successfully",
      course: newCourse,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Validation failed", error: error.message });
  }
};

// update course
const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true, // Critical: ensures the update follows your Model rules
      },
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res
      .status(200)
      .json({ message: "Course updated successfully", course: updatedCourse });
  } catch (error) {
    res.status(400).json({ message: "Update failed", error: error.message });
  }
};

// delete course
const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Delete operation failed" });
  }
};

// Clean single export block
module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
