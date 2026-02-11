const mongoose = require("mongoose");

const scholarshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Scholarship title is required"],
      trim: true,
      maxlength: [150, "Title cannot exceed 150 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    provider: {
      type: String,
      required: [true, "Organization or University name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Field of study/Category is required"], // e.g., "STEM", "Arts", "Healthcare"
      lowercase: true,
      trim: true,
    },
    awardAmount: {
      type: String,
      default: "Full-ride", // e.g., "5000 USD", "Full Tuition", "Partial"
    },
    locationType: {
      type: String,
      required: true,
      enum: ["Remote", "On-site", "Hybrid"],
      default: "On-site",
    },
    locationDetail: {
      type: String, // Specific University/Country
      trim: true,
    },
    deadline: {
      type: Date,
      required: [true, "Application deadline is required"],
    },
    link: {
      type: String,
      required: [true, "Official application link is required"],
      match: [/^https?:\/\/.+/, "Please provide a valid URL"],
    },
    eligibility: {
      type: String,
      required: [true, "Eligibility criteria are required"], // e.g., "Refugee status", "GPA > 3.0"
    },
    isFullyFunded: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Indexing for search performance
scholarshipSchema.index({ title: "text", provider: "text", category: "text" });

module.exports = mongoose.model("Scholarship", scholarshipSchema);
