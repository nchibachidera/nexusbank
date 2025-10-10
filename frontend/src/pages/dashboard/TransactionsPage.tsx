import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SearchIcon, FilterIcon, ArrowUpRightIcon, ArrowDownLeftIcon, DownloadIcon } from 'lucide-react'
import Button from '../../components/Button'
import { getTransactions } from '../../api/transactionApi'

interface Transaction {
  id: string
  type: "transfer" | "deposit" | "withdraw"
  amount: number
  currency: string
  description?: string
  status: "pending" | "completed" | "failed"
  fromAccountId?: string
  toAccountId?: string
  createdAt: string
  updatedAt: string
}

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    type: 'all',
    account: 'all',
    status: 'all'
  })

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await getTransactions()
        setTransactions(res.data.transactions || [])
      } catch (err) {
        console.error("Error fetching transactions", err)
        setTransactions([])
      } finally {
        setLoading(false)
      }
    }
    fetchTransactions()
  }, [])

  const filteredTransactions = transactions.filter(transaction => {
    if (searchTerm && !(transaction.description || '').toLowerCase().includes(searchTerm.toLowerCase())) return false
    if (filters.dateFrom && new Date(transaction.createdAt) < new Date(filters.dateFrom)) return false
    if (filters.dateTo && new Date(transaction.createdAt) > new Date(filters.dateTo)) return false
    if (filters.type !== 'all' && transaction.type !== filters.type) return false
    if (filters.status !== 'all' && transaction.status !== filters.status) return false
    return true
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading transactions...</p>
        </div>
      </div>
    )
  }

  const accounts = [...new Set(transactions.map(t => t.fromAccountId || t.toAccountId || 'Unknown'))]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600">View and manage your transaction history</p>
        </div>
        <Button variant="outline" className="flex items-center">
          <DownloadIcon size={16} className="mr-1" /> Export
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <SearchIcon className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          <Button variant="outline" className="flex items-center" onClick={() => setFilterOpen(!filterOpen)}>
            <FilterIcon size={16} className="mr-1" /> Filter
          </Button>
        </div>

        {filterOpen && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                <input type="date" value={filters.dateFrom} onChange={(e) => setFilters({...filters, dateFrom: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                <input type="date" value={filters.dateTo} onChange={(e) => setFilters({...filters, dateTo: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select value={filters.type} onChange={(e) => setFilters({...filters, type: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="all">All Types</option>
                  <option value="deposit">Deposit</option>
                  <option value="withdraw">Withdraw</option>
                  <option value="transfer">Transfer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account</label>
                <select value={filters.account} onChange={(e) => setFilters({...filters, account: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="all">All Accounts</option>
                  {accounts.map(account => <option key={account} value={account}>{account}</option>)}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No transactions found</p>
            <p className="text-sm text-gray-400">Your transactions will appear here once you make a transfer</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Account</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap flex items-center">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${transaction.type === 'deposit' || transaction.type === 'transfer' ? 'bg-green-100' : 'bg-red-100'}`}>
                        {transaction.type === 'deposit' || transaction.type === 'transfer' ? <ArrowUpRightIcon size={16} className="text-green-600" /> : <ArrowDownLeftIcon size={16} className="text-red-600" />}
                      </div>
                      <span className="font-medium text-gray-900">{transaction.description || "No description"}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(transaction.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.fromAccountId || transaction.toAccountId || "N/A"}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${transaction.type === 'deposit' || transaction.type === 'transfer' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'withdraw' ? '-' : '+'}{transaction.currency} {transaction.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/dashboard/transactions/${transaction.id}`} className="text-blue-600 hover:text-blue-800">View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default TransactionsPage

