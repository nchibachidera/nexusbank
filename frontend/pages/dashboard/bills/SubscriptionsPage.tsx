import React, { useState } from 'react'
import DashboardLayout from '../../../components/layout/DashboardLayout'
import { Card, CardHeader, CardContent, CardFooter } from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import Badge from '../../../components/ui/Badge'
import { 
  CreditCardIcon, 
  CheckIcon, 
  PlayIcon, 
  TvIcon, 
  MusicIcon,
  BookOpenIcon,
  CalendarIcon,
  ArrowUpRightIcon,
  PlusIcon,
  RefreshCwIcon,
  AlertCircleIcon,
  MoreHorizontalIcon
} from 'lucide-react'
const SubscriptionsPage: React.FC = () => {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [formValues, setFormValues] = useState({
    service: '',
    accountId: '',
    amount: '',
    fromAccount: '',
    saveAsRecurring: false,
    frequency: 'monthly'
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
  // Dummy subscription services
  const services = [
    {
      id: 'SERV-001',
      name: 'Netflix',
      type: 'streaming',
      icon: <PlayIcon size={20} className="text-red-500" />,
      plans: [
        { id: 'PLAN-001', name: 'Basic', amount: 9.99 },
        { id: 'PLAN-002', name: 'Standard', amount: 15.49 },
        { id: 'PLAN-003', name: 'Premium', amount: 19.99 }
      ]
    },
    {
      id: 'SERV-002',
      name: 'DSTV',
      type: 'tv',
      icon: <TvIcon size={20} className="text-blue-500" />,
      plans: [
        { id: 'PLAN-004', name: 'Access', amount: 29.99 },
        { id: 'PLAN-005', name: 'Family', amount: 49.99 },
        { id: 'PLAN-006', name: 'Premium', amount: 89.99 }
      ]
    },
    {
      id: 'SERV-003',
      name: 'Spotify',
      type: 'music',
      icon: <MusicIcon size={20} className="text-green-500" />,
      plans: [
        { id: 'PLAN-007', name: 'Individual', amount: 9.99 },
        { id: 'PLAN-008', name: 'Duo', amount: 12.99 },
        { id: 'PLAN-009', name: 'Family', amount: 15.99 }
      ]
    },
    {
      id: 'SERV-004',
      name: 'Audible',
      type: 'books',
      icon: <BookOpenIcon size={20} className="text-yellow-500" />,
      plans: [
        { id: 'PLAN-010', name: 'Plus', amount: 7.95 },
        { id: 'PLAN-011', name: 'Premium Plus', amount: 14.95 }
      ]
    }
  ]
  // Dummy active subscriptions
  const activeSubscriptions = [
    {
      id: 'SUB-001',
      service: 'Netflix',
      plan: 'Standard',
      amount: 15.49,
      nextPayment: '2023-11-15',
      status: 'active',
      accountId: 'user@example.com'
    },
    {
      id: 'SUB-002',
      service: 'Spotify',
      plan: 'Family',
      amount: 15.99,
      nextPayment: '2023-10-28',
      status: 'active',
      accountId: 'user123'
    }
  ]
  // Dummy payment history
  const paymentHistory = [
    {
      id: 'PAY-12345',
      date: '2023-10-15',
      service: 'Netflix',
      plan: 'Standard',
      amount: 15.49,
      status: 'completed'
    },
    {
      id: 'PAY-12344',
      date: '2023-10-10',
      service: 'DSTV',
      plan: 'Premium',
      amount: 89.99,
      status: 'completed'
    },
    {
      id: 'PAY-12343',
      date: '2023-09-28',
      service: 'Spotify',
      plan: 'Family',
      amount: 15.99,
      status: 'completed'
    },
    {
      id: 'PAY-12342',
      date: '2023-09-15',
      service: 'Netflix',
      plan: 'Standard',
      amount: 15.49,
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
      // If selecting a service, reset the amount
      if (name === 'service') {
        setFormValues(prev => ({
          ...prev,
          amount: ''
        }))
      }
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
        service: '',
        accountId: '',
        amount: '',
        fromAccount: '',
        saveAsRecurring: false,
        frequency: 'monthly'
      })
    }, 3000)
  }
  const handlePlanSelect = (amount: number) => {
    setFormValues(prev => ({
      ...prev,
      amount: amount.toString()
    }))
  }
  return (
    <DashboardLayout title="Subscriptions">
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
                  <p className="text-gray-500 mb-6">Your subscription payment has been processed successfully.</p>
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
                <h2 className="text-lg font-medium text-gray-900">Pay for Subscriptions</h2>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                      Subscription Service
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formValues.service}
                      onChange={handleChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      required
                    >
                      <option value="">Select service</option>
                      {services.map(service => (
                        <option key={service.id} value={service.id}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {formValues.service && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Select Plan
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {services
                          .find(s => s.id === formValues.service)
                          ?.plans.map(plan => (
                            <div 
                              key={plan.id}
                              className={`border rounded-lg p-3 cursor-pointer hover:bg-gray-50 ${
                                formValues.amount === plan.amount.toString() ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                              }`}
                              onClick={() => handlePlanSelect(plan.amount)}
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="font-medium text-gray-900">{plan.name}</p>
                                  <p className="text-sm text-gray-600">${plan.amount.toFixed(2)}/month</p>
                                </div>
                                {formValues.amount === plan.amount.toString() && (
                                  <CheckIcon size={16} className="text-blue-500" />
                                )}
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  )}
                  <div>
                    <label htmlFor="accountId" className="block text-sm font-medium text-gray-700 mb-1">
                      Account/Customer ID
                    </label>
                    <input
                      type="text"
                      name="accountId"
                      id="accountId"
                      value={formValues.accountId}
                      onChange={handleChange}
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Enter your subscription account ID"
                      required
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      This is the email or username you use to log in to the service
                    </p>
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
                        readOnly={!!formValues.service}
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
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="saveAsRecurring"
                          name="saveAsRecurring"
                          type="checkbox"
                          checked={formValues.saveAsRecurring}
                          onChange={handleChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="saveAsRecurring" className="font-medium text-gray-700">Set up recurring payment</label>
                        <p className="text-gray-500">Automatically pay this subscription in the future</p>
                      </div>
                    </div>
                    {formValues.saveAsRecurring && (
                      <div className="mt-4">
                        <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
                          Payment Frequency
                        </label>
                        <select
                          id="frequency"
                          name="frequency"
                          value={formValues.frequency}
                          onChange={handleChange}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                          <option value="monthly">Monthly</option>
                          <option value="quarterly">Quarterly</option>
                          <option value="annually">Annually</option>
                        </select>
                      </div>
                    )}
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
                    Pay Subscription
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
                          Confirm Subscription Payment
                        </h3>
                        <div className="mt-4 space-y-3">
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-500">Service:</p>
                            <p className="text-sm font-medium text-gray-900">
                              {services.find(s => s.id === formValues.service)?.name || ''}
                            </p>
                          </div>
                          {formValues.service && (
                            <div className="flex justify-between">
                              <p className="text-sm text-gray-500">Plan:</p>
                              <p className="text-sm font-medium text-gray-900">
                                {services
                                  .find(s => s.id === formValues.service)
                                  ?.plans.find(p => p.amount.toString() === formValues.amount)
                                  ?.name || ''}
                              </p>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-500">Account/Customer ID:</p>
                            <p className="text-sm font-medium text-gray-900">{formValues.accountId}</p>
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
                          {formValues.saveAsRecurring && (
                            <div className="flex justify-between">
                              <p className="text-sm text-gray-500">Recurring Payment:</p>
                              <p className="text-sm font-medium text-gray-900">
                                {formValues.frequency.charAt(0).toUpperCase() + formValues.frequency.slice(1)}
                              </p>
                            </div>
                          )}
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
                      Service
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plan
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
                        <div className="text-sm font-medium text-gray-900">{payment.service}</div>
                        <div className="text-xs text-gray-500">ID: {payment.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.plan}
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
          {/* Active Subscriptions Card */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Active Subscriptions</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeSubscriptions.length > 0 ? (
                activeSubscriptions.map((subscription) => (
                  <div 
                    key={subscription.id} 
                    className="p-4 border border-gray-200 rounded-md hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start">
                        {subscription.service === 'Netflix' && (
                          <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                            <PlayIcon size={16} className="text-red-600" />
                          </div>
                        )}
                        {subscription.service === 'Spotify' && (
                          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                            <MusicIcon size={16} className="text-green-600" />
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-900">{subscription.service}</p>
                          <p className="text-xs text-gray-500">{subscription.plan} • ${subscription.amount.toFixed(2)}/month</p>
                          <p className="text-xs text-gray-500 mt-1">ID: {subscription.accountId}</p>
                        </div>
                      </div>
                      <div className="flex">
                        <button className="p-1 text-gray-400 hover:text-gray-500">
                          <MoreHorizontalIcon size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center text-xs text-gray-500">
                        <CalendarIcon size={14} className="mr-1" />
                        Next payment: {new Date(subscription.nextPayment).toLocaleDateString()}
                      </div>
                      <Badge variant="success">Active</Badge>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500 text-sm">No active subscriptions</p>
                  <p className="text-gray-500 text-xs mt-1">Set up recurring payments to manage subscriptions</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                fullWidth
                icon={<PlusIcon size={18} />}
              >
                Add New Subscription
              </Button>
            </CardFooter>
          </Card>
          {/* Popular Services */}
          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Popular Services</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {services.map((service) => (
                  <button 
                    key={service.id}
                    className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 flex flex-col items-center justify-center"
                    onClick={() => setFormValues(prev => ({ ...prev, service: service.id }))}
                  >
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                      {service.icon}
                    </div>
                    <p className="text-sm font-medium text-gray-900">{service.name}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
          {/* Upcoming Payments */}
          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Upcoming Payments</h3>
            </CardHeader>
            <CardContent>
              {activeSubscriptions.length > 0 ? (
                <div className="space-y-3">
                  {activeSubscriptions.map(subscription => (
                    <div key={subscription.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div className="flex items-center">
                        <div className="mr-3">
                          {subscription.service === 'Netflix' && (
                            <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                              <PlayIcon size={16} className="text-red-600" />
                            </div>
                          )}
                          {subscription.service === 'Spotify' && (
                            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                              <MusicIcon size={16} className="text-green-600" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{subscription.service}</p>
                          <p className="text-xs text-gray-500">{new Date(subscription.nextPayment).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-900">${subscription.amount.toFixed(2)}</p>
                    </div>
                  ))}
                  <div className="pt-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700">Total for next 30 days</span>
                      <span className="font-medium text-gray-900">
                        ${activeSubscriptions.reduce((sum, sub) => sum + sub.amount, 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500 text-sm">No upcoming payments</p>
                </div>
              )}
              <div className="mt-4 p-3 bg-yellow-50 rounded-md">
                <div className="flex items-start">
                  <AlertCircleIcon size={16} className="text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-yellow-800">Remember to keep sufficient funds in your account for automatic subscription payments.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
export default SubscriptionsPage
