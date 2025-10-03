 import API from "./axios";

// Get all accounts of logged-in user
export const getAccounts = () => API.get("/accounts");

// Get single account by ID
export const getAccountById = (accountId) => API.get(`/accounts/${accountId}`);

// Create new account
export const createAccount = (data) => API.post("/accounts", data);
