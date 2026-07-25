const { validationResult } = require("express-validator");

const { registerUser, loginUser } = require("../services/authService");

// ==========================
// Register User
// ==========================
const register = async (req, res) => {
  console.log("REGISTER BODY:", req.body);
  console.log("HEADERS:", req.headers["content-type"]);
  console.log("BODY:", req.body);
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,

        errors: errors.array(),
      });
    }

    const user = await registerUser(req.body);

    res.status(201).json({
      success: true,

      message: "User Registered Successfully",

      data: user,
    });
  } catch (error) {
    console.log("REGISTER ERROR:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Login User
// ==========================
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const data = await loginUser(username, password);

    res.status(200).json({
      success: true,

      message: "Login Successful",

      token: data.token,

      user: data.user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,

      message: error.message,
    });
  }
};

// ==========================
// Profile
// ==========================
const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,

      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ==========================
// Admin Dashboard
// ==========================
const adminDashboard = async (req, res) => {
  res.status(200).json({
    success: true,

    message: `Welcome ${req.user.name}`,

    role: req.user.role,
  });
};

module.exports = {
  register,

  login,

  getProfile,

  adminDashboard,
};
