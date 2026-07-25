const {
  createDesignationService,
  getAllDesignationsService,
  getDesignationByIdService,
  updateDesignationService,
  deleteDesignationService,
} = require("../services/designationService");

// =============================
// Create
// =============================
const createDesignationController = async (req, res) => {
  try {
    const designation = await createDesignationService(req.body);

    res.status(201).json({
      success: true,
      message: "Designation Created Successfully",
      data: designation,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Get All
// =============================
const getAllDesignationsController = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      keyword = "",
      department = "",
      status = "",
    } = req.query;

    const result = await getAllDesignationsService({
      page: Number(page),
      limit: Number(limit),
      keyword,
      department,
      status,
    });

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Get One
// =============================
const getDesignationByIdController = async (req, res) => {
  try {
    const designation = await getDesignationByIdService(req.params.id);

    res.status(200).json({
      success: true,
      data: designation,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Update
// =============================
const updateDesignationController = async (req, res) => {
  try {
    const designation = await updateDesignationService(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Designation Updated Successfully",
      data: designation,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Delete
// =============================
const deleteDesignationController = async (req, res) => {
  try {
    await deleteDesignationService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Designation Deleted Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createDesignationController,
  getAllDesignationsController,
  getDesignationByIdController,
  updateDesignationController,
  deleteDesignationController,
};
