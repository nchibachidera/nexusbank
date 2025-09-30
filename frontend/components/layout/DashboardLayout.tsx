import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  HomeIcon, 
  ArrowLeftRightIcon, 
  ReceiptIcon, 
  CreditCardIcon, 
  GiftIcon, 
  UsersIcon, 
  ShieldIcon,
  BellIcon,
  UserIcon,
  MenuIcon,
  XIcon,
  ChevronDownIcon,
  LogOutIcon,
  SearchIcon
} from 'lucide-react'
interface DashboardLayoutProps {
  children: React.ReactNode
  title: string
}
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const location = useLocation()
  const navItems = [
    { name: 'Accounts', path: '/dashboard/account', icon: <HomeIcon size={20} /> },
    { 
      name: 'Transfers', 
      icon: <ArrowLeftRightIcon size={20} />,
      subItems: [
        { name: 'Between Accounts', path: '/dashboard/transfers/between-accounts' },
        { name: 'External Transfer', path: '/dashboard/transfers/external' },
      ]
    },
    { 
      name: 'Bills', 
      icon: <CreditCardIcon size={20} />,
      subItems: [
        { name: 'Utilities', path: '/dashboard/bills/utilities' },
        { name: 'Airtime', path: '/dashboard/bills/airtime' },
        { name: 'Subscriptions', path: '/dashboard/bills/subscriptions' },
      ]
    },
    { name: 'Rewards', path: '/dashboard/rewards', icon: <GiftIcon size={20} /> },
    { name: 'Referrals', path: '/dashboard/referrals', icon: <UsersIcon size={20} /> },
    { name: 'Security', path: '/dashboard/security', icon: <ShieldIcon size={20} /> },
  ]
  const isActive = (path: string) => {
    return location.pathname === path
  }
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({})
  const toggleSubMenu = (name: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [name]: !prev[name]
    }))
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-gray-200 z-50 transition-transform duration-300 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } lg:static lg:z-auto`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <Link to="/" className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold">BB</span>
            </div>
            <span className="ml-2 text-lg font-semibold text-gray-900">BankApp</span>
          </Link>
          <button 
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setSidebarOpen(false)}
          >
            <XIcon size={20} />
          </button>
        </div>
        <div className="py-4 overflow-y-auto">
          <nav className="px-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.name} className="mb-1">
                {item.subItems ? (
                  <div>
                    <button
                      onClick={() => toggleSubMenu(item.name)}
                      className={`w-full flex items-center justify-between px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 ${
                        expandedItems[item.name] ? 'text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="mr-3 text-gray-500">{item.icon}</span>
                        {item.name}
                      </div>
                      <ChevronDownIcon 
                        size={16} 
                        className={`transition-transform ${expandedItems[item.name] ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    {expandedItems[item.name] && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            className={`block px-4 py-2 text-sm rounded-md ${
                              isActive(subItem.path)
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      isActive(item.path)
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3 text-gray-500">{item.icon}</span>
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <Link 
            to="/login" 
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
          >
            <LogOutIcon size={18} className="mr-3 text-gray-500" />
            Logout
          </Link>
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
              <h1 className="ml-4 lg:ml-0 text-lg font-semibold text-gray-900">{title}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="block w-full pl-10 pr-3 py-1.5 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 relative">
                <BellIcon size={20} />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <div className="relative">
                <button 
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center text-sm focus:outline-none"
                >
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <UserIcon size={16} className="text-gray-600" />
                  </div>
                </button>
                {profileDropdownOpen && (
                  <div 
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                        <p className="font-medium">John Doe</p>
                        <p className="text-gray-500">john.doe@example.com</p>
                      </div>
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</Link>
                      <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                      <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
export default DashboardLayout
