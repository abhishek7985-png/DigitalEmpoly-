const {
  createJoiningFormService,
  getAllJoiningFormsService,
  getJoiningFormByIdService,
  updateJoiningFormService,
  deleteJoiningFormService,
} = require("../services/joiningFormService");

// Create
const createJoiningFormController = async (req, res) => {
  try {
    const data = await createJoiningFormService(req.body);

    res.status(201).json({
      success: true,
      message: "Joining Form Created Successfully",
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All
const getAllJoiningFormsController = async (req, res) => {
  try {
    const data = await getAllJoiningFormsService();

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

// Get By Id
const getJoiningFormByIdController = async (req, res) => {
  try {
    const data = await getJoiningFormByIdService(req.params.id);

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
const updateJoiningFormController = async (req, res) => {
  try {
    const data = await updateJoiningFormService(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Joining Form Updated Successfully",
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
const deleteJoiningFormController = async (req, res) => {
  try {
    await deleteJoiningFormService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Joining Form Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createJoiningFormController,
  getAllJoiningFormsController,
  getJoiningFormByIdController,
  updateJoiningFormController,
  deleteJoiningFormController,
};
