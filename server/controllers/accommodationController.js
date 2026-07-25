const {
  createAccommodationService,
  getAllAccommodationService,
  getAccommodationByIdService,
  updateAccommodationService,
  deleteAccommodationService,
} = require("../services/accommodationService");

// Create
const createAccommodationController = async (req, res) => {
  try {
    const accommodation = await createAccommodationService(req.body);

    res.status(201).json({
      success: true,
      message: "Accommodation created successfully.",
      data: accommodation,
    });
  } catch (error) {
    console.log("Accommodation Error:");
    console.log(error);

    if (error.errors) {
      console.log(error.errors);
    }

    console.log("Body:", req.body);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All
const getAllAccommodationController = async (req, res) => {
  try {
    const data = await getAllAccommodationService();

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.log("Accommodation Error:");
    console.log(error);

    if (error.errors) {
      console.log(error.errors);
    }

    console.log("Body:", req.body);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get By Id
const getAccommodationByIdController = async (req, res) => {
  try {
    const data = await getAccommodationByIdService(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Accommodation not found",
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log("Accommodation Error:");
    console.log(error);

    if (error.errors) {
      console.log(error.errors);
    }

    console.log("Body:", req.body);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update
const updateAccommodationController = async (req, res) => {
  try {
    const data = await updateAccommodationService(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Accommodation updated successfully.",
      data,
    });
  } catch (error) {
    console.log("Accommodation Error:");
    console.log(error);

    if (error.errors) {
      console.log(error.errors);
    }

    console.log("Body:", req.body);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete
const deleteAccommodationController = async (req, res) => {
  try {
    await deleteAccommodationService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Accommodation deleted successfully.",
    });
  } catch (error) {
    console.log("Accommodation Error:");
    console.log(error);

    if (error.errors) {
      console.log(error.errors);
    }

    console.log("Body:", req.body);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createAccommodationController,
  getAllAccommodationController,
  getAccommodationByIdController,
  updateAccommodationController,
  deleteAccommodationController,
};
