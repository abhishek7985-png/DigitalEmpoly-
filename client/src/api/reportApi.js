import API from "./axios";

// ======================================
// Employee Report
// ======================================

export const getEmployeeReport = (params = {}) =>
  API.get("/reports/employees", {
    params,
  });
