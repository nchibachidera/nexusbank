 import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout'
import { Card, CardHeader, CardContent, CardFooter } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { 
  UserIcon, 
  ArrowLeftIcon, 
  EditIcon, 
  KeyIcon, 
  CreditCardIcon,
  ShieldIcon,
  ClipboardListIcon,
  HistoryIcon,
  LockIcon,
  UnlockIcon,
  AlertTriangleIcon,
  CheckIcon,
  XIcon
} from 'lucide-react'
const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false)
  const [showLockAccountModal, setShowLockAccountModal] = useState(false)
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false)
  const [accountLockSuccess, setAccountLockSuccess] = useState(false)
  // Dummy user data
  const user = {
    id: id || 'USR-12345',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    role: 'Customer',
    status: 'active',
    lastLogin: '2023-10-15 09:45 AM',
    lastLoginLocation: 'New York, NY',
    lastLoginDevice: 'Chrome on Windows',
    accountCreated: '2023-01-15',
    kycVerified: true,
    twoFactorEnabled: true,
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    accounts: [
      {
        id: 'ACCT-12345',
        type: 'Checking',
        number: '****7890',
        balance: 5842.67,
        status: 'active'
      },
      {
        id: 'ACCT-12346',
        type: 'Savings',
        number: '****5432',
        balance: 12750.42,
        status: 'active'
      }
    ]
  }
  // Dummy recent activity
  const recentActivity = [
    {
      id: 'ACT-12345',
      type: 'login',
      description: 'Logged in from Chrome on Windows',
      date: '2023-10-15 09:45 AM',
      ipAddress: '192.168.1.1'
    },
    {
      id: 'ACT-12344',
      type: 'transaction',
      description: 'Made a transfer of $500.00',
      date: '2023-10-14 02:30 PM',
      ipAddress: '192.168.1.1'
    },
    {
      id: 'ACT-12343',
      type: 'profile',
      description: 'Updated phone number',
      date: '2023-10-12 11:15 AM',
      ipAddress: '192.168.1.1'
    },
    {
      id: 'ACT-12342',
      type: 'login',
      description: 'Logged in from Mobile App on iPhone',
      date: '2023-10-10 08:20 AM',
      ipAddress: '192.168.1.2'
    }
  ]
  // Dummy support history
  const supportHistory = [
    {
      id: 'SUP-12345',
      type: 'inquiry',
      subject: 'Account statement request',
      date: '2023-10-05',
      status: 'resolved'
    },
    {
      id: 'SUP-12344',
      type: 'complaint',
      subject: 'Transaction dispute',
      date: '2023-09-20',
      status: 'resolved'
    },
    {
      id: 'SUP-12343',
      type: 'inquiry',
      subject: 'Password reset assistance',
      date: '2023-08-15',
      status: 'resolved'
    }
  ]
  const handleResetPassword = () => {
    // Here you would handle the actual password reset
    setPasswordResetSuccess(true)
    // Reset after a delay
    setTimeout(() => {
      setPasswordResetSuccess(false)
      setShowResetPasswordModal(false)
    }, 3000)
  }
  const handleLockAccount = () => {
    // Here you would handle the actual account lock/unlock
    setAccountLockSuccess(true)
    // Reset after a delay
    setTimeout(() => {
      setAccountLockSuccess(false)
      setShowLockAccountModal(false)
    }, 3000)
  }
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>
      case 'inactive':
        return <Badge variant="default">Inactive</Badge>
      case 'locked':
        return <Badge variant="danger">Locked</Badge>
      case 'pending':
        return <Badge variant="warning">Pending</Badge>
      default:
        return <Badge variant="default">{status}</Badge>
    }
  }
  return (
    <AdminLayout title="User Details">
      <div className="space-y-6">
        {/* Back button */}
        <div>
          <Link 
            to="/admin/users"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            <ArrowLeftIcon size={16} className="mr-1" />
            Back to Users
          </Link>
        </div>
        {/* User Profile Card */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <UserIcon size={24} className="text-gray-500" />
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-medium text-gray-900">{user.name}</h2>
                  <p className="text-sm text-gray-500">ID: {user.id}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {getStatusBadge(user.status)}
                <Button 
                  variant="outline" 
                  size="sm"
                  icon={<EditIcon size={16} />}
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-900">{user.email}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-sm font-medium text-gray-900">{user.phone}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Address</p>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{user.address.street}</p>
                      <p className="text-sm font-medium text-gray-900">
                        {user.address.city}, {user.address.state} {user.address.zipCode}
                      </p>
                      <p className="text-sm font-medium text-gray-900">{user.address.country}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Account Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Role</p>
                    <Badge 
                      variant={
                        user.role === 'Admin' ? 'primary' : 
                        user.role === 'Support' ? 'info' : 
                        'default'
                      }
                    >
                      {user.role}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Created</p>
                    <p className="text-sm font-medium text-gray-900">{user.accountCreated}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Last Login</p>
                    <p className="text-sm font-medium text-gray-900">{user.lastLogin}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Login Location</p>
                    <p className="text-sm font-medium text-gray-900">{user.lastLoginLocation}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Device</p>
                    <p className="text-sm font-medium text-gray-900">{user.lastLoginDevice}</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Security</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">KYC Verification</p>
                    {user.kycVerified ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Two-Factor Authentication</p>
                    {user.twoFactorEnabled ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Enabled
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Disabled
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <Button 
                    variant="outline" 
                    fullWidth
                    icon={<KeyIcon size={18} />}
                    onClick={() => setShowResetPasswordModal(true)}
                  >
                    Reset Password
                  </Button>
                  <Button 
                    variant={user.status === 'locked' ? 'outline' : 'danger'} 
                    fullWidth
                    icon={user.status === 'locked' ? <UnlockIcon size={18} /> : <LockIcon size={18} />}
                    onClick={() => setShowLockAccountModal(true)}
                  >
                    {user.status === 'locked' ? 'Unlock Account' : 'Lock Account'}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Accounts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Accounts</h3>
                <Badge variant="primary">{user.accounts.length} Total</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {user.accounts.map(account => (
                <div 
                  key={account.id} 
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <CreditCardIcon size={18} className="text-blue-500 mr-2" />
                        <h4 className="text-sm font-medium text-gray-900">{account.type} Account</h4>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Account Number: {account.number}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">${account.balance.toLocaleString()}</p>
                      <Badge 
                        variant={account.status === 'active' ? 'success' : 'default'}
                        className="mt-1"
                      >
                        {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end space-x-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Transactions</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map(activity => (
                <div key={activity.id} className="flex items-start">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                    activity.type === 'login' ? 'bg-blue-100' : 
                    activity.type === 'transaction' ? 'bg-green-100' : 
                    'bg-yellow-100'
                  }`}>
                    {activity.type === 'login' ? (
                      <UserIcon size={16} className="text-blue-600" />
                    ) : activity.type === 'transaction' ? (
                      <CreditCardIcon size={16} className="text-green-600" />
                    ) : (
                      <EditIcon size={16} className="text-yellow-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-gray-500">{activity.date}</p>
                      <p className="text-xs text-gray-500">IP: {activity.ipAddress}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" fullWidth>
                View Full Activity Log
              </Button>
            </CardFooter>
          </Card>
        </div>
        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <ShieldIcon size={18} className="text-blue-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">Security</h3>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-sm text-gray-500">Password Last Changed</span>
                  <span className="text-sm font-medium text-gray-900">2023-09-15</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-sm text-gray-500">Failed Login Attempts</span>
                  <span className="text-sm font-medium text-gray-900">0</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-sm text-gray-500">Security Questions</span>
                  <span className="text-sm font-medium text-gray-900">Set</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-sm text-gray-500">Login Alerts</span>
                  <span className="text-sm font-medium text-gray-900">Enabled</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <ClipboardListIcon size={18} className="text-blue-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">Support History</h3>
              </div>
            </CardHeader>
            <CardContent>
              {supportHistory.length > 0 ? (
                <ul className="space-y-3">
                  {supportHistory.map(ticket => (
                    <li key={ticket.id} className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{ticket.subject}</p>
                        <p className="text-xs text-gray-500">{ticket.date}</p>
                      </div>
                      <Badge 
                        variant={ticket.status === 'resolved' ? 'success' : 'warning'}
                      >
                        {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                      </Badge>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">No support history</p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <HistoryIcon size={18} className="text-blue-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">Account History</h3>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-sm text-gray-500">Account Created</span>
                  <span className="text-sm font-medium text-gray-900">{user.accountCreated}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-sm text-gray-500">Last Profile Update</span>
                  <span className="text-sm font-medium text-gray-900">2023-10-12</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-sm text-gray-500">KYC Verified On</span>
                  <span className="text-sm font-medium text-gray-900">2023-01-20</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-sm text-gray-500">Status Changes</span>
                  <span className="text-sm font-medium text-gray-900">0</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Reset Password Modal */}
      {showResetPasswordModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              {passwordResetSuccess ? (
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex flex-col items-center justify-center py-6">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                      <CheckIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Password Reset Successful</h3>
                    <p className="text-sm text-gray-500 text-center">
                      A temporary password has been sent to the user's email address.
                    </p>
                    <div className="mt-6">
                      <Button
                        variant="primary"
                        onClick={() => {
                          setPasswordResetSuccess(false)
                          setShowResetPasswordModal(false)
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
                        <KeyIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Reset User Password
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to reset the password for {user.name}? This will generate a temporary password and send it to the user's email address.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <Button
                      variant="primary"
                      onClick={handleResetPassword}
                      className="ml-3"
                    >
                      Reset Password
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowResetPasswordModal(false)}
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
      {/* Lock Account Modal */}
      {showLockAccountModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              {accountLockSuccess ? (
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex flex-col items-center justify-center py-6">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                      <CheckIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Account {user.status === 'locked' ? 'Unlocked' : 'Locked'} Successfully
                    </h3>
                    <p className="text-sm text-gray-500 text-center">
                      The user account has been {user.status === 'locked' ? 'unlocked' : 'locked'} successfully.
                    </p>
                    <div className="mt-6">
                      <Button
                        variant="primary"
                        onClick={() => {
                          setAccountLockSuccess(false)
                          setShowLockAccountModal(false)
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
                        {user.status === 'locked' ? (
                          <UnlockIcon className="h-6 w-6 text-red-600" />
                        ) : (
                          <LockIcon className="h-6 w-6 text-red-600" />
                        )}
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          {user.status === 'locked' ? 'Unlock' : 'Lock'} User Account
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to {user.status === 'locked' ? 'unlock' : 'lock'} the account for {user.name}? 
                            {user.status !== 'locked' && ' This will prevent the user from logging in and accessing their account.'}
                          </p>
                        </div>
                        {user.status !== 'locked' && (
                          <div className="mt-3">
                            <label htmlFor="lockReason" className="block text-sm font-medium text-gray-700">
                              Reason (Optional)
                            </label>
                            <textarea
                              id="lockReason"
                              name="lockReason"
                              rows={3}
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                              placeholder="Enter reason for locking the account"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <Button
                      variant={user.status === 'locked' ? 'primary' : 'danger'}
                      onClick={handleLockAccount}
                      className="ml-3"
                    >
                      {user.status === 'locked' ? 'Unlock Account' : 'Lock Account'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowLockAccountModal(false)}
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
    </AdminLayout>
  )
}
// Import missing icon
function HistoryIcon(props: any) {
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
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </svg>
  );
}
export default UserDetailPage