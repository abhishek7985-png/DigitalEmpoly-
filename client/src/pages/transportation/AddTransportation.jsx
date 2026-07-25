import { useState } from "react";
import { useNavigate } from "react-router-dom";

import TransportationForm from "./TransportationForm";

import { createTransportation } from "../../api/transportationApi";

export default function AddTransportation() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    employee: "",
    transportType: "",
    travelDate: "",
    ticketNumber: "",
    fromLocation: "",
    toLocation: "",
    pickupLocation: "",
    dropLocation: "",
    pickupTime: "",
    status: "Pending",
    remarks: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createTransportation(formData);

      alert("Transportation Added Successfully");

      navigate("/transportation");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Add Transportation</h1>

        <p className="text-gray-500">Add employee travel details</p>
      </div>

      <TransportationForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}
