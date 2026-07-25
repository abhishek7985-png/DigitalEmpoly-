import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PreJoiningForm from "./PreJoiningForm";
import { createPreJoining } from "../../services/preJoiningService";

export default function AddPreJoining() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    employee: "",

    reportingManager: "",

    joiningDate: "",

    reportingLocation: "",

    joiningInstructions: "",

    welcomeMessageSent: false,

    whatsappMessageSent: false,

    status: "Pending",

    remarks: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.employee) {
      alert("Please select Employee");
      return;
    }

    if (!formData.reportingManager) {
      alert("Please select Reporting Manager");
      return;
    }

    if (!formData.joiningDate) {
      alert("Please select Joining Date");
      return;
    }

    try {
      setLoading(true);

      console.log("Sending Data:", formData);

      await createPreJoining(formData);

      alert("Pre Joining Created Successfully");

      navigate("/prejoining");
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
        <h1 className="text-3xl font-bold">Add Pre Joining</h1>

        <p className="text-gray-500">Create new employee pre joining record</p>
      </div>

      <PreJoiningForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}
