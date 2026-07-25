import API from "./axios";

// Get All Employees
export const getEmployees = (params = {}) => {
  return API.get("/employees", {
    params,
  });
};

// Get Single Employee
export const getEmployee = (id) => {
  return API.get(`/employees/${id}`);
};

// Create Employee
export const createEmployee = (data) => {
  return API.post("/employees", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Update Employee
export const updateEmployee = (id, data) => {
  return API.put(`/employees/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Delete Employee
export const deleteEmployee = (id) => {
  return API.delete(`/employees/${id}`);
};

// Search Employee
export const searchEmployee = (keyword) => {
  return API.get("/employees/search", {
    params: {
      keyword,
    },
  });
};
