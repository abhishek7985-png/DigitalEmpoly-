const {
  createITAssetService,
  getAllITAssetsService,
  getITAssetByIdService,
  updateITAssetService,
  deleteITAssetService,
} = require("../services/itAssetService");

// Create
const createITAssetController = async (req, res) => {
  try {
    const data = await createITAssetService(req.body);

    res.status(201).json({
      success: true,
      message: "IT Asset assigned successfully.",
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
const getAllITAssetsController = async (req, res) => {
  try {
    const data = await getAllITAssetsService();

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
const getITAssetByIdController = async (req, res) => {
  try {
    const data = await getITAssetByIdService(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "IT Asset not found",
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
const updateITAssetController = async (req, res) => {
  try {
    const data = await updateITAssetService(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "IT Asset updated successfully.",
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
const deleteITAssetController = async (req, res) => {
  try {
    await deleteITAssetService(req.params.id);

    res.status(200).json({
      success: true,
      message: "IT Asset deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createITAssetController,
  getAllITAssetsController,
  getITAssetByIdController,
  updateITAssetController,
  deleteITAssetController,
};
