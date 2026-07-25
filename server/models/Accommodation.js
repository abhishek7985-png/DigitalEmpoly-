const mongoose = require("mongoose");

const accommodationSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    accommodationType: {
      type: String,
      enum: ["Company Guest House", "Hotel", "Hostel", "Rental", "Own"],
      required: true,
    },

    accommodationName: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    checkInDate: {
      type: Date,
      required: true,
    },

    checkOutDate: {
      type: Date,
    },

    roomNumber: {
      type: String,
      default: "",
    },

    contactPerson: {
      type: String,
      default: "",
    },

    contactNumber: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Pending", "Allocated", "Completed", "Cancelled"],
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

module.exports = mongoose.model("Accommodation", accommodationSchema);
