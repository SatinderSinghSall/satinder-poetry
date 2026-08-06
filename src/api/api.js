import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Attach token to EVERY request automatically
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

// ---------- BOOKS ----------
export const fetchBooks = async (params = {}) => {
  const res = await API.get("/books", { params });
  return res.data;
};

export const fetchBookById = async (id) => {
  const res = await API.get(`/books/${id}`);
  return res.data;
};

export const createBook = async (bookData) => {
  const res = await API.post("/books", bookData);
  return res.data;
};

export const updateBook = async (id, bookData) => {
  const res = await API.put(`/books/${id}`, bookData);
  return res.data;
};

export const deleteBook = async (id) => {
  const res = await API.delete(`/books/${id}`);
  return res.data;
};

// ---------- BOOK SUGGESTIONS ----------
export const fetchBookSuggestions = async () => {
  const res = await API.get("/book-suggestions");
  return res.data;
};

export const updateBookSuggestionStatus = async (id, status) => {
  const res = await API.patch(`/book-suggestions/${id}`, { status });
  return res.data;
};

export const deleteBookSuggestion = async (id) => {
  const res = await API.delete(`/book-suggestions/${id}`);
  return res.data;
};

// ---------- POEM SUBMISSIONS ----------

// Submit draft (User)
export const submitPoemDraftApi = async (formData) => {
  const res = await API.post("/poems/submit-draft", formData);
  return res.data;
};

// Get pending submissions (Admin)
export const getSubmissionsApi = async () => {
  const res = await API.get("/poems/submissions");
  return res.data;
};

// Approve submission (Admin)
export const approveSubmissionApi = async (id, extraData = {}) => {
  const res = await API.put(`/poems/submissions/${id}/approve`, extraData);
  return res.data;
};

// Reject submission (Admin)
export const rejectSubmissionApi = async (id) => {
  const res = await API.put(`/poems/submissions/${id}/reject`);
  return res.data;
};

// Delete submission (Admin)
export const deletePoemSubmissionApi = async (id) => {
  const response = await API.delete(`/poems/submissions/${id}`);
  return response.data;
};

// Reset to Pending (Admin)
export const resetSubmissionToPendingApi = async (id) => {
  const res = await API.put(`/poems/submissions/${id}/pending`);
  return res.data;
};

export default API;
