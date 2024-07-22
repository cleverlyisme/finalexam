import api from "./api";

export const getAllSubjects = () => api.get("informations/subjects");

export const getStudentTranscriptLatest = () =>
  api.get("informations/transcript/latest");

export const getStudentFeeLatest = () => api.get("informations/fees/latest");
