import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, SendIcon, AlertCircle, CheckCircle, Globe } from 'lucide-react'
import { getAccounts } from '../../../api/accountApi'
import { createTransaction } from '../../../api/transactionApi'

interface Account {
  id: string
  accountNumber: string
  accountType: string
  balance: number
  currency: string
}

const ExternalTransferPage = () => {
  const navigate = useNavigate()
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  
  const [formData, setFormData] = useState({
    fromAccountId: '',
    recipientName: '',
    recipientAccountNumber: '',
    recipientBankName: '',
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
    if (!formData.fromAccountId || !formData.recipientAccountNumber || !formData.amount || !formData.recipientName) {
      setError('Please fill in all required fields')
      return
    }

    const amount = parseFloat(formData.amount)
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount')
      return
    }

    const fromAccount = accounts.find(acc => acc.id === formData.fromAccountId)
    if (fromAccount && fromAccount.balance < amount) {
      setError('Insufficient balance')
      return
    }

    setShowConfirmation(true)
  }

  const confirmTransfer = async () => {
    setLoading(true)
    setError('')

    try {
      const description = formData.description || 
        `External transfer to ${formData.recipientName} at ${formData.recipientBankName || 'External Bank'}`

      await createTransaction({
        transactionType: 'transfer',
        accountId: formData.fromAccountId,
        toAccountNumber: formData.recipientAccountNumber,
        amount: parseFloat(formData.amount),
        description
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

  if (success) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle size={40} className="text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Transfer Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Your external transfer of ${parseFloat(formData.amount).toFixed(2)} to {formData.recipientName} has been submitted successfully.
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
          <Globe size={28} className="text-[#1e3a8a]" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">External Transfer</h1>
            <p className="text-gray-600">Send money to external accounts</p>
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
              <option value="">Select an account</option>
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

          {/* Recipient Information */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recipient Information</h3>
            
            <div className="space-y-4">
              {/* Recipient Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient Name *
                </label>
                <input
                  type="text"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleChange}
                  placeholder="Enter recipient full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                  required
                />
              </div>

              {/* Account Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Number *
                </label>
                <input
                  type="text"
                  name="recipientAccountNumber"
                  value={formData.recipientAccountNumber}
                  onChange={handleChange}
                  placeholder="Enter recipient account number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                  required
                />
              </div>

              {/* Bank Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bank Name
                </label>
                <input
                  type="text"
                  name="recipientBankName"
                  value={formData.recipientBankName}
                  onChange={handleChange}
                  placeholder="Enter recipient bank name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Transfer Details */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Transfer Details</h3>
            
            {/* Amount */}
            <div className="mb-4">
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
                placeholder="Enter transfer purpose or description"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
              />
            </div>
          </div>

          {/* Info Box */}
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 className="text-sm font-medium text-yellow-800 mb-2">⚠️ External Transfer Notice</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• External transfers typically take 1-3 business days</li>
              <li>• A $3.00 fee may apply for external transfers</li>
              <li>• Ensure recipient details are correct</li>
              <li>• Daily external transfer limit: $5,000</li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#1e3a8a] text-white py-3 rounded-lg font-semibold hover:bg-[#1e40af] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <span>Processing...</span>
              ) : (
                <>
                  <SendIcon size={20} className="mr-2" />
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm External Transfer</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">From Account:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {fromAccount?.accountType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">To:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formData.recipientName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Account Number:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formData.recipientAccountNumber}
                  </span>
                </div>
                {formData.recipientBankName && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Bank:</span>
                    <span className="text-sm font-medium text-gray-900">{formData.recipientBankName}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Amount:</span>
                  <span className="text-sm font-medium text-gray-900">
                    ${parseFloat(formData.amount).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Fee:</span>
                  <span className="text-sm font-medium text-gray-900">$3.00</span>
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

export default ExternalTransferPage