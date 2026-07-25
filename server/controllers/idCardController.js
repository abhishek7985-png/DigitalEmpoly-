const QRCode = require("qrcode");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const IDCard = require("../models/IDCard");

const {
  createIDCardService,
  getAllIDCardsService,
  getIDCardService,
  updateIDCardService,
  deleteIDCardService,
  searchIDCardService,
  getEmployeeIDCardService,
  markPrintedService,
  generateCardService,
} = require("../services/idCardService");

// ============================================
// Create ID Card
// ============================================
const createIDCard = async (req, res) => {
  try {
    console.log("ID CARD BODY:", req.body);

    const card = await createIDCardService(req.body);

    res.status(201).json({
      success: true,
      message: "ID Card Created Successfully",
      data: card,
    });
  } catch (error) {
    console.log("FULL ERROR:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
// ============================================
// Get All ID Cards
// ============================================
const getAllIDCards = async (req, res) => {
  try {
    const { page = 1, limit = 10, keyword = "", status = "" } = req.query;

    const result = await getAllIDCardsService({
      page: Number(page),
      limit: Number(limit),
      keyword,
      status,
    });

    res.status(200).json({
      success: true,
      data: result.cards,
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

// ============================================
// Get Single ID Card
// ============================================
const getIDCard = async (req, res) => {
  try {
    const card = await getIDCardService(req.params.id);

    res.status(200).json({
      success: true,
      data: card,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// Get Employee ID Card
// ============================================
// Get Employee ID Card
const getEmployeeIDCard = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const idCard = await IDCard.findOne({
      employee: employeeId,
    }).populate("employee");

    if (!idCard) {
      return res.status(404).json({
        success: false,
        message: "ID Card not found",
      });
    }

    res.status(200).json({
      success: true,
      data: idCard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// Update
// ============================================
const updateIDCard = async (req, res) => {
  try {
    const card = await updateIDCardService(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "ID Card Updated Successfully",
      data: card,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// Delete
// ============================================
const deleteIDCard = async (req, res) => {
  try {
    await deleteIDCardService(req.params.id);

    res.status(200).json({
      success: true,
      message: "ID Card Deleted Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// Search
// ============================================
const searchIDCard = async (req, res) => {
  try {
    const cards = await searchIDCardService(req.query.keyword || "");

    res.status(200).json({
      success: true,
      data: cards,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// Print
// ============================================
const printIDCard = async (req, res) => {
  try {
    const card = await markPrintedService(req.params.id);

    res.status(200).json({
      success: true,
      message: "ID Card Printed Successfully",
      data: card,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// Generate QR / PDF
// ============================================
const generateIDCard = async (req, res) => {
  try {
    const card = await getIDCardService(req.params.id);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: "ID Card Not Found",
      });
    }

    // Folder
    const uploadPath = path.join(__dirname, "../uploads/idcards");

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // QR
    const qrFile = `qr-${Date.now()}.png`;

    const qrPath = path.join(uploadPath, qrFile);

    await QRCode.toFile(
      qrPath,
      JSON.stringify({
        employee: card.employeeName,
        employeeCode: card.employeeCode,
        cardNumber: card.cardNumber,
      }),
    );

    // PDF
    const pdfFile = `idcard-${Date.now()}.pdf`;

    const pdfPath = path.join(uploadPath, pdfFile);

    const doc = new PDFDocument({
      size: [350, 520],
      margin: 20,
    });

    doc.pipe(fs.createWriteStream(pdfPath));

    doc.fontSize(22).text("OLECTRA", {
      align: "center",
    });

    doc.moveDown();

    doc.fontSize(16).text("Employee Identity Card", {
      align: "center",
    });

    doc.moveDown(2);

    doc.fontSize(14).text(`Name : ${card.employeeName}`);

    doc.text(`Employee Code : ${card.employeeCode}`);

    doc.text(`Card Number : ${card.cardNumber}`);

    doc.text(`Department : ${card.department?.departmentName || ""}`);

    doc.text(`Designation : ${card.designation?.designationName || ""}`);

    doc.text(`Blood Group : ${card.bloodGroup}`);

    doc.text(`Valid Till : ${new Date(card.expiryDate).toLocaleDateString()}`);

    doc.moveDown();

    doc.image(qrPath, {
      fit: [120, 120],
      align: "center",
    });

    doc.end();

    const updated = await generateCardService(
      card._id,
      `/uploads/idcards/${qrFile}`,
      `/uploads/idcards/${pdfFile}`,
    );

    res.status(200).json({
      success: true,
      message: "ID Card Generated Successfully",
      data: updated,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createIDCard,
  getAllIDCards,
  getIDCard,
  getEmployeeIDCard,
  updateIDCard,
  deleteIDCard,
  searchIDCard,
  printIDCard,
  generateIDCard,
};
