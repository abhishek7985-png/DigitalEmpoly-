import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import PreJoiningForm from "./PreJoiningForm";

import {
  getPreJoiningById,
  updatePreJoining,
} from "../../services/preJoiningService";

export default function EditPreJoining() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    employee: "",
    reportingManager: "",
    joiningDate: "",
    reportingTime: "",
    reportingLocation: "",
    seatNumber: "",
    welcomeMessageSent: false,
    whatsappMessageSent: false,
    accommodationRequired: "No",
    transportRequired: "No",
    laptopRequired: "No",
    idCardRequired: "No",
    welcomeKitIssued: "No",
    buddyAssigned: "No",
    orientationScheduled: "No",
    documentsVerified: "Pending",
    joiningInstructions: "",
    hrNotes: "",
    remarks: "",
    status: "Pending",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await getPreJoiningById(id);

      setFormData({
        ...formData,
        ...res,

        employee: res.employee?._id || res.employee || "",

        reportingManager:
          res.reportingManager?._id || res.reportingManager || "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updatePreJoining(id, formData);

      alert("Updated Successfully");

      navigate("/prejoining");
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.message || "Update Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Pre Joining</h1>

      <PreJoiningForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}
