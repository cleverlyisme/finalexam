import api from "./api";

export const getReports = async () => api.get("/admin/reports");

export const getCharts = async () => api.get("/admin/charts");
