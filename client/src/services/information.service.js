import api from "./api";

export const getStudentTranscriptLatest = () =>
  api.get("informations/transcript/latest");

export const getStudentFeeLatest = () => api.get("informations/fees/latest");
