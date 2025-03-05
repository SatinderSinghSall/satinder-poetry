import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (userData) => API.post("/auth/login", userData);
export const fetchPoems = () => API.get("/poems");
export const fetchPoemById = (id) => API.get(`/poems/${id}`);
