import { useState } from "react";
import { useNavigate } from "react-router-dom";

import JoiningFormForm from "./JoiningFormForm";
import { createJoiningForm } from "../../services/joiningFormService";

export default function AddJoiningForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    employeeCode: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "Male",
    joiningDate: "",
    employmentType: "Permanent",

    department: "",
    designation: "",
    reportingManager: "",

    currentAddress: "",
    permanentAddress: "",

    bankName: "",
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",

    panNumber: "",
    aadhaarNumber: "",

    emergencyContactName: "",
    relationship: "",
    emergencyPhone: "",

    remarks: "",

    status: "Pending",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createJoiningForm(formData);

      alert("Joining Form Created Successfully");

      navigate("/joining-form");
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Add Joining Form</h1>

        <p className="text-gray-500">Create New Employee Joining Form</p>
      </div>

      <JoiningFormForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}
