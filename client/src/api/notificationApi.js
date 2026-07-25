import API from "./axios";

// Get All Notifications
export const getNotifications = async () => {
  const response = await API.get("/notifications");
  return response.data;
};

// Get Single Notification
export const getNotificationById = async (id) => {
  const response = await API.get(`/notifications/${id}`);
  return response.data;
};

// Create Notification
export const createNotification = async (data) => {
  const response = await API.post("/notifications", data);
  return response.data;
};

// Update Notification
export const updateNotification = async (id, data) => {
  const response = await API.put(`/notifications/${id}`, data);
  return response.data;
};

// Delete Notification
export const deleteNotification = async (id) => {
  const response = await API.delete(`/notifications/${id}`);
  return response.data;
};

// Mark Read
export const markNotificationRead = async (id) => {
  const response = await API.put(`/notifications/read/${id}`);
  return response.data;
};
