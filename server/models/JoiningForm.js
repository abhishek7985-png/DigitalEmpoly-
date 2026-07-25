const mongoose = require("mongoose");

const joiningFormSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      unique: true,
    },

    reportingManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },

    joiningDate: {
      type: Date,
      required: true,
    },

    joiningTime: {
      type: String,
      default: "",
    },

    officeLocation: {
      type: String,
      trim: true,
    },

    workLocation: {
      type: String,
      trim: true,
    },

    employeeType: {
      type: String,
      enum: ["Permanent", "Contract", "Intern", "Consultant"],
      default: "Permanent",
    },

    shift: {
      type: String,
      default: "General",
    },

    bankName: {
      type: String,
      trim: true,
    },

    accountHolderName: {
      type: String,
      trim: true,
    },

    accountNumber: {
      type: String,
      trim: true,
    },

    ifscCode: {
      type: String,
      trim: true,
    },

    panNumber: {
      type: String,
      trim: true,
    },

    aadhaarNumber: {
      type: String,
      trim: true,
    },

    uanNumber: {
      type: String,
      trim: true,
    },

    pfNumber: {
      type: String,
      trim: true,
    },

    esiNumber: {
      type: String,
      trim: true,
    },

    emergencyContactName: {
      type: String,
      trim: true,
    },

    emergencyContactNumber: {
      type: String,
      trim: true,
    },

    emergencyRelation: {
      type: String,
      trim: true,
    },

    documentsVerified: {
      type: Boolean,
      default: false,
    },

    hrApproved: {
      type: Boolean,
      default: false,
    },

    employeeAccepted: {
      type: Boolean,
      default: false,
    },

    salaryAccepted: {
      type: Boolean,
      default: false,
    },

    remarks: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Completed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("JoiningForm", joiningFormSchema);
