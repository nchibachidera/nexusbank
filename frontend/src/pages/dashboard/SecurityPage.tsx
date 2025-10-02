import React, { useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { Card, CardHeader, CardContent, CardFooter } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { 
  ShieldIcon, 
  LockIcon, 
  KeyIcon, 
  SmartphoneIcon, 
  EyeIcon,
  EyeOffIcon,
  CheckIcon,
  AlertCircleIcon,
  ClockIcon,
  RefreshCwIcon,
  LogOutIcon
} from 'lucide-react'

const SecurityPage: React.FC = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false)
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [twoFactorSuccess, setTwoFactorSuccess] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  // Dummy security data
  const securityData = {
    lastLogin: '2023-10-15 09:45 AM',
    lastLoginLocation: 'New York, NY',
    lastLoginDevice: 'Chrome on Windows',
    twoFactorEnabled: true,
    loginAlerts: true,
    passwordLastChanged: '2023-08-20',
    securityScore: 85
  }

  // Dummy login history
  const loginHistory = [
    {
      id: 'LOGIN-12345',
      date: '2023-10-15 09:45 AM',
      location: 'New York, NY',
      device: 'Chrome on Windows',
      status: 'successful',
      ipAddress: '192.168.1.1'
    },
    {
      id: 'LOGIN-12344',
      date: '2023-10-14 02:30 PM',
      location: 'New York, NY',
      device: 'Mobile App on iPhone',
      status: 'successful',
      ipAddress: '192.168.1.2'
    },
    {
      id: 'LOGIN-12343',
      date: '2023-10-12 11:15 AM',
      location: 'Boston, MA',
      device: 'Chrome on Windows',
      status: 'successful',
      ipAddress: '192.168.2.1'
    },
    {
      id: 'LOGIN-12342',
      date: '2023-10-10 08:20 AM',
      location: 'New York, NY',
      device: 'Safari on macOS',
      status: 'successful',
      ipAddress: '192.168.1.5'
    },
    {
      id: 'LOGIN-12341',
      date: '2023-10-08 03:10 PM',
      location: 'Chicago, IL',
      device: 'Firefox on Windows',
      status: 'failed',
      ipAddress: '192.168.3.1'
    }
  ]

  // Dummy security alerts
  const securityAlerts = [
    {
      id: 'ALERT-12345',
      date: '2023-10-08 03:15 PM',
      type: 'Failed Login Attempt',
      description: 'Multiple failed login attempts from Chicago, IL',
      status: 'resolved',
      severity: 'high'
    },
    {
      id: 'ALERT-12344',
      date: '2023-09-25 10:30 AM',
      type: 'New Device Login',
      description: 'First time login from Safari on macOS',
      status: 'resolved',
      severity: 'medium'
    },
    {
      id: 'ALERT-12343',
      date: '2023-09-15 02:45 PM',
      type: 'Password Changed',
      description: 'Your account password was changed',
      status: 'resolved',
      severity: 'low'
    }
  ]

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePasswordSubmit = () => {
    setPasswordSuccess(true)
    // Reset form after a delay
    setTimeout(() => {
      setPasswordSuccess(false)
      setShowPasswordModal(false)
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    }, 3000)
  }

  const handleTwoFactorSubmit = () => {
    setTwoFactorSuccess(true)
    // Reset after a delay
    setTimeout(() => {
      setTwoFactorSuccess(false)
      setShowTwoFactorModal(false)
    }, 3000)
  }

  const togglePasswordVisibility = (field: string) => {
    if (field === 'current') {
      setShowCurrentPassword(!showCurrentPassword)
    } else if (field === 'new') {
      setShowNewPassword(!showNewPassword)
    }
  }

  return (
    <DashboardLayout title="Security Settings">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Security Summary Card */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Account Security</h2>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">Security Score:</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2.5 mr-2">
                      <div 
                        className={`h-2.5 rounded-full ${
                          securityData.securityScore >= 80 ? 'bg-green-500' : 
                          securityData.securityScore >= 60 ? 'bg-yellow-500' : 
                          'bg-red-500'
                        }`}
                        style={{ width: `${securityData.securityScore}%` }}
                      ></div>
                    </div>
                    <span className={`font-medium ${
                      securityData.securityScore >= 80 ? 'text-green-600' : 
                      securityData.securityScore >= 60 ? 'text-yellow-600' : 
                      'text-red-600'
                    }`}>
                      {securityData.securityScore}%
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-6">
                    <p className="text-sm font-medium text-gray-500">Last Login</p>
                    <p className="text-lg font-medium text-gray-900">{securityData.lastLogin}</p>
                    <p className="text-sm text-gray-500">{securityData.lastLoginLocation} • {securityData.lastLoginDevice}</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <LockIcon size={16} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Password</p>
                          <p className="text-xs text-gray-500">Last changed {securityData.passwordLastChanged}</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowPasswordModal(true)}
                      >
                        Change
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <SmartphoneIcon size={16} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                          <p className="text-xs text-gray-500">
                            {securityData.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant={securityData.twoFactorEnabled ? 'outline' : 'primary'} 
                        size="sm"
                        onClick={() => setShowTwoFactorModal(true)}
                      >
                        {securityData.twoFactorEnabled ? 'Manage' : 'Enable'}
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <KeyIcon size={16} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Login Alerts</p>
                          <p className="text-xs text-gray-500">
                            {securityData.loginAlerts ? 'Enabled' : 'Disabled'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center h-5">
                        <input
                          id="loginAlerts"
                          name="loginAlerts"
                          type="checkbox"
                          checked={securityData.loginAlerts}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <ShieldIcon size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Security Recommendations</h3>
                        <ul className="mt-2 space-y-2">
                          <li className="flex items-start text-sm">
                            <CheckIcon size={16} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span>Two-factor authentication is enabled</span>
                          </li>
                          <li className="flex items-start text-sm">
                            <CheckIcon size={16} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span>Login alerts are active</span>
                          </li>
                          <li className="flex items-start text-sm">
                            <AlertCircleIcon size={16} className="text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span>Consider changing your password (last changed 56 days ago)</span>
                          </li>
                          <li className="flex items-start text-sm">
                            <AlertCircleIcon size={16} className="text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span>Review authorized devices and remove any you don't recognize</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Button 
                      variant="outline"
                      fullWidth
                      icon={<LogOutIcon size={18} />}
                    >
                      Sign Out All Devices
                    </Button>
                    <Button 
                      variant="outline"
                      fullWidth
                      icon={<RefreshCwIcon size={18} />}
                    >
                      Security Checkup
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Login History */}
          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Login History</h3>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Device
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      IP Address
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loginHistory.map((login) => (
                    <tr key={login.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {login.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {login.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {login.device}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {login.ipAddress}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <Badge 
                          variant={login.status === 'successful' ? 'success' : 'danger'}
                        >
                          {login.status === 'successful' ? 'Successful' : 'Failed'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <CardFooter className="flex justify-center">
              <Button variant="outline">View Full Login History</Button>
            </CardFooter>
          </Card>

          {/* Security Alerts */}
          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Security Alerts</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {securityAlerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-4 rounded-lg border ${
                    alert.severity === 'high' ? 'bg-red-50 border-red-100' : 
                    alert.severity === 'medium' ? 'bg-yellow-50 border-yellow-100' : 
                    'bg-blue-50 border-blue-100'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                        alert.severity === 'high' ? 'bg-red-100' : 
                        alert.severity === 'medium' ? 'bg-yellow-100' : 
                        'bg-blue-100'
                      }`}>
                        {alert.severity === 'high' ? (
                          <AlertCircleIcon size={20} className="text-red-600" />
                        ) : alert.severity === 'medium' ? (
                          <AlertCircleIcon size={20} className="text-yellow-600" />
                        ) : (
                          <InfoIcon size={20} className="text-blue-600" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-medium text-gray-900">{alert.type}</h4>
                          <Badge 
                            variant={alert.severity === 'high' ? 'danger' : alert.severity === 'medium' ? 'warning' : 'info'}
                            className="ml-2"
                          >
                            {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{alert.date}</p>
                      </div>
                    </div>
                    <Badge variant="success">Resolved</Badge>
                  </div>
                </div>
              ))}
              {securityAlerts.length === 0 && (
                <div className="text-center py-6">
                  <div className="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <CheckIcon size={24} className="text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">All Clear!</h3>
                  <p className="text-gray-500 mt-2">No security alerts at this time.</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline">View All Security Alerts</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-1">
          {/* Device Management */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Authorized Devices</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 border border-gray-200 rounded-md">
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Windows PC</p>
                      <p className="text-xs text-gray-500">Chrome • New York, NY</p>
                      <div className="flex items-center mt-1">
                        <Badge variant="success" className="text-xs">Current Device</Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Remove
                  </Button>
                </div>
              </div>

              <div className="p-3 border border-gray-200 rounded-md">
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">iPhone</p>
                      <p className="text-xs text-gray-500">Mobile App • New York, NY</p>
                      <p className="text-xs text-gray-500 mt-1">Last active: Oct 14, 2023</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Remove
                  </Button>
                </div>
              </div>

              <div className="p-3 border border-gray-200 rounded-md">
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 2a1 1 0 00-1 1v1h12V3a1 1 0 00-1-1H5zM4 5h12v7H4V5zm0 9a1 1 0 001 1h10a1 1 0 001-1v-1H4v1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">MacBook Pro</p>
                      <p className="text-xs text-gray-500">Safari • Boston, MA</p>
                      <p className="text-xs text-gray-500 mt-1">Last active: Oct 10, 2023</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Remove
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" fullWidth>
                Sign Out All Devices
              </Button>
            </CardFooter>
          </Card>

          {/* Privacy Settings */}
          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Privacy Settings</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Data Sharing</p>
                  <p className="text-xs text-gray-500">Share data with partners for better service</p>
                </div>
                <div className="flex items-center h-5">
                  <input
                    id="dataSharing"
                    name="dataSharing"
                    type="checkbox"
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Marketing Communications</p>
                  <p className="text-xs text-gray-500">Receive offers and updates</p>
                </div>
                <div className="flex items-center h-5">
                  <input
                    id="marketing"
                    name="marketing"
                    type="checkbox"
                    defaultChecked
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Cookie Preferences</p>
                  <p className="text-xs text-gray-500">Manage cookies and tracking</p>
                </div>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Download Your Data</p>
                  <p className="text-xs text-gray-500">Get a copy of your personal data</p>
                </div>
                <Button variant="outline" size="sm">
                  Request
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Security Tips */}
          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Security Tips</h3>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start">
                  <svg className="h-4 w-4 text-blue-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Use a strong, unique password with a mix of letters, numbers, and special characters
                </li>
                <li className="flex items-start">
                  <svg className="h-4 w-4 text-blue-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Enable two-factor authentication for an extra layer of security
                </li>
                <li className="flex items-start">
                  <svg className="h-4 w-4 text-blue-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Never share your password or verification codes with anyone
                </li>
                <li className="flex items-start">
                  <svg className="h-4 w-4 text-blue-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Be cautious of phishing attempts - we'll never ask for your password via email
                </li>
                <li className="flex items-start">
                  <svg className="h-4 w-4 text-blue-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Regularly review your account activity and report any suspicious behavior
                </li>
              </ul>
              <div className="mt-4 p-3 bg-yellow-50 rounded-md">
                <p className="text-sm text-yellow-800 font-medium">Need Help?</p>
                <p className="text-xs text-yellow-700 mt-1">If you suspect unauthorized access, contact our security team immediately at security@bankapp.com or call 1-800-123-4567.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              {passwordSuccess ? (
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex flex-col items-center justify-center py-6">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                      <CheckIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Password Changed Successfully!</h3>
                    <p className="text-sm text-gray-500 text-center">
                      Your password has been updated. You'll use your new password the next time you log in.
                    </p>
                    <div className="mt-6">
                      <Button
                        variant="primary"
                        onClick={() => {
                          setPasswordSuccess(false)
                          setShowPasswordModal(false)
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
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                        <LockIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Change Password
                        </h3>
                        <div className="mt-4">
                          <form className="space-y-4">
                            <div>
                              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Current Password
                              </label>
                              <div className="relative">
                                <input
                                  type={showCurrentPassword ? 'text' : 'password'}
                                  name="currentPassword"
                                  id="currentPassword"
                                  value={passwordForm.currentPassword}
                                  onChange={handlePasswordChange}
                                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                  required
                                />
                                <button
                                  type="button"
                                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                  onClick={() => togglePasswordVisibility('current')}
                                >
                                  {showCurrentPassword ? (
                                    <EyeOffIcon size={16} className="text-gray-400" />
                                  ) : (
                                    <EyeIcon size={16} className="text-gray-400" />
                                  )}
                                </button>
                              </div>
                            </div>
                            <div>
                              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                New Password
                              </label>
                              <div className="relative">
                                <input
                                  type={showNewPassword ? 'text' : 'password'}
                                  name="newPassword"
                                  id="newPassword"
                                  value={passwordForm.newPassword}
                                  onChange={handlePasswordChange}
                                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                  required
                                />
                                <button
                                  type="button"
                                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                  onClick={() => togglePasswordVisibility('new')}
                                >
                                  {showNewPassword ? (
                                    <EyeOffIcon size={16} className="text-gray-400" />
                                  ) : (
                                    <EyeIcon size={16} className="text-gray-400" />
                                  )}
                                </button>
                              </div>
                              <p className="mt-1 text-xs text-gray-500">
                                Password must be at least 8 characters and include a mix of letters, numbers, and special characters.
                              </p>
                            </div>
                            <div>
                              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm New Password
                              </label>
                              <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                value={passwordForm.confirmPassword}
                                onChange={handlePasswordChange}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                required
                              />
                            </div>
                            <div className="bg-yellow-50 p-3 rounded-md">
                              <div className="flex items-start">
                                <AlertCircleIcon size={16} className="text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                                <p className="text-sm text-yellow-700">
                                  Changing your password will sign you out of all devices except this one.
                                </p>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <Button
                      variant="primary"
                      onClick={handlePasswordSubmit}
                      className="ml-3"
                      icon={<LockIcon size={18} />}
                    >
                      Update Password
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowPasswordModal(false)}
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

      {/* Two-Factor Authentication Modal */}
      {showTwoFactorModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              {twoFactorSuccess ? (
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex flex-col items-center justify-center py-6">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                      <CheckIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Two-Factor Authentication Updated!</h3>
                    <p className="text-sm text-gray-500 text-center">
                      Your two-factor authentication settings have been successfully updated.
                    </p>
                    <div className="mt-6">
                      <Button
                        variant="primary"
                        onClick={() => {
                          setTwoFactorSuccess(false)
                          setShowTwoFactorModal(false)
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
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                        <SmartphoneIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Two-Factor Authentication
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Two-factor authentication adds an extra layer of security to your account by requiring a verification code in addition to your password.
                          </p>
                        </div>
                        <div className="mt-4">
                          <form className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900">SMS Authentication</p>
                                <p className="text-xs text-gray-500">Receive codes via text message</p>
                              </div>
                              <div className="flex items-center h-5">
                                <input
                                  id="smsAuth"
                                  name="smsAuth"
                                  type="checkbox"
                                  defaultChecked
                                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                />
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900">Email Authentication</p>
                                <p className="text-xs text-gray-500">Receive codes via email</p>
                              </div>
                              <div className="flex items-center h-5">
                                <input
                                  id="emailAuth"
                                  name="emailAuth"
                                  type="checkbox"
                                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                />
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900">Authenticator App</p>
                                <p className="text-xs text-gray-500">Use an authentication app</p>
                              </div>
                              <Button variant="outline" size="sm">
                                Set Up
                              </Button>
                            </div>
                            <div className="pt-4">
                              <p className="text-sm font-medium text-gray-900 mb-2">Recovery Options</p>
                              <div className="bg-gray-50 p-3 rounded-md">
                                <p className="text-sm text-gray-700">
                                  Recovery codes can be used to access your account if you lose your phone or cannot receive codes.
                                </p>
                                <Button variant="outline" size="sm" className="mt-2">
                                  Generate Recovery Codes
                                </Button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <Button
                      variant="primary"
                      onClick={handleTwoFactorSubmit}
                      className="ml-3"
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowTwoFactorModal(false)}
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
    </DashboardLayout>
  )
}

// Import missing icon
function InfoIcon(props: any) {
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
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  )
}

export default SecurityPage