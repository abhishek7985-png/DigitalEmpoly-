const mongoose = require("mongoose");

const itAssetSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    assetType: {
      type: String,
      enum: [
        "Laptop",
        "Desktop",
        "Monitor",
        "Keyboard",
        "Mouse",
        "Headphone",
        "ID Card",
        "SIM Card",
        "Access Card",
        "Other",
      ],
      required: true,
    },

    assetName: {
      type: String,
      required: true,
      trim: true,
    },

    assetCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    serialNumber: {
      type: String,
      default: "",
    },

    brand: {
      type: String,
      default: "",
    },

    issueDate: {
      type: Date,
      required: true,
    },

    returnDate: {
      type: Date,
    },

    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["Assigned", "Returned", "Damaged", "Lost"],
      default: "Assigned",
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

module.exports = mongoose.model("ITAsset", itAssetSchema);
