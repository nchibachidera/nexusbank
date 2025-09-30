import React, { useState } from 'react'
import DashboardLayout from '../../../components/layout/DashboardLayout'
import { Card, CardHeader, CardContent, CardFooter } from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import Badge from '../../../components/ui/Badge'
import { ArrowRightIcon, CalendarIcon, InfoIcon, AlertCircleIcon, CheckIcon } from 'lucide-react'
const BetweenAccountsPage: React.FC = () => {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [transferSuccess, setTransferSuccess] = useState(false)
  const [formValues, setFormValues] = useState({
    fromAccount: '',
    toAccount: '',
    amount: '',
    description: '',
    scheduleDate: '',
    transferNow: true
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
  // Dummy recent transfers
  const recentTransfers = [
    {
      id: 'TRF-12345',
      date: '2023-10-12',
      fromAccount: 'Premium Checking Account',
      toAccount: 'High-Yield Savings',
      amount: 500.00,
      description: 'Monthly savings',
      status: 'completed'
    },
    {
      id: 'TRF-12344',
      date: '2023-10-05',
      fromAccount: 'Joint Checking Account',
      toAccount: 'Premium Checking Account',
      amount: 1200.00,
      description: 'Rent payment',
      status: 'completed'
    },
    {
      id: 'TRF-12343',
      date: '2023-09-28',
      fromAccount: 'Premium Checking Account',
      toAccount: 'High-Yield Savings',
      amount: 300.00,
      description: 'Emergency fund',
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
  const confirmTransfer = () => {
    // Here you would handle the actual transfer submission to backend
    setShowConfirmation(false)
    setTransferSuccess(true)
    // Reset form after a delay
    setTimeout(() => {
      setTransferSuccess(false)
      setFormValues({
        fromAccount: '',
        toAccount: '',
        amount: '',
        description: '',
        scheduleDate: '',
        transferNow: true
      })
    }, 3000)
  }
  return (
    <DashboardLayout title="Transfer Between Accounts">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {transferSuccess ? (
            <Card className="border-green-500">
              <CardContent className="py-8">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <CheckIcon size={24} className="text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Transfer Successful!</h3>
                  <p className="text-gray-500 mb-6">Your transfer has been initiated successfully.</p>
                  <Button 
                    variant="primary"
                    onClick={() => setTransferSuccess(false)}
                  >
                    Make Another Transfer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">Transfer Money Between Your Accounts</h2>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fromAccount" className="block text-sm font-medium text-gray-700 mb-1">
                        From Account
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
                    <div>
                      <label htmlFor="toAccount" className="block text-sm font-medium text-gray-700 mb-1">
                        To Account
                      </label>
                      <select
                        id="toAccount"
                        name="toAccount"
                        value={formValues.toAccount}
                        onChange={handleChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        required
                      >
                        <option value="">Select account</option>
                        {accounts.map(account => (
                          <option 
                            key={account.id} 
                            value={account.id}
                            disabled={account.id === formValues.fromAccount}
                          >
                            {account.name} (${account.balance.toLocaleString()})
                          </option>
                        ))}
                      </select>
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
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description (Optional)
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formValues.description}
                      onChange={handleChange}
                      rows={3}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What's this transfer for?"
                    />
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="transferNow"
                          name="transferNow"
                          type="checkbox"
                          checked={formValues.transferNow}
                          onChange={handleChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="transferNow" className="font-medium text-gray-700">Transfer now</label>
                        <p className="text-gray-500">The transfer will be processed immediately</p>
                      </div>
                    </div>
                    {!formValues.transferNow && (
                      <div className="mt-4">
                        <label htmlFor="scheduleDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Schedule Date
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <CalendarIcon size={16} className="text-gray-400" />
                          </div>
                          <input
                            type="date"
                            name="scheduleDate"
                            id="scheduleDate"
                            value={formValues.scheduleDate}
                            onChange={handleChange}
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                            required={!formValues.transferNow}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="bg-blue-50 p-4 rounded-md flex">
                    <InfoIcon size={20} className="text-blue-500 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-800">Transfer Information</h4>
                      <div className="mt-1 text-sm text-blue-700">
                        <p>• Transfers between your accounts are typically processed immediately.</p>
                        <p>• There are no fees for transferring between your own accounts.</p>
                        <p>• Daily transfer limit: $10,000.</p>
                      </div>
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
                    icon={<ArrowRightIcon size={18} />}
                  >
                    Continue
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
                        <InfoIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Confirm Transfer
                        </h3>
                        <div className="mt-4 space-y-3">
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-500">From Account:</p>
                            <p className="text-sm font-medium text-gray-900">
                              {accounts.find(a => a.id === formValues.fromAccount)?.name || ''}
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-500">To Account:</p>
                            <p className="text-sm font-medium text-gray-900">
                              {accounts.find(a => a.id === formValues.toAccount)?.name || ''}
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-500">Amount:</p>
                            <p className="text-sm font-medium text-gray-900">
                              ${formValues.amount ? parseFloat(formValues.amount).toFixed(2) : '0.00'}
                            </p>
                          </div>
                          {formValues.description && (
                            <div className="flex justify-between">
                              <p className="text-sm text-gray-500">Description:</p>
                              <p className="text-sm font-medium text-gray-900">{formValues.description}</p>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-500">When:</p>
                            <p className="text-sm font-medium text-gray-900">
                              {formValues.transferNow ? 'Immediately' : formValues.scheduleDate}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <Button
                      variant="primary"
                      onClick={confirmTransfer}
                      className="ml-3"
                    >
                      Confirm Transfer
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
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Recent Transfers</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentTransfers.map(transfer => (
                <div key={transfer.id} className="p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-900">${transfer.amount.toFixed(2)}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(transfer.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="success">Completed</Badge>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center text-xs text-gray-500">
                      <span className="font-medium text-gray-700">{transfer.fromAccount}</span>
                      <ArrowRightIcon size={12} className="mx-1" />
                      <span className="font-medium text-gray-700">{transfer.toAccount}</span>
                    </div>
                    {transfer.description && (
                      <p className="text-xs text-gray-500 mt-1">
                        {transfer.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" fullWidth>
                View All Transfers
              </Button>
            </CardFooter>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Transfer Limits</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">Daily Limit</p>
                <p className="text-sm font-medium text-gray-900">$10,000.00</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">Monthly Limit</p>
                <p className="text-sm font-medium text-gray-900">$50,000.00</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">Used Today</p>
                <p className="text-sm font-medium text-gray-900">$0.00</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">Used This Month</p>
                <p className="text-sm font-medium text-gray-900">$2,000.00</p>
              </div>
              <div className="pt-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">Daily Limit Used</span>
                  <span className="text-gray-700">0%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
              <div className="pt-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">Monthly Limit Used</span>
                  <span className="text-gray-700">4%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '4%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
export default BetweenAccountsPage