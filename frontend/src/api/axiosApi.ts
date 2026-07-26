import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const API: AxiosInstance = axios.create({
  baseURL: "https://nexusbank-production-eb84.up.railway.app/api",
});

// Attach JWT token automatically if exists
API.interceptors.request.use((req: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token && req.headers) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
