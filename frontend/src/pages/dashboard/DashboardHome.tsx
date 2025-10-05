import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightIcon, BellIcon, CreditCardIcon, PiggyBankIcon, ArrowUpRightIcon, ArrowDownLeftIcon } from 'lucide-react'
import Button from '../../components/Button'
import { getAccounts } from '../../api/accountApi'
import { getTransactions } from '../../api/transactionApi'
import { getNotifications } from '../../api/dashboardApi'
import { getSavingsGoals } from '../../api/savingsApi'

// Types
interface Account {
  id: string
  accountNumber: string
  accountType: string
  balance: number
  currency: string
}

interface Transaction {
  id: string
  description?: string
  amount: number
  type: "transfer" | "deposit" | "withdraw"
  createdAt: string
}

interface Notification {
  id: string
  message: string
  time: string
  type: string
}

interface SavingsGoal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
}

const DashboardHome = () => {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([])

  useEffect(() => {
    // Load accounts
    getAccounts().then(res => setAccounts(res.data)).catch(console.error)
    // Load transactions (limit 5 for dashboard)
    getTransactions().then(res => setTransactions(res.data.slice(0, 5))).catch(console.error)
    // Load notifications
    getNotifications().then(res => setNotifications(res)).catch(console.error)
    // Load savings goals (just first goal for preview)
    getSavingsGoals().then(res => setSavingsGoals(res.data)).catch(console.error)
  }, [])

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
                  <p className="text-sm text-gray-500">{account.accountType}</p>
                  <p className="text-sm text-gray-500">{account.accountNumber}</p>
                </div>
                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-blue-100">
                  <CreditCardIcon size={20} className="text-blue-600" />
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
                <div key={transaction.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${
                      transaction.type === 'deposit' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {transaction.type === 'deposit' 
                        ? <ArrowUpRightIcon size={16} className="text-green-600" /> 
                        : <ArrowDownLeftIcon size={16} className="text-red-600" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{transaction.description ?? transaction.type}</p>
                      <p className="text-sm text-gray-500">{new Date(transaction.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <p className={`font-medium ${
                    transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Transfer (unchanged UI) */}
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
                  <div className="h-8 w-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 bg-blue-100">
                    <BellIcon size={16} className="text-blue-600" />
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
          {savingsGoals.length > 0 && (
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
                    <p className="font-medium text-gray-900">{savingsGoals[0].name}</p>
                    <p className="text-sm text-gray-500">Target: ${savingsGoals[0].targetAmount}</p>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">
                      {Math.round((savingsGoals[0].currentAmount / savingsGoals[0].targetAmount) * 100)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" 
                      style={{ width: `${(savingsGoals[0].currentAmount / savingsGoals[0].targetAmount) * 100}%` }} />
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Saved: ${savingsGoals[0].currentAmount}</span>
                  <span className="text-gray-600">Remaining: ${savingsGoals[0].targetAmount - savingsGoals[0].currentAmount}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardHome

