import React, { useState, ReactNode } from "react"
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom"
import {
  Menu as MenuIcon,
  Bell as BellIcon,
  Home as HomeIcon,
  CreditCard as CreditCardIcon,
  ArrowRightLeft as TransferIcon,
  Receipt as ReceiptIcon,
  FileText as BillsIcon,
  PiggyBank as SavingsIcon,
  Settings as SettingsIcon,
  LogOut as LogOutIcon,
  AlertCircle,
  Info,
} from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"
import { useNotifications } from "../../contexts/NotificationContext"
import { markNotificationAsRead, markAllNotificationsAsRead } from "../../api/notificationApi"

interface DashboardLayoutProps {
  title?: string
  children?: ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ title, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { notifications, unreadCount, refreshNotifications } = useNotifications()

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  const getUserIdDisplay = () => {
    if (!user?.id) return '12345678'
    const idStr = String(user.id)
    return idStr.slice(0, 8)
  }

  const handleNotificationClick = async (notification: any) => {
    try {
      // Mark as read
      if (!notification.isRead) {
        await markNotificationAsRead(notification.id)
        refreshNotifications()
      }

      // Navigate to action URL if exists
      if (notification.actionUrl) {
        navigate(notification.actionUrl)
      }

      setNotificationsOpen(false)
    } catch (err) {
      console.error('Error handling notification click:', err)
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead()
      refreshNotifications()
    } catch (err) {
      console.error('Error marking all as read:', err)
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'transaction':
        return <ReceiptIcon size={18} className="text-blue-600" />
      case 'account':
        return <CreditCardIcon size={18} className="text-green-600" />
      case 'security':
        return <AlertCircle size={18} className="text-red-600" />
      case 'savings':
        return <SavingsIcon size={18} className="text-purple-600" />
      default:
        return <Info size={18} className="text-gray-600" />
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (seconds < 60) return 'Just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#1e3a8a] z-50">
        <div className="flex items-center justify-between h-full px-6">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <button
              className="text-white lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <MenuIcon size={24} />
            </button>
            <h1 className="text-white text-xl font-bold">NexusBank</h1>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-6">
            <span className="text-white text-sm hidden md:block">
              Welcome {user?.fullName || 'User'}
            </span>
            
            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative text-white hover:text-gray-200 transition-colors"
              >
                <BellIcon size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setNotificationsOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-[32rem] flex flex-col">
                    {/* Header */}
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                      {unreadCount > 0 && (
                        <button
                          onClick={handleMarkAllAsRead}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>

                    {/* Notifications List */}
                    <div className="overflow-y-auto flex-1">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                          <BellIcon size={48} className="mx-auto mb-3 text-gray-300" />
                          <p className="text-sm font-medium">No notifications yet</p>
                          <p className="text-xs text-gray-400 mt-1">We'll notify you when something happens</p>
                        </div>
                      ) : (
                        <div className="divide-y divide-gray-100">
                          {notifications.map((notification) => (
                            <button
                              key={notification.id}
                              onClick={() => handleNotificationClick(notification)}
                              className={`w-full p-4 hover:bg-gray-50 transition-colors text-left ${
                                !notification.isRead ? 'bg-blue-50' : ''
                              }`}
                            >
                              <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0 mt-1">
                                  {getNotificationIcon(notification.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between">
                                    <p className="text-sm font-medium text-gray-900">
                                      {notification.title}
                                    </p>
                                    {!notification.isRead && (
                                      <span className="ml-2 h-2 w-2 bg-blue-600 rounded-full flex-shrink-0"></span>
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-600 mt-1">
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-gray-400 mt-1">
                                    {formatTimeAgo(notification.createdAt)}
                                  </p>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                      <div className="p-3 border-t border-gray-200 text-center">
                        <button 
                          onClick={() => {
                            navigate('/dashboard/notifications')
                            setNotificationsOpen(false)
                          }}
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          View all notifications
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            <Link to="/dashboard/profile" className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-[#1e3a8a] font-semibold text-sm hover:bg-gray-100 transition-colors">
              {user?.fullName?.charAt(0) || 'U'}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-gray-200 z-40 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* User Profile Section */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-full bg-[#1e3a8a] flex items-center justify-center text-white font-semibold">
                {user?.fullName?.charAt(0) || 'U'}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{user?.fullName || 'User'}</p>
                <p className="text-xs text-gray-500">ID: {getUserIdDisplay()}</p>
                <p className="text-xs text-gray-400">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            {/* Dashboard Section */}
            <div className="mb-6">
              <p className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Dashboard
              </p>
              <Link
                to="/dashboard"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive('/dashboard') && location.pathname === '/dashboard'
                    ? 'bg-[#1e3a8a] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <HomeIcon className="mr-3 h-5 w-5" />
                Overview
              </Link>
            </div>

            {/* Account Section */}
            <div className="mb-6">
              <p className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Account
              </p>
              <Link
                to="/dashboard/accounts"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive('/dashboard/accounts')
                    ? 'bg-[#1e3a8a] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <CreditCardIcon className="mr-3 h-5 w-5" />
                Account History
              </Link>
            </div>

            {/* Fund Transfer Section */}
            <div className="mb-6">
              <p className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Fund Transfer
              </p>
              <div className="space-y-1">
                <Link
                  to="/dashboard/transfers/local"
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive('/dashboard/transfers/local')
                      ? 'bg-[#1e3a8a] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <TransferIcon className="mr-3 h-5 w-5" />
                  Local Transfer
                </Link>
                <Link
                  to="/dashboard/transfers/international"
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive('/dashboard/transfers/international')
                      ? 'bg-[#1e3a8a] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <TransferIcon className="mr-3 h-5 w-5" />
                  International Transfer
                </Link>
                <Link
                  to="/dashboard/transfers/inter-account"
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive('/dashboard/transfers/inter-account')
                      ? 'bg-[#1e3a8a] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <TransferIcon className="mr-3 h-5 w-5" />
                  Inter-Account Transfer
                </Link>
              </div>
            </div>

            {/* Other Sections */}
            <div className="space-y-1">
              <Link
                to="/dashboard/transactions"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive('/dashboard/transactions')
                    ? 'bg-[#1e3a8a] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ReceiptIcon className="mr-3 h-5 w-5" />
                Transactions
              </Link>
              <Link
                to="/dashboard/bills/utilities"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive('/dashboard/bills')
                    ? 'bg-[#1e3a8a] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <BillsIcon className="mr-3 h-5 w-5" />
                Bills Payment
              </Link>
              <Link
                to="/dashboard/savings"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive('/dashboard/savings')
                    ? 'bg-[#1e3a8a] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <SavingsIcon className="mr-3 h-5 w-5" />
                Savings
              </Link>
              <Link
                to="/dashboard/profile"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive('/dashboard/profile')
                    ? 'bg-[#1e3a8a] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <SettingsIcon className="mr-3 h-5 w-5" />
                Settings
              </Link>
            </div>
          </nav>

          {/* Logout */}
          <div className="p-3 border-t border-gray-200">
            <button
              onClick={logout}
              className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <LogOutIcon className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pt-16 lg:pl-64 min-h-screen">
        <div className="p-6">
          {children || <Outlet />}
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout


