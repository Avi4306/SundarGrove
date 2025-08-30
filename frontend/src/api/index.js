import axios from "axios";

// Create an Axios instance with the backend base URL
const api = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api`,
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
export const uploadImage = ({ fileData, folderName }) =>
  api.post("/upload", { fileData, folderName });

// --- Admin routes ---
export const getAllUsers = () => api.get("/admin/users");
export const deleteUser = (userId) => api.delete(`/admin/users/${userId}`);
export const updateUserRole = (userId, newRole) =>
  api.put(`/admin/users/${userId}/role`, { role: newRole });
export const getAdminReports = () => api.get("/admin/reports");
export const verifyReport = (reportId) => api.put(`/admin/reports/${reportId}/verify`);
export const rejectReport = (reportId) => api.put(`/admin/reports/${reportId}/reject`);

export const predictMangrove = (formData) =>
  api.post("/predict", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });