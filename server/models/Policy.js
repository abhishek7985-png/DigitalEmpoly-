const mongoose = require("mongoose");

const policySchema = new mongoose.Schema(
  {
    policyNumber: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "HR",
        "IT",
        "Security",
        "Attendance",
        "Leave",
        "Payroll",
        "Travel",
        "Health & Safety",
        "General",
      ],
      required: true,
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      default: null,
    },

    description: {
      type: String,
      required: true,
    },

    version: {
      type: String,
      default: "1.0",
    },

    effectiveDate: {
      type: Date,
      required: true,
    },

    expiryDate: {
      type: Date,
    },

    attachment: {
      type: String,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["Draft", "Published", "Archived"],
      default: "Draft",
    },

    isMandatory: {
      type: Boolean,
      default: true,
    },

    acknowledgementRequired: {
      type: Boolean,
      default: true,
    },

    employeesAcknowledged: [
      {
        employee: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Employee",
        },

        acknowledgedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    remarks: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Policy", policySchema);
