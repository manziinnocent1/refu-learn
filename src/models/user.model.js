const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      // Added: Email regex to ensure valid format
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      // select: false ensures the password isn't returned in general queries
      select: false,
    },
    country: {
      type: String,
      required: [true, "Country of residence is required"],
      trim: true,
    },
    education: {
      type: String,
      required: [true, "Education level is required"],
      enum: [
        "None",
        "Primary",
        "Secondary",
        "Undergraduate",
        "Postgraduate",
        "Vocational",
      ],
      default: "None",
    },
    skills: {
      type: [String],
      default: [],
    },
    profileImage: {
      type: String,
      default: "https://via.placeholder.com/150", // Use a placeholder URL instead of just a filename
    },
    role: {
      type: String,
      enum: ["refugee", "admin", "employer", "instructor"],
      default: "refugee",
    },
    // Added: Helpful for refugees tracking their progress
    savedOpportunities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "onModel",
      },
    ],
    onModel: {
      type: String,
      enum: ["Job", "Course", "Scholarship"],
    },
  },
  {
    timestamps: true,
  },
);

// Indexing for search (if you want to find users by skill/name)
userSchema.index({ name: "text", skills: "text" });

module.exports = mongoose.model("User", userSchema);
