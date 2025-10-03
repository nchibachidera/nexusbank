 import API from "./axios";

// Get all savings goals
export const getSavingsGoals = () => API.get("/savings");

// Create a new savings goal
export const createSavingsGoal = (data) => API.post("/savings", data);

// Update a savings goal
export const updateSavingsGoal = (goalId, data) =>
  API.put(`/savings/${goalId}`, data);

// Delete a savings goal
export const deleteSavingsGoal = (goalId) =>
  API.delete(`/savings/${goalId}`);
