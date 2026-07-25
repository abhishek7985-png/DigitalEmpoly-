import API from "./axios";

// CREATE POLICY
export const createPolicy = (data) => {
  return API.post("/policies", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// GET SINGLE POLICY
export const getPolicy = (id) => {
  return API.get(`/policies/${id}`);
};
// GET ALL POLICIES
export const getPolicies = () => {
  return API.get("/policies");
};

// GET SINGLE POLICY
export const getPolicyById = (id) => {
  return API.get(`/policies/${id}`);
};

// UPDATE POLICY
export const updatePolicy = (id, data) => {
  return API.put(`/policies/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// DELETE POLICY
export const deletePolicy = (id) => {
  return API.delete(`/policies/${id}`);
};
