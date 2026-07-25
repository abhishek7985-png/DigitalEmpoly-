const {
  createTransportationService,
  getAllTransportationService,
  getTransportationByIdService,
  updateTransportationService,
  deleteTransportationService,
} = require("../services/transportationService");

// Create
const createTransportationController = async (req, res) => {
  try {
    const data = await createTransportationService(req.body);

    res.status(201).json({
      success: true,
      message: "Transportation created successfully.",
      data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All
const getAllTransportationController = async (req, res) => {
  try {
    const data = await getAllTransportationService();

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

// Get By Id
const getTransportationByIdController = async (req, res) => {
  try {
    const data = await getTransportationByIdService(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Transportation not found",
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

// Update
const updateTransportationController = async (req, res) => {
  try {
    const data = await updateTransportationService(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Transportation updated successfully.",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete
const deleteTransportationController = async (req, res) => {
  try {
    await deleteTransportationService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Transportation deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTransportationController,
  getAllTransportationController,
  getTransportationByIdController,
  updateTransportationController,
  deleteTransportationController,
};
