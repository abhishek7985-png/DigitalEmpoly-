const mongoose = require("mongoose");

const joiningChecklistSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      unique: true,
    },

    offerLetterSubmitted: {
      type: Boolean,
      default: false,
    },

    aadhaarSubmitted: {
      type: Boolean,
      default: false,
    },

    panSubmitted: {
      type: Boolean,
      default: false,
    },

    bankDetailsSubmitted: {
      type: Boolean,
      default: false,
    },

    documentsVerified: {
      type: Boolean,
      default: false,
    },

    laptopIssued: {
      type: Boolean,
      default: false,
    },

    idCardIssued: {
      type: Boolean,
      default: false,
    },

    officialEmailCreated: {
      type: Boolean,
      default: false,
    },

    attendanceEnabled: {
      type: Boolean,
      default: false,
    },

    orientationCompleted: {
      type: Boolean,
      default: false,
    },

    managerIntroduction: {
      type: Boolean,
      default: false,
    },

    hrApproval: {
      type: Boolean,
      default: false,
    },

    onboardingStatus: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
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

module.exports = mongoose.model("JoiningChecklist", joiningChecklistSchema);
