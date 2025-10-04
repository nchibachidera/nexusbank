 import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Fetch accounts
export const getAccounts = async () => {
  const res = await axios.get(`${API_URL}/accounts`, { withCredentials: true })
  return res.data
}

// Fetch transactions
export const getTransactions = async () => {
  const res = await axios.get(`${API_URL}/transactions`, { withCredentials: true })
  return res.data
}

// Fetch notifications
export const getNotifications = async () => {
  const res = await axios.get(`${API_URL}/notifications`, { withCredentials: true })
  return res.data
}
