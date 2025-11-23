import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { 
  DownloadIcon, 
  ArrowLeftIcon, 
  ShareIcon, 
  FlagIcon, 
  PrinterIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ArrowUpRightIcon,
  ArrowDownLeftIcon
} from 'lucide-react'
import API from '../../api/axiosApi'

const TransactionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [transaction, setTransaction] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showReportModal, setShowReportModal] = useState(false)
  const [reportReason, setReportReason] = useState('')
  const [reportDescription, setReportDescription] = useState('')
  const [reportSubmitted, setReportSubmitted] = useState(false)

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        setLoading(true)
        const response = await API.get(`/transactions/${id}`)
        console.log('Transaction data:', response.data)
        setTransaction(response.data)
      } catch (err: any) {
        console.error('Error fetching transaction:', err)
        setError(err.response?.data?.message || 'Failed to load transaction')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchTransaction()
    }
  }, [id])

  const getStatusBadge = (status: string) => {
    const statusLower = status?.toLowerCase()
    switch (statusLower) {
      case 'completed':
      case 'success':
        return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
      case 'pending':
        return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
      case 'failed':
        return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Failed</span>
      default:
        return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">{status}</span>
    }
  }

  const getStatusIcon = (status: string) => {
    const statusLower = status?.toLowerCase()
    switch (statusLower) {
      case 'completed':
      case 'success':
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
    setTimeout(() => {
      setShowReportModal(false)
      setReportSubmitted(false)
      setReportReason('')
      setReportDescription('')
    }, 3000)
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (error || !transaction) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-800">{error || 'Transaction not found'}</p>
          <button
            onClick={() => navigate('/dashboard/transactions')}
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            Back to Transactions
          </button>
        </div>
      </div>
    )
  }

  const isCredit = transaction.transactionType === 'deposit' || 
                   (transaction.transactionType === 'transfer' && transaction.toAccountId)

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Back button */}
      <div>
        <Link 
          to="/dashboard/transactions"
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          <ArrowLeftIcon size={16} className="mr-1" />
          Back to Transactions
        </Link>
      </div>

      {/* Transaction Summary Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                {isCredit ? (
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
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-500">Amount</p>
                <p className={`text-3xl font-semibold ${
                  isCredit ? 'text-green-600' : 'text-gray-900'
                }`}>
                  {isCredit ? '+' : '-'}${Number(transaction.amount || 0).toFixed(2)}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(transaction.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="flex items-center">
                    {getStatusIcon(transaction.status)}
                    <span className="ml-1 text-sm font-medium text-gray-900">
                      {transaction.status}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="text-sm font-medium text-gray-900 capitalize">
                    {transaction.transactionType}
                  </p>
                </div>
                {transaction.fromAccount && (
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">From</p>
                    <p className="text-sm font-medium text-gray-900">
                      {transaction.fromAccount?.accountType} - {transaction.fromAccount?.accountNumber}
                    </p>
                  </div>
                )}
                {transaction.toAccount && (
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">To</p>
                    <p className="text-sm font-medium text-gray-900">
                      {transaction.toAccount?.accountType} - {transaction.toAccount?.accountNumber}
                    </p>
                  </div>
                )}
                {transaction.toAccountNumber && !transaction.toAccount && (
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">To Account</p>
                    <p className="text-sm font-medium text-gray-900">
                      {transaction.toAccountNumber}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {transaction.description && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Description</h3>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm text-gray-700">{transaction.description}</p>
                  </div>
                </div>
              )}

              <div className="pt-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <DownloadIcon size={18} className="mr-2" />
                    Download
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <PrinterIcon size={18} className="mr-2" />
                    Print
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <ShareIcon size={18} className="mr-2" />
                    Share
                  </button>
                  <button 
                    onClick={() => setShowReportModal(true)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center"
                  >
                    <FlagIcon size={18} className="mr-2" />
                    Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Receipt Preview Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Receipt Preview</h3>
        </div>
        <div className="p-6 flex justify-center">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm w-full max-w-md p-6">
            <div className="flex justify-center mb-6">
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold">NB</span>
              </div>
            </div>
            <div className="text-center mb-6">
              <h4 className="text-lg font-medium text-gray-900">Transaction Receipt</h4>
              <p className="text-sm text-gray-500">{new Date(transaction.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <p className="text-sm text-gray-500">Transaction ID</p>
                <p className="text-sm font-medium text-gray-900">{transaction.id}</p>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <p className="text-sm text-gray-500">Amount</p>
                <p className={`text-sm font-medium ${
                  isCredit ? 'text-green-600' : 'text-gray-900'
                }`}>
                  {isCredit ? '+' : '-'}${Number(transaction.amount || 0).toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <p className="text-sm text-gray-500">Type</p>
                <p className="text-sm font-medium text-gray-900 capitalize">{transaction.transactionType}</p>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <p className="text-sm text-gray-500">Date & Time</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(transaction.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <p className="text-sm text-gray-500">Status</p>
                <div className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                  <span className="text-sm font-medium text-gray-900">{transaction.status}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200 text-center">
              <p className="text-xs text-gray-500">Thank you for banking with NexusBank.</p>
              <p className="text-xs text-gray-500">For assistance, please contact our support team.</p>
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-center">
          <button className="px-6 py-2 bg-[#1e3a8a] text-white rounded-lg font-semibold hover:bg-[#1e40af] transition-colors flex items-center">
            <DownloadIcon size={18} className="mr-2" />
            Download Receipt
          </button>
        </div>
      </div>

      {/* Report Issue Modal */}
      {showReportModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowReportModal(false)}></div>
            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
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
                  </div>
                </div>
              ) : (
                <>
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Report an Issue</h3>
                    <form onSubmit={handleReportSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Reason for Report
                        </label>
                        <select
                          value={reportReason}
                          onChange={(e) => setReportReason(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          value={reportDescription}
                          onChange={(e) => setReportDescription(e.target.value)}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          placeholder="Please provide more details..."
                          required
                        />
                      </div>
                    </form>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-3">
                    <button
                      onClick={handleReportSubmit}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    >
                      Submit Report
                    </button>
                    <button
                      onClick={() => setShowReportModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TransactionDetailPage