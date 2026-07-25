import API from "../api/axios";
//import { removeEmployee } from "../../services/employeeService";
// ================= Get All Employees =================
export const getAllEmployees = async (params = {}) => {
  const res = await API.get("/employees", { params });
  return res.data.data;
};

// ================= Get Single Employee =================
export const getEmployeeById = async (id) => {
  const res = await API.get(`/employees/${id}`);
  return res.data.data;
};

// ================= Create Employee =================
export const createEmployee = async (data) => {
  const res = await API.post("/employees", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// ================= Update Employee =================
export const updateEmployee = async (id, data) => {
  const res = await API.put(`/employees/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// ================= Delete Employee =================
export const removeEmployee = async (id) => {
  const res = await API.delete(`/employees/${id}`);
  return res.data;
};

// ================= Search Employee =================
export const searchEmployee = async (keyword) => {
  const res = await API.get("/employees/search", {
    params: { keyword },
  });
  return res.data.data;
};
