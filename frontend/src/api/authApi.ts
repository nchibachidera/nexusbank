import API from "./axiosApi";

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  birthday?: string;
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
    firstName: string;
    lastName: string;
  };
}

interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
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
