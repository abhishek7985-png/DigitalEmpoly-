const {
  uploadEmployeeDocuments,
  getAllEmployeeDocuments,
  getEmployeeDocuments,
  updateEmployeeDocuments,
  removeEmployeeDocuments,
  verifyDocuments,
} = require("../services/employeeDocumentService");

// Upload Documents
const uploadDocuments = async (req, res) => {
  try {
    const files = req.files || {};

    const data = {
      employee: req.body.employee,

      aadhaar: files.aadhaar ? files.aadhaar[0].path : "",

      pan: files.pan ? files.pan[0].path : "",

      resume: files.resume ? files.resume[0].path : "",

      photo: files.photo ? files.photo[0].path : "",

      offerLetter: files.offerLetter ? files.offerLetter[0].path : "",

      experienceLetter: files.experienceLetter
        ? files.experienceLetter[0].path
        : "",

      educationCertificate: files.educationCertificate
        ? files.educationCertificate[0].path
        : "",

      bankProof: files.bankProof ? files.bankProof[0].path : "",
    };

    const document = await uploadEmployeeDocuments(data);

    return res.status(201).json({
      success: true,
      message: "Documents Uploaded Successfully",
      data: document,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Documents
const getAllDocuments = async (req, res) => {
  try {
    const data = await getAllEmployeeDocuments();

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

// Get One Employee Documents
const getEmployeeDocument = async (req, res) => {
  try {
    const data = await getEmployeeDocuments(req.params.employeeId);

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

// Update Documents
const updateDocuments = async (req, res) => {
  try {
    const data = await updateEmployeeDocuments(req.params.employeeId, req.body);

    return res.status(200).json({
      success: true,
      message: "Documents Updated Successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Documents
const deleteDocuments = async (req, res) => {
  try {
    await removeEmployeeDocuments(req.params.employeeId);

    return res.status(200).json({
      success: true,
      message: "Documents Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Verify Documents
const verifyEmployeeDocumentsController = async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;

    const data = await verifyDocuments(
      req.params.employeeId,
      status,
      req.user.id,
      rejectionReason,
    );

    return res.status(200).json({
      success: true,
      message: "Document Verification Updated Successfully",
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
  uploadDocuments,
  getAllDocuments,
  getEmployeeDocument,
  updateDocuments,
  deleteDocuments,
  verifyEmployeeDocumentsController,
};
