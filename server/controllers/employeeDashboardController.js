const {
  getEmployeeDashboardService,
} = require("../services/employeeDashboardService");

const getEmployeeDashboardController = async (req, res) => {
  try {
    const employeeId = req.user.id;

    const data = await getEmployeeDashboardService(employeeId);

    return res.status(200).json({
      success: true,
      message: "Employee dashboard fetched successfully.",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getEmployeeDashboardController,
};
