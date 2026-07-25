import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";

import { getNotificationById } from "../../api/notificationApi";

export default function ViewNotification() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [notification, setNotification] = useState(null);

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
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center text-xl">Loading...</div>;
  }

  if (!notification) {
    return (
      <div className="p-10 text-center text-red-600">
        Notification Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Notification Details</h1>

            <p className="text-gray-500">Complete Notification Information</p>
          </div>

          <div className="flex gap-3">
            <Link
              to="/notification"
              className="border px-5 py-3 rounded-xl flex items-center gap-2"
            >
              <FiArrowLeft />
              Back
            </Link>

            <Link
              to={`/notification/edit/${notification._id}`}
              className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"
            >
              <FiEdit />
              Edit
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Detail title="Notification Title" value={notification.title} />

          <Detail title="Notification Type" value={notification.type} />

          <Detail title="Status" value={notification.status} />

          <Detail
            title="Read Status"
            value={notification.isRead ? "Read" : "Unread"}
          />

          <Detail
            title="Created At"
            value={
              notification.createdAt
                ? new Date(notification.createdAt).toLocaleString()
                : "-"
            }
          />

          <Detail
            title="Updated At"
            value={
              notification.updatedAt
                ? new Date(notification.updatedAt).toLocaleString()
                : "-"
            }
          />
        </div>

        <div className="mt-10">
          <h2 className="font-bold text-xl mb-3">Notification Message</h2>

          <div className="border rounded-xl p-5 bg-gray-50 whitespace-pre-wrap">
            {notification.message}
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({ title, value }) {
  return (
    <div>
      <label className="text-gray-500 text-sm">{title}</label>

      <div className="mt-2 border rounded-xl p-4 bg-gray-50 font-medium">
        {value || "-"}
      </div>
    </div>
  );
}
