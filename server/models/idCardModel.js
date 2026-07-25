const mongoose = require("mongoose");

const idCardSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      unique: true,
    },

    employeeCode: {
      type: String,
      required: true,
      unique: true,
    },

    cardStatus: {
      type: String,
      enum: ["Pending", "Processing", "Ready", "Delivered"],
      default: "Pending",
    },

    cardNumber: {
      type: String,
      default: "",
    },

    issueDate: {
      type: Date,
      default: null,
    },

    deliveredDate: {
      type: Date,
      default: null,
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
