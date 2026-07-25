const {
  createOnboardingService,
  getOnboardingsService,
  getOnboardingService,
  updateOnboardingService,
  deleteOnboardingService,
} = require("../services/hrDashboardService");

// ======================================
// Create Onboarding
// ======================================
const createOnboarding = async (req, res) => {
  try {
    const onboarding = await createOnboardingService(req.body);

    res.status(201).json({
      success: true,
      message: "Onboarding created successfully.",
      data: onboarding,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get All Onboardings
// ======================================
const getOnboardings = async (req, res) => {
  try {
    const onboardings = await getOnboardingsService();

    res.status(200).json({
      success: true,
      count: onboardings.length,
      data: onboardings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get Single Onboarding
// ======================================
const getOnboarding = async (req, res) => {
  try {
    const onboarding = await getOnboardingService(req.params.id);

    res.status(200).json({
      success: true,
      data: onboarding,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Update Onboarding
// ======================================
const updateOnboarding = async (req, res) => {
  try {
    const onboarding = await updateOnboardingService(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Onboarding updated successfully.",
      data: onboarding,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Delete Onboarding
// ======================================
const deleteOnboarding = async (req, res) => {
  try {
    await deleteOnboardingService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Onboarding deleted successfully.",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOnboarding,
  getOnboardings,
  getOnboarding,
  updateOnboarding,
  deleteOnboarding,
};
