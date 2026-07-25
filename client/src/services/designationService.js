import API from "../api/axios";

export const getDesignations = async () => {
  const res = await API.get("/designations");
  return res.data.data;
};

export const getDesignationById = async (id) => {
  const res = await API.get(`/designations/${id}`);
  return res.data.data;
};

export const createDesignation = async (data) => {
  const res = await API.post("/designations", data);
  return res.data;
};

export const updateDesignation = async (id, data) => {
  const res = await API.put(`/designations/${id}`, data);
  return res.data;
};

export const deleteDesignation = async (id) => {
  const res = await API.delete(`/designations/${id}`);
  return res.data;
};
