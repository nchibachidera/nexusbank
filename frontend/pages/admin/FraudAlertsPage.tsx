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
  AlertTriangleIcon,
  CheckIcon,
  XIcon,
  UserIcon,
  EyeIcon,
  ClockIcon,
  BellIcon
} from 'lucide-react'
const FraudAlertsPage: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false)
  const [showAlertDetails, setShowAlertDetails] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedSeverity, setSelectedSeverity] = useState('')
  const [dateRange, setDateRange] = useState({ from: '', to: '' })
  // Dummy alerts data
  const alerts = [
    {
      id: 'ALERT-12345',
      date: '2023-10-15 09:45 AM',
      title: 'Unusual Login Activity',
      description: 'Multiple failed login attempts followed by a successful login from a new location.',
      user: {
        id: 'USR-12345',
        name: 'John Doe',
        email: 'john.doe@example.com'
      },
      type: 'login',
      status: 'open',
      severity: 'high',
      details: {
        ipAddress: '203.0.113.1',
        location: 'Kiev, Ukraine',
        device: 'Windows 10, Chrome',
        previousLocation: 'New York, USA'
      }
    },
    {
      id: 'ALERT-12344',
      date: '2023-10-14 02:30 PM',
      title: 'Large International Wire Transfer',
      description: 'International wire transfer exceeding usual transaction amount for this customer.',
      user: {
        id: 'USR-12348',
        name: 'Emily Wilson',
        email: 'emily.wilson@example.com'
      },
      type: 'transaction',
      status: 'investigating',
      severity: 'high',
      details: {
        transactionId: 'TX-12342',
        amount: 5000.00,
        recipient: 'XYZ Ltd. (International)',
        country: 'United Arab Emirates',
        previousLargestTransfer: 1200.00
      }
    },
    {
      id: 'ALERT-12343',
      date: '2023-10-12 11:15 AM',
      title: 'Multiple Rapid Transfers',
      description: 'Multiple transfers to different recipients within a short time period.',
      user: {
        id: 'USR-12349',
        name: 'Michael Brown',
        email: 'michael.brown@example.com'
      },
      type: 'transaction',
      status: 'open',
      severity: 'medium',
      details: {
        transactionIds: ['TX-12341', 'TX-12340', 'TX-12339'],
        totalAmount: 7500.00,
        recipients: 5,
        timeFrame: '15 minutes'
      }
    },
    {
      id: 'ALERT-12342',
      date: '2023-10-10 08:20 AM',
      title: 'Suspicious Account Activity',
      description: 'Multiple password reset attempts followed by large withdrawal.',
      user: {
        id: 'USR-12347',
        name: 'Robert Johnson',
        email: 'robert.johnson@example.com'
      },
      type: 'account',
      status: 'investigating',
      severity: 'medium',
      details: {
        passwordResetAttempts: 3,
        withdrawalAmount: 2000.00,
        ipAddress: '198.51.100.1',
        location: 'Remote location'
      }
    },
    {
      id: 'ALERT-12341',
      date: '2023-10-08 03:10 PM',
      title: 'Potential ATO Attack',
      description: 'Account accessed from multiple locations in a short time period.',
      user: {
        id: 'USR-12346',
        name: 'Jane Smith',
        email: 'jane.smith@example.com'
      },
      type: 'login',
      status: 'resolved',
      severity: 'high',
      details: {
        locations: ['New York, USA', 'London, UK', 'Singapore'],
        timeFrame: '2 hours',
        devices: ['iPhone', 'Windows PC', 'Android']
      },
      resolution: {
        action: 'Account locked',
        notes: 'Customer contacted and confirmed they were traveling. Account unlocked after identity verification.',
        resolvedBy: 'Admin User',
        resolvedAt: '2023-10-08 05:30 PM'
      }
    },
    {
      id: 'ALERT-12340',
      date: '2023-10-05 10:30 AM',
      title: 'Potential Identity Theft',
      description: 'Multiple accounts created with similar details but different names.',
      user: {
        id: 'MULTIPLE',
        name: 'Multiple Users',
        email: 'various@example.com'
      },
      type: 'identity',
      status: 'resolved',
      severity: 'critical',
      details: {
        accountsAffected: 3,
        commonDetails: 'Same address, phone number pattern, IP address',
        creationDates: ['2023-10-01', '2023-10-02', '2023-10-03']
      },
      resolution: {
        action: 'Accounts frozen',
        notes: 'Investigation confirmed fraudulent accounts. All accounts closed and reported to authorities.',
        resolvedBy: 'Security Team',
        resolvedAt: '2023-10-07 02:15 PM'
      }
    },
    {
      id: 'ALERT-12339',
      date: '2023-10-01 09:15 AM',
      title: 'Unusual Device Access',
      description: 'Account accessed from a new device with suspicious behavior patterns.',
      user: {
        id: 'USR-12345',
        name: 'John Doe',
        email: 'john.doe@example.com'
      },
      type: 'login',
      status: 'false_positive',
      severity: 'low',
      details: {
        device: 'Windows 11, Edge',
        location: 'Chicago, USA',
        behaviors: 'Rapid page navigation, multiple feature access'
      },
      resolution: {
        action: 'No action taken',
        notes: 'Customer confirmed legitimate access from new work computer.',
        resolvedBy: 'Support Agent',
        resolvedAt: '2023-10-01 10:45 AM'
      }
    }
  ]
  // Filter alerts based on search and filters
  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = searchQuery === '' || 
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      alert.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
      alert.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === '' || alert.type === selectedType
    const matchesStatus = selectedStatus === '' || alert.status === selectedStatus
    const matchesSeverity = selectedSeverity === '' || alert.severity === selectedSeverity
    return matchesSearch && matchesType && matchesStatus && matchesSeverity
  })
  // Type options
  const typeOptions = ['login', 'transaction', 'account', 'identity']
  // Status options
  const statusOptions = ['open', 'investigating', 'resolved', 'false_positive']
  // Severity options
  const severityOptions = ['low', 'medium', 'high', 'critical']
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge variant="danger">Open</Badge>
      case 'investigating':
        return <Badge variant="warning">Investigating</Badge>
      case 'resolved':
        return <Badge variant="success">Resolved</Badge>
      case 'false_positive':
        return <Badge variant="default">False Positive</Badge>
      default:
        return <Badge variant="default">{status}</Badge>
    }
  }
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'low':
        return <Badge variant="default">Low</Badge>
      case 'medium':
        return <Badge variant="warning">Medium</Badge>
      case 'high':
        return <Badge variant="danger">High</Badge>
      case 'critical':
        return <Badge variant="danger">Critical</Badge>
      default:
        return <Badge variant="default">{severity}</Badge>
    }
  }
  const getAlertTypeIcon = (type: string) => {
    switch (type) {
      case 'login':
        return <UserIcon size={16} className="text-blue-600" />
      case 'transaction':
        return <AlertTriangleIcon size={16} className="text-red-600" />
      case 'account':
        return <AlertCircleIcon size={16} className="text-yellow-600" />
      case 'identity':
        return <AlertOctagonIcon size={16} className="text-purple-600" />
      default:
        return <AlertTriangleIcon size={16} className="text-gray-600" />
    }
  }
  const handleViewAlert = (alert: any) => {
    setSelectedAlert(alert)
    setShowAlertDetails(true)
  }
  const handleResolveAlert = () => {
    // Here you would handle the actual resolution
    setShowAlertDetails(false)
  }
  const handleMarkFalsePositive = () => {
    // Here you would handle marking as false positive
    setShowAlertDetails(false)
  }
  return (
    <AdminLayout title="Fraud Alerts">
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
                placeholder="Search alerts..."
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
                  <label htmlFor="severity-filter" className="block text-sm font-medium text-gray-700 mb-1">
                    Severity
                  </label>
                  <select
                    id="severity-filter"
                    value={selectedSeverity}
                    onChange={(e) => setSelectedSeverity(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="">All Severities</option>
                    {severityOptions.map(level => (
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
                    setSelectedSeverity('')
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
                  <p className="text-sm font-medium text-gray-500">Total Alerts</p>
                  <p className="text-2xl font-semibold text-gray-900">{alerts.length}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <BellIcon size={24} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Open Alerts</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {alerts.filter(a => a.status === 'open').length}
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
                  <p className="text-sm font-medium text-gray-500">Investigating</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {alerts.filter(a => a.status === 'investigating').length}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <ClockIcon size={24} className="text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">High Severity</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {alerts.filter(a => a.severity === 'high' || a.severity === 'critical').length}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <AlertOctagonIcon size={24} className="text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Alerts List */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Fraud Alerts</h3>
              <Badge variant="primary">{filteredAlerts.length} Total</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-4 border rounded-lg hover:bg-gray-50 cursor-pointer ${
                    alert.severity === 'critical' ? 'border-red-300 bg-red-50' :
                    alert.severity === 'high' ? 'border-orange-300' :
                    alert.severity === 'medium' ? 'border-yellow-300' :
                    'border-gray-200'
                  }`}
                  onClick={() => handleViewAlert(alert)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                        alert.severity === 'critical' ? 'bg-red-100' :
                        alert.severity === 'high' ? 'bg-orange-100' :
                        alert.severity === 'medium' ? 'bg-yellow-100' :
                        'bg-blue-100'
                      }`}>
                        {getAlertTypeIcon(alert.type)}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h4 className="text-sm font-medium text-gray-900">{alert.title}</h4>
                          <span className="ml-2">{getSeverityBadge(alert.severity)}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <span>{alert.date}</span>
                          <span className="mx-2">•</span>
                          <span>User: {alert.user.name}</span>
                          <span className="mx-2">•</span>
                          <span>ID: {alert.id}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {getStatusBadge(alert.status)}
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="ml-3"
                        icon={<EyeIcon size={16} />}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleViewAlert(alert)
                        }}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <BellIcon size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No alerts found</h3>
                <p className="text-gray-500 mt-2">No alerts match your current filters</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredAlerts.length}</span> of <span className="font-medium">{filteredAlerts.length}</span> alerts
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
      {/* Alert Details Modal */}
      {showAlertDetails && selectedAlert && (
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
                    selectedAlert.severity === 'critical' ? 'bg-red-100' :
                    selectedAlert.severity === 'high' ? 'bg-orange-100' :
                    selectedAlert.severity === 'medium' ? 'bg-yellow-100' :
                    'bg-blue-100'
                  }`}>
                    {getAlertTypeIcon(selectedAlert.type)}
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                      {selectedAlert.title}
                      <span className="ml-2">{getSeverityBadge(selectedAlert.severity)}</span>
                    </h3>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <span>{selectedAlert.date}</span>
                      <span className="mx-2">•</span>
                      <span>{getStatusBadge(selectedAlert.status)}</span>
                    </div>
                    <div className="mt-4 space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Description</h4>
                        <p className="text-sm text-gray-700 mt-1">{selectedAlert.description}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">User Information</h4>
                        <div className="mt-1 space-y-1">
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="text-sm font-medium text-gray-900">{selectedAlert.user.name}</p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="text-sm font-medium text-gray-900">{selectedAlert.user.email}</p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-500">User ID</p>
                            <p className="text-sm font-medium text-gray-900">{selectedAlert.user.id}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Alert Details</h4>
                        <div className="mt-1 bg-gray-50 p-3 rounded-md">
                          {Object.entries(selectedAlert.details).map(([key, value]: [string, any]) => (
                            <div key={key} className="flex justify-between mb-1">
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
                      {selectedAlert.resolution && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Resolution</h4>
                          <div className="mt-1 bg-green-50 p-3 rounded-md">
                            <div className="mb-1">
                              <p className="text-sm text-gray-500">Action Taken</p>
                              <p className="text-sm font-medium text-gray-900">{selectedAlert.resolution.action}</p>
                            </div>
                            <div className="mb-1">
                              <p className="text-sm text-gray-500">Notes</p>
                              <p className="text-sm font-medium text-gray-900">{selectedAlert.resolution.notes}</p>
                            </div>
                            <div className="flex justify-between mt-1">
                              <p className="text-sm text-gray-500">Resolved By</p>
                              <p className="text-sm font-medium text-gray-900">{selectedAlert.resolution.resolvedBy}</p>
                            </div>
                            <div className="flex justify-between mt-1">
                              <p className="text-sm text-gray-500">Resolved At</p>
                              <p className="text-sm font-medium text-gray-900">{selectedAlert.resolution.resolvedAt}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      {(selectedAlert.status === 'open' || selectedAlert.status === 'investigating') && (
                        <div className="pt-2">
                          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                            Investigation Notes
                          </label>
                          <textarea
                            id="notes"
                            name="notes"
                            rows={3}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="Add your investigation notes here..."
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {(selectedAlert.status === 'open' || selectedAlert.status === 'investigating') && (
                  <>
                    <Button
                      variant="primary"
                      onClick={handleResolveAlert}
                      className="ml-3"
                      icon={<CheckIcon size={18} />}
                    >
                      Resolve Alert
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleMarkFalsePositive}
                      className="ml-3"
                      icon={<XIcon size={18} />}
                    >
                      Mark as False Positive
                    </Button>
                  </>
                )}
                <Button
                  variant="outline"
                  onClick={() => setShowAlertDetails(false)}
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
// Import missing icons
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
function AlertOctagonIcon(props: any) {
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
      <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
export default FraudAlertsPage