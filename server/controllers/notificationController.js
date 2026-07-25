const service = require("../services/notificationService");

exports.createNotification = async (req, res) => {
  try {
    const data = await service.createNotificationService(req.body);

    res.status(201).json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const data = await service.getNotificationsService();

    res.json({
      success: true,
      data: data || [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getNotification = async (req, res) => {
  const data = await service.getNotificationService(req.params.id);

  res.json({
    success: true,
    data,
  });
};

exports.updateNotification = async (req, res) => {
  const data = await service.updateNotificationService(req.params.id, req.body);

  res.json({
    success: true,
    data,
  });
};

exports.deleteNotification = async (req, res) => {
  await service.deleteNotificationService(req.params.id);

  res.json({
    success: true,
    message: "Deleted Successfully",
  });
};

exports.markRead = async (req, res) => {
  const data = await service.markReadService(req.params.id);

  res.json({
    success: true,
    data,
  });
};
