import React, { useState } from 'react'
import { Link, Outlet, useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import {
  LayoutDashboardIcon,
  UsersIcon,
  AlertCircleIcon,
  ShieldIcon,
  FileTextIcon,
  SettingsIcon,
  LogOutIcon,
  MenuIcon,
  BellIcon,
  SearchIcon
} from 'lucide-react'
type SidebarItemProps = {
  icon: React.ReactNode
  title: string
  to: string
  active: boolean
  onClick?: () => void
}
const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  title,
  to,
  active,
  onClick
}) => {
  return (
    <li>
      <Link
        to={to}
        className={`flex items-center px-4 py-3 transition-colors rounded-lg ${
          active ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-blue-800'
        }`}
        onClick={onClick}
      >
        <span className="mr-3">{icon}</span>
        <span className="font-medium">{title}</span>
      </Link>
    </li>
  )
}
const AdminLayout = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />
  }
  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false)
  }
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden" 
          onClick={closeMobileSidebar}
        />
      )}
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-blue-900 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-6 border-b border-blue-800">
            <Link to="/admin" className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-white"></div>
              <span className="ml-2 text-xl font-bold text-white">Admin Panel</span>
            </Link>
          </div>
          {/* User info */}
          <div className="flex items-center px-6 py-4 border-b border-blue-800">
            <div className="flex-shrink-0">
              <img 
                src={user.avatar || "https://via.placeholder.com/40"} 
                alt={user.name} 
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div className="ml-3">
              <p className="font-medium text-white">{user.name}</p>
              <p className="text-sm text-blue-300">{user.email}</p>
            </div>
          </div>
          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 overflow-y-auto">
            <ul className="space-y-1">
              <SidebarItem 
                icon={<LayoutDashboardIcon size={20} />} 
                title="Dashboard" 
                to="/admin" 
                active={location.pathname === '/admin'}
                onClick={closeMobileSidebar}
              />
              <SidebarItem 
                icon={<UsersIcon size={20} />} 
                title="User Management" 
                to="/admin/users" 
                active={location.pathname.includes('/admin/users')}
                onClick={closeMobileSidebar}
              />
              <SidebarItem 
                icon={<AlertCircleIcon size={20} />} 
                title="Transaction Monitoring" 
                to="/admin/transactions" 
                active={location.pathname.includes('/admin/transactions')}
                onClick={closeMobileSidebar}
              />
              <SidebarItem 
                icon={<ShieldIcon size={20} />} 
                title="Fraud Alerts" 
                to="/admin/alerts" 
                active={location.pathname === '/admin/alerts'}
                onClick={closeMobileSidebar}
              />
              <SidebarItem 
                icon={<FileTextIcon size={20} />} 
                title="Audit Logs" 
                to="/admin/logs" 
                active={location.pathname === '/admin/logs'}
                onClick={closeMobileSidebar}
              />
              <SidebarItem 
                icon={<SettingsIcon size={20} />} 
                title="Roles & Permissions" 
                to="/admin/roles" 
                active={location.pathname === '/admin/roles'}
                onClick={closeMobileSidebar}
              />
            </ul>
          </nav>
          {/* Logout button */}
          <div className="p-4 border-t border-blue-800">
            <button
              onClick={logout}
              className="flex items-center w-full px-4 py-2 text-gray-300 rounded-lg hover:bg-blue-800"
            >
              <LogOutIcon size={20} className="mr-3" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
          <button
            className="p-1 text-gray-600 lg:hidden focus:outline-none"
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          >
            <MenuIcon size={24} />
          </button>
          <div className="flex items-center ml-4 flex-1 max-w-md">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <SearchIcon className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>
          <div className="flex items-center ml-auto">
            <button className="p-2 text-gray-600 rounded-full hover:bg-gray-100 relative">
              <BellIcon size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="ml-4">
              <button className="flex items-center">
                <img 
                  src={user.avatar || "https://via.placeholder.com/40"} 
                  alt={user.name} 
                  className="w-8 h-8 rounded-full" 
                />
              </button>
            </div>
          </div>
        </header>
        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
export default AdminLayout
