import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  Home,
  CreditCard,
  ArrowLeftRight,
  Receipt,
  Wallet,
  PiggyBank,
  Settings,
  ChevronDown,
  ChevronUp,
  LogOut,
  FileText,
  History
} from 'lucide-react';

const DashboardLayout = () => {
  const location = useLocation();
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isFundTransferOpen, setIsFundTransferOpen] = useState(false);
  const [isDepositsOpen, setIsDepositsOpen] = useState(false);

  const mainNavItems = [
    { name: 'Overview', path: '/dashboard', icon: Home }
  ];

  const accountItems = [
    { name: 'Account History', path: '/dashboard/accounts' },
    { name: 'Statements', path: '/dashboard/statements' }
  ];

  const fundTransferItems = [
    { name: 'Local Transfer', path: '/dashboard/transfers/local' },
    { name: 'International Transfer', path: '/dashboard/transfers/international' },
    { name: 'Inter-Account Transfer', path: '/dashboard/transfers/inter-account' }
  ];

  const depositItems = [
    { name: 'Cheque Deposit', path: '/dashboard/deposits/cheque' },
    { name: 'Deposit History', path: '/dashboard/deposits/history' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e3a8a] text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-blue-800">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
              <span className="text-blue-900 font-bold text-xl">N</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">NEW NEZER</h1>
              <p className="text-xs text-blue-200">PERSONAL BANKING</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {/* Dashboard Section */}
          <div className="mb-6">
            <h3 className="px-3 text-xs font-semibold text-blue-300 uppercase tracking-wider mb-2">
              Dashboard
            </h3>
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-lg mb-1 transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-700 text-white'
                      : 'text-blue-100 hover:bg-blue-800'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="text-sm">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Account Section */}
          <div className="mb-6">
            <h3 className="px-3 text-xs font-semibold text-blue-300 uppercase tracking-wider mb-2">
              Account
            </h3>
            <button
              onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg mb-1 text-blue-100 hover:bg-blue-800 transition-colors"
            >
              <div className="flex items-center">
                <CreditCard className="w-5 h-5 mr-3" />
                <span className="text-sm">Account</span>
              </div>
              {isAccountMenuOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            {isAccountMenuOpen && (
              <div className="ml-8 space-y-1">
                {accountItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive(item.path)
                        ? 'bg-blue-700 text-white'
                        : 'text-blue-100 hover:bg-blue-800'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Fund Transfer Section */}
          <div className="mb-6">
            <h3 className="px-3 text-xs font-semibold text-blue-300 uppercase tracking-wider mb-2">
              Fund Transfer
            </h3>
            <button
              onClick={() => setIsFundTransferOpen(!isFundTransferOpen)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg mb-1 text-blue-100 hover:bg-blue-800 transition-colors"
            >
              <div className="flex items-center">
                <ArrowLeftRight className="w-5 h-5 mr-3" />
                <span className="text-sm">Transfers</span>
              </div>
              {isFundTransferOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            {isFundTransferOpen && (
              <div className="ml-8 space-y-1">
                {fundTransferItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive(item.path)
                        ? 'bg-blue-700 text-white'
                        : 'text-blue-100 hover:bg-blue-800'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Deposits Section */}
          <div className="mb-6">
            <h3 className="px-3 text-xs font-semibold text-blue-300 uppercase tracking-wider mb-2">
              Deposits
            </h3>
            <button
              onClick={() => setIsDepositsOpen(!isDepositsOpen)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg mb-1 text-blue-100 hover:bg-blue-800 transition-colors"
            >
              <div className="flex items-center">
                <Wallet className="w-5 h-5 mr-3" />
                <span className="text-sm">Deposits</span>
              </div>
              {isDepositsOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            {isDepositsOpen && (
              <div className="ml-8 space-y-1">
                {depositItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive(item.path)
                        ? 'bg-blue-700 text-white'
                        : 'text-blue-100 hover:bg-blue-800'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Other Menu Items */}
          <div className="space-y-1">
            <Link
              to="/dashboard/transactions"
              className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                isActive('/dashboard/transactions')
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-100 hover:bg-blue-800'
              }`}
            >
              <Receipt className="w-5 h-5 mr-3" />
              <span className="text-sm">Transactions</span>
            </Link>
            <Link
              to="/dashboard/bills"
              className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                isActive('/dashboard/bills')
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-100 hover:bg-blue-800'
              }`}
            >
              <FileText className="w-5 h-5 mr-3" />
              <span className="text-sm">Bills Payment</span>
            </Link>
            <Link
              to="/dashboard/savings"
              className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                isActive('/dashboard/savings')
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-100 hover:bg-blue-800'
              }`}
            >
              <PiggyBank className="w-5 h-5 mr-3" />
              <span className="text-sm">Savings</span>
            </Link>
            <Link
              to="/dashboard/settings"
              className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                isActive('/dashboard/settings')
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-100 hover:bg-blue-800'
              }`}
            >
              <Settings className="w-5 h-5 mr-3" />
              <span className="text-sm">Settings</span>
            </Link>
          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-blue-800">
          <button className="flex items-center w-full px-3 py-2 text-blue-100 hover:bg-blue-800 rounded-lg transition-colors">
            <LogOut className="w-5 h-5 mr-3" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;


