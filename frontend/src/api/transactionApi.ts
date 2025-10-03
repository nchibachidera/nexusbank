 import API from "./axios";

// Get all transactions of logged-in user
export const getTransactions = () => API.get("/transactions");

// Get transactions for a specific account
export const getTransactionsByAccount = (accountId) =>
  API.get(`/transactions/account/${accountId}`);

// Create new transaction (transfer, deposit, withdraw)
export const createTransaction = (data) => API.post("/transactions", data);
