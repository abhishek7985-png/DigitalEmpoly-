import API from "../api/axios";

// Get All
export const getAllDocuments = async () => {
  const res = await API.get("/documents");
  return res.data.data;
};

// Get By Id
export const getDocumentById = async (id) => {
  const res = await API.get(`/documents/${id}`);
  return res.data.data;
};

// Create
export const createDocument = async (data) => {
  const res = await API.post("/documents", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// Update
export const updateDocument = async (id, data) => {
  const res = await API.put(`/documents/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// Delete
export const deleteDocument = async (id) => {
  const res = await API.delete(`/documents/${id}`);
  return res.data;
};
