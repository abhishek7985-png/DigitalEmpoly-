import API from "./axios";

// Get All FAQs
export const getFAQs = () => API.get("/helpcenter");

// Create Ticket
export const createTicket = (data) => API.post("/helpcenter", data);

// Get Ticket By Id
export const getTicket = (id) => API.get(`/helpcenter/${id}`);

// Delete Ticket
export const deleteTicket = (id) => API.delete(`/helpcenter/${id}`);
