const mongoose = require("mongoose");

const transportationSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    transportType: {
      type: String,
      enum: ["Flight", "Train", "Bus", "Cab", "Company Vehicle"],
      required: true,
    },

    travelDate: {
      type: Date,
      required: true,
    },

    fromLocation: {
      type: String,
      required: true,
      trim: true,
    },

    toLocation: {
      type: String,
      required: true,
      trim: true,
    },

    ticketNumber: {
      type: String,
      default: "",
    },

    vehicleNumber: {
      type: String,
      default: "",
    },

    pickupLocation: {
      type: String,
      default: "",
    },

    dropLocation: {
      type: String,
      default: "",
    },

    pickupTime: {
      type: String,
      default: "",
    },

    driverName: {
      type: String,
      default: "",
    },

    driverContact: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Pending", "Booked", "Completed", "Cancelled"],
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

module.exports = mongoose.model("Transportation", transportationSchema);
