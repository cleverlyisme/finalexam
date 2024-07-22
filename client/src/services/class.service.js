import api from "./api";

export const getAllClasses = async () => api.get("/classes");
