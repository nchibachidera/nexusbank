 import api from './axiosConfig'

interface TransferRequest {
  transactionType: 'transfer'
  amount: number
  accountId: number
  toAccountNumber?: string
  toAccountId?: number
  description?: string
}

export const createTransfer = async (data: TransferRequest) => {
  const response = await api.post('/transactions', data)
  return response.data
}

export const getAccounts = async () => {
  const response = await api.get('/accounts')
  return response.data
}