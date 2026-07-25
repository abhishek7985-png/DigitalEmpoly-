const {
  createDepartmentService,
  getAllDepartmentsService,
  getDepartmentByIdService,
  updateDepartmentService,
  deleteDepartmentService,
} = require("../services/departmentService");

// Create
const createDepartmentController = async (req, res) => {
  try {
    const department = await createDepartmentService(req.body);

    res.status(201).json({
      success: true,
      message: "Department Created Successfully",
      data: department,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All
const getAllDepartmentsController = async (req, res) => {
  try {
    const { page = 1, limit = 10, keyword = "", status = "" } = req.query;

    const result = await getAllDepartmentsService({
      page: Number(page),
      limit: Number(limit),
      keyword,
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

// Get One
const getDepartmentByIdController = async (req, res) => {
  try {
    const department = await getDepartmentByIdService(req.params.id);

    res.status(200).json({
      success: true,
      data: department,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update
const updateDepartmentController = async (req, res) => {
  try {
    const department = await updateDepartmentService(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Department Updated Successfully",
      data: department,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete
const deleteDepartmentController = async (req, res) => {
  try {
    await deleteDepartmentService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Department Deleted Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createDepartmentController,
  getAllDepartmentsController,
  getDepartmentByIdController,
  updateDepartmentController,
  deleteDepartmentController,
};
