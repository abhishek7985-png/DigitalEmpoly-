const { validationResult } = require("express-validator");

const {
  createPolicyService,
  getPoliciesService,
  getPolicyService,
  updatePolicyService,
  deletePolicyService,
} = require("../services/policyService");

// Create
exports.createPolicy = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const data = {
      ...req.body,
    };

    if (req.file) {
      data.attachment = req.file.filename;
    }

    const policy = await createPolicyService(data);

    res.status(201).json({
      success: true,
      message: "Policy Created Successfully",
      data: policy,
    });
  } catch (error) {
    console.log("CREATE POLICY ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All
exports.getPolicies = async (req, res) => {
  try {
    const result = await getPoliciesService(req.query);

    res.json({
      success: true,
      data: result.policies,
      total: result.total,
      currentPage: result.currentPage,
      totalPages: result.totalPages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get One
exports.getPolicy = async (req, res) => {
  try {
    const policy = await getPolicyService(req.params.id);

    res.json({
      success: true,
      data: policy,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update
exports.updatePolicy = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };

    if (req.file) {
      data.file = req.file.filename;
    }

    const policy = await updatePolicyService(req.params.id, data);

    res.json({
      success: true,
      message: "Policy Updated Successfully",
      data: policy,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete
exports.deletePolicy = async (req, res) => {
  try {
    await deletePolicyService(req.params.id);

    res.json({
      success: true,
      message: "Policy Deleted Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
