import api from "./api";

export const login = async (data) => api.post("/auth/login", data);

export const checkAuth = () => api.get("/auth/check");
