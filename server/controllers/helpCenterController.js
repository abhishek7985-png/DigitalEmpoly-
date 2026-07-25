const {
  createHelpCenterService,
  getAllHelpCentersService,
  getHelpCenterService,
  updateHelpCenterService,
  deleteHelpCenterService,
  searchDepartmentService,
} = require("../services/helpCenterService");

// Create
const createHelpCenter = async (req, res) => {
  try {
    const data = await createHelpCenterService(req.body);

    return res.status(201).json({
      success: true,
      message: "Help Center Contact Created Successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All
const getAllHelpCenters = async (req, res) => {
  try {
    const data = await getAllHelpCentersService();

    return res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get One
const getHelpCenter = async (req, res) => {
  try {
    const data = await getHelpCenterService(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Contact Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update
const updateHelpCenter = async (req, res) => {
  try {
    const data = await updateHelpCenterService(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Contact Updated Successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete
const deleteHelpCenter = async (req, res) => {
  try {
    await deleteHelpCenterService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Contact Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Search By Department
const searchDepartment = async (req, res) => {
  try {
    const data = await searchDepartmentService(req.params.department);

    return res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createHelpCenter,
  getAllHelpCenters,
  getHelpCenter,
  updateHelpCenter,
  deleteHelpCenter,
  searchDepartment,
};
