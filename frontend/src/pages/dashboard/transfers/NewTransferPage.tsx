import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRightIcon, CheckCircleIcon } from 'lucide-react'
import Button from '../../../components/Button'
import { getAccounts } from '../../../api/accountApi'
import { createTransaction } from '../../../api/transactionApi'

interface Account {
  id: string
  accountNumber: string
  accountType: string
  balance: number
}

const recentBeneficiaries = [
  { id: '1', name: 'John Smith', accountNumber: '1234567890', bankName: 'Chase Bank' },
  { id: '2', name: 'Emma Johnson', accountNumber: '0987654321', bankName: 'Bank of America' },
  { id: '3', name: 'Michael Brown', accountNumber: '5678901234', bankName: 'Wells Fargo' }
]

const NewTransferPage = () => {
  const navigate = useNavigate()
  const [accounts, setAccounts] = useState<Account[]>([])
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    fromAccount: '',
    recipientType: 'new',
    recipientName: '',
    recipientAccountNumber: '',
    recipientBankName: '',
    amount: '',
    reference: '',
    transferDate: new Date().toISOString().split('T')[0],
    transferFrequency: 'once'
  })
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [transactionRef, setTransactionRef] = useState('')

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await getAccounts()
        setAccounts(res.data.accounts || [])
      } catch (err) {
        console.error('Error fetching accounts:', err)
      }
    }
    fetchAccounts()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleBeneficiarySelect = (id: string) => {
    if (selectedBeneficiary === id) {
      setSelectedBeneficiary(null)
      setFormData(prev => ({
        ...prev,
        recipientType: 'new',
        recipientName: '',
        recipientAccountNumber: '',
        recipientBankName: ''
      }))
    } else {
      setSelectedBeneficiary(id)
      const beneficiary = recentBeneficiaries.find(b => b.id === id)
      if (beneficiary) {
        setFormData(prev => ({
          ...prev,
          recipientType: 'existing',
          recipientName: beneficiary.name,
          recipientAccountNumber: beneficiary.accountNumber,
          recipientBankName: beneficiary.bankName
        }))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (currentStep === 1) {
      setCurrentStep(2)
    } else if (currentStep === 2) {
      setIsSubmitting(true)
      
      try {
        // Find recipient account by account number (this is simplified - in reality you'd search by account number)
        const toAccount = accounts.find(acc => acc.accountNumber === formData.recipientAccountNumber)
        
        if (!toAccount) {
          setError('Recipient account not found. Please check the account number.')
          setIsSubmitting(false)
          return
        }

        // Create the transfer transaction
        await createTransaction({
          transactionType: 'transfer',
          amount: parseFloat(formData.amount),
          accountId: formData.fromAccount,
          toAccountId: toAccount.id,
          description: formData.reference || `Transfer to ${formData.recipientName}`
        })

        setTransactionRef(`TRF-${Date.now()}`)
        setIsComplete(true)
      } catch (err: any) {
        console.error('Transfer error:', err)
        setError(err.response?.data?.message || 'Transfer failed. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleNewTransfer = () => {
    setCurrentStep(1)
    setFormData({
      fromAccount: '',
      recipientType: 'new',
      recipientName: '',
      recipientAccountNumber: '',
      recipientBankName: '',
      amount: '',
      reference: '',
      transferDate: new Date().toISOString().split('T')[0],
      transferFrequency: 'once'
    })
    setSelectedBeneficiary(null)
    setIsComplete(false)
    setError(null)
  }

  if (isComplete) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircleIcon size={40} className="text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Transfer Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your transfer of ${parseFloat(formData.amount).toLocaleString()} to {formData.recipientName} has been processed successfully.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm text-gray-500">Reference Number</p>
                <p className="font-medium">{transactionRef}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">From</p>
                <p className="font-medium">
                  {accounts.find(acc => acc.id === formData.fromAccount)?.accountType}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">To</p>
                <p className="font-medium">{formData.recipientName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="font-medium">${parseFloat(formData.amount).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Reference</p>
                <p className="font-medium">{formData.reference || 'N/A'}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" onClick={handleNewTransfer}>
              New Transfer
            </Button>
            <Button onClick={() => navigate('/dashboard/transactions')}>
              View Transactions
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">New Transfer</h1>
        <p className="text-gray-600">Transfer money to another account</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center mb-6">
        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
          currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
        }`}>
          1
        </div>
        <div className={`h-1 flex-1 mx-2 ${
          currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'
        }`}></div>
        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
          currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
        }`}>
          2
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recipient Details</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From Account*
                </label>
                <select
                  name="fromAccount"
                  value={formData.fromAccount}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select an account</option>
                  {accounts.map(account => (
                    <option key={account.id} value={account.id}>
                      {account.accountType} ({account.accountNumber}) - ${account.balance.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <p className="block text-sm font-medium text-gray-700 mb-1">
                  Recent Recipients
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  {recentBeneficiaries.map(beneficiary => (
                    <div
                      key={beneficiary.id}
                      onClick={() => handleBeneficiarySelect(beneficiary.id)}
                      className={`p-3 border rounded-md cursor-pointer ${
                        selectedBeneficiary === beneficiary.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      <p className="font-medium text-gray-900">{beneficiary.name}</p>
                      <p className="text-sm text-gray-500">{beneficiary.bankName}</p>
                      <p className="text-sm text-gray-500">****{beneficiary.accountNumber.slice(-4)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {formData.recipientType === 'new' && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Recipient Name*
                    </label>
                    <input
                      type="text"
                      name="recipientName"
                      value={formData.recipientName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter recipient name"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Account Number*
                    </label>
                    <input
                      type="text"
                      name="recipientAccountNumber"
                      value={formData.recipientAccountNumber}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter account number"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bank Name*
                    </label>
                    <input
                      type="text"
                      name="recipientBankName"
                      value={formData.recipientBankName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter bank name"
                    />
                  </div>
                </>
              )}
            </>
          )}

          {currentStep === 2 && (
            <>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Transfer Details</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount*
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2">$</span>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    min="0.01"
                    step="0.01"
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reference (Optional)
                </label>
                <input
                  type="text"
                  name="reference"
                  value={formData.reference}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add a reference note"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transfer Date*
                </label>
                <input
                  type="date"
                  name="transferDate"
                  value={formData.transferDate}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Frequency
                </label>
                <select
                  name="transferFrequency"
                  value={formData.transferFrequency}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="once">One-time Transfer</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Transfer Summary</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-gray-500">From</p>
                    <p className="font-medium">
                      {accounts.find(acc => acc.id === formData.fromAccount)?.accountType}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">To</p>
                    <p className="font-medium">{formData.recipientName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="font-medium">${formData.amount ? parseFloat(formData.amount).toLocaleString() : '0.00'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{new Date(formData.transferDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="flex justify-between mt-6">
            {currentStep === 1 ? (
              <div></div>
            ) : (
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setCurrentStep(1)}
              >
                Back
              </Button>
            )}
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : currentStep === 1 ? (
                <>Continue <ArrowRightIcon size={16} className="ml-1" /></>
              ) : (
                'Confirm Transfer'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewTransferPage
