import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DocumentForm from "./DocumentForm";

import { createDocument } from "../../services/documentService";

export default function AddDocument() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    employee: "",

    documentType: "",

    documentNumber: "",

    expiryDate: "",

    status: "Pending",

    remarks: "",

    file: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = new FormData();

    Object.keys(formData).forEach((key) => {
      body.append(key, formData[key]);
    });

    try {
      setLoading(true);

      await createDocument(body);

      alert("Document Uploaded Successfully");

      navigate("/documents");
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.message || "Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Upload Document</h1>

      <DocumentForm
        formData={formData}
        setFormData={setFormData}
        loading={loading}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
