import API from "./axiosApi";

interface Account {
  id: string;
  accountNumber: string;
  accountType: string;
  balance: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateAccountData {
  accountType: string;
  currency?: string;
  initialDeposit?: number;
}

// Response types
interface AccountsResponse {
  accounts: Account[];
}

// Get all accounts of logged-in user
export const getAccounts = () => 
  API.get<AccountsResponse>("/accounts");

// Get single account by ID
export const getAccountById = (accountId: string) => 
  API.get<Account>(`/accounts/${accountId}`);

// Create new account
export const createAccount = (data: CreateAccountData) => 
  API.post<Account>("/accounts", data);