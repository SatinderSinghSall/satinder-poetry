import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// attach token to EVERY request automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ---------- AUTH ----------
export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (userData) => API.post("/auth/login", userData);

// ---------- POEMS ----------
export const fetchPoems = () => API.get("/poems");
export const fetchPoemById = (id) => API.get(`/poems/${id}`);

// ---------- PROFILE ----------
export const getProfile = () => API.get("/users/me");
export const getSubscriptionStatus = () => API.get("/subscribe/status");

export default API;
