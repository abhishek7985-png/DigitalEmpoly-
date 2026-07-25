import API from "./axios";

// Get all assets
export const getAssets = async () => {
  const response = await API.get("/it-assets");

  return response.data;
};

// Get single asset

export const getAssetById = async (id) => {
  const response = await API.get(`/it-assets/${id}`);

  return response.data;
};

// Create asset

export const createAsset = async (data) => {
  const response = await API.post("/it-assets", data);

  return response.data;
};

// Update asset

export const updateAsset = async (id, data) => {
  const response = await API.put(`/it-assets/${id}`, data);

  return response.data;
};

// Delete asset

export const deleteAsset = async (id) => {
  const response = await API.delete(`/it-assets/${id}`);

  return response.data;
};
