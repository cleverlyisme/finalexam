import api from "./api";

export const getTeachers = async (params) =>
  api.get("/teachers", {
    params,
  });

export const getTeacher = async (id) => api.get(`/teachers/${id}`);

export const createTeacher = async (data) => api.post("/teachers", data);

export const updateTeacher = async (id, data) =>
  api.put(`/teachers/${id}`, data);

export const updateProfile = async (id, data) =>
  api.put(`/teachers/${id}`, data);

export const deleteTeacher = async (id) => api.delete(`/teachers/${id}`);

export const getStudentsOfMainClass = async (params) =>
  api.get("/teachers/students/date", {
    params,
  });

export const markBreakStudent = async (data) =>
  api.put("/teachers/students/break", data);
