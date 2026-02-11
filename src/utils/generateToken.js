const jwt = require("jsonwebtoken");

/**
 * Generates a standard JWT token for User Authentication
 * @param {object} payload - The user data (id, role, etc.)
 * @param {string} expiresIn - Expiration time (default: '1d')
 * @returns {string} - Signed JWT
 */
const generateJWTToken = (payload, expiresIn = "1d") => {
  // The library handles the Header, Base64Url encoding, and Hashing for you.
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
  });
};

/**
 * Generates a simple random hex token (Useful for Password Reset or Email Verification)
 */
const generateRandomToken = () => {
  const crypto = require("crypto");
  return crypto.randomBytes(32).toString("hex");
};

module.exports = {
  generateJWTToken,
  generateRandomToken,
};
