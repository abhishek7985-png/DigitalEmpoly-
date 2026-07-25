const mongoose = require("mongoose");

const employeeDocumentSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      unique: true,
    },

    aadhaar: {
      type: String,
      default: "",
    },

    pan: {
      type: String,
      default: "",
    },

    resume: {
      type: String,
      default: "",
    },

    photo: {
      type: String,
      default: "",
    },

    offerLetter: {
      type: String,
      default: "",
    },

    experienceLetter: {
      type: String,
      default: "",
    },

    educationCertificate: {
      type: String,
      default: "",
    },

    bankProof: {
      type: String,
      default: "",
    },

    verificationStatus: {
      type: String,
      enum: ["Pending", "Verified", "Rejected"],
      default: "Pending",
    },

    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    verifiedAt: {
      type: Date,
      default: null,
    },

    rejectionReason: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("EmployeeDocument", employeeDocumentSchema);
