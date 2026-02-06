require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin.model");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ DB Error:", err.message);
    process.exit(1);
  }
};

const createAdmin = async () => {
  try {
    const email = "admin@rankup.in";
    const password = "admin123";

    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      console.log("⚠️ Admin already exists");
      process.exit();
    }

    const hashed = await bcrypt.hash(password, 10);

    await Admin.create({
      email,
      password: hashed,
    });

    console.log("✅ Admin Created Successfully");
    console.log("📧 Email:", email);
    console.log("🔐 Password:", password);

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

connectDB().then(createAdmin);
