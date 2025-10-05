import React, { useState, ReactNode } from "react"
import { Outlet } from "react-router-dom"
import {
  Menu as MenuIcon,
  Bell as BellIcon,
  User as UserIcon,
  Home as HomeIcon,
  CreditCard as CreditCardIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
} from "lucide-react"

interface DashboardLayoutProps {
  title?: string
  children?: ReactNode // ✅ optional
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ title, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4">
          <div className="flex items-center flex-shrink-0 px-4">
            <h2 className="text-xl font-bold text-blue-600">NexusBank</h2>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            <a
              href="/dashboard"
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-900 hover:bg-gray-100"
            >
              <HomeIcon className="mr-3 h-5 w-5 text-gray-400" />
              Overview
            </a>
            <a
              href="/dashboard/accounts"
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-900 hover:bg-gray-100"
            >
              <CreditCardIcon className="mr-3 h-5 w-5 text-gray-400" />
              Accounts
            </a>
            <a
              href="/dashboard/reports"
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-900 hover:bg-gray-100"
            >
              <BarChartIcon className="mr-3 h-5 w-5 text-gray-400" />
              Reports
            </a>
            <a
              href="/dashboard/settings"
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-900 hover:bg-gray-100"
            >
              <SettingsIcon className="mr-3 h-5 w-5 text-gray-400" />
              Settings
            </a>
          </nav>
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
              <button className="text-gray-500 hover:text-gray-700">
                <BellIcon size={20} />
              </button>
              <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                <UserIcon size={20} />
                <span className="hidden sm:block text-sm font-medium">
                  Admin
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children || <Outlet />} {/* ✅ supports nested routes */}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout


