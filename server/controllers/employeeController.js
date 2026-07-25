const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

console.log("Mongo Ready State:", mongoose.connection.readyState);
const {
  createEmployeeService,
  getEmployeesService,
  getEmployeeService,
  updateEmployeeService,
  deleteEmployeeService,
  searchEmployeeService,
} = require("../services/employeeService");

// ==============================
// Create Employee
// ==============================
const createEmployee = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const employeeData = { ...req.body };

    // ===============================
    // Email Mapping
    // ===============================

    if (employeeData.email && !employeeData.officialEmail) {
      employeeData.officialEmail = employeeData.email;
    }

    // Model me email field nahi hai
    delete employeeData.email;

    // ===============================
    // File Upload
    // ===============================

    if (req.files?.photo?.length > 0) {
      employeeData.profileImage = req.files.photo[0].filename;
    }

    if (req.files?.resume?.length > 0) {
      employeeData.resume = req.files.resume[0].filename;
    }

    console.log("DATA TO SAVE:");
    console.log(employeeData);

    const employee = await createEmployeeService(employeeData);

    return res.status(201).json({
      success: true,
      message: "Employee Created Successfully",
      data: employee,
    });
  } catch (error) {
    console.log("================ ERROR ================");
    console.log(error);
    console.log("=======================================");

    return res.status(400).json({
      success: false,
      message: error.message,
      error: process.env.NODE_ENV === "development" ? error : undefined,
    });
  }
};

// ==============================
// Get All Employees
// ==============================
const getEmployees = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      keyword = "",
      status = "",
      department = "",
    } = req.query;

    const result = await getEmployeesService({
      page: Number(page),
      limit: Number(limit),
      keyword,
      status,
      department,
    });

    res.status(200).json({
      success: true,
      data: result.employees,
      total: result.total,
      currentPage: result.currentPage,
      totalPages: result.totalPages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get Employee By Id
// ==============================
const getEmployee = async (req, res) => {
  try {
    const employee = await getEmployeeService(req.params.id);

    res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Update Employee
// ==============================
const updateEmployee = async (req, res) => {
  try {
    const employeeData = { ...req.body };

    if (req.files?.photo) {
      employeeData.profileImage = req.files.photo[0].filename;
    }

    if (req.files?.resume) {
      employeeData.resume = req.files.resume[0].filename;
    }

    const employee = await updateEmployeeService(req.params.id, employeeData);

    res.status(200).json({
      success: true,
      message: "Employee Updated Successfully",
      data: employee,
    });
  } catch (error) {
    console.log("ERROR =", error);

    res.status(400).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

// ==============================
// Delete Employee
// ==============================
const deleteEmployee = async (req, res) => {
  try {
    await deleteEmployeeService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Employee Deleted Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Search Employee
// ==============================
const searchEmployee = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const employees = await searchEmployeeService(keyword);

    res.status(200).json({
      success: true,
      data: employees,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  searchEmployee,
};
