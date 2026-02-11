const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
    },
    employer: {
      type: String,
      required: [true, "Employer or Organization name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      lowercase: true,
      trim: true,
    },
    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship", "Volunteer"],
      default: "Full-time",
    },
    locationType: {
      type: String,
      required: [true, "Location type is required"],
      enum: ["Remote", "On-site", "Hybrid"],
      default: "On-site",
    },
    locationDetail: {
      type: String,
      required: [
        function () {
          return this.locationType !== "Remote";
        },
        "Location city/country is required for non-remote jobs",
      ],
      trim: true,
    },
    salary: {
      type: String,
      default: "Unspecified", // Allows for "Negotiable" or "500k RWF/month"
    },
    link: {
      type: String,
      required: [true, "Application link or Email is required"],
      match: [
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$|^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid URL or Email address",
      ],
    },
    eligibility: {
      type: String,
      required: [
        true,
        "Eligibility (e.g., Work Permit, Refugee Status) is required",
      ],
    },
    level: {
      type: String,
      enum: ["Entry-level", "Intermediate", "Senior"],
      default: "Entry-level",
    },
    deadline: {
      type: Date, // Added to automatically expire old job posts
    },
  },
  {
    timestamps: true,
  },
);

// Indexing for faster search on the RefuLearn platform
jobSchema.index({ title: "text", employer: "text", category: "text" });

module.exports = mongoose.model("Job", jobSchema);
