import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AccommodationForm from "./AccommodationForm";
import { createAccommodation } from "../../services/accommodationService";

export default function AddAccommodation() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    employee: "",

    accommodationType: "",

    accommodationName: "",

    address: "",

    city: "",

    checkInDate: "",

    checkOutDate: "",

    roomNumber: "",

    contactPerson: "",

    contactNumber: "",

    status: "Pending",

    remarks: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      console.log("Sending Data:", formData);

      await createAccommodation(formData);

      alert("Accommodation Added Successfully");

      navigate("/accommodation");
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Add Accommodation</h1>

      <AccommodationForm
        formData={formData}
        setFormData={setFormData}
        loading={loading}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
