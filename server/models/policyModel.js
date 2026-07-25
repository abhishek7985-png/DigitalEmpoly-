const mongoose = require("mongoose");

const policySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["HR", "IT", "Security", "Leave", "Attendance", "General"],
    },

    description: {
      type: String,
      default: "",
    },

    pdf: {
      type: String,
      default: "",
    },

    version: {
      type: String,
      default: "1.0",
    },

    effectiveDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    acceptedBy: [
      {
        employee: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Employee",
        },

        acceptedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Policy", policySchema);
