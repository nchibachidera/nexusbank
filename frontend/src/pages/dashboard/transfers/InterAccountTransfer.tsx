import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, ArrowRightLeft, AlertCircle, CheckCircle } from 'lucide-react'
import { getAccounts } from '../../../api/accountApi'
import { createTransaction } from '../../../api/transactionApi'

interface Account {
  id: string
  accountNumber: string
  accountType: string
  balance: number
  currency: string
}

const BetweenAccountsPage = () => {
  const navigate = useNavigate()
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  
  const [formData, setFormData] = useState({
    fromAccountId: '',
    toAccountId: '',
    amount: '',
    description: ''
  })

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await getAccounts()
        setAccounts(response.data.accounts || [])
      } catch (err) {
        console.error('Error fetching accounts:', err)
      }
    }
    fetchAccounts()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!formData.fromAccountId || !formData.toAccountId || !formData.amount) {
      setError('Please fill in all required fields')
      return
    }

    if (formData.fromAccountId === formData.toAccountId) {
      setError('Source and destination accounts must be different')
      return
    }

    const amount = parseFloat(formData.amount)
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount')
      return
    }

    const fromAccount = accounts.find(acc => acc.id === formData.fromAccountId)
    if (fromAccount && fromAccount.balance < amount) {
      setError('Insufficient balance in source account')
      return
    }

    setShowConfirmation(true)
  }

  const confirmTransfer = async () => {
    setLoading(true)
    setError('')

    try {
      const toAccount = accounts.find(acc => acc.id === formData.toAccountId)

      await createTransaction({
        transactionType: 'transfer',
        accountId: formData.fromAccountId,
        toAccountId: formData.toAccountId,
        amount: parseFloat(formData.amount),
        description: formData.description || `Inter-account transfer to ${toAccount?.accountType}`
      })

      setShowConfirmation(false)
      setSuccess(true)

      setTimeout(() => {
        navigate('/dashboard/transactions')
      }, 2000)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Transfer failed. Please try again.')
      setShowConfirmation(false)
    } finally {
      setLoading(false)
    }
  }

  const fromAccount = accounts.find(acc => acc.id === formData.fromAccountId)
  const toAccount = accounts.find(acc => acc.id === formData.toAccountId)
  const availableToAccounts = accounts.filter(acc => acc.id !== formData.fromAccountId)

  if (success) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle size={40} className="text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Transfer Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your transfer of ${parseFloat(formData.amount).toFixed(2)} has been completed successfully.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/dashboard/transactions')}
              className="px-6 py-2 bg-[#1e3a8a] text-white rounded-lg font-semibold hover:bg-[#1e40af] transition-colors"
            >
              View Transactions
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              New Transfer
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeftIcon size={20} className="mr-2" />
          Back to Dashboard
        </button>
        <div className="flex items-center space-x-3">
          <ArrowRightLeft size={28} className="text-[#1e3a8a]" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Inter-Account Transfer</h1>
            <p className="text-gray-600">Transfer between your own accounts</p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center text-red-800">
            <AlertCircle size={20} className="mr-2" />
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* No Accounts Warning */}
      {accounts.length < 2 && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center text-yellow-800">
            <AlertCircle size={20} className="mr-2" />
            <p>You need at least 2 accounts to make an inter-account transfer.</p>
          </div>
        </div>
      )}

      {/* Transfer Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* From Account */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Account *
            </label>
            <select
              name="fromAccountId"
              value={formData.fromAccountId}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
              required
            >
              <option value="">Select source account</option>
              {accounts.map(account => (
                <option key={account.id} value={account.id}>
                  {account.accountType} - {account.accountNumber} (Balance: ${Number(account.balance).toFixed(2)})
                </option>
              ))}
            </select>
          </div>

          {/* Available Balance Display */}
          {fromAccount && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Available Balance</p>
              <p className="text-2xl font-bold text-gray-900">${fromAccount.balance.toFixed(2)}</p>
            </div>
          )}

          {/* To Account */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To Account *
            </label>
            <select
              name="toAccountId"
              value={formData.toAccountId}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
              required
              disabled={!formData.fromAccountId}
            >
              <option value="">Select destination account</option>
              {availableToAccounts.map(account => (
                <option key={account.id} value={account.id}>
                  {account.accountType} - {account.accountNumber} (Balance: ${account.balance.toFixed(2)})
                </option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount *
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-gray-500">$</span>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0.01"
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter transfer description"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
            />
          </div>

          {/* Info Box */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Transfer Information</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Transfers between your accounts are instant</li>
              <li>• No fees for inter-account transfers</li>
              <li>• Daily transfer limit: $10,000</li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading || accounts.length < 2}
              className="flex-1 bg-[#1e3a8a] text-white py-3 rounded-lg font-semibold hover:bg-[#1e40af] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <span>Processing...</span>
              ) : (
                <>
                  <ArrowRightLeft size={20} className="mr-2" />
                  Continue to Review
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowConfirmation(false)}></div>
            <div className="relative bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Transfer</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">From Account:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {fromAccount?.accountType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">To Account:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {toAccount?.accountType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Amount:</span>
                  <span className="text-sm font-medium text-gray-900">
                    ${parseFloat(formData.amount).toFixed(2)}
                  </span>
                </div>
                {formData.description && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Description:</span>
                    <span className="text-sm font-medium text-gray-900">{formData.description}</span>
                  </div>
                )}
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={confirmTransfer}
                  disabled={loading}
                  className="flex-1 bg-[#1e3a8a] text-white py-2 rounded-lg font-semibold hover:bg-[#1e40af] transition-colors disabled:bg-gray-400"
                >
                  {loading ? 'Processing...' : 'Confirm Transfer'}
                </button>
                <button
                  onClick={() => setShowConfirmation(false)}
                  disabled={loading}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BetweenAccountsPage