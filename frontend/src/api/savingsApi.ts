import API from "./axiosApi";

interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateSavingsGoalData {
  name: string;
  targetAmount: number;
  deadline: string;
  accountId?: string;
}

interface UpdateSavingsGoalData {
  name?: string;
  targetAmount?: number;
  currentAmount?: number;
  deadline?: string;
}

// Get all savings goals
export const getSavingsGoals = () => 
  API.get<SavingsGoal[]>("/savings");

// Create a new savings goal
export const createSavingsGoal = (data: CreateSavingsGoalData) =>
  API.post<SavingsGoal>("/savings", data);

// Update a savings goal
export const updateSavingsGoal = (goalId: string, data: UpdateSavingsGoalData) =>
  API.put<SavingsGoal>(`/savings/${goalId}`, data);

// Delete a savings goal
export const deleteSavingsGoal = (goalId: string) =>
  API.delete(`/savings/${goalId}`);
