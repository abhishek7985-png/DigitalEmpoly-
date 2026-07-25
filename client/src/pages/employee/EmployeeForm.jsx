import { useEffect, useState } from "react";

import { getDepartments } from "../../services/departmentService";

import { getDesignations } from "../../services/designationService";

//import { getAllEmployees } from "../../services/employeeService";

import { useForm } from "react-hook-form";
//import { useForm } from "react-hook-form";
//import { useEffect } from "react";
import { FiUser, FiBriefcase } from "react-icons/fi";
export default function EmployeeForm({
  onSubmit,
  defaultValues = {},
  loading = false,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });
  const [departments, setDepartments] = useState([]);

  const [designations, setDesignations] = useState([]);

  const [managers, setManagers] = useState([]);
  useEffect(() => {
    loadDropdowns();
  }, []);

  const loadDropdowns = async () => {
    try {
      const deptResponse = await getDepartments();

      const desResponse = await getDesignations();

      setDepartments(deptResponse.data.data || []);

      setDesignations(desResponse.data.data || []);

      setManagers([
        {
          _id: "admin",
          name: "Admin",
        },
      ]);
    } catch (error) {
      console.log("Dropdown Error", error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-3xl shadow-lg p-8 space-y-8"
    >
      <div className="border-b pb-6">
        <h1 className="text-3xl font-bold text-slate-800">Add Employee</h1>

        <p className="text-slate-500 mt-2">
          Complete employee profile information.
        </p>
      </div>
      {/* Personal Information */}
      <div className="bg-slate-50 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <FiUser className="text-blue-700 text-2xl" />

          <h2 className="text-xl font-bold">Basic Information</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Input
            label="Employee ID"
            name="employeeId"
            register={register}
            rules={{
              required: "Employee ID is required",
            }}
            error={errors.employeeId}
          />

          <Input
            label="Employee Name"
            name="name"
            register={register}
            rules={{
              required: "Employee Name is required",
            }}
            error={errors.name}
          />
          <Input
            label="Official Email"
            name="email"
            type="email"
            register={register}
            rules={{
              required: "Official Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid Email",
              },
            }}
            error={errors.email}
          />

          <SelectField label="Gender" name="gender" register={register}>
            <option value="">Select</option>

            <option>Male</option>

            <option>Female</option>

            <option>Other</option>
          </SelectField>

          <Input
            label="Date Of Birth"
            type="date"
            name="dob"
            register={register}
          />

          <SelectField
            label="Marital Status"
            name="maritalStatus"
            register={register}
          >
            <option value="">Select</option>

            <option>Single</option>

            <option>Married</option>

            <option>Divorced</option>

            <option>Widowed</option>
          </SelectField>

          <SelectField
            label="Blood Group"
            name="bloodGroup"
            register={register}
          >
            <option value="">Select</option>

            <option>A+</option>
            <option>A-</option>

            <option>B+</option>
            <option>B-</option>

            <option>AB+</option>
            <option>AB-</option>

            <option>O+</option>
            <option>O-</option>
          </SelectField>
        </div>
      </div>
      {/* Company Details */}

      <div className="bg-slate-50 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <FiBriefcase className="text-green-700 text-2xl" />

          <h2 className="text-xl font-bold">Employment Details</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <SelectField label="Department" name="department" register={register}>
            <option value="">Select Department</option>

            {Array.isArray(departments) &&
              departments.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.departmentName}
                </option>
              ))}
          </SelectField>

          <SelectField
            label="Designation"
            name="designation"
            register={register}
          >
            <option value="">Select Designation</option>

            {Array.isArray(designations) &&
              designations.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.designationName}
                </option>
              ))}
          </SelectField>
          <Input
            label="Joining Date"
            type="date"
            name="joiningDate"
            register={register}
          />

          <SelectField
            label="Employment Type"
            name="employmentType"
            register={register}
          >
            <option>Full Time</option>

            <option>Intern</option>

            <option>Contract</option>

            <option>Part Time</option>
          </SelectField>

          <SelectField
            label="Reporting Manager"
            name="reportingManager"
            register={register}
          >
            <option value="">Select Manager</option>

            {Array.isArray(managers) &&
              managers.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.name}
                </option>
              ))}
          </SelectField>

          <SelectField label="Status" name="status" register={register}>
            <option>Active</option>

            <option>Inactive</option>
          </SelectField>
        </div>
      </div>
      {/* Contact */}
      <div className="bg-slate-50 rounded-2xl p-6 mt-8">
        <h2 className="text-xl font-bold mb-6 text-blue-700">
          Contact Details
        </h2>

        <div className="grid lg:grid-cols-2 gap-6">
          <Input
            label="Personal Mobile Number"
            name="personalMobile"
            register={register}
          />

          <Input
            label="Phone Number"
            name="phone"
            register={register}
            rules={{
              required: "Phone Number is required",
            }}
            error={errors.phone}
          />
          <Input
            label="Official Mobile Number"
            name="officialMobile"
            register={register}
          />

          <Input
            label="Personal Email ID"
            name="personalEmail"
            type="email"
            register={register}
          />

          <Input
            label="Official Email ID"
            name="officialEmail"
            type="email"
            register={register}
          />

          <Input
            label="Emergency Contact Name"
            name="emergencyContactName"
            register={register}
          />

          <Input
            label="Emergency Contact Number"
            name="emergencyContactNumber"
            register={register}
          />

          <Input
            label="Emergency Contact Relationship"
            name="emergencyContactRelation"
            register={register}
          />
        </div>

        <div className="mt-6">
          <label className="block mb-2 font-medium">Present Address</label>

          <textarea
            rows="3"
            {...register("presentAddress")}
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mt-6">
          <label className="block mb-2 font-medium">Permanent Address</label>

          <textarea
            rows="3"
            {...register("permanentAddress")}
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      {/* identity deatial */}
      <div className="bg-slate-50 rounded-2xl p-6 mt-8">
        <h2 className="text-xl font-bold mb-6 text-blue-700">
          Identity Details
        </h2>

        <div className="grid lg:grid-cols-2 gap-6">
          <Input
            label="Aadhaar Number"
            name="aadhaarNumber"
            register={register}
          />

          <Input label="PAN Number" name="panNumber" register={register} />

          <Input
            label="Passport Number"
            name="passportNumber"
            register={register}
          />

          <Input
            label="Driving Licence Number"
            name="drivingLicenseNumber"
            register={register}
          />

          <Input label="UAN Number" name="uanNumber" register={register} />

          <Input label="ESIC Number" name="esicNumber" register={register} />
        </div>
      </div>
      <div className="bg-slate-50 rounded-2xl p-6 mt-8">
        <h2 className="text-xl font-bold mb-6 text-blue-700">
          Banking Details
        </h2>

        <div className="grid lg:grid-cols-2 gap-6">
          <Input label="Bank Name" name="bankName" register={register} />

          <Input
            label="Account Number"
            name="accountNumber"
            register={register}
          />

          <Input label="IFSC Code" name="ifscCode" register={register} />

          <Input label="Branch Name" name="branchName" register={register} />
        </div>
      </div>
      <div className="bg-slate-50 rounded-2xl p-6 mt-8">
        <h2 className="text-xl font-bold mb-6 text-blue-700">
          Education & Professional Details
        </h2>

        <div className="grid lg:grid-cols-2 gap-6">
          <Input
            label="Highest Qualification"
            name="highestQualification"
            register={register}
          />

          <Input
            label="Total Experience (Years)"
            name="totalExperience"
            register={register}
          />
        </div>
      </div>
      <div className="bg-slate-50 rounded-2xl p-6 mt-8">
        <h2 className="text-xl font-bold mb-6 text-blue-700">
          Company Asset Details
        </h2>

        <div className="grid lg:grid-cols-2 gap-6">
          <Input
            label="Employee ID Card Number"
            name="employeeCardNumber"
            register={register}
          />

          <SelectField
            label="Laptop/Desktop Issued"
            name="laptopIssued"
            register={register}
          >
            <option value="">Select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </SelectField>

          <Input label="SIM Number" name="simNumber" register={register} />
        </div>
      </div>
      <div className="bg-slate-50 rounded-2xl p-6 mt-8">
        <h2 className="text-xl font-bold mb-6 text-blue-700">
          Upload Documents
        </h2>

        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">
              Employee Photograph
            </label>

            <input
              type="file"
              accept="image/*"
              {...register("photo")}
              className="w-full border rounded-xl p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Resume</label>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              {...register("resume")}
              className="w-full border rounded-xl p-3"
            />
          </div>
        </div>
      </div>
      {/* Submit */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          type="reset"
          className="px-8 py-3 rounded-xl border border-gray-300 hover:bg-gray-100"
        >
          Reset
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold disabled:opacity-60"
        >
          {loading ? "Saving Employee..." : "Save Employee"}
        </button>
      </div>
    </form>
  );
}

function Input({ label, name, register, error, rules, type = "text" }) {
  return (
    <div>
      <label className="block mb-2 font-medium">{label}</label>

      <input
        type={type}
        {...register(name, rules)}
        className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
      />

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}

function SelectField({ label, name, register, children }) {
  return (
    <div>
      <label className="block mb-2 font-medium">{label}</label>

      <select
        {...register(name)}
        className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
      >
        {children}
      </select>
    </div>
  );
}
