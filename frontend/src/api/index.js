import axios from "axios";

// Create an Axios instance with the backend base URL
const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Automatically attach token to every request if present
api.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token"); // Ensure token is stored under "token"
    if (token) {
      req.headers["Authorization"] = `Bearer ${token}`; // Exact header your backend expects
    }
    return req;
  },
  (error) => Promise.reject(error)
);

// --- Auth routes ---
export const registerUser = (formData) => api.post("/register", formData);
export const loginUser = (formData) => api.post("/login", formData);
export const getProfile = () => api.get("/profile");
export const getTopUsers = () => api.get("/leaderboard");

// --- Reports routes ---
export const createReport = (reportData) => api.post("/reports", reportData);
export const getReports = () => api.get("/reports");

// --- Upload route ---
export const uploadImage = (fileData, folderName) =>
  api.post("/upload", { fileData, folderName });