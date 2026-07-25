const {
  createPreJoining,
  getAllPreJoining,
  getPreJoiningById,
  updatePreJoining,
  deletePreJoining,
} = require("../services/preJoiningService");

// =======================================
// Create Pre Joining
// =======================================
const createPreJoiningController = async (req, res) => {
  try {
    const data = await createPreJoining(req.body);

    res.status(201).json({
      success: true,
      message: "Pre Joining created successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Get All Pre Joining
// =======================================
const getAllPreJoiningController = async (req, res) => {
  try {
    const data = await getAllPreJoining();

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

// =======================================
// Get By ID
// =======================================
const getPreJoiningByIdController = async (req, res) => {
  try {
    const data = await getPreJoiningById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Pre Joining record not found",
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
// =======================================
// Update
// =======================================
const updatePreJoiningController = async (req, res) => {
  try {
    const data = await updatePreJoining(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Updated successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Delete
// =======================================
const deletePreJoiningController = async (req, res) => {
  try {
    await deletePreJoining(req.params.id);

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPreJoiningController,
  getAllPreJoiningController,
  getPreJoiningByIdController,
  updatePreJoiningController,
  deletePreJoiningController,
};
