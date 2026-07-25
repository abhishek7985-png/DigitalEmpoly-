import API from "./axios";

// ======================================
// Dashboard Analytics
// ======================================

export const getAnalytics = () => API.get("/analytics");
