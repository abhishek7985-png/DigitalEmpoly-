const mongoose = require("mongoose");

const preJoiningSchema = new mongoose.Schema(
  {
    // Employee Details
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    reportingManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },

    // Joining Details
    joiningDate: {
      type: Date,
      required: true,
    },

    reportingTime: {
      type: String,
      default: "",
    },

    reportingLocation: {
      type: String,
      default: "",
    },

    seatNumber: {
      type: String,
      default: "",
    },

    // Communication
    welcomeMessageSent: {
      type: Boolean,
      default: false,
    },

    whatsappMessageSent: {
      type: Boolean,
      default: false,
    },

    // Requirements
    accommodationRequired: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },

    transportRequired: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },

    laptopRequired: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },

    idCardRequired: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },

    // HR Process
    welcomeKitIssued: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },

    buddyAssigned: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },

    orientationScheduled: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },

    documentsVerified: {
      type: String,
      enum: ["Pending", "Verified"],
      default: "Pending",
    },

    // Instructions
    joiningInstructions: {
      type: String,
      default: "",
    },

    hrNotes: {
      type: String,
      default: "",
    },

    remarks: {
      type: String,
      default: "",
    },

    // Status
    status: {
      type: String,
      enum: ["Pending", "Contacted", "Documents Pending", "Completed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports =
  mongoose.models.PreJoining || mongoose.model("PreJoining", preJoiningSchema);
