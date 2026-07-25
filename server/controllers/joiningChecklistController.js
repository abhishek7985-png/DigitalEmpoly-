const {
  createChecklistService,
  getAllChecklistService,
  getChecklistByIdService,
  updateChecklistService,
  deleteChecklistService,
} = require("../services/joiningChecklistService");

const createChecklistController = async (req, res) => {
  try {
    const data = await createChecklistService(req.body);

    res.status(201).json({
      success: true,
      message: "Joining Checklist created successfully.",
      data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllChecklistController = async (req, res) => {
  try {
    const data = await getAllChecklistService();

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

const getChecklistByIdController = async (req, res) => {
  try {
    const data = await getChecklistByIdService(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Checklist not found",
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

const updateChecklistController = async (req, res) => {
  try {
    const data = await updateChecklistService(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Checklist updated successfully.",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteChecklistController = async (req, res) => {
  try {
    await deleteChecklistService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Checklist deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createChecklistController,
  getAllChecklistController,
  getChecklistByIdController,
  updateChecklistController,
  deleteChecklistController,
};
