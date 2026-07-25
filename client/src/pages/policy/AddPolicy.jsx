import { useState } from "react";
import { toast } from "react-toastify";

import PolicyForm from "./PolicyForm";
import { createPolicy } from "../../api/policyApi";
//import PolicyForm from "./PolicyForm";
export default function AddPolicy() {
  const [loading, setLoading] = useState(false);

  const handleCreatePolicy = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("policyNumber", data.policyNumber);

      formData.append("title", data.title);

      formData.append("category", data.category);

      formData.append("version", data.version);

      formData.append("effectiveDate", data.effectiveDate);

      formData.append("expiryDate", data.expiryDate);

      formData.append("status", data.status);

      formData.append("isMandatory", data.isMandatory ? "true" : "false");

      formData.append("description", data.description);

      if (data.attachment && data.attachment.length > 0) {
        formData.append("attachment", data.attachment[0]);
      }

      console.log("SENDING DATA", data);

      const res = await createPolicy(formData);

      console.log("POLICY RESPONSE", res.data);

      toast.success("Policy Created Successfully");

      window.location.reload();
    } catch (error) {
      console.log("POLICY ERROR", error);

      toast.error(error.response?.data?.message || "Policy Create Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <PolicyForm onSubmit={handleCreatePolicy} loading={loading} />
      </div>
    </div>
  );
}
