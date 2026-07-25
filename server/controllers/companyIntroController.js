const {
  createCompanyIntroService,
  getAllCompanyIntroService,
  getCompanyIntroService,
  updateCompanyIntroService,
  deleteCompanyIntroService,
} = require("../services/companyIntroService");

// Create
const createCompanyIntro = async (req, res) => {
  try {
    const data = {
      ...req.body,
      companyLogo: req.files?.companyLogo ? req.files.companyLogo[0].path : "",

      companyVideo: req.files?.companyVideo
        ? req.files.companyVideo[0].path
        : "",

      officeGallery: req.files?.officeGallery
        ? req.files.officeGallery.map((file) => file.path)
        : [],
    };

    const company = await createCompanyIntroService(data);

    return res.status(201).json({
      success: true,
      message: "Company Introduction Created Successfully",
      data: company,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All
const getAllCompanyIntro = async (req, res) => {
  try {
    const data = await getAllCompanyIntroService();

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
const getCompanyIntro = async (req, res) => {
  try {
    const data = await getCompanyIntroService(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Company Introduction Not Found",
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
const updateCompanyIntro = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
    };

    if (req.files?.companyLogo) {
      updateData.companyLogo = req.files.companyLogo[0].path;
    }

    if (req.files?.companyVideo) {
      updateData.companyVideo = req.files.companyVideo[0].path;
    }

    if (req.files?.officeGallery) {
      updateData.officeGallery = req.files.officeGallery.map(
        (file) => file.path,
      );
    }

    const data = await updateCompanyIntroService(req.params.id, updateData);

    return res.status(200).json({
      success: true,
      message: "Company Introduction Updated Successfully",
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
const deleteCompanyIntro = async (req, res) => {
  try {
    await deleteCompanyIntroService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Company Introduction Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCompanyIntro,
  getAllCompanyIntro,
  getCompanyIntro,
  updateCompanyIntro,
  deleteCompanyIntro,
};
