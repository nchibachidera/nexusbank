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
  ClockIcon,
  UserIcon,
  FileTextIcon,
  ShieldIcon,
  SettingsIcon,
  CreditCardIcon
} from 'lucide-react'
const AuditLogsPage: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false)
  const [showLogDetails, setShowLogDetails] = useState(false)
  const [selectedLog, setSelectedLog] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedUser, setSelectedUser] = useState('')
  const [dateRange, setDateRange] = useState({ from: '', to: '' })
  // Dummy audit logs data
  const auditLogs = [
    {
      id: 'LOG-12345',
      timestamp: '2023-10-15 09:45:23',
      user: {
        id: 'USR-12351',
        name: 'James Anderson',
        role: 'Admin'
      },
      action: 'user.password_reset',
      description: 'Password reset for user John Doe (USR-12345)',
      category: 'user_management',
      ip: '192.168.1.1',
      details: {
        targetUserId: 'USR-12345',
        targetUserName: 'John Doe',
        reason: 'User requested password reset via support ticket #ST-5678'
      }
    },
    {
      id: 'LOG-12344',
      timestamp: '2023-10-14 14:30:12',
      user: {
        id: 'USR-12352',
        name: 'Lisa Williams',
        role: 'Support'
      },
      action: 'account.status_change',
      description: 'Account status changed to LOCKED for user Michael Brown (USR-12349)',
      category: 'account_management',
      ip: '192.168.1.2',
      details: {
        targetUserId: 'USR-12349',
        targetUserName: 'Michael Brown',
        previousStatus: 'ACTIVE',
        newStatus: 'LOCKED',
        reason: 'Multiple failed login attempts detected'
      }
    },
    {
      id: 'LOG-12343',
      timestamp: '2023-10-14 10:15:45',
      user: {
        id: 'USR-12351',
        name: 'James Anderson',
        role: 'Admin'
      },
      action: 'role.permission_change',
      description: 'Modified permissions for role Support Staff',
      category: 'security',
      ip: '192.168.1.1',
      details: {
        roleId: 'ROLE-002',
        roleName: 'Support Staff',
        addedPermissions: ['view_user_details', 'reset_user_password'],
        removedPermissions: ['modify_user_details']
      }
    },
    {
      id: 'LOG-12342',
      timestamp: '2023-10-13 16:20:33',
      user: {
        id: 'SYSTEM',
        name: 'System',
        role: 'System'
      },
      action: 'system.fraud_alert',
      description: 'Fraud detection system flagged suspicious transaction',
      category: 'security',
      ip: 'internal',
      details: {
        alertId: 'ALERT-12344',
        transactionId: 'TX-12342',
        userId: 'USR-12348',
        userName: 'Emily Wilson',
        reason: 'Large international wire transfer exceeding usual transaction amount'
      }
    },
    {
      id: 'LOG-12341',
      timestamp: '2023-10-12 11:05:17',
      user: {
        id: 'USR-12352',
        name: 'Lisa Williams',
        role: 'Support'
      },
      action: 'transaction.manual_review',
      description: 'Transaction manually reviewed and approved',
      category: 'transaction',
      ip: '192.168.1.2',
      details: {
        transactionId: 'TX-12340',
        userId: 'USR-12346',
        userName: 'Jane Smith',
        amount: 1500.00,
        previousStatus: 'PENDING_REVIEW',
        newStatus: 'COMPLETED',
        notes: 'Customer confirmed transaction via phone verification'
      }
    },
    {
      id: 'LOG-12340',
      timestamp: '2023-10-10 08:30:55',
      user: {
        id: 'USR-12351',
        name: 'James Anderson',
        role: 'Admin'
      },
      action: 'system.settings_change',
      description: 'Modified system security settings',
      category: 'system',
      ip: '192.168.1.1',
      details: {
        setting: 'password_policy',
        previousValue: 'min_length:8,require_special:true,require_number:true',
        newValue: 'min_length:10,require_special:true,require_number:true,require_uppercase:true',
        reason: 'Enhancing security requirements as per policy update'
      }
    },
    {
      id: 'LOG-12339',
      timestamp: '2023-10-08 14:15:22',
      user: {
        id: 'USR-12352',
        name: 'Lisa Williams',
        role: 'Support'
      },
      action: 'user.information_update',
      description: 'Updated contact information for user Robert Johnson (USR-12347)',
      category: 'user_management',
      ip: '192.168.1.2',
      details: {
        targetUserId: 'USR-12347',
        targetUserName: 'Robert Johnson',
        fieldsChanged: ['phone_number', 'address'],
        reason: 'User requested update via support ticket #ST-5680'
      }
    },
    {
      id: 'LOG-12338',
      timestamp: '2023-10-05 09:20:10',
      user: {
        id: 'SYSTEM',
        name: 'System',
        role: 'System'
      },
      action: 'system.backup',
      description: 'Automated system backup completed',
      category: 'system',
      ip: 'internal',
      details: {
        backupId: 'BKP-20231005',
        status: 'SUCCESS',
        size: '1.2GB',
        duration: '15m 30s'
      }
    }
  ]
  // Filter logs based on search and filters
  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = searchQuery === '' || 
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) || 
      log.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === '' || log.category === selectedCategory
    const matchesUser = selectedUser === '' || log.user.id === selectedUser
    return matchesSearch && matchesCategory && matchesUser
  })
  // Category options
  const categoryOptions = ['user_management', 'account_management', 'security', 'transaction', 'system']
  // User options (unique users from logs)
  const userOptions = Array.from(new Set(auditLogs.map(log => log.user.id)))
    .map(userId => {
      const user = auditLogs.find(log => log.user.id === userId)?.user
      return { id: user?.id || '', name: user?.name || '' }
    })
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'user_management':
        return <Badge variant="info">User Management</Badge>
      case 'account_management':
        return <Badge variant="primary">Account Management</Badge>
      case 'security':
        return <Badge variant="danger">Security</Badge>
      case 'transaction':
        return <Badge variant="success">Transaction</Badge>
      case 'system':
        return <Badge variant="warning">System</Badge>
      default:
        return <Badge variant="default">{category}</Badge>
    }
  }
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'user_management':
        return <UserIcon size={16} className="text-blue-600" />
      case 'account_management':
        return <CreditCardIcon size={16} className="text-purple-600" />
      case 'security':
        return <ShieldIcon size={16} className="text-red-600" />
      case 'transaction':
        return <ArrowRightIcon size={16} className="text-green-600" />
      case 'system':
        return <SettingsIcon size={16} className="text-yellow-600" />
      default:
        return <FileTextIcon size={16} className="text-gray-600" />
    }
  }
  const handleViewLog = (log: any) => {
    setSelectedLog(log)
    setShowLogDetails(true)
  }
  return (
    <AdminLayout title="Audit Logs">
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
                placeholder="Search logs..."
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="category-filter"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="">All Categories</option>
                    {categoryOptions.map(category => (
                      <option key={category} value={category}>
                        {category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="user-filter" className="block text-sm font-medium text-gray-700 mb-1">
                    User
                  </label>
                  <select
                    id="user-filter"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="">All Users</option>
                    {userOptions.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.name} ({user.id})
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
                    setSelectedCategory('')
                    setSelectedUser('')
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card>
            <CardContent className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Logs</p>
                  <p className="text-2xl font-semibold text-gray-900">{auditLogs.length}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <FileTextIcon size={24} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">User Mgmt</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {auditLogs.filter(log => log.category === 'user_management').length}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <UserIcon size={24} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Security</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {auditLogs.filter(log => log.category === 'security').length}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                  <ShieldIcon size={24} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Transactions</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {auditLogs.filter(log => log.category === 'transaction').length}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <ArrowRightIcon size={24} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">System</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {auditLogs.filter(log => log.category === 'system').length}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <SettingsIcon size={24} className="text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Audit Logs Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Audit Logs</h3>
              <Badge variant="primary">{filteredLogs.length} Total</Badge>
            </div>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <ClockIcon size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{log.timestamp}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{log.user.name}</div>
                      <div className="text-xs text-gray-500">{log.user.role}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{log.action.split('.').join(' · ')}</div>
                      <div className="text-xs text-gray-500">IP: {log.ip}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">{log.description}</div>
                      <div className="text-xs text-gray-500">ID: {log.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center">
                        <div className="mr-2">
                          {getCategoryIcon(log.category)}
                        </div>
                        {getCategoryBadge(log.category)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button 
                        variant="outline" 
                        size="sm"
                        icon={<EyeIcon size={16} />}
                        onClick={() => handleViewLog(log)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
                {filteredLogs.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                      No audit logs found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <CardFooter className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredLogs.length}</span> of <span className="font-medium">{filteredLogs.length}</span> logs
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
      {/* Log Details Modal */}
      {showLogDetails && selectedLog && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10 ${
                    selectedLog.category === 'security' ? 'bg-red-100' :
                    selectedLog.category === 'user_management' ? 'bg-blue-100' :
                    selectedLog.category === 'transaction' ? 'bg-green-100' :
                    selectedLog.category === 'system' ? 'bg-yellow-100' :
                    'bg-gray-100'
                  }`}>
                    {getCategoryIcon(selectedLog.category)}
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                      Audit Log Details
                      <span className="ml-2">{getCategoryBadge(selectedLog.category)}</span>
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div className="border-b border-gray-200 pb-4">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-sm font-medium text-gray-900">{selectedLog.id}</p>
                          <p className="text-sm text-gray-500">{selectedLog.timestamp}</p>
                        </div>
                        <p className="text-sm text-gray-700">{selectedLog.description}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">User Information</h4>
                        <div className="mt-1 space-y-1">
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="text-sm font-medium text-gray-900">{selectedLog.user.name}</p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-500">Role</p>
                            <p className="text-sm font-medium text-gray-900">{selectedLog.user.role}</p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-500">User ID</p>
                            <p className="text-sm font-medium text-gray-900">{selectedLog.user.id}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Action Details</h4>
                        <div className="mt-1 space-y-1">
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-500">Action</p>
                            <p className="text-sm font-medium text-gray-900">{selectedLog.action}</p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-500">IP Address</p>
                            <p className="text-sm font-medium text-gray-900">{selectedLog.ip}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Additional Details</h4>
                        <div className="mt-1 bg-gray-50 p-3 rounded-md">
                          {Object.entries(selectedLog.details).map(([key, value]: [string, any]) => (
                            <div key={key} className="mb-1">
                              <p className="text-sm text-gray-500">{key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
                              <p className="text-sm font-medium text-gray-900">
                                {Array.isArray(value) 
                                  ? value.join(', ') 
                                  : typeof value === 'number' 
                                    ? value.toLocaleString() 
                                    : String(value)
                                }
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <Button
                  variant="outline"
                  onClick={() => setShowLogDetails(false)}
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
function ArrowRightIcon(props: any) {
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
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
export default AuditLogsPage