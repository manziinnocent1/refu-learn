require("dotenv").config(); // Load environment variables first
const express = require("express");
const cors = require("cors"); // Recommended for frontend-backend communication
const i18next = require("./src/config/i18n"); // Import the config above
const middleware = require("i18next-http-middleware");
const connectDB = require("./src/config/db"); // Import your DB connection // Recommended for frontend-backend communication

// Update Route Imports
const userRoutes = require("./src/routes/user.routes");
const jobRoutes = require("./src/routes/job.routes");
const courseRoutes = require("./src/routes/course.routes");
const scholarshipRoutes = require("./src/routes/scholarship.routes");
const applicationRoutes = require("./src/routes/application.routes");

const app = express();
const port = process.env.PORT || 3000;

// 1. Connect to Database
connectDB();

// 2. Middleware
app.use(cors()); // Allows your frontend to talk to this API
app.use(express.json()); // Essential: allows app to read JSON bodies in req.body

// 3. Health Check Route
app.get("/", (req, res) => {
  res.send("RefuLearn API is running smoothly!");
});

// Use the middleware
app.use(middleware.handle(i18next));

// 4. Mount Routes
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/scholarships", scholarshipRoutes);
app.use("/api/applications", applicationRoutes);

// 5. Global Error Handler (Optional but helpful)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// 6. Start Server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;
