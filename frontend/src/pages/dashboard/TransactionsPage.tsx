import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SearchIcon, FilterIcon, ArrowUpRightIcon, ArrowDownLeftIcon, DownloadIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import Button from '../../components/Button'
// Mock data
const transactions = [
  { id: '1', description: 'Salary Deposit', amount: 3500.00, type: 'credit', date: '2023-05-15', category: 'Income', account: 'Current Account' },
  { id: '2', description: 'Rent Payment', amount: 1200.00, type: 'debit', date: '2023-05-02', category: 'Housing', account: 'Current Account' },
  { id: '3', description: 'Grocery Store', amount: 85.75, type: 'debit', date: '2023-05-10', category: 'Groceries', account: 'Current Account' },
  { id: '4', description: 'Online Transfer', amount: 500.00, type: 'credit', date: '2023-05-08', category: 'Transfer', account: 'Savings Account' },
  { id: '5', description: 'Electric Bill', amount: 120.50, type: 'debit', date: '2023-05-05', category: 'Utilities', account: 'Current Account' },
  { id: '6', description: 'Freelance Payment', amount: 1200.00, type: 'credit', date: '2023-05-03', category: 'Income', account: 'Current Account' },
  { id: '7', description: 'Restaurant', amount: 65.30, type: 'debit', date: '2023-05-12', category: 'Dining', account: 'Current Account' },
  { id: '8', description: 'Mobile Phone Bill', amount: 45.99, type: 'debit', date: '2023-05-07', category: 'Utilities', account: 'Current Account' },
  { id: '9', description: 'Interest Earned', amount: 12.33, type: 'credit', date: '2023-05-31', category: 'Interest', account: 'Savings Account' },
  { id: '10', description: 'Gym Membership', amount: 50.00, type: 'debit', date: '2023-05-01', category: 'Health & Fitness', account: 'Current Account' }
]
const TransactionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    type: 'all',
    category: 'all',
    account: 'all'
  })
  // Filter transactions
  const filteredTransactions = transactions.filter(transaction => {
    // Search term
    if (searchTerm && !transaction.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }
    // Date filter
    if (filters.dateFrom && new Date(transaction.date) < new Date(filters.dateFrom)) {
      return false
    }
    if (filters.dateTo && new Date(transaction.date) > new Date(filters.dateTo)) {
      return false
    }
    // Type filter
    if (filters.type !== 'all' && transaction.type !== filters.type) {
      return false
    }
    // Category filter
    if (filters.category !== 'all' && transaction.category !== filters.category) {
      return false
    }
    // Account filter
    if (filters.account !== 'all' && transaction.account !== filters.account) {
      return false
    }
    return true
  })
  // Get unique categories and accounts for filters
  const categories = [...new Set(transactions.map(t => t.category))]
  const accounts = [...new Set(transactions.map(t => t.account))]
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
      {/* Search and Filter */}
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
          <Button 
            variant="outline" 
            className="flex items-center"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <FilterIcon size={16} className="mr-1" /> Filter
          </Button>
        </div>
        {filterOpen && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From Date
                </label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To Date
                </label>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="all">All Types</option>
                  <option value="credit">Credit</option>
                  <option value="debit">Debit</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account
                </label>
                <select
                  value={filters.account}
                  onChange={(e) => setFilters({...filters, account: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="all">All Accounts</option>
                  {accounts.map(account => (
                    <option key={account} value={account}>{account}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button 
                variant="outline" 
                className="mr-2"
                onClick={() => setFilters({
                  dateFrom: '',
                  dateTo: '',
                  type: 'all',
                  category: 'all',
                  account: 'all'
                })}
              >
                Reset
              </Button>
              <Button variant="primary">Apply Filters</Button>
            </div>
          </div>
        )}
      </div>
      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Account
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                        transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {transaction.type === 'credit' ? (
                          <ArrowUpRightIcon size={16} className="text-green-600" />
                        ) : (
                          <ArrowDownLeftIcon size={16} className="text-red-600" />
                        )}
                      </div>
                      <span className="font-medium text-gray-900">{transaction.description}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.account}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/dashboard/transactions/${transaction.id}`} className="text-blue-600 hover:text-blue-800">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">20</span> results
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
              <ChevronLeftIcon size={16} />
            </button>
            <button className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
              <ChevronRightIcon size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default TransactionsPage
