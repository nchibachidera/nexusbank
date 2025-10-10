import API from "./axiosApi";

interface Transaction {
  id: string;
  type: "transfer" | "deposit" | "withdraw";
  amount: number;
  currency: string;
  description?: string;
  status: "pending" | "completed" | "failed";
  fromAccountId?: string;
  toAccountId?: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateTransactionData {
  type: "transfer" | "deposit" | "withdraw";
  amount: number;
  fromAccountId?: string;
  toAccountId?: string;
  description?: string;
  currency?: string;
}

// Response types
interface TransactionsResponse {
  transactions: Transaction[];
}

// Get all transactions of logged-in user
export const getTransactions = () => 
  API.get<TransactionsResponse>("/transactions");

// Get transactions for a specific account
export const getTransactionsByAccount = (accountId: string) =>
  API.get<TransactionsResponse>(`/transactions/account/${accountId}`);

// Create new transaction (transfer, deposit, withdraw)
export const createTransaction = (data: CreateTransactionData) => 
  API.post<Transaction>("/transactions", data);
