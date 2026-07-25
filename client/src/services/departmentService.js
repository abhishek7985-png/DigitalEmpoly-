import API from "../api/axios";

// =========================
// Get All Departments
// =========================
export const getDepartments = async () => {
  const res = await API.get("/departments");
  return res.data.data;
};

// =========================
// Get Department By Id
// =========================
export const getDepartmentById = async (id) => {
  const res = await API.get(`/departments/${id}`);
  return res.data.data;
};

// =========================
// Create Department
// =========================
export const createDepartment = async (data) => {
  const res = await API.post("/departments", data);
  return res.data;
};

// =========================
// Update Department
// =========================
export const updateDepartment = async (id, data) => {
  const res = await API.put(`/departments/${id}`, data);
  return res.data;
};

// =========================
// Delete Department
// =========================
export const deleteDepartment = async (id) => {
  const res = await API.delete(`/departments/${id}`);
  return res.data;
};
