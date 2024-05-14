import axios from "axios";

import environments from "../utils/environments";

const { BACKEND_URL } = environments;

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    Connection: "Keep-alive",
    Accept: "*/*",
  },
});

const apiUpload = axios.create({
  baseURL: BACKEND_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

[api, apiUpload].map((item) =>
  item.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  )
);

export default api;

export { apiUpload };
