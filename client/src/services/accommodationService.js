import API from "../api/axios";

// ==============================
// Get All Accommodation
// ==============================
export const getAllAccommodation = async () => {
  const res = await API.get("/accommodation");
  return res.data.data;
};

// ==============================
// Get Single Accommodation
// ==============================
export const getAccommodationById = async (id) => {
  const res = await API.get(`/accommodation/${id}`);
  return res.data.data;
};

// ==============================
// Create Accommodation
// ==============================
export const createAccommodation = async (data) => {
  const res = await API.post("/accommodation", data);
  return res.data;
};

// ==============================
// Update Accommodation
// ==============================
export const updateAccommodation = async (id, data) => {
  const res = await API.put(`/accommodation/${id}`, data);
  return res.data;
};

// ==============================
// Delete Accommodation
// ==============================
export const deleteAccommodation = async (id) => {
  const res = await API.delete(`/accommodation/${id}`);
  return res.data;
};
