const { dashboardService } = require("../services/dashboardService");

const getDashboardController = async (req, res) => {
  try {
    const data = await dashboardService();

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getDashboardController,
};
