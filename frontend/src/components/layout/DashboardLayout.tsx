import React, { useState, ReactNode } from "react"
import { Outlet, Link, useLocation } from "react-router-dom"
import {
  Menu as MenuIcon,
  Bell as BellIcon,
  User as UserIcon,
  Home as HomeIcon,
  CreditCard as CreditCardIcon,
  ArrowRightLeft as TransferIcon,
  Receipt as ReceiptIcon,
  FileText as BillsIcon,
  PiggyBank as SavingsIcon,
  Settings as SettingsIcon,
  LogOut as LogOutIcon,
  ChevronDown,
} from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"

interface DashboardLayoutProps {
  title?: string
  children?: ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ title, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const { user, logout } = useAuth()

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  // Helper function to safely get user ID as string
  const getUserIdDisplay = () => {
    if (!user?.id) return '12345678'
    const idStr = String(user.id)
    return idStr.slice(0, 8)
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
            <button className="relative text-white hover:text-gray-200">
              <BellIcon size={20} />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
            </button>
            <Link to="/dashboard/profile" className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-[#1e3a8a] font-semibold text-sm">
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
                  to="/dashboard/transfers/InterAccountTransfer.tsx"
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


