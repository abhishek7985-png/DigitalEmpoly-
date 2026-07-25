import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FiBell,
  FiPlus,
  FiSearch,
  FiEye,
  FiEdit,
  FiTrash2,
  FiCheck,
} from "react-icons/fi";

import { toast } from "react-toastify";

import {
  getNotifications,
  deleteNotification,
  markNotificationRead,
} from "../../api/notificationApi";
export default function NotificationList() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);

      const res = await getNotifications();

      console.log("NOTIFICATION LIST:", res);

      setNotifications(res.data || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed To Load Notifications");
    } finally {
      setLoading(false);
    }
  };

  const removeNotification = async (id) => {
    try {
      await deleteNotification(id);

      toast.success("Notification Deleted");

      loadNotifications();
    } catch (error) {
      console.log(error);
      toast.error("Delete Failed");
    }
  };

  const readNotification = async (id) => {
    try {
      await markNotificationRead(id);

      toast.success("Marked As Read");

      loadNotifications();
    } catch (error) {
      console.log(error);
      toast.error("Failed To Mark Read");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <FiBell className="text-blue-600 text-3xl" />

              <div>
                <h1 className="text-3xl font-bold text-slate-800">
                  Notifications
                </h1>

                <p className="text-gray-500">Manage Company Notifications</p>
              </div>
            </div>

            <Link
              to="/notification/add"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
            >
              <FiPlus />
              Add Notification
            </Link>
          </div>
        </div>

        {/* List */}

        <div className="bg-white rounded-2xl shadow-lg p-6">
          {loading ? (
            <div className="text-center py-20 text-lg">Loading...</div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-20">
              <FiBell className="mx-auto text-6xl text-gray-300 mb-5" />

              <h2 className="text-2xl font-semibold text-gray-500">
                No Notifications Found
              </h2>

              <p className="text-gray-400 mt-2 mb-6">
                Create your first notification.
              </p>

              <Link
                to="/notification/add"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
              >
                <FiPlus />
                Create Notification
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {notifications.map((item) => (
                <div
                  key={item._id}
                  className={`border rounded-xl p-5 flex justify-between items-center transition
                  ${item.isRead ? "bg-gray-50" : "bg-blue-50 border-blue-200"}`}
                >
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-slate-800">
                      {item.title}
                    </h2>

                    <p className="text-gray-600 mt-2">{item.message}</p>

                    <div className="flex flex-wrap gap-3 mt-4">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {item.type}
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          item.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          item.isRead
                            ? "bg-gray-200 text-gray-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.isRead ? "Read" : "Unread"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 ml-6">
                    {!item.isRead && (
                      <button
                        onClick={() => readNotification(item._id)}
                        className="text-green-600 hover:text-green-800"
                        title="Mark as Read"
                      >
                        <FiCheck size={24} />
                      </button>
                    )}

                    <button
                      onClick={() => removeNotification(item._id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <FiTrash2 size={24} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
