import API from "./axios";

export const createIDCard = (data) => API.post("/id-cards", data);

export const getIDCards = () => API.get("/id-cards");

export const getIDCard = (id) => API.get(`/id-cards/${id}`);

export const updateIDCard = (id, data) => API.put(`/id-cards/${id}`, data);

export const deleteIDCard = (id) => API.delete(`/id-cards/${id}`);
