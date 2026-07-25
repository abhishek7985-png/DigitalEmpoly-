import API from "../api/axios";

export const getDashboardData = async () => {
  const { data } = await API.get("/dashboard");
  return data.data;
};
