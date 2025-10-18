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

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
    { name: 'Accounts', path: '/dashboard/accounts', icon: CreditCardIcon },
    { name: 'Transfers', path: '/dashboard/transfers/new', icon: TransferIcon },
    { name: 'Transactions', path: '/dashboard/transactions', icon: ReceiptIcon },
    { name: 'Bills Payment', path: '/dashboard/bills/utilities', icon: BillsIcon },
    { name: 'Savings', path: '/dashboard/savings', icon: SavingsIcon },
    { name: 'Settings', path: '/dashboard/profile', icon: SettingsIcon },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-4 h-16 border-b border-gray-200">
            <h2 className="text-xl font-bold text-blue-600">NexusBank</h2>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto mt-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.path)
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    active
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`mr-3 h-5 w-5 ${active ? 'text-blue-600' : 'text-gray-400'}`} />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Logout button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={logout}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50"
            >
              <LogOutIcon size={20} className="mr-3 text-gray-400" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <div className="flex items-center">
              <button
                className="text-gray-500 hover:text-gray-700 lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <MenuIcon size={24} />
              </button>
              <h1 className="ml-4 lg:ml-0 text-lg font-semibold text-gray-900">
                {title || "Dashboard"}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative text-gray-500 hover:text-gray-700">
                <BellIcon size={20} />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
              </button>
              <Link to="/dashboard/profile" className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <UserIcon size={16} className="text-blue-600" />
                </div>
                <span className="hidden sm:block text-sm font-medium">
                  {user?.fullName?.split(' ')[0] || 'User'}
                </span>
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout


