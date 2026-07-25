import API from "./axios";

// Get All
export const getHelp = () => API.get("/help");

// Get Single
export const getSingleHelp = (id) => API.get(`/help/${id}`);

// Create
export const createHelp = (data) => API.post("/help", data);

// Update
export const updateHelp = (id, data) => API.put(`/help/${id}`, data);

// Delete
export const deleteHelp = (id) => API.delete(`/help/${id}`);
