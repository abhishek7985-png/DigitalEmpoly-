import API from "./axios";

// Get All Transportation
export const getTransportation = async () => {
  const res = await API.get("/transportation");
  return res.data;
};

// Get Single Transportation
export const getTransportationById = async (id) => {
  const res = await API.get(`/transportation/${id}`);
  return res.data;
};

// Create Transportation
export const createTransportation = async (data) => {
  const res = await API.post("/transportation", data);

  return res.data;
};

// Update Transportation
export const updateTransportation = async (id, data) => {
  const res = await API.put(`/transportation/${id}`, data);

  return res.data;
};

// Delete Transportation
export const deleteTransportation = async (id) => {
  const res = await API.delete(`/transportation/${id}`);

  return res.data;
};
