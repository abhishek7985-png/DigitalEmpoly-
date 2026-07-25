const { getAnalyticsService } = require("../services/analyticsService");

const analytics = async (req, res) => {
  try {
    const data = await getAnalyticsService();

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

module.exports = {
  analytics,
};
