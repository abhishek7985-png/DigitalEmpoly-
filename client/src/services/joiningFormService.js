import API from "../api/axios";

// ===============================
// Get All Joining Forms
// ===============================
export const getAllJoiningForms = async () => {
  const res = await API.get("/joining-form");
  return res.data.data;
};

// ===============================
// Get Joining Form By ID
// ===============================
export const getJoiningFormById = async (id) => {
  const res = await API.get(`/joining-form/${id}`);
  return res.data.data;
};

// ===============================
// Create Joining Form
// ===============================
export const createJoiningForm = async (data) => {
  const res = await API.post("/joining-form", data);
  return res.data;
};

// ===============================
// Update Joining Form
// ===============================
export const updateJoiningForm = async (id, data) => {
  const res = await API.put(`/joining-form/${id}`, data);
  return res.data;
};

// ===============================
// Delete Joining Form
// ===============================
export const deleteJoiningForm = async (id) => {
  const res = await API.delete(`/joining-form/${id}`);
  return res.data;
};
