import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../../components/layout/DashboardLayout'
import { Card, CardHeader, CardContent, CardFooter } from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import Badge from '../../../components/ui/Badge'
import { 
  PhoneIcon, 
  CheckIcon, 
  StarIcon, 
  RefreshCwIcon, 
  PlusIcon,
  PhoneCallIcon,
  SmartphoneIcon,
  BookmarkIcon
} from 'lucide-react'
import { getAccounts } from '../../../api/accountApi'
import { createTransaction, getTransactions } from '../../../api/transactionApi'

interface Account {
  id: string
  accountNumber: string
  accountType: string
  balance: number
}

interface Transaction {
  id: string
  accountId: string
  transactionType: string
  amount: number
  description?: string
  status: string
  createdAt: string
}

const AirtimeTopupPage: React.FC = () => {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [topupSuccess, setTopupSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [accounts, setAccounts] = useState<Account[]>([])
  const [topupHistory, setTopupHistory] = useState<Transaction[]>([])
  
  const [formValues, setFormValues] = useState({
    phoneNumber: '',
    amount: '',
    provider: '',
    fromAccount: '',
    saveNumber: false
  })

  // Network providers
  const providers = [
    { id: 'PROV-001', name: 'Verizon', logo: '🔴' },
    { id: 'PROV-002', name: 'AT&T', logo: '🔵' },
    { id: 'PROV-003', name: 'T-Mobile', logo: '🟣' },
    { id: 'PROV-004', name: 'Sprint', logo: '🟡' }
  ]

  // Dummy saved numbers (these can stay as frontend-only data for now)
  const savedNumbers = [
    { id: 'NUM-001', name: 'My Number', number: '(555) 123-4567', provider: 'Verizon' },
    { id: 'NUM-002', name: 'Mom', number: '(555) 987-6543', provider: 'AT&T' },
    { id: 'NUM-003', name: 'Dad', number: '(555) 456-7890', provider: 'T-Mobile' }
  ]

  // Common topup amounts
  const quickAmounts = [10, 25, 50, 100]

  // Fetch accounts on mount
  useEffect(() => {
    fetchAccounts()
    fetchTopupHistory()
  }, [])

  const fetchAccounts = async () => {
    try {
      const res = await getAccounts()
      setAccounts(res.data.accounts || [])
    } catch (err) {
      console.error('Error fetching accounts:', err)
    }
  }

  const fetchTopupHistory = async () => {
    setIsLoadingHistory(true)
    try {
      const res = await getTransactions()
      // Filter only airtime topup transactions
      const airtimeTransactions = (res.data.transactions || []).filter(
        (t: Transaction) => t.transactionType === 'airtime' || t.description?.toLowerCase().includes('airtime')
      )
      setTopupHistory(airtimeTransactions)
    } catch (err) {
      console.error('Error fetching topup history:', err)
    } finally {
      setIsLoadingHistory(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormValues(prev => ({
        ...prev,
        [name]: checked
      }))
    } else {
      setFormValues(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setShowConfirmation(true)
  }

  const confirmTopup = async () => {
    setIsSubmitting(true)
    setError(null)
    
    try {
      const providerName = providers.find(p => p.id === formValues.provider)?.name || 'Unknown'
      
      // Create transaction via API
      await createTransaction({
        transactionType: 'withdraw', // Airtime is a withdrawal/payment
        amount: parseFloat(formValues.amount),
        accountId: formValues.fromAccount,
        description: `Airtime Top-up - ${formValues.phoneNumber} (${providerName})`
      })

      setShowConfirmation(false)
      setTopupSuccess(true)
      
      // Refresh data
      fetchAccounts()
      fetchTopupHistory()
      
      // Reset form after delay
      setTimeout(() => {
        setTopupSuccess(false)
        setFormValues({
          phoneNumber: '',
          amount: '',
          provider: '',
          fromAccount: '',
          saveNumber: false
        })
      }, 3000)
    } catch (err: any) {
      console.error('Topup error:', err)
      setError(err.response?.data?.message || 'Top-up failed. Please try again.')
      setShowConfirmation(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectSavedNumber = (number: any) => {
    setFormValues(prev => ({
      ...prev,
      phoneNumber: number.number,
      provider: providers.find(p => p.name === number.provider)?.id || ''
    }))
  }

  const setQuickAmount = (amount: number) => {
    setFormValues(prev => ({
      ...prev,
      amount: amount.toString()
    }))
  }

  // Extract phone number and provider from transaction description
  const parseTopupDetails = (description: string) => {
    const phoneMatch = description.match(/\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/)
    const providerMatch = description.match(/\((.*?)\)/)
    return {
      phone: phoneMatch ? phoneMatch[0] : 'N/A',
      provider: providerMatch ? providerMatch[1] : 'N/A'
    }
  }

  return (
    <DashboardLayout title="Airtime Top-up">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {topupSuccess ? (
            <Card className="border-green-500">
              <CardContent className="py-8">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <CheckIcon size={24} className="text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Top-up Successful!</h3>
                  <p className="text-gray-500 mb-6">Your airtime top-up has been processed successfully.</p>
                  <Button 
                    variant="primary"
                    onClick={() => setTopupSuccess(false)}
                  >
                    Make Another Top-up
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">Mobile Airtime Top-up</h2>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                      {error}
                    </div>
                  )}
                  
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <PhoneIcon size={16} className="text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={formValues.phoneNumber}
                        onChange={handleChange}
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        placeholder="(555) 123-4567"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="provider" className="block text-sm font-medium text-gray-700 mb-1">
                      Network Provider
                    </label>
                    <select
                      id="provider"
                      name="provider"
                      value={formValues.provider}
                      onChange={handleChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      required
                    >
                      <option value="">Select provider</option>
                      {providers.map(provider => (
                        <option key={provider.id} value={provider.id}>
                          {provider.logo} {provider.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                      Amount
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        name="amount"
                        id="amount"
                        value={formValues.amount}
                        onChange={handleChange}
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                        placeholder="0.00"
                        step="0.01"
                        min="0.01"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">USD</span>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {quickAmounts.map(amount => (
                        <button
                          key={amount}
                          type="button"
                          className={`px-3 py-1 text-sm border rounded-md ${
                            formValues.amount === amount.toString()
                              ? 'bg-blue-50 border-blue-300 text-blue-700'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                          onClick={() => setQuickAmount(amount)}
                        >
                          ${amount}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="fromAccount" className="block text-sm font-medium text-gray-700 mb-1">
                      Pay From
                    </label>
                    <select
                      id="fromAccount"
                      name="fromAccount"
                      value={formValues.fromAccount}
                      onChange={handleChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      required
                    >
                      <option value="">Select account</option>
                      {accounts.map(account => (
                        <option key={account.id} value={account.id}>
                          {account.accountType} ({account.accountNumber}) - ${account.balance.toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="saveNumber"
                        name="saveNumber"
                        type="checkbox"
                        checked={formValues.saveNumber}
                        onChange={handleChange}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="saveNumber" className="font-medium text-gray-700">Save this number</label>
                      <p className="text-gray-500">Save this number for quicker top-ups in the future</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-4">
                  <Button 
                    variant="outline" 
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="primary"
                    type="submit"
                    icon={<PhoneIcon size={18} />}
                  >
                    Top-up Now
                  </Button>
                </CardFooter>
              </form>
            </Card>
          )}

          {/* Confirmation Modal */}
          {showConfirmation && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                        <PhoneIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Confirm Airtime Top-up
                        </h3>
                        <div className="mt-4 space-y-3">
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-500">Phone Number:</p>
                            <p className="text-sm font-medium text-gray-900">{formValues.phoneNumber}</p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-500">Provider:</p>
                            <p className="text-sm font-medium text-gray-900">
                              {providers.find(p => p.id === formValues.provider)?.name || ''}
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-500">Amount:</p>
                            <p className="text-sm font-medium text-gray-900">
                              ${formValues.amount ? parseFloat(formValues.amount).toFixed(2) : '0.00'}
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-500">From Account:</p>
                            <p className="text-sm font-medium text-gray-900">
                              {accounts.find(a => a.id === formValues.fromAccount)?.accountType || ''}
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-500">Fee:</p>
                            <p className="text-sm font-medium text-gray-900">$0.00</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <Button
                      variant="primary"
                      onClick={confirmTopup}
                      className="ml-3"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Processing...' : 'Confirm Top-up'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowConfirmation(false)}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Topup History */}
          <Card className="mt-6">
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Top-up History</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  icon={<RefreshCwIcon size={16} />}
                  onClick={fetchTopupHistory}
                  disabled={isLoadingHistory}
                >
                  {isLoadingHistory ? 'Loading...' : 'Refresh'}
                </Button>
              </div>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone Number
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Provider
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topupHistory.length > 0 ? (
                    topupHistory.map((topup) => {
                      const details = parseTopupDetails(topup.description || '')
                      return (
                        <tr key={topup.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(topup.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                                <PhoneCallIcon size={16} className="text-gray-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{details.phone}</div>
                                <div className="text-xs text-gray-500">ID: {topup.id.slice(0, 10)}...</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {details.provider}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                            ${topup.amount.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <Badge variant={topup.status === 'completed' ? 'success' : 'warning'}>
                              {topup.status}
                            </Badge>
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                        {isLoadingHistory ? 'Loading history...' : 'No top-up history found'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <CardFooter className="flex justify-center">
              <Button variant="outline">View All History</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-1">
          {/* Saved Numbers Card */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Saved Numbers</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {savedNumbers.length > 0 ? (
                savedNumbers.map((number) => (
                  <div 
                    key={number.id} 
                    className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
                    onClick={() => selectSavedNumber(number)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <SmartphoneIcon size={16} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{number.name}</p>
                          <p className="text-xs text-gray-500">{number.number} • {number.provider}</p>
                        </div>
                      </div>
                      <button className="p-1 text-gray-400 hover:text-gray-500">
                        <StarIcon size={16} className="fill-yellow-400 stroke-yellow-400" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500 text-sm">No saved numbers yet</p>
                  <p className="text-gray-500 text-xs mt-1">Save a number during top-up to add it here</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                fullWidth
                icon={<PlusIcon size={18} />}
              >
                Add New Number
              </Button>
            </CardFooter>
          </Card>

          {/* Special Offers */}
          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Special Offers</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge variant="primary" className="mb-2">Limited Time</Badge>
                    <h4 className="font-medium text-gray-900">10% Bonus Credit</h4>
                    <p className="text-sm text-gray-600 mt-1">Get 10% extra on all top-ups over $50</p>
                  </div>
                  <div className="text-xl font-bold text-blue-600">+10%</div>
                </div>
                <Button variant="primary" size="sm" className="mt-3 w-full">
                  Apply Offer
                </Button>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge variant="info" className="mb-2">Weekend Special</Badge>
                    <h4 className="font-medium text-gray-900">Double Data Bundle</h4>
                    <p className="text-sm text-gray-600 mt-1">Buy any data bundle and get double the value</p>
                  </div>
                  <div className="text-xl font-bold text-purple-600">2X</div>
                </div>
                <Button variant="outline" size="sm" className="mt-3 w-full">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Help */}
          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Quick Help</h3>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <svg className="h-4 w-4 text-blue-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Top-ups are processed immediately
                </li>
                <li className="flex items-start">
                  <svg className="h-4 w-4 text-blue-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Save frequently used numbers for faster top-ups
                </li>
                <li className="flex items-start">
                  <svg className="h-4 w-4 text-blue-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Check for special offers before topping up
                </li>
                <li className="flex items-start">
                  <svg className="h-4 w-4 text-blue-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  No fees for airtime top-ups
                </li>
              </ul>
              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-800">Need help with a top-up?</p>
                <p className="text-xs text-gray-600 mt-1">Contact our support team at support@bankapp.com</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default AirtimeTopupPage