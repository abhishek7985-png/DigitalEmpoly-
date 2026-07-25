import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import JoiningFormForm from "./JoiningFormForm";

import {
  getJoiningFormById,
  updateJoiningForm,
} from "../../services/joiningFormService";

export default function EditJoiningForm() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getJoiningFormById(id);
      setFormData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateJoiningForm(id, formData);

      alert("Joining Form Updated Successfully");

      navigate("/joining-form");
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.message || "Update Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Edit Joining Form</h1>
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
