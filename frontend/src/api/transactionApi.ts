import API from "./axiosApi";

interface Transaction {
  id: string;
  accountId: string;
  transactionType: string;
  amount: number;
  description?: string;
  status: string;
  createdAt: string;
}

interface CreateTransactionData {
  transactionType: "transfer" | "deposit" | "withdraw";
  amount: number;
  accountId: string;
  toAccountId?: string;
  toAccountNumber?: string;  // Add this to accept account number
  description?: string;
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
