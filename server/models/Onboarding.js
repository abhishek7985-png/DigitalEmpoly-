const mongoose = require("mongoose");

const onboardingSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    reportingManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    joiningDate: {
      type: Date,
      required: true,
    },

    offerLetter: {
      type: String,
      default: "",
    },

    progress: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Pending", "PreJoining", "InProgress", "Completed"],
      default: "Pending",
    },

    reminderSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Onboarding", onboardingSchema);
