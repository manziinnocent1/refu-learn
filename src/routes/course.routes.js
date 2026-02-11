const express = require("express");
const router = express.Router();

// Import the controller functions
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/course.controller");

// Routes for /courses
router.get("/getallcourses", getAllCourses);
router.post("/createcourse", createCourse);

// Routes for /courses/:id
router.get("/getcourse/:id", getCourseById);
router.put("/updatecourse/:id", updateCourse);
router.delete("/deletecourse/:id", deleteCourse);

module.exports = router;
