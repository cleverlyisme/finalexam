import api from "./api";

export const getStudentsOfMainClass = async (params) =>
  api.get("/teachers/students/date", {
    params,
  });

export const markBreakStudent = async (data) =>
  api.put("/teachers/students/break", data);
