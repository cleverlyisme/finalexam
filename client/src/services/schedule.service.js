import api from "./api";

export const getScheduleByClass = async (id) =>
  api.get(`/schedules/class/${id}`);

export const getScheduleByTeacher = async (id) =>
  api.get(`/schedules/teacher/${id}`);
