import React, { useState } from 'react'
import { Link, Outlet, useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import {
  HomeIcon,
  CreditCardIcon,
  ArrowRightLeftIcon,
  ReceiptIcon,
  BanknoteIcon,
  PiggyBankIcon,
  GiftIcon,
  UsersIcon,
  UserIcon,
  ShieldIcon,
  BellIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
  ChevronDownIcon
} from 'lucide-react'
type SidebarItemProps = {
  icon: React.ReactNode
  title: string
  to: string
  active: boolean
  hasSubMenu?: boolean
  isSubMenuOpen?: boolean
  toggleSubMenu?: () => void
  onClick?: () => void
}
const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  title,
  to,
  active,
  hasSubMenu = false,
  isSubMenuOpen = false,
  toggleSubMenu,
  onClick
}) => {
  return (
    <li>
      {hasSubMenu ? (
        <button
          className={`flex items-center w-full px-4 py-3 text-left transition-colors rounded-lg ${
            active ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
          }`}
          onClick={toggleSubMenu}
        >
          <span className="flex items-center">
            <span className="mr-3">{icon}</span>
            <span className="font-medium">{title}</span>
          </span>
          <ChevronDownIcon
            size={18}
            className={`ml-auto transition-transform ${isSubMenuOpen ? 'transform rotate-180' : ''}`}
          />
        </button>
      ) : (
        <Link
          to={to}
          className={`flex items-center px-4 py-3 transition-colors rounded-lg ${
            active ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
          }`}
          onClick={onClick}
        >
          <span className="mr-3">{icon}</span>
          <span className="font-medium">{title}</span>
        </Link>
      )}
    </li>
  )
}
const DashboardLayout = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [transfersOpen, setTransfersOpen] = useState(false)
  const [billsOpen, setBillsOpen] = useState(false)
  if (!user) {
    return <Navigate to="/login" replace />
  }
  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false)
  }
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden" 
          onClick={closeMobileSidebar}
        />
      )}
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-6 border-b">
            <Link to="/dashboard" className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-blue-600"></div>
              <span className="ml-2 text-xl font-bold text-blue-900">NexusBank</span>
            </Link>
          </div>
          {/* User info */}
          <div className="flex items-center px-6 py-4 border-b">
            <div className="flex-shrink-0">
              <img 
                src={user.avatar || "https://via.placeholder.com/40"} 
                alt={user.name} 
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-800">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 overflow-y-auto">
            <ul className="space-y-1">
              <SidebarItem 
                icon={<HomeIcon size={20} />} 
                title="Dashboard" 
                to="/dashboard" 
                active={location.pathname === '/dashboard'}
                onClick={closeMobileSidebar}
              />
              <SidebarItem 
                icon={<CreditCardIcon size={20} />} 
                title="Accounts" 
                to="/dashboard/accounts" 
                active={location.pathname === '/dashboard/accounts'}
                onClick={closeMobileSidebar}
              />
              <SidebarItem 
                icon={<ArrowRightLeftIcon size={20} />} 
                title="Transfers" 
                to="#" 
                active={location.pathname.includes('/dashboard/transfers')}
                hasSubMenu={true}
                isSubMenuOpen={transfersOpen}
                toggleSubMenu={() => setTransfersOpen(!transfersOpen)}
              />
              {transfersOpen && (
                <ul className="pl-10 space-y-1 mt-1">
                  <li>
                    <Link 
                      to="/dashboard/transfers/new" 
                      className={`block px-4 py-2 text-sm rounded-md ${
                        location.pathname === '/dashboard/transfers/new'
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      onClick={closeMobileSidebar}
                    >
                      New Transfer
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/dashboard/transfers/between-accounts" 
                      className={`block px-4 py-2 text-sm rounded-md ${
                        location.pathname === '/dashboard/transfers/between-accounts'
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      onClick={closeMobileSidebar}
                    >
                      Between Accounts
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/dashboard/transfers/external" 
                      className={`block px-4 py-2 text-sm rounded-md ${
                        location.pathname === '/dashboard/transfers/external'
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      onClick={closeMobileSidebar}
                    >
                      External Transfer
                    </Link>
                  </li>
                </ul>
              )}
              <SidebarItem 
                icon={<ReceiptIcon size={20} />} 
                title="Transactions" 
                to="/dashboard/transactions" 
                active={location.pathname === '/dashboard/transactions'}
                onClick={closeMobileSidebar}
              />
              <SidebarItem 
                icon={<BanknoteIcon size={20} />} 
                title="Bill Payments" 
                to="#" 
                active={location.pathname.includes('/dashboard/bills')}
                hasSubMenu={true}
                isSubMenuOpen={billsOpen}
                toggleSubMenu={() => setBillsOpen(!billsOpen)}
              />
              {billsOpen && (
                <ul className="pl-10 space-y-1 mt-1">
                  <li>
                    <Link 
                      to="/dashboard/bills/utilities" 
                      className={`block px-4 py-2 text-sm rounded-md ${
                        location.pathname === '/dashboard/bills/utilities'
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      onClick={closeMobileSidebar}
                    >
                      Utilities
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/dashboard/bills/airtime" 
                      className={`block px-4 py-2 text-sm rounded-md ${
                        location.pathname === '/dashboard/bills/airtime'
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      onClick={closeMobileSidebar}
                    >
                      Airtime/Data
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/dashboard/bills/subscriptions" 
                      className={`block px-4 py-2 text-sm rounded-md ${
                        location.pathname === '/dashboard/bills/subscriptions'
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      onClick={closeMobileSidebar}
                    >
                      Subscriptions
                    </Link>
                  </li>
                </ul>
              )}
              <div className="pt-4 mt-4 border-t border-gray-200">
                <p className="px-4 text-xs font-semibold text-gray-400 uppercase">Extra Features</p>
              </div>
              <SidebarItem 
                icon={<PiggyBankIcon size={20} />} 
                title="Savings Goals" 
                to="/dashboard/savings" 
                active={location.pathname === '/dashboard/savings'}
                onClick={closeMobileSidebar}
              />
              <SidebarItem 
                icon={<GiftIcon size={20} />} 
                title="Rewards" 
                to="/dashboard/rewards" 
                active={location.pathname === '/dashboard/rewards'}
                onClick={closeMobileSidebar}
              />
              <SidebarItem 
                icon={<UsersIcon size={20} />} 
                title="Referrals" 
                to="/dashboard/referrals" 
                active={location.pathname === '/dashboard/referrals'}
                onClick={closeMobileSidebar}
              />
              <div className="pt-4 mt-4 border-t border-gray-200">
                <p className="px-4 text-xs font-semibold text-gray-400 uppercase">Settings</p>
              </div>
              <SidebarItem 
                icon={<UserIcon size={20} />} 
                title="Profile" 
                to="/dashboard/profile" 
                active={location.pathname === '/dashboard/profile'}
                onClick={closeMobileSidebar}
              />
              <SidebarItem 
                icon={<ShieldIcon size={20} />} 
                title="Security" 
                to="/dashboard/security" 
                active={location.pathname === '/dashboard/security'}
                onClick={closeMobileSidebar}
              />
            </ul>
          </nav>
          {/* Logout button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={logout}
              className="flex items-center w-full px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
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
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
export default DashboardLayout
