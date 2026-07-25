const mongoose = require("mongoose");

const idCardSchema = new mongoose.Schema(
  {
    // Employee Reference
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      unique: true,
    },

    // Card Details
    cardNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    employeeCode: {
      type: String,
      required: true,
      trim: true,
    },

    employeeName: {
      type: String,
      required: true,
      trim: true,
    },

    profileImage: {
      type: String,
      default: "",
    },

    // Office Details
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },

    designation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Designation",
    },

    reportingManager: {
      type: String,
      default: "",
    },

    // Personal Details
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },

    dob: Date,

    // Contact
    officialEmail: String,

    personalEmail: String,

    officialMobile: String,

    personalMobile: String,

    emergencyContactName: String,

    emergencyContactNumber: String,

    emergencyContactRelation: String,

    // Address
    address: String,

    // Card Dates
    issueDate: {
      type: Date,
      default: Date.now,
    },

    expiryDate: Date,

    // QR Code
    qrCode: {
      type: String,
      default: "",
    },

    // Barcode
    barcode: {
      type: String,
      default: "",
    },

    // PDF
    pdfFile: {
      type: String,
      default: "",
    },

    // Status
    status: {
      type: String,
      enum: ["Pending", "Generated", "Printed", "Inactive"],
      default: "Pending",
    },

    printed: {
      type: Boolean,
      default: false,
    },

    printedAt: Date,

    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    remarks: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("IDCard", idCardSchema);
