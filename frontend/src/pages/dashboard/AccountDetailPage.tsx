import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { Card, CardHeader, CardContent } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { 
  DownloadIcon, 
  ArrowUpRightIcon, 
  ArrowDownLeftIcon, 
  ChevronRightIcon, 
  FileTextIcon, 
  RefreshCwIcon 
} from 'lucide-react'
const AccountDetailPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('transactions')
  // Dummy account data
  const account = {
    id: 'ACCT-12345',
    name: 'Premium Checking Account',
    number: '****7890',
    type: 'Checking',
    balance: 5842.67,
    availableBalance: 5842.67,
    currency: 'USD',
    status: 'Active'
  }
  l
  // Dummy transaction data
  const transactions = [
    {
      id: 'TX-12345',
      date: '2023-10-15',
      description: 'Salary Deposit',
      category: 'Income',
      amount: 3250.00,
      type: 'credit',
      status: 'completed'
    },
    {
      id: 'TX-12344',
      date: '2023-10-14',
      description: 'Amazon.com',
      category: 'Shopping',
      amount: 89.99,
      type: 'debit',
      status: 'completed'
    },
    {
      id: 'TX-12343',
      date: '2023-10-12',
      description: 'Starbucks Coffee',
      category: 'Food & Dining',
      amount: 5.75,
      type: 'debit',
      status: 'completed'
    },
    {
      id: 'TX-12342',
      date: '2023-10-10',
      description: 'Electricity Bill',
      category: 'Utilities',
      amount: 145.30,
      type: 'debit',
      status: 'completed'
    },
    {
      id: 'TX-12341',
      date: '2023-10-08',
      description: 'Transfer to Savings',
      category: 'Transfer',
      amount: 500.00,
      type: 'debit',
      status: 'completed'
    },
    {
      id: 'TX-12340',
      date: '2023-10-05',
      description: 'Netflix Subscription',
      category: 'Entertainment',
      amount: 14.99,
      type: 'debit',
      status: 'completed'
    },
    {
      id: 'TX-12339',
      date: '2023-10-01',
      description: 'Grocery Store',
      category: 'Groceries',
      amount: 78.35,
      type: 'debit',
      status: 'completed'
    }
  ]
  // Dummy statements data
  const statements = [
    {
      id: 'STMT-2023-09',
      period: 'September 2023',
      date: '2023-10-01',
      size: '1.2 MB'
    },
    {
      id: 'STMT-2023-08',
      period: 'August 2023',
      date: '2023-09-01',
      size: '1.1 MB'
    },
    {
      id: 'STMT-2023-07',
      period: 'July 2023',
      date: '2023-08-01',
      size: '1.3 MB'
    }
  ]
  return (
    <DashboardLayout title="Account Details">
      <div className="space-y-6">
        {/* Account Summary Card */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-medium text-gray-900">{account.name}</h2>
                <p className="text-sm text-gray-500">Account #{account.id}</p>
              </div>
              <Badge variant={account.status === 'Active' ? 'success' : 'warning'}>
                {account.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-500">Current Balance</p>
                  <p className="text-3xl font-semibold text-gray-900">${account.balance.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Available: ${account.availableBalance.toLocaleString()}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Account Number</p>
                    <p className="text-sm font-medium text-gray-900">{account.number}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Account Type</p>
                    <p className="text-sm font-medium text-gray-900">{account.type}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Currency</p>
                    <p className="text-sm font-medium text-gray-900">{account.currency}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-4 justify-center">
                <Button 
                  variant="primary"
                  fullWidth
                  icon={<ArrowUpRightIcon size={18} />}
                >
                  Transfer Money
                </Button>
                <Button 
                  variant="outline"
                  fullWidth
                  icon={<DownloadIcon size={18} />}
                >
                  Download Statement
                </Button>
                <Button 
                  variant="secondary"
                  fullWidth
                  icon={<RefreshCwIcon size={18} />}
                >
                  Refresh Balance
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('transactions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'transactions'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Transactions
            </button>
            <button
              onClick={() => setActiveTab('statements')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'statements'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Statements
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'details'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Account Details
            </button>
          </nav>
        </div>
        {/* Tab Content */}
        {activeTab === 'transactions' && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Recent Transactions</h3>
                <div className="flex items-center space-x-2">
                  <select className="text-sm border-gray-300 rounded-md">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                    <option>Custom range</option>
                  </select>
                  <Button variant="outline" size="sm">Filter</Button>
                </div>
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
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                            {transaction.type === 'credit' ? (
                              <ArrowDownLeftIcon size={16} className="text-green-600" />
                            ) : (
                              <ArrowUpRightIcon size={16} className="text-red-600" />
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
                            <div className="text-xs text-gray-500">ID: {transaction.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="default">{transaction.category}</Badge>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-gray-900'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link 
                          to={`/dashboard/transaction/${transaction.id}`} 
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <ChevronRightIcon size={20} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">7</span> of <span className="font-medium">24</span> transactions
              </div>
              <div className="flex-1 flex justify-between sm:justify-end">
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Previous
                </button>
                <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </Card>
        )}
        {activeTab === 'statements' && (
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Account Statements</h3>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Period
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Generated
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Size
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {statements.map((statement) => (
                    <tr key={statement.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <FileTextIcon size={16} className="text-gray-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{statement.period}</div>
                            <div className="text-xs text-gray-500">ID: {statement.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(statement.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {statement.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 inline-flex items-center">
                          <DownloadIcon size={16} className="mr-1" /> Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
        {activeTab === 'details' && (
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Account Details</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Account Information</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">Account Name</p>
                      <p className="text-sm font-medium text-gray-900">{account.name}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">Account Number</p>
                      <p className="text-sm font-medium text-gray-900">{account.number}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">Account Type</p>
                      <p className="text-sm font-medium text-gray-900">{account.type}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">Currency</p>
                      <p className="text-sm font-medium text-gray-900">{account.currency}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">Status</p>
                      <Badge variant={account.status === 'Active' ? 'success' : 'warning'}>
                        {account.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Account Features</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      No monthly maintenance fee
                    </li>
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Free online banking and bill pay
                    </li>
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Mobile check deposit
                    </li>
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Zelle® person-to-person payments
                    </li>
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Overdraft protection available
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
export default AccountDetailPage