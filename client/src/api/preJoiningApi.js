import API from "./axios";

// Get All
export const getPreJoining = () => API.get("/pre-joining");

// Get By Id
export const getPreJoiningById = (id) => API.get(`/pre-joining/${id}`);

// Create
export const createPreJoining = (data) => API.post("/pre-joining", data);

// Update
export const updatePreJoining = (id, data) =>
  API.put(`/pre-joining/${id}`, data);

// Delete
export const deletePreJoining = (id) => API.delete(`/pre-joining/${id}`);
