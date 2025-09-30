import React, { useState } from 'react'
import DashboardLayout from '../../../components/layout/DashboardLayout'
import { Card, CardHeader, CardContent, CardFooter } from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import Badge from '../../../components/ui/Badge'
import { 
  ArrowRightIcon, 
  PlusIcon, 
  UserPlusIcon, 
  CalendarIcon, 
  InfoIcon, 
  CheckIcon,
  AlertCircleIcon,
  TrashIcon
} from 'lucide-react'
const ExternalTransferPage: React.FC = () => {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [transferSuccess, setTransferSuccess] = useState(false)
  const [showAddBeneficiary, setShowAddBeneficiary] = useState(false)
  const [formValues, setFormValues] = useState({
    fromAccount: '',
    beneficiary: '',
    amount: '',
    description: '',
    scheduleDate: '',
    transferNow: true,
    saveAsFavorite: false
  })
  const [newBeneficiary, setNewBeneficiary] = useState({
    name: '',
    accountNumber: '',
    bank: '',
    routingNumber: '',
    accountType: ''
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
  // Dummy beneficiaries data
  const beneficiaries = [
    {
      id: 'BEN-001',
      name: 'John Smith',
      accountNumber: '****1234',
      bank: 'Chase Bank',
      lastUsed: '2023-09-15'
    },
    {
      id: 'BEN-002',
      name: 'Jane Doe',
      accountNumber: '****5678',
      bank: 'Bank of America',
      lastUsed: '2023-08-22'
    },
    {
      id: 'BEN-003',
      name: 'Robert Johnson',
      accountNumber: '****9012',
      bank: 'Wells Fargo',
      lastUsed: '2023-07-30'
    }
  ]
  // Dummy recent transfers
  const recentTransfers = [
    {
      id: 'TRF-12345',
      date: '2023-10-12',
      beneficiary: 'John Smith',
      amount: 500.00,
      description: 'Rent payment',
      status: 'completed'
    },
    {
      id: 'TRF-12344',
      date: '2023-10-05',
      beneficiary: 'Jane Doe',
      amount: 250.00,
      description: 'Birthday gift',
      status: 'completed'
    },
    {
      id: 'TRF-12343',
      date: '2023-09-28',
      beneficiary: 'Robert Johnson',
      amount: 1200.00,
      description: 'Loan repayment',
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
  const handleNewBeneficiaryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewBeneficiary(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowConfirmation(true)
  }
  const handleAddBeneficiary = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would handle the actual beneficiary creation
    setShowAddBeneficiary(false)
    // Reset form
    setNewBeneficiary({
      name: '',
      accountNumber: '',
      bank: '',
      routingNumber: '',
      accountType: ''
    })
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
        beneficiary: '',
        amount: '',
        description: '',
        scheduleDate: '',
        transferNow: true,
        saveAsFavorite: false
      })
    }, 3000)
  }
  const handleSelectBeneficiary = (id: string) => {
    setFormValues(prev => ({
      ...prev,
      beneficiary: id
    }))
  }
  return (
    <DashboardLayout title="External Transfer">
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
                  <p className="text-gray-500 mb-6">Your external transfer has been initiated successfully.</p>
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
                <h2 className="text-lg font-medium text-gray-900">Transfer Money to External Account</h2>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
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
                    <div className="flex justify-between items-center mb-1">
                      <label htmlFor="beneficiary" className="block text-sm font-medium text-gray-700">
                        Select Beneficiary
                      </label>
                      <button
                        type="button"
                        className="text-sm text-blue-600 hover:text-blue-500 font-medium flex items-center"
                        onClick={() => setShowAddBeneficiary(true)}
                      >
                        <UserPlusIcon size={16} className="mr-1" />
                        Add New
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                      {beneficiaries.map(beneficiary => (
                        <div 
                          key={beneficiary.id}
                          className={`border rounded-lg p-3 cursor-pointer hover:bg-gray-50 ${
                            formValues.beneficiary === beneficiary.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                          }`}
                          onClick={() => handleSelectBeneficiary(beneficiary.id)}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium text-gray-900">{beneficiary.name}</p>
                              <p className="text-xs text-gray-500">{beneficiary.accountNumber}</p>
                              <p className="text-xs text-gray-500">{beneficiary.bank}</p>
                            </div>
                            {formValues.beneficiary === beneficiary.id && (
                              <CheckIcon size={16} className="text-blue-500" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    {formValues.beneficiary === '' && (
                      <p className="mt-2 text-sm text-red-600">Please select a beneficiary</p>
                    )}
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
                  <div className="bg-yellow-50 p-4 rounded-md flex">
                    <AlertCircleIcon size={20} className="text-yellow-500 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-yellow-800">External Transfer Notice</h4>
                      <div className="mt-1 text-sm text-yellow-700">
                        <p>• External transfers typically take 1-3 business days to process.</p>
                        <p>• A $3.00 fee may apply for expedited transfers.</p>
                        <p>• Daily external transfer limit: $5,000.</p>
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
                    disabled={!formValues.beneficiary}
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
                          Confirm External Transfer
                        </h3>
                        <div className="mt-4 space-y-3">
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-500">From Account:</p>
                            <p className="text-sm font-medium text-gray-900">
                              {accounts.find(a => a.id === formValues.fromAccount)?.name || ''}
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-500">To Beneficiary:</p>
                            <p className="text-sm font-medium text-gray-900">
                              {beneficiaries.find(b => b.id === formValues.beneficiary)?.name || ''}
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-500">Beneficiary Bank:</p>
                            <p className="text-sm font-medium text-gray-900">
                              {beneficiaries.find(b => b.id === formValues.beneficiary)?.bank || ''}
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
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-500">Fee:</p>
                            <p className="text-sm font-medium text-gray-900">$3.00</p>
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
          {/* Add Beneficiary Modal */}
          {showAddBeneficiary && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Add New Beneficiary
                      </h3>
                      <button 
                        type="button" 
                        className="text-gray-400 hover:text-gray-500"
                        onClick={() => setShowAddBeneficiary(false)}
                      >
                        <span className="sr-only">Close</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <form onSubmit={handleAddBeneficiary} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Beneficiary Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={newBeneficiary.name}
                          onChange={handleNewBeneficiaryChange}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Account Number
                        </label>
                        <input
                          type="text"
                          name="accountNumber"
                          id="accountNumber"
                          value={newBeneficiary.accountNumber}
                          onChange={handleNewBeneficiaryChange}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="routingNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Routing Number
                          </label>
                          <input
                            type="text"
                            name="routingNumber"
                            id="routingNumber"
                            value={newBeneficiary.routingNumber}
                            onChange={handleNewBeneficiaryChange}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="accountType" className="block text-sm font-medium text-gray-700 mb-1">
                            Account Type
                          </label>
                          <select
                            id="accountType"
                            name="accountType"
                            value={newBeneficiary.accountType}
                            onChange={handleNewBeneficiaryChange}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            required
                          >
                            <option value="">Select type</option>
                            <option value="checking">Checking</option>
                            <option value="savings">Savings</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="bank" className="block text-sm font-medium text-gray-700 mb-1">
                          Bank Name
                        </label>
                        <input
                          type="text"
                          name="bank"
                          id="bank"
                          value={newBeneficiary.bank}
                          onChange={handleNewBeneficiaryChange}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                      <div className="pt-4 flex justify-end space-x-3">
                        <Button
                          variant="outline"
                          type="button"
                          onClick={() => setShowAddBeneficiary(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          type="submit"
                          icon={<PlusIcon size={18} />}
                        >
                          Add Beneficiary
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Recent External Transfers</h3>
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
                      <span className="font-medium text-gray-700">To: {transfer.beneficiary}</span>
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
                View All External Transfers
              </Button>
            </CardFooter>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Saved Beneficiaries</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {beneficiaries.map(beneficiary => (
                <div key={beneficiary.id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{beneficiary.name}</p>
                    <p className="text-xs text-gray-500">{beneficiary.bank} • {beneficiary.accountNumber}</p>
                  </div>
                  <div className="flex space-x-1">
                    <button className="p-1 text-gray-400 hover:text-gray-500">
                      <TrashIcon size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                fullWidth
                icon={<UserPlusIcon size={18} />}
                onClick={() => setShowAddBeneficiary(true)}
              >
                Add New Beneficiary
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
                <p className="text-sm font-medium text-gray-900">$5,000.00</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">Monthly Limit</p>
                <p className="text-sm font-medium text-gray-900">$25,000.00</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">Used Today</p>
                <p className="text-sm font-medium text-gray-900">$0.00</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">Used This Month</p>
                <p className="text-sm font-medium text-gray-900">$1,950.00</p>
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
                  <span className="text-gray-700">7.8%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '7.8%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
export default ExternalTransferPage