const {
  checkInService,
  getAttendanceService,
  getSingleAttendanceService,
  checkOutService,
  deleteAttendanceService,
  getEmployeeAttendanceService,
} = require("../services/attendanceService");

// =======================================
// Employee Check In
// =======================================
const checkIn = async (req, res) => {
  try {
    const attendance = await checkInService(req.body);

    res.status(201).json({
      success: true,
      message: "Check In successful",
      data: attendance,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Get All Attendance
// =======================================
const getAttendance = async (req, res) => {
  try {
    const attendance = await getAttendanceService();

    res.status(200).json({
      success: true,
      count: attendance.length,
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Get Single Attendance
// =======================================
const getAttendanceById = async (req, res) => {
  try {
    const attendance = await getSingleAttendanceService(req.params.id);

    res.status(200).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Employee Check Out
// =======================================
const checkOut = async (req, res) => {
  try {
    const attendance = await checkOutService(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Check Out successful",
      data: attendance,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Delete Attendance
// =======================================
const deleteAttendance = async (req, res) => {
  try {
    await deleteAttendanceService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Attendance deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Get Employee Attendance
// =======================================
const getEmployeeAttendance = async (req, res) => {
  try {
    const attendance = await getEmployeeAttendanceService(
      req.params.employeeId,
    );

    res.status(200).json({
      success: true,
      count: attendance.length,
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  checkIn,
  getAttendance,
  getAttendanceById,
  checkOut,
  deleteAttendance,
  getEmployeeAttendance,
};
