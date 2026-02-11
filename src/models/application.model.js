const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    category: { type: String, required: [true, "Category is required"] },
    locationType: {
      type: String,
      required: true,
      enum: ["Remote", "On-site", "Hybrid"],
      default: "Remote",
    },
    locationDetail: { type: String, trim: true },
    duration: { type: String, required: [true, "Duration is required"] },
    link: {
      type: String,
      required: [true, "Link is required"],
      match: [/^https?:\/\/.+/, "Please provide a valid URL"], // Basic URL validation
    },
    eligibility: { type: String, required: [true, "Eligibility is required"] },
    opportunityType: {
      type: String,
      enum: ["job", "course", "scholarship"],
      default: "job",
    },
    status: {
      type: String,
      enum: ["accepted", "pending", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Application", applicationSchema);
