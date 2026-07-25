import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import NotificationForm from "./NotificationForm";
import { createNotification } from "../../api/notificationApi";

export default function AddNotification() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleCreateNotification = async (data) => {
    try {
      setLoading(true);

      const res = await createNotification(data);

      console.log("NOTIFICATION RESPONSE:", res);

      toast.success("Notification Created Successfully");

      navigate("/notification");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Notification Create Failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <NotificationForm
          onSubmit={handleCreateNotification}
          loading={loading}
        />
      </div>
    </div>
  );
}
