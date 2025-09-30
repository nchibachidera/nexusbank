 import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { Card, CardHeader, CardContent, CardFooter } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { 
  DownloadIcon, 
  ArrowLeftIcon, 
  ShareIcon, 
  FlagIcon, 
  PrinterIcon,
  FileTextIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ArrowUpRightIcon,
  ArrowDownLeftIcon
} from 'lucide-react'
const TransactionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [showReportModal, setShowReportModal] = useState(false)
  const [reportReason, setReportReason] = useState('')
  const [reportDescription, setReportDescription] = useState('')
  const [reportSubmitted, setReportSubmitted] = useState(false)
  // Dummy transaction data
  const transaction = {
    id: id || 'TX-12345',
    date: '2023-10-15T14:30:00',
    description: 'Salary Deposit - ABC Corporation',
    category: 'Income',
    amount: 3250.00,
    type: 'credit',
    status: 'completed',
    fromAccount: 'ABC Corporation',
    toAccount: 'Premium Checking Account',
    reference: 'REF-987654321',
    notes: '',
    fee: 0,
    balance: 5842.67
  }
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Completed</Badge>
      case 'pending':
        return <Badge variant="warning">Pending</Badge>
      case 'failed':
        return <Badge variant="danger">Failed</Badge>
      default:
        return <Badge variant="default">{status}</Badge>
    }
  }
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon size={24} className="text-green-500" />
      case 'pending':
        return <ClockIcon size={24} className="text-yellow-500" />
      case 'failed':
        return <XCircleIcon size={24} className="text-red-500" />
      default:
        return null
    }
  }
  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setReportSubmitted(true)
    // Reset form after successful submission
    setTimeout(() => {
      setShowReportModal(false)
      setReportSubmitted(false)
      setReportReason('')
      setReportDescription('')
    }, 3000)
  }
  return (
    <DashboardLayout title="Transaction Details">
      <div className="space-y-6">
        {/* Back button */}
        <div>
          <Link 
            to="/dashboard/account"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            <ArrowLeftIcon size={16} className="mr-1" />
            Back to Account
          </Link>
        </div>
        {/* Transaction Summary Card */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  {transaction.type === 'credit' ? (
                    <ArrowDownLeftIcon size={20} className="text-green-600" />
                  ) : (
                    <ArrowUpRightIcon size={20} className="text-red-600" />
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Transaction Details</h2>
                  <p className="text-sm text-gray-500">ID: {transaction.id}</p>
                </div>
              </div>
              {getStatusBadge(transaction.status)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-500">Amount</p>
                  <p className={`text-3xl font-semibold ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-gray-900'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(transaction.date).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Status</p>
                    <div className="flex items-center">
                      {getStatusIcon(transaction.status)}
                      <span className="ml-1 text-sm font-medium text-gray-900">
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="text-sm font-medium text-gray-900">
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Category</p>
                    <Badge variant="default">{transaction.category}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">From</p>
                    <p className="text-sm font-medium text-gray-900">{transaction.fromAccount}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">To</p>
                    <p className="text-sm font-medium text-gray-900">{transaction.toAccount}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Reference</p>
                    <p className="text-sm font-medium text-gray-900">{transaction.reference}</p>
                  </div>
                  {transaction.fee > 0 && (
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">Fee</p>
                      <p className="text-sm font-medium text-gray-900">${transaction.fee.toFixed(2)}</p>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Resulting Balance</p>
                    <p className="text-sm font-medium text-gray-900">${transaction.balance.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Description</h3>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm text-gray-700">{transaction.description}</p>
                  </div>
                </div>
                {transaction.notes && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Notes</h3>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-sm text-gray-700">{transaction.notes}</p>
                    </div>
                  </div>
                )}
                <div className="pt-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline"
                      fullWidth
                      icon={<DownloadIcon size={18} />}
                    >
                      Download Receipt
                    </Button>
                    <Button 
                      variant="outline"
                      fullWidth
                      icon={<PrinterIcon size={18} />}
                    >
                      Print
                    </Button>
                    <Button 
                      variant="outline"
                      fullWidth
                      icon={<ShareIcon size={18} />}
                    >
                      Share
                    </Button>
                    <Button 
                      variant="outline"
                      fullWidth
                      icon={<FlagIcon size={18} />}
                      onClick={() => setShowReportModal(true)}
                    >
                      Report Issue
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Receipt Preview Card */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">Receipt Preview</h3>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm w-full max-w-md p-6">
              <div className="flex justify-center mb-6">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold">BB</span>
                </div>
              </div>
              <div className="text-center mb-6">
                <h4 className="text-lg font-medium text-gray-900">Transaction Receipt</h4>
                <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <p className="text-sm text-gray-500">Transaction ID</p>
                  <p className="text-sm font-medium text-gray-900">{transaction.id}</p>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className={`text-sm font-medium ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-gray-900'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                  </p>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <p className="text-sm text-gray-500">From</p>
                  <p className="text-sm font-medium text-gray-900">{transaction.fromAccount}</p>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <p className="text-sm text-gray-500">To</p>
                  <p className="text-sm font-medium text-gray-900">{transaction.toAccount}</p>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(transaction.date).toLocaleString()}
                  </p>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <p className="text-sm text-gray-500">Reference</p>
                  <p className="text-sm font-medium text-gray-900">{transaction.reference}</p>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                    <span className="text-sm font-medium text-gray-900">
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                <p className="text-xs text-gray-500">Thank you for banking with BankApp.</p>
                <p className="text-xs text-gray-500">For assistance, please contact our support team.</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button 
              variant="primary"
              icon={<DownloadIcon size={18} />}
            >
              Download Receipt
            </Button>
          </CardFooter>
        </Card>
        {/* Report Issue Modal */}
        {showReportModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                {reportSubmitted ? (
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="flex flex-col items-center justify-center py-6">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                        <CheckCircleIcon className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Report Submitted</h3>
                      <p className="text-sm text-gray-500 text-center">
                        Thank you for reporting this issue. Our team will review it and get back to you if needed.
                      </p>
                      <div className="mt-6">
                        <Button
                          variant="primary"
                          onClick={() => {
                            setShowReportModal(false)
                            setReportSubmitted(false)
                          }}
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <FlagIcon className="h-6 w-6 text-red-600" />
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                          <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Report an Issue
                          </h3>
                          <div className="mt-4">
                            <form onSubmit={handleReportSubmit} className="space-y-4">
                              <div>
                                <label htmlFor="reportReason" className="block text-sm font-medium text-gray-700 mb-1">
                                  Reason for Report
                                </label>
                                <select
                                  id="reportReason"
                                  value={reportReason}
                                  onChange={(e) => setReportReason(e.target.value)}
                                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                                  required
                                >
                                  <option value="">Select reason</option>
                                  <option value="unauthorized">Unauthorized Transaction</option>
                                  <option value="wrong-amount">Wrong Amount</option>
                                  <option value="duplicate">Duplicate Transaction</option>
                                  <option value="scam">Potential Scam</option>
                                  <option value="other">Other Issue</option>
                                </select>
                              </div>
                              <div>
                                <label htmlFor="reportDescription" className="block text-sm font-medium text-gray-700 mb-1">
                                  Description
                                </label>
                                <textarea
                                  id="reportDescription"
                                  value={reportDescription}
                                  onChange={(e) => setReportDescription(e.target.value)}
                                  rows={4}
                                  className="shadow-sm focus:ring-red-500 focus:border-red-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                                  placeholder="Please provide more details about the issue..."
                                  required
                                />
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <Button
                        variant="danger"
                        onClick={handleReportSubmit}
                        className="ml-3"
                        icon={<FlagIcon size={18} />}
                      >
                        Submit Report
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowReportModal(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
export default TransactionDetailPage