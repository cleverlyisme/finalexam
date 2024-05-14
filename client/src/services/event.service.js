import api from "./api";

export const getEvents = async () => api.get("/events");

export const getLastestEvents = async () => api.get("/events/lastest");

export const createEvent = async (data) => api.post(`/events`, data);

export const updateEvent = async (id, data) => api.put(`/events/${id}`, data);

export const deleteEvent = async (id) => api.delete(`/events/${id}`);
