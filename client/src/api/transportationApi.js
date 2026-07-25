import axios from "axios";

const transportationAPI = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

// Get All

export const getTransportation = async () => {
  return await transportationAPI.get("/transportation");
};

// Get By ID

export const getTransportationById = async (id) => {
  return await transportationAPI.get(`/transportation/${id}`);
};

// Create

export const createTransportation = async (data) => {
  return await transportationAPI.post("/transportation", data);
};

// Update

export const updateTransportation = async (id, data) => {
  return await transportationAPI.put(`/transportation/${id}`, data);
};

// Delete

export const deleteTransportation = async (id) => {
  return await transportationAPI.delete(`/transportation/${id}`);
};
