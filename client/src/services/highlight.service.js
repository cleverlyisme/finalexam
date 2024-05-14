import api from "./api";

export const getHighlights = async () => api.get("/highlights");

export const getLastestHighlights = async () => api.get("/highlights/lastest");

export const createHighlight = async (data) => api.post(`/highlights`, data);

export const updateHighlight = async (id, data) =>
  api.put(`/highlights/${id}`, data);
