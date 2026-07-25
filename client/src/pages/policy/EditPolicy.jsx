import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import PolicyForm from "./PolicyForm";
import { getPolicy, updatePolicy } from "../../api/policyApi";

export default function EditPolicy() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [policy, setPolicy] = useState({});

  useEffect(() => {
    loadPolicy();
  }, []);

  const loadPolicy = async () => {
    try {
      setLoading(true);

      const res = await getPolicy(id);

      setPolicy(res.data);
    } catch (error) {
      toast.error("Failed to Load Policy");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key === "attachment") {
          if (data.attachment?.length > 0) {
            formData.append("attachment", data.attachment[0]);
          }
        } else {
          formData.append(key, data[key]);
        }
      });

      await updatePolicy(id, formData);

      toast.success("Policy Updated Successfully");

      navigate("/policy");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to Update Policy");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !policy._id) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <PolicyForm defaultValues={policy} onSubmit={onSubmit} loading={loading} />
  );
}
