import { apiUpload } from "./api";

export const uploadImage = (formData) => apiUpload.post("/upload", formData);
