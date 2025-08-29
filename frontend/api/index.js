import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api", // backend URL
});

// Automatically attach token if present
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const registerUser = (formData) => API.post("/user/register", formData);
export const loginUser = (formData) => API.post("/user/login", formData);
export const getProfile = () => API.get("/user/me");