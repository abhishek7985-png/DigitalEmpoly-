const mongoose = require("mongoose");

const companyIntroSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    aboutCompany: {
      type: String,
      required: true,
    },

    mission: {
      type: String,
      default: "",
    },

    vision: {
      type: String,
      default: "",
    },

    coreValues: [
      {
        type: String,
      },
    ],

    ceoMessage: {
      type: String,
      default: "",
    },

    companyLogo: {
      type: String,
      default: "",
    },

    companyVideo: {
      type: String,
      default: "",
    },

    officeGallery: [
      {
        type: String,
      },
    ],

    website: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    phone: {
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

module.exports = mongoose.model("CompanyIntroduction", companyIntroSchema);
