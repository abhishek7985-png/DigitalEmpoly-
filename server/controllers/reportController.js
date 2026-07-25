const { getEmployeeReportService } = require("../services/reportService");

// =============================================
// Employee Report
// =============================================
const employeeReport = async (req, res) => {
  try {
    const { keyword = "", department = "", status = "" } = req.query;

    const employees = await getEmployeeReportService({
      keyword,
      department,
      status,
    });

    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  employeeReport,
};
