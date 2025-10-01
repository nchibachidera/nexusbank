 import React, { useState } from 'react'
import DashboardLayout from '../../../components/layout/DashboardLayout'
import { Card, CardHeader, CardContent, CardFooter } from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import Badge from '../../../components/ui/Badge'
import { 
  CreditCardIcon, 
  CheckIcon, 
  SearchIcon, 
  ZapIcon, 
  DropletIcon,
  HomeIcon,
  WifiIcon,
  TrashIcon,
  CalendarIcon,
  RefreshCwIcon
} from 'lucide-react'
const UtilitiesPaymentPage: React.FC = () => {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [formValues, setFormValues] = useState({
    provider: '',
    accountNumber: '',
    amount: '',
    fromAccount: '',
    saveAsBiller: false
  })
  // Dummy accounts data
  const accounts = [
    {
      id: 'ACCT-12345',
      name: 'Premium Checking Account',
      number: '****7890',
      type: 'Checking',
      balance: 5842.67
    },
    {
      id: 'ACCT-12346',
      name: 'High-Yield Savings',
      number: '****5432',
      type: 'Savings',
      balance: 12750.42
    },
    {
      id: 'ACCT-12347',
      name: 'Joint Checking Account',
      number: '****9876',
      type: 'Checking',
      balance: 3241.19
    }
  ]
  // Dummy utility providers
  const providers = [
    {
      id: 'UTIL-001',
      name: 'City Power & Light',
      type: 'electricity',
      icon: <ZapIcon size={20} className="text-yellow-500" />
    },
    {
      id: 'UTIL-002',
      name: 'Metropolitan Water',
      type: 'water',
      icon: <DropletIcon size={20} className="text-blue-500" />
    },
    {
      id: 'UTIL-003',
      name: 'National Gas Company',
      type: 'gas',
      icon: <HomeIcon size={20} className="text-orange-500" />
    },
    {
      id: 'UTIL-004',
      name: 'Fiber Internet Services',
      type: 'internet',
      icon: <WifiIcon size={20} className="text-indigo-500" />
    }
  ]
  // Dummy saved billers
  const savedBillers = [
    {
      id: 'BILL-001',
      name: 'City Power & Light',
      accountNumber: '1234567890',
      lastPayment: {
        date: '2023-09-15',
        amount: 124.56
      }
    },
    {
      id: 'BILL-002',
      name: 'Metropolitan Water',
      accountNumber: '0987654321',
      lastPayment: {
        date: '2023-09-10',
        amount: 78.30
      }
    }
  ]
  // Dummy payment history
  const paymentHistory = [
    {
      id: 'PAY-12345',
      date: '2023-09-15',
      provider: 'City Power & Light',
      accountNumber: '1234567890',
      amount: 124.56,
      status: 'completed'
    },
    {
      id: 'PAY-12344',
      date: '2023-09-10',
      provider: 'Metropolitan Water',
      accountNumber: '0987654321',
      amount: 78.30,
      status: 'completed'
    },
    {
      id: 'PAY-12343',
      date: '2023-08-15',
      provider: 'City Power & Light',
      accountNumber: '1234567890',
      amount: 131.42,
      status: 'completed'
    },
    {
      id: 'PAY-12342',
      date: '2023-08-08',
      provider: 'National Gas Company',
      accountNumber: '5678901234',
      amount: 45.78,
      status: 'completed'
    }
  ]
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
    setShowConfirmation(true)
  }
  const confirmPayment = () => {
    // Here you would handle the actual payment submission to backend
    setShowConfirmation(false)
    setPaymentSuccess(true)
    // Reset form after a delay
    setTimeout(() => {
      setPaymentSuccess(false)
      setFormValues({
        provider: '',
        accountNumber: '',
        amount: '',
        fromAccount: '',
        saveAsBiller: false
      })
    }, 3000)
  }
  const selectSavedBiller = (biller: any) => {
    setFormValues(prev => ({
      ...prev,
      provider: providers.find(p => p.name === biller.name)?.id || '',
      accountNumber: biller.accountNumber
    }))
  }
  return (
    <DashboardLayout title="Utilities Payment">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {paymentSuccess ? (
            <Card className="border-green-500">
              <CardContent className="py-8">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <CheckIcon size={24} className="text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Payment Successful!</h3>
                  <p className="text-gray-500 mb-6">Your utility bill payment has been processed successfully.</p>
                  <Button 
                    variant="primary"
                    onClick={() => setPaymentSuccess(false)}
                  >
                    Make Another Payment
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">Pay Utility Bills</h2>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  <div>
                    <label htmlFor="provider" className="block text-sm font-medium text-gray-700 mb-1">
                      Utility Provider
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
                          {provider.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Account/Meter Number
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        name="accountNumber"
                        id="accountNumber"
                        value={formValues.accountNumber}
                        onChange={handleChange}
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter your account or meter number"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button 
                          type="button"
                          className="text-gray-400 hover:text-gray-500"
                          title="Find account number"
                        >
                          <SearchIcon size={16} />
                        </button>
                      </div>
                    </div>
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
                          {account.name} (${account.balance.toLocaleString()})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="saveAsBiller"
                        name="saveAsBiller"
                        type="checkbox"
                        checked={formValues.saveAsBiller}
                        onChange={handleChange}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="saveAsBiller" className="font-medium text-gray-700">Save as frequent biller</label>
                      <p className="text-gray-500">Save this biller for quicker payments in the future</p>
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
                    icon={<CreditCardIcon size={18} />}
                  >
                    Pay Bill
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
                        <CreditCardIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Confirm Bill Payment
                        </h3>
                        <div className="mt-4 space-y-3">
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-500">Provider:</p>
                            <p className="text-sm font-medium text-gray-900">
                              {providers.find(p => p.id === formValues.provider)?.name || ''}
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-500">Account/Meter Number:</p>
                            <p className="text-sm font-medium text-gray-900">{formValues.accountNumber}</p>
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
                              {accounts.find(a => a.id === formValues.fromAccount)?.name || ''}
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
                      onClick={confirmPayment}
                      className="ml-3"
                    >
                      Confirm Payment
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowConfirmation(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Payment History */}
          <Card className="mt-6">
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Payment History</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  icon={<RefreshCwIcon size={16} />}
                >
                  Refresh
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
                      Provider
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Account Number
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
                  {paymentHistory.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(payment.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{payment.provider}</div>
                        <div className="text-xs text-gray-500">ID: {payment.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.accountNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                        ${payment.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <Badge variant="success">Completed</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <CardFooter className="flex justify-center">
              <Button variant="outline">View All History</Button>
            </CardFooter>
          </Card>
        </div>
        <div className="lg:col-span-1">
          {/* Saved Billers Card */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Saved Billers</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {savedBillers.length > 0 ? (
                savedBillers.map((biller) => (
                  <div 
                    key={biller.id} 
                    className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
                    onClick={() => selectSavedBiller(biller)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{biller.name}</p>
                        <p className="text-xs text-gray-500">Account: {biller.accountNumber}</p>
                      </div>
                      <button className="p-1 text-gray-400 hover:text-gray-500" onClick={(e) => e.stopPropagation()}>
                        <TrashIcon size={16} />
                      </button>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Last payment: ${biller.lastPayment.amount.toFixed(2)} on {new Date(biller.lastPayment.date).toLocaleDateString()}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500 text-sm">No saved billers yet</p>
                  <p className="text-gray-500 text-xs mt-1">Save a biller during payment to add it here</p>
                </div>
              )}
            </CardContent>
          </Card>
          {/* Utility Categories */}
          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Utility Categories</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {providers.map((provider) => (
                  <button 
                    key={provider.id}
                    className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 flex flex-col items-center justify-center"
                    onClick={() => setFormValues(prev => ({ ...prev, provider: provider.id }))}
                  >
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                      {provider.icon}
                    </div>
                    <p className="text-sm font-medium text-gray-900">{provider.type.charAt(0).toUpperCase() + provider.type.slice(1)}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
          {/* Payment Tips */}
          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Payment Tips</h3>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <svg className="h-4 w-4 text-blue-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Set up automatic payments to avoid late fees
                </li>
                <li className="flex items-start">
                  <svg className="h-4 w-4 text-blue-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Keep your account/meter number handy for quick payments
                </li>
                <li className="flex items-start">
                  <svg className="h-4 w-4 text-blue-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Save billers for faster payments in the future
                </li>
                <li className="flex items-start">
                  <svg className="h-4 w-4 text-blue-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Schedule payments in advance to avoid missing due dates
                </li>
              </ul>
              <div className="mt-4 p-3 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-800">Need help with a bill payment?</p>
                <p className="text-xs text-blue-700 mt-1">Contact our support team at support@bankapp.com or call 1-800-123-4567</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
export default UtilitiesPaymentPage