 import API from "./axios";

// Register new user
export const registerUser = (data) => API.post("/auth/register", data);

// Login user
export const loginUser = (data) => API.post("/auth/login", data);

// Get current user profile (requires token)
export const getProfile = () => API.get("/auth/profile");
