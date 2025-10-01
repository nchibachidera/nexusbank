import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightIcon, BellIcon, CreditCardIcon, PiggyBankIcon, ArrowUpRightIcon, ArrowDownLeftIcon } from 'lucide-react'
import Button from '../../components/Button'
// Mock data
const accounts = [
  { id: '1', name: 'Current Account', number: '****4567', balance: 24562.00, type: 'current' },
  { id: '2', name: 'Savings Account', number: '****7890', balance: 15750.25, type: 'savings' },
  { id: '3', name: 'Fixed Deposit', number: '****1234', balance: 50000.00, type: 'fixed' }
]
const transactions = [
  { id: '1', description: 'Salary Deposit', amount: 3500.00, type: 'credit', date: '2023-05-15', category: 'Income', icon: <ArrowUpRightIcon size={16} className="text-green-600" /> },
  { id: '2', description: 'Rent Payment', amount: 1200.00, type: 'debit', date: '2023-05-02', category: 'Housing', icon: <ArrowDownLeftIcon size={16} className="text-red-600" /> },
  { id: '3', description: 'Grocery Store', amount: 85.75, type: 'debit', date: '2023-05-10', category: 'Groceries', icon: <ArrowDownLeftIcon size={16} className="text-red-600" /> },
  { id: '4', description: 'Online Transfer', amount: 500.00, type: 'credit', date: '2023-05-08', category: 'Transfer', icon: <ArrowUpRightIcon size={16} className="text-green-600" /> },
  { id: '5', description: 'Electric Bill', amount: 120.50, type: 'debit', date: '2023-05-05', category: 'Utilities', icon: <ArrowDownLeftIcon size={16} className="text-red-600" /> }
]
const notifications = [
  { id: '1', message: 'Your salary has been deposited', time: '2 hours ago', type: 'success' },
  { id: '2', message: 'Bill payment due tomorrow', time: '5 hours ago', type: 'warning' },
  { id: '3', message: 'New security feature available', time: '1 day ago', type: 'info' }
]
const DashboardHome = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome Back!</h1>
        <p className="text-gray-600">Here's an overview of your accounts</p>
      </div>
      {/* Account Overview */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Account Overview</h2>
          <Link to="/dashboard/accounts" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
            View All <ArrowRightIcon size={16} className="ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {accounts.map(account => (
            <div key={account.id} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-500">{account.name}</p>
                  <p className="text-sm text-gray-500">{account.number}</p>
                </div>
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  account.type === 'current' ? 'bg-blue-100' : 
                  account.type === 'savings' ? 'bg-green-100' : 'bg-purple-100'
                }`}>
                  <CreditCardIcon 
                    size={20} 
                    className={`${
                      account.type === 'current' ? 'text-blue-600' : 
                      account.type === 'savings' ? 'text-green-600' : 'text-purple-600'
                    }`} 
                  />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">${account.balance.toLocaleString()}</p>
              <Link 
                to={`/dashboard/accounts/${account.id}`} 
                className="mt-4 text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                Details <ArrowRightIcon size={16} className="ml-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
              <Link to="/dashboard/transactions" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                View All <ArrowRightIcon size={16} className="ml-1" />
              </Link>
            </div>
            <div className="space-y-3">
              {transactions.map(transaction => (
                <Link 
                  key={transaction.id} 
                  to={`/dashboard/transactions/${transaction.id}`}
                  className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${
                      transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {transaction.icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{transaction.description}</p>
                      <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()} • {transaction.category}</p>
                    </div>
                  </div>
                  <p className={`font-medium ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                  </p>
                </Link>
              ))}
            </div>
          </div>
          {/* Quick Transfer */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Transfer</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button href="/dashboard/transfers/between-accounts" variant="outline" className="flex justify-center items-center py-3">
                Between Accounts
              </Button>
              <Button href="/dashboard/transfers/new" variant="primary" className="flex justify-center items-center py-3">
                New Transfer
              </Button>
              <Button href="/dashboard/transfers/external" variant="outline" className="flex justify-center items-center py-3">
                External Transfer
              </Button>
            </div>
          </div>
        </div>
        {/* Notifications & Savings Goal */}
        <div className="lg:col-span-1 space-y-6">
          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {notifications.length} New
              </span>
            </div>
            <div className="space-y-4">
              {notifications.map(notification => (
                <div key={notification.id} className="flex items-start">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                    notification.type === 'success' ? 'bg-green-100' : 
                    notification.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    <BellIcon 
                      size={16} 
                      className={`${
                        notification.type === 'success' ? 'text-green-600' : 
                        notification.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                      }`} 
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Savings Goal Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Savings Goal</h2>
              <Link to="/dashboard/savings" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                View All <ArrowRightIcon size={16} className="ml-1" />
              </Link>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <PiggyBankIcon size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Vacation Fund</p>
                  <p className="text-sm text-gray-500">Target: $5,000</p>
                </div>
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">60%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Saved: $3,000</span>
                <span className="text-gray-600">Remaining: $2,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DashboardHome
