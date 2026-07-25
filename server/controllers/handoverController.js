const {
  createHandoverService,
  getAllHandoversService,
  getHandoverService,
  getEmployeeHandoverService,
  updateHandoverService,
  deleteHandoverService,
} = require("../services/handoverService");

// ==============================
// Create Handover
// ==============================
const createHandover = async (req, res) => {
  try {
    const data = await createHandoverService(req.body);

    res.status(201).json({
      success: true,
      message: "Handover Created Successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get All
// ==============================
const getAllHandovers = async (req, res) => {
  try {
    const data = await getAllHandoversService();

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get One
// ==============================
const getHandover = async (req, res) => {
  try {
    const data = await getHandoverService(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Handover Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get Employee
// ==============================
const getEmployeeHandover = async (req, res) => {
  try {
    const data = await getEmployeeHandoverService(req.params.employeeId);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Update
// ==============================
const updateHandover = async (req, res) => {
  try {
    const data = await updateHandoverService(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Updated Successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Delete
// ==============================
const deleteHandover = async (req, res) => {
  try {
    await deleteHandoverService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Manager Approval
// ==============================
const approveManager = async (req, res) => {
  try {
    const data = await updateHandoverService(req.params.id, {
      managerApproval: {
        status: "Approved",
        approvedBy: req.user.id,
        approvedAt: new Date(),
        remarks: req.body.remarks,
      },
      overallStatus: "In Progress",
    });

    res.status(200).json({
      success: true,
      message: "Manager Approved",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// IT Approval
// ==============================
const approveIT = async (req, res) => {
  try {
    const data = await updateHandoverService(req.params.id, {
      itApproval: {
        status: "Approved",
        approvedBy: req.user.id,
        approvedAt: new Date(),
        remarks: req.body.remarks,
      },
    });

    res.status(200).json({
      success: true,
      message: "IT Approved",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Admin Approval
// ==============================
const approveAdmin = async (req, res) => {
  try {
    const data = await updateHandoverService(req.params.id, {
      adminApproval: {
        status: "Approved",
        approvedBy: req.user.id,
        approvedAt: new Date(),
        remarks: req.body.remarks,
      },
    });

    res.status(200).json({
      success: true,
      message: "Admin Approved",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Payroll Approval
// ==============================
const approvePayroll = async (req, res) => {
  try {
    const data = await updateHandoverService(req.params.id, {
      payrollApproval: {
        status: "Approved",
        approvedBy: req.user.id,
        approvedAt: new Date(),
        remarks: req.body.remarks,
      },
    });

    res.status(200).json({
      success: true,
      message: "Payroll Approved",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// HOD Approval
// ==============================
const approveHOD = async (req, res) => {
  try {
    const data = await updateHandoverService(req.params.id, {
      hodApproval: {
        status: "Approved",
        approvedBy: req.user.id,
        approvedAt: new Date(),
        remarks: req.body.remarks,
      },
      overallStatus: "Completed",
    });

    res.status(200).json({
      success: true,
      message: "HOD Approved",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createHandover,
  getAllHandovers,
  getHandover,
  getEmployeeHandover,
  updateHandover,
  deleteHandover,
  approveManager,
  approveIT,
  approveAdmin,
  approvePayroll,
  approveHOD,
};
