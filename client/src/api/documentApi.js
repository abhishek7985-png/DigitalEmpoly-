import API from "./axios";

// Upload
export const createDocument = (data) => {
  return API.post("/documents/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// All
export const getAllDocuments = () => {
  return API.get("/documents");
};

// Single
export const getDocumentById = (id) => {
  return API.get(`/documents/${id}`);
};

// Update
export const updateDocument = (id, data) => {
  return API.put(`/documents/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Delete
export const deleteDocument = (id) => {
  return API.delete(`/documents/${id}`);
};

// Verify
export const verifyDocument = (id) => {
  return API.patch(`/documents/verify/${id}`);
};

// Reject
export const rejectDocument = (id) => {
  return API.patch(`/documents/reject/${id}`);
};
