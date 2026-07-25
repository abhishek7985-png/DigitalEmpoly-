const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      unique: true,
    },
    employeeCode: {
      type: String,
      unique: true,
      sparse: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },

    officialEmail: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
    },

    personalEmail: {
      type: String,
      lowercase: true,
    },

    officialMobile: String,

    personalMobile: String,

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    dob: Date,

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },

    designation: String,

    joiningDate: Date,

    employmentType: {
      type: String,
      enum: ["Full Time", "Part Time", "Intern", "Contract"],
      default: "Full Time",
    },
    //personalMobile: String,
    //officialMobile: String,
    //personalEmail: String,
    //officialEmail: String,
    presentAddress: String,
    permanentAddress: String,

    emergencyContactName: String,
    emergencyContactNumber: String,
    emergencyContactRelation: String,

    aadhaarNumber: String,
    panNumber: String,
    passportNumber: String,
    drivingLicenseNumber: String,
    uanNumber: String,
    esicNumber: String,

    bankName: String,
    accountNumber: String,
    ifscCode: String,
    branchName: String,

    highestQualification: String,
    totalExperience: String,

    employeeCardNumber: String,

    laptopIssued: {
      type: Boolean,
      default: false,
    },

    simNumber: String,
    reportingManager: String,

    salary: Number,

    address: String,

    profileImage: String,

    resume: String,

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

module.exports = mongoose.model("Employee", employeeSchema);
