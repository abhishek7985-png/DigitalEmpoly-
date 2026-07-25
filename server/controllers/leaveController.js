const {
  createLeaveService,
  getLeavesService,
  getLeaveService,
  updateLeaveService,
  deleteLeaveService,
  getEmployeeLeavesService,
} = require("../services/leaveService");

// =====================================
// Apply Leave
// =====================================
const createLeave = async (req, res) => {
  try {
    const leave = await createLeaveService(req.body);

    res.status(201).json({
      success: true,
      message: "Leave applied successfully.",
      data: leave,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Get All Leaves
// =====================================
const getLeaves = async (req, res) => {
  try {
    const leaves = await getLeavesService();

    res.status(200).json({
      success: true,
      count: leaves.length,
      data: leaves,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Get Single Leave
// =====================================
const getLeave = async (req, res) => {
  try {
    const leave = await getLeaveService(req.params.id);

    res.status(200).json({
      success: true,
      data: leave,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Update Leave
// =====================================
const updateLeave = async (req, res) => {
  try {
    const leave = await updateLeaveService(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Leave updated successfully.",
      data: leave,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Delete Leave
// =====================================
const deleteLeave = async (req, res) => {
  try {
    await deleteLeaveService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Leave deleted successfully.",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Get Employee Leaves
// =====================================
const getEmployeeLeaves = async (req, res) => {
  try {
    const leaves = await getEmployeeLeavesService(req.params.employeeId);

    res.status(200).json({
      success: true,
      count: leaves.length,
      data: leaves,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createLeave,
  getLeaves,
  getLeave,
  updateLeave,
  deleteLeave,
  getEmployeeLeaves,
};
