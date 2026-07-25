const mongoose = require("mongoose");

const helpCenterSchema = new mongoose.Schema(
  {
    department: {
      type: String,
      required: true,
      enum: [
        "HR",
        "IT",
        "Payroll",
        "Admin",
        "Transport",
        "Accommodation",
        "Security",
        "Emergency",
      ],
    },

    contactPerson: {
      type: String,
      required: true,
      trim: true,
    },

    designation: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
    },

    extension: {
      type: String,
      default: "",
    },

    officeLocation: {
      type: String,
      default: "",
    },

    availableTime: {
      type: String,
      default: "09:00 AM - 06:00 PM",
    },

    description: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("HelpCenter", helpCenterSchema);
