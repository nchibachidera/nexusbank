import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  ArrowRightIcon, 
  BellIcon, 
  CreditCardIcon, 
  PiggyBankIcon, 
  ArrowUpIcon, 
  ArrowDownIcon,
  TrendingUpIcon,
  PlusIcon,
  SendIcon,
  SettingsIcon,
  FileTextIcon
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
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
  const { user } = useAuth()
  const [accounts, setAccounts] = useState<Account[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Load accounts - expects { accounts: [...] }
        const accountsRes = await getAccounts()
        setAccounts(accountsRes.data.accounts || [])
        
        // Load transactions - expects { transactions: [...] }
        const transactionsRes = await getTransactions()
        const transactionsList = transactionsRes.data.transactions || transactionsRes.data || []
        
        // Map API transactions to match our Transaction interface
        const mappedTransactions = Array.isArray(transactionsList) 
          ? transactionsList.map((t: any) => ({
              id: t.id,
              description: t.description || t.type || 'Transaction',
              amount: t.amount,
              type: t.type || (t.amount > 0 ? 'deposit' : 'withdraw'),
              createdAt: t.createdAt || t.date || new Date().toISOString()
            })).slice(0, 5)
          : []
        
        setTransactions(mappedTransactions)
        
        // Load notifications - handle different response formats
        try {
          const notificationsRes = await getNotifications()
          const notificationsList = notificationsRes.data?.notifications || notificationsRes.data || notificationsRes || []
          setNotifications(Array.isArray(notificationsList) ? notificationsList : [])
        } catch (err) {
          console.error('Notifications error:', err)
          setNotifications([])
        }
        
        // Load savings goals - expects { data: [...] }
        try {
          const savingsRes = await getSavingsGoals()
          const savingsList = savingsRes.data?.goals || savingsRes.data || []
          setSavingsGoals(Array.isArray(savingsList) ? savingsList : [])
        } catch (err) {
          console.error('Savings goals error:', err)
          setSavingsGoals([])
        }
        
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a8a] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const totalBalance = accounts.reduce((sum, acc) => sum + (Number(acc.balance) || 0), 0)
  const availableBalance = totalBalance // Use total balance as available balance

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Financial Overview</h1>
        <p className="text-gray-600">Manage your banking activities</p>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Balance - Primary Card */}
        <div className="bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <CreditCardIcon size={20} />
              <span className="text-sm font-medium uppercase tracking-wide">Primary</span>
            </div>
          </div>
          <p className="text-sm opacity-90 mb-2">Total Balance</p>
          <p className="text-3xl font-bold mb-2">${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <div className="flex items-center text-sm">
            <TrendingUpIcon size={16} className="mr-1" />
            <span>+2.5% from last month</span>
          </div>
        </div>

        {/* Available Balance */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 mb-4">
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <p className="text-sm text-gray-600 mb-2">Available Balance</p>
          <p className="text-2xl font-bold text-gray-900">${availableBalance.toFixed(2)}</p>
        </div>

        {/* Pending Balance */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-yellow-100 mb-4">
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
          </div>
          <p className="text-sm text-gray-600 mb-2">Pending Balance</p>
          <p className="text-2xl font-bold text-gray-900">$0.00</p>
          <p className="text-xs text-gray-500 mt-1">Processing transactions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Your Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Your Card</h2>
            <div className="bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl p-6 text-white">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center space-x-2">
                  <CreditCardIcon size={24} />
                  <span className="text-sm font-medium">DEBIT</span>
                </div>
                <div className="text-right">
                  <p className="text-xs opacity-70">EXPIRES</p>
                  <p className="text-sm font-medium">09/28</p>
                </div>
              </div>
              <div className="mb-6">
                <p className="text-xs opacity-70 mb-1">Available Balance</p>
                <p className="text-2xl font-bold">${availableBalance.toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs opacity-70 mb-1">CARDHOLDER NAME</p>
                  <p className="text-sm font-medium">{user?.fullName?.toUpperCase() || 'USER NAME'}</p>
                </div>
                <div className="text-sm font-mono">
                  5122 •••• •••• 8111
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
              <Link to="/dashboard/transactions" className="text-[#1e3a8a] hover:text-blue-800 text-sm font-medium flex items-center">
                View All <ArrowRightIcon size={16} className="ml-1" />
              </Link>
            </div>
            {transactions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No transactions yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {transactions.map(transaction => (
                  <div key={transaction.id} className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                        transaction.type === 'deposit' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {transaction.type === 'deposit' 
                          ? <ArrowDownIcon size={20} className="text-green-600" /> 
                          : <ArrowUpIcon size={20} className="text-red-600" />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description || transaction.type}</p>
                        <p className="text-sm text-gray-500">{new Date(transaction.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <p className={`font-semibold ${
                      transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Account Information */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h2>
            {accounts.length > 0 && (
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Account Name</p>
                  <p className="font-medium text-gray-900">{user?.fullName || 'User'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Account Type</p>
                  <p className="font-medium text-gray-900">{accounts[0].accountType}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Account Number</p>
                  <p className="font-medium text-gray-900">{accounts[0].accountNumber}</p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/dashboard/transfers/new" className="flex flex-col items-center justify-center p-4 bg-[#1e3a8a] text-white rounded-xl hover:bg-[#1e40af] transition-colors">
                <SendIcon size={24} className="mb-2" />
                <span className="text-sm font-medium">Send Money</span>
                <span className="text-xs opacity-80">Wire Transfer</span>
              </Link>
              <Link to="/dashboard/accounts" className="flex flex-col items-center justify-center p-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors">
                <PlusIcon size={24} className="mb-2" />
                <span className="text-sm font-medium">Add Deposit</span>
                <span className="text-xs opacity-80">Fund account</span>
              </Link>
              <Link to="/dashboard/profile" className="flex flex-col items-center justify-center p-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                <SettingsIcon size={24} className="mb-2" />
                <span className="text-sm font-medium">Settings</span>
                <span className="text-xs opacity-80">Account Settings</span>
              </Link>
              <Link to="/dashboard/transactions" className="flex flex-col items-center justify-center p-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                <FileTextIcon size={24} className="mb-2" />
                <span className="text-sm font-medium">Statements</span>
                <span className="text-xs opacity-80">Reports</span>
              </Link>
            </div>
          </div>

          {/* Notifications */}
          {notifications.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                <span className="bg-[#1e3a8a] text-white text-xs font-medium px-2.5 py-1 rounded-full">
                  {notifications.length}
                </span>
              </div>
              <div className="space-y-4">
                {notifications.slice(0, 3).map(notification => (
                  <div key={notification.id} className="flex items-start space-x-3">
                    <div className="h-8 w-8 rounded-full flex items-center justify-center bg-blue-100 flex-shrink-0">
                      <BellIcon size={16} className="text-[#1e3a8a]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardHome

