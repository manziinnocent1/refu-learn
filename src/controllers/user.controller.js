const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");

// Register new user
const register = async (req, res) => {
  try {
    const { name, email, password, country, educationLevel, skills, role } =
      req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create user FIRST (so the 'newUser' object actually exists)
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      country,
      educationLevel,
      skills,
      role,
    });

    // 4. Send Welcome Email AFTER user is created
    try {
      await sendEmail({
        email: newUser.email, // Use 'newUser', not 'user'
        subject: "Welcome to RefuLearn!",
        message: `Hello ${newUser.name}, welcome to RefuLearn. You can now explore jobs and scholarships!`,
      });
    } catch (err) {
      console.log("Email could not be sent", err);
      // We don't return here because the user was still created successfully
    }

    // 5. Send ONLY ONE response at the very end
    return res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser._id, name: newUser.name },
    });
  } catch (error) {
    // Only send an error response if one hasn't been sent yet
    if (!res.headersSent) {
      return res.status(500).json({
        message: "Server error during registration",
        error: error.message,
      });
    }
  }
};

// user login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Use .select("+password") to override the 'select: false' in the model
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Now user.password will exist and bcrypt can compare it
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate Token logic follows...
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" },
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" },
    );

    res.status(200).json({
      accessToken: token,
      refreshToken,
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (error) {
    // This logs the real error so you can see it in your terminal
    console.error("Login Error:", error.message);
    res
      .status(500)
      .json({ message: "Server error during login", error: error.message });
  }
};

// Get user profile
const getProfile = async (req, res) => {
  try {
    // .select("-password") ensures we don't send the hashed password back
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ message: "Invalid User ID format" });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(400).json({ message: "Update failed", error: error.message });
  }
};

// Delete user profile
const deleteProfile = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Delete operation failed" });
  }
};

// Logout user (Frontend side handled)
const logout = async (req, res) => {
  // With JWT, logout is usually handled by the frontend deleting the token.
  // We send a success response to confirm the intention.
  res
    .status(200)
    .json({ message: "Log out successful. Please clear your token." });
};

// get user by id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    res.status(200).json({ success: true, user: userWithoutPassword });
  } catch (error) {
    res.status(400).json({ message: "Invalid User ID format" });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  deleteProfile,
  getUserById,
  logout,
};
