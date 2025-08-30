import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000", // backend URL
});

// Automatically attach token if present
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const registerUser = (formData) => API.post("/register", formData);
export const loginUser = (formData) => API.post("/login", formData);
export const getProfile = () => API.get("/me");