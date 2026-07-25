import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import NotificationForm from "./NotificationForm";

import {
  getNotificationById,
  updateNotification,
} from "../../api/notificationApi";

export default function EditNotification() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [notification, setNotification] = useState({
    title: "",
    message: "",
    type: "General",
    status: "Active",
    isRead: false,
  });

  useEffect(() => {
    loadNotification();
  }, []);

  const loadNotification = async () => {
    try {
      const res = await getNotificationById(id);

      console.log(res);

      setNotification(res.data);
    } catch (error) {
      console.log(error);

      toast.error("Failed To Load Notification");
    }
  };

  const handleUpdateNotification = async (data) => {
    try {
      setLoading(true);

      await updateNotification(id, data);

      toast.success("Notification Updated Successfully");

      navigate("/notification");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Notification Update Failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <NotificationForm
          defaultValues={notification}
          onSubmit={handleUpdateNotification}
          loading={loading}
        />
      </div>
    </div>
  );
}
