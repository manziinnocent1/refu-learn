const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      // e.g., "Web Dev", "Language", "Nursing"
      lowercase: true,
      trim: true,
    },
    locationType: {
      type: String,
      required: [true, "Location type is required"],
      enum: {
        values: ["Remote", "On-site", "Hybrid"],
        message: "{VALUE} is not supported",
      },
      default: "Remote",
    },
    locationDetail: {
      type: String,
      trim: true,
    },
    duration: {
      type: String,
      required: [true, "Duration is required"],
    },
    link: {
      type: String,
      required: [true, "Course link is required"],
      match: [
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
        "Please provide a valid URL",
      ],
    },
    eligibility: {
      type: String,
      required: [true, "Eligibility details are required"],
    },
    instructor: {
      type: String,
      required: [true, "Instructor or Organization is required"],
      trim: true,
    },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    language: {
      type: String,
      default: "English",
    },
    isFree: {
      type: Boolean,
      default: true,
    },
    // New: Price field only required if isFree is false
    price: {
      type: Number,
      default: 0,
    },
    // New: Tags help with the search feature on your website
    tags: [String],
  },
  {
    timestamps: true,
  },
);

// Indexing title and category for faster searching in your database
courseSchema.index({ title: "text", category: "text" });

module.exports = mongoose.model("Course", courseSchema);
