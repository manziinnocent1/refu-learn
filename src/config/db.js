const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // In Mongoose 6+, useNewUrlParser and useUnifiedTopology are default
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
