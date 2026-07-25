import API from "../api/axios";

// Get All PreJoining
export const getAllPreJoining = async () => {
  const res = await API.get("/pre-joining");

  return res.data.data;
};

// Get PreJoining By ID
export const getPreJoiningById = async (id) => {
  const res = await API.get(`/pre-joining/${id}`);

  return res.data.data;
};

// Create PreJoining
export const createPreJoining = async (data) => {
  const res = await API.post("/pre-joining", data);

  return res.data;
};

// Update PreJoining
export const updatePreJoining = async (id, data) => {
  const res = await API.put(`/pre-joining/${id}`, data);

  return res.data;
};

// Delete PreJoining
export const deletePreJoining = async (id) => {
  const res = await API.delete(`/pre-joining/${id}`);

  return res.data;
};
