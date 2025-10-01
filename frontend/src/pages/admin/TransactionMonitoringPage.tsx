 import React, { useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Card, CardHeader, CardContent, CardFooter } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { 
  SearchIcon, 
  FilterIcon, 
  ChevronDownIcon,
  RefreshCwIcon,
  DownloadIcon,
  EyeIcon,
  AlertTriangleIcon,
  ArrowUpRightIcon,
  ArrowDownLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  XIcon,
  ClipboardListIcon
} from 'lucide-react'
const TransactionMonitoringPage: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false)
  const [showTransactionDetails, setShowTransactionDetails] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('')
  const [dateRange, setDateRange] = useState({ from: '', to: '' })
  // Dummy transactions data
  const transactions = [
    {
      id: 'TX-12345',
      date: '2023-10-15 09:45 AM',
      description: 'Salary Deposit - ABC Corporation',
      fromAccount: 'ABC Corporation',
      toAccount: 'John Doe (ACCT-12345)',
      amount: 3250.00,
      type: 'credit',
      status: 'completed',
      riskLevel: 'low',
      flags: []
    },
    {
      id: 'TX-12344',
      date: '2023-10-14 02:30 PM',
      description: 'External Transfer to Jane Smith',
      fromAccount: 'John Doe (ACCT-12345)',
      toAccount: 'Jane Smith (External)',
      amount: 1500.00,
      type: 'debit',
      status: 'completed',
      riskLevel: 'medium',
      flags: ['amount_threshold', 'new_recipient']
    },
    {
      id: 'TX-12343',
      date: '2023-10-12 11:15 AM',
      description: 'ATM Withdrawal',
      fromAccount: 'John Doe (ACCT-12345)',
      toAccount: 'ATM #1234',
      amount: 500.00,
      type: 'debit',
      status: 'completed',
      riskLevel: 'low',
      flags: []
    },
    {
      id: 'TX-12342',
      date: '2023-10-10 08:20 AM',
      description: 'International Wire Transfer',
      fromAccount: 'Emily Wilson (ACCT-12348)',
      toAccount: 'XYZ Ltd. (International)',
      amount: 5000.00,
      type: 'debit',
      status: 'pending_review',
      riskLevel: 'high',
      flags: ['international', 'large_amount', 'unusual_activity']
    },
    {
      id: 'TX-12341',
      date: '2023-10-08 03:10 PM',
      description: 'Multiple Transfers to Unknown Recipients',
      fromAccount: 'Michael Brown (ACCT-12349)',
      toAccount: 'Multiple Recipients',
      amount: 7500.00,
      type: 'debit',
      status: 'flagged',
      riskLevel: 'high',
      flags: ['suspicious_pattern', 'multiple_recipients', 'large_amount']
    },
    {
      id: 'TX-12340',
      date: '2023-10-05 10:30 AM',
      description: 'Utility Payment - City Power & Light',
      fromAccount: 'Jane Smith (ACCT-12346)',
      toAccount: 'City Power & Light',
      amount: 124.56,
      type: 'debit',
      status: 'completed',
      riskLevel: 'low',
      flags: []
    },
    {
      id: 'TX-12339',
      date: '2023-10-01 09:15 AM',
      description: 'Deposit - Check',
      fromAccount: 'Check #5678',
      toAccount: 'Robert Johnson (ACCT-12347)',
      amount: 1200.00,
      type: 'credit',
      status: 'completed',
      riskLevel: 'low',
      flags: []
    }
  ]
  // Filter transactions based on search and filters
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = searchQuery === '' || 
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.fromAccount.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.toAccount.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === '' || transaction.type === selectedType
    const matchesStatus = selectedStatus === '' || transaction.status === selectedStatus
    const matchesRiskLevel = selectedRiskLevel === '' || transaction.riskLevel === selectedRiskLevel
    return matchesSearch && matchesType && matchesStatus && matchesRiskLevel
  })
  // Type options
  const typeOptions = ['credit', 'debit']
  // Status options
  const statusOptions = ['completed', 'pending', 'pending_review', 'flagged', 'rejected']
  // Risk level options
  const riskLevelOptions = ['low', 'medium', 'high']
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Completed</Badge>
      case 'pending':
        return <Badge variant="default">Pending</Badge>
      case 'pending_review':
        return <Badge variant="warning">Pending Review</Badge>
      case 'flagged':
        return <Badge variant="danger">Flagged</Badge>
      case 'rejected':
        return <Badge variant="danger">Rejected</Badge>
      default:
        return <Badge variant="default">{status}</Badge>
    }
  }
  const getRiskLevelBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low':
        return <Badge variant="success">Low</Badge>
      case 'medium':
        return <Badge variant="warning">Medium</Badge>
      case 'high':
        return <Badge variant="danger">High</Badge>
      default:
        return <Badge variant="default">{riskLevel}</Badge>
    }
  }
  const handleViewTransaction = (transaction: any) => {
    setSelectedTransaction(transaction)
    setShowTransactionDetails(true)
  }
  const handleApproveTransaction = () => {
    // Here you would handle the actual approval
    setShowTransactionDetails(false)
  }
  const handleFlagTransaction = () => {
    // Here you would handle the actual flagging
    setShowTransactionDetails(false)
  }
  return (
    <AdminLayout title="Transaction Monitoring">
      <div className="space-y-6">
        {/* Actions Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
          <div className="flex items-center">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search transactions..."
              />
            </div>
            <div className="ml-3">
              <Button 
                variant="outline" 
                size="sm"
                icon={<FilterIcon size={16} />}
                onClick={() => setShowFilters(!showFilters)}
              >
                Filter
                <ChevronDownIcon 
                  size={16} 
                  className={`ml-1 transition-transform ${showFilters ? 'rotate-180' : ''}`} 
                />
              </Button>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              icon={<DownloadIcon size={16} />}
            >
              Export
            </Button>
            <Button 
              variant="primary" 
              size="sm"
              icon={<RefreshCwIcon size={16} />}
            >
              Refresh
            </Button>
          </div>
        </div>
        {/* Filters */}
        {showFilters && (
          <Card className="animate-in fade-in duration-200">
            <CardContent className="py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    id="type-filter"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="">All Types</option>
                    {typeOptions.map(type => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    id="status-filter"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="">All Statuses</option>
                    {statusOptions.map(status => (
                      <option key={status} value={status}>
                        {status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="risk-filter" className="block text-sm font-medium text-gray-700 mb-1">
                    Risk Level
                  </label>
                  <select
                    id="risk-filter"
                    value={selectedRiskLevel}
                    onChange={(e) => setSelectedRiskLevel(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="">All Risk Levels</option>
                    {riskLevelOptions.map(level => (
                      <option key={level} value={level}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="date-range" className="block text-sm font-medium text-gray-700 mb-1">
                    Date Range
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      id="date-from"
                      value={dateRange.from}
                      onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                      className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    />
                    <input
                      type="date"
                      id="date-to"
                      value={dateRange.to}
                      onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                      className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="mr-2"
                  onClick={() => {
                    setSelectedType('')
                    setSelectedStatus('')
                    setSelectedRiskLevel('')
                    setDateRange({ from: '', to: '' })
                    setSearchQuery('')
                  }}
                >
                  Reset
                </Button>
                <Button 
                  variant="primary" 
                  size="sm"
                >
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Transactions</p>
                  <p className="text-2xl font-semibold text-gray-900">{transactions.length}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <ClipboardListIcon size={24} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Pending Review</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {transactions.filter(t => t.status === 'pending_review').length}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <EyeIcon size={24} className="text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Flagged</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {transactions.filter(t => t.status === 'flagged').length}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangleIcon size={24} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">High Risk</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {transactions.filter(t => t.riskLevel === 'high').length}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <AlertCircleIcon size={24} className="text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Transactions</h3>
              <Badge variant="primary">{filteredTransactions.length} Total</Badge>
            </div>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID & Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    From / To
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Risk
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{transaction.id}</div>
                      <div className="text-sm text-gray-500">{transaction.date}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">{transaction.description}</div>
                      {transaction.flags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {transaction.flags.map((flag, index) => (
                            <span 
                              key={index}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800"
                            >
                              {flag.split('_').join(' ')}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{transaction.fromAccount}</div>
                      <div className="flex items-center text-sm text-gray-500">
                        <ArrowDownRightIcon size={14} className="mr-1" />
                        {transaction.toAccount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className={`text-sm font-medium ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-gray-900'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {transaction.type === 'credit' ? 'Incoming' : 'Outgoing'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {getStatusBadge(transaction.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {getRiskLevelBadge(transaction.riskLevel)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button 
                        variant="outline" 
                        size="sm"
                        icon={<EyeIcon size={16} />}
                        onClick={() => handleViewTransaction(transaction)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
                {filteredTransactions.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                      No transactions found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <CardFooter className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredTransactions.length}</span> of <span className="font-medium">{filteredTransactions.length}</span> transactions
            </div>
            <div className="flex-1 flex justify-between sm:justify-end">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
          </CardFooter>
        </Card>
      </div>
      {/* Transaction Details Modal */}
      {showTransactionDetails && selectedTransaction && (
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
                    <ClipboardListIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                      Transaction Details
                      <span className="ml-2">
                        {getRiskLevelBadge(selectedTransaction.riskLevel)}
                      </span>
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div className="border-b border-gray-200 pb-4">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-sm font-medium text-gray-900">{selectedTransaction.id}</p>
                          {getStatusBadge(selectedTransaction.status)}
                        </div>
                        <p className="text-sm text-gray-500">{selectedTransaction.date}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Description</h4>
                        <p className="text-sm text-gray-700 mt-1">{selectedTransaction.description}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">From</h4>
                          <p className="text-sm text-gray-700 mt-1">{selectedTransaction.fromAccount}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">To</h4>
                          <p className="text-sm text-gray-700 mt-1">{selectedTransaction.toAccount}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Amount</h4>
                          <p className={`text-sm font-medium mt-1 ${
                            selectedTransaction.type === 'credit' ? 'text-green-600' : 'text-gray-900'
                          }`}>
                            {selectedTransaction.type === 'credit' ? '+' : '-'}${selectedTransaction.amount.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Type</h4>
                          <p className="text-sm text-gray-700 mt-1 capitalize">{selectedTransaction.type}</p>
                        </div>
                      </div>
                      {selectedTransaction.flags.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Flags</h4>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedTransaction.flags.map((flag: string, index: number) => (
                              <span 
                                key={index}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800"
                              >
                                {flag.split('_').join(' ')}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {(selectedTransaction.status === 'pending_review' || selectedTransaction.status === 'flagged') && (
                        <div className="bg-yellow-50 p-3 rounded-md">
                          <div className="flex">
                            <AlertTriangleIcon size={16} className="text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                            <p className="text-sm text-yellow-700">
                              This transaction requires review due to risk factors. Please verify details before approving.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {(selectedTransaction.status === 'pending_review' || selectedTransaction.status === 'flagged') && (
                  <>
                    <Button
                      variant="primary"
                      onClick={handleApproveTransaction}
                      className="ml-3"
                      icon={<CheckIcon size={18} />}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      onClick={handleFlagTransaction}
                      className="ml-3"
                      icon={<XIcon size={18} />}
                    >
                      Reject
                    </Button>
                  </>
                )}
                <Button
                  variant="outline"
                  onClick={() => setShowTransactionDetails(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
// Import missing icon
function ArrowDownRightIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 7l10 10" />
      <path d="M17 7v10H7" />
    </svg>
  );
}
function AlertCircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
export default TransactionMonitoringPage