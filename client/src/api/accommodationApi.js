import API from "./axios";

// Get All Accommodation
export const getAccommodation = () => API.get("/accommodation");

// Get Single Accommodation
export const getAccommodationById = (id) => API.get(`/accommodation/${id}`);

// Create
export const createAccommodation = (data) => API.post("/accommodation", data);

// Update
export const updateAccommodation = (id, data) =>
  API.put(`/accommodation/${id}`, data);

// Delete
export const deleteAccommodation = (id) => API.delete(`/accommodation/${id}`);
