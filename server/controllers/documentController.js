const {
  uploadDocumentService,
  getAllDocumentsService,
  getDocumentService,
  getEmployeeDocumentsService,
  updateDocumentService,
  verifyDocumentService,
  rejectDocumentService,
  deleteDocumentService,
  searchDocumentsService,
} = require("../services/documentService");
const path = require("path");
// ======================================
// Upload Document
// ======================================
const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a document",
      });
    }

    const document = await uploadDocumentService({
      employee: req.body.employee,
      documentType: req.body.documentType,
      documentNumber: req.body.documentNumber,
      expiryDate: req.body.expiryDate,
      remarks: req.body.remarks,

      originalName: req.file.originalname,
      fileName: req.file.filename,
      filePath: `uploads/documents/${req.file.filename}`,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
    });

    res.status(201).json({
      success: true,
      message: "Document Uploaded Successfully",
      data: document,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get All Documents
// ======================================
const getAllDocuments = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      keyword = "",
      status = "",
      documentType = "",
    } = req.query;

    const result = await getAllDocumentsService({
      page: Number(page),
      limit: Number(limit),
      keyword,
      status,
      documentType,
    });

    res.status(200).json({
      success: true,
      data: result.documents,
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

// ======================================
// Get Single Document
// ======================================
const getDocument = async (req, res) => {
  try {
    const document = await getDocumentService(req.params.id);

    res.status(200).json({
      success: true,
      data: document,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Employee Documents
// ======================================
const getEmployeeDocuments = async (req, res) => {
  try {
    const documents = await getEmployeeDocumentsService(req.params.employeeId);

    res.status(200).json({
      success: true,
      data: documents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Update Document
// ======================================
const updateDocument = async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.file) {
      data.originalName = req.file.originalname;
      data.fileName = req.file.filename;

      data.filePath = `uploads/documents/${req.file.filename}`;
      data.fileSize = req.file.size;
      data.mimeType = req.file.mimetype;
    }
    const document = await updateDocumentService(req.params.id, data);
    console.log("Saved Path:", `uploads/documents/${req.file.filename}`);
    console.log("Actual Path:", req.file.path);

    res.status(200).json({
      success: true,
      message: "Document Updated Successfully",
      data: document,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Verify Document
// ======================================
const verifyDocument = async (req, res) => {
  try {
    const document = await verifyDocumentService(
      req.params.id,
      req.body?.verifiedBy || null,
    );

    res.status(200).json({
      success: true,
      message: "Document Verified Successfully",
      data: document,
    });
  } catch (error) {
    console.error("Verify Error:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
// ======================================
// Reject Document
// ======================================
const rejectDocument = async (req, res) => {
  try {
    const document = await rejectDocumentService(
      req.params.id,
      req.body?.remarks || "",
    );

    res.status(200).json({
      success: true,
      message: "Document Rejected",
      data: document,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Delete
// ======================================
const deleteDocument = async (req, res) => {
  try {
    await deleteDocumentService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Document Deleted Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Search
// ======================================
const searchDocuments = async (req, res) => {
  try {
    const documents = await searchDocumentsService(req.query.keyword || "");

    res.status(200).json({
      success: true,
      data: documents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  uploadDocument,
  getAllDocuments,
  getDocument,
  getEmployeeDocuments,
  updateDocument,
  verifyDocument,
  rejectDocument,
  deleteDocument,
  searchDocuments,
};
