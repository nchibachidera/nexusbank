import API from "./axiosApi";

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    fullName: string;
  };
}

interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  createdAt: string;
}

// Register new user
export const registerUser = (data: RegisterData) => 
  API.post<AuthResponse>("/auth/register", data);

// Login user
export const loginUser = (data: LoginData) => 
  API.post<AuthResponse>("/auth/login", data);

// Get current user profile (requires token)
export const getProfile = () => 
  API.get<UserProfile>("/auth/profile");
