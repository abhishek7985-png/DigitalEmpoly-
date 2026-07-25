const mongoose = require("mongoose");

const designationSchema = new mongoose.Schema(
  {
    designationCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    designationName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    level: {
      type: Number,
      default: 1,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Designation", designationSchema);
