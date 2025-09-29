import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightIcon, UsersIcon, AlertCircleIcon, TrendingUpIcon, BarChart2Icon, ArrowUpIcon, ArrowDownIcon } from 'lucide-react'
// Mock data
const stats = [
  { id: 1, name: 'Active Users', value: '12,345', change: '+5.3%', trend: 'up' },
  { id: 2, name: 'New Registrations', value: '267', change: '+12.7%', trend: 'up' },
  { id: 3, name: 'Daily Transactions', value: '4,832', change: '+8.1%', trend: 'up' },
  { id: 4, name: 'Support Tickets', value: '37', change: '-2.4%', trend: 'down' }
]
const recentAlerts = [
  { id: 1, type: 'Suspicious Login', user: 'user@example.com', time: '2 hours ago', severity: 'high' },
  { id: 2, type: 'Large Transaction', user: 'business@example.com', time: '5 hours ago', severity: 'medium' },
  { id: 3, type: 'Multiple Failed Attempts', user: 'customer@example.com', time: '1 day ago', severity: 'high' }
]
const userActivity = [
  { date: 'Mon', value: 30 },
  { date: 'Tue', value: 40 },
  { date: 'Wed', value: 45 },
  { date: 'Thu', value: 70 },
  { date: 'Fri', value: 60 },
  { date: 'Sat', value: 50 },
  { date: 'Sun', value: 30 }
]
const AdminDashboard = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of system performance and activities</p>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map(stat => (
          <div key={stat.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm font-medium text-gray-500 mb-1">{stat.name}</p>
            <div className="flex items-baseline">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <span className={`ml-2 text-sm font-medium flex items-center ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? (
                  <ArrowUpIcon size={14} className="mr-0.5" />
                ) : (
                  <ArrowDownIcon size={14} className="mr-0.5" />
                )}
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Activity Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">User Activity</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md">Week</button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-md">Month</button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-md">Year</button>
            </div>
          </div>
          <div className="h-64">
            {/* Chart would go here in a real implementation */}
            <div className="flex items-end h-48 space-x-6">
              {userActivity.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-blue-500 rounded-t-sm" 
                    style={{ height: `${day.value}%` }}
                  ></div>
                  <p className="mt-2 text-xs text-gray-500">{day.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Fraud Alerts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Alerts</h2>
            <Link to="/admin/alerts" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
              View All <ArrowRightIcon size={16} className="ml-1" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentAlerts.map(alert => (
              <div key={alert.id} className="border-l-4 pl-3 py-2 bg-gray-50 rounded-r-lg border-l-red-500">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{alert.type}</p>
                    <p className="text-sm text-gray-600">{alert.user}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    alert.severity === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {alert.severity}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Quick Access */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-md p-6 text-white">
          <div className="flex items-center mb-4">
            <UsersIcon size={24} className="mr-3" />
            <h3 className="text-lg font-semibold">User Management</h3>
          </div>
          <p className="mb-4 text-blue-100">View, verify and manage user accounts</p>
          <Link to="/admin/users" className="inline-flex items-center text-white hover:underline">
            Manage Users <ArrowRightIcon size={16} className="ml-1" />
          </Link>
        </div>
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl shadow-md p-6 text-white">
          <div className="flex items-center mb-4">
            <AlertCircleIcon size={24} className="mr-3" />
            <h3 className="text-lg font-semibold">Fraud Alerts</h3>
          </div>
          <p className="mb-4 text-purple-100">Review and respond to security alerts</p>
          <Link to="/admin/alerts" className="inline-flex items-center text-white hover:underline">
            View Alerts <ArrowRightIcon size={16} className="ml-1" />
          </Link>
        </div>
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-md p-6 text-white">
          <div className="flex items-center mb-4">
            <BarChart2Icon size={24} className="mr-3" />
            <h3 className="text-lg font-semibold">System Reports</h3>
          </div>
          <p className="mb-4 text-green-100">Access detailed analytics and reports</p>
          <Link to="/admin/logs" className="inline-flex items-center text-white hover:underline">
            View Reports <ArrowRightIcon size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}
export default AdminDashboard
