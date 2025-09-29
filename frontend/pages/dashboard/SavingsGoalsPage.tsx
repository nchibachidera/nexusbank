import React, { useState } from 'react'
import { PlusIcon, PiggyBankIcon, TrendingUpIcon, ArrowRightIcon, EditIcon, TrashIcon } from 'lucide-react'
import Button from '../../components/Button'
// Mock data
const savingsGoals = [
  {
    id: '1',
    name: 'Vacation Fund',
    targetAmount: 5000,
    currentAmount: 3000,
    deadline: '2023-12-31',
    category: 'Travel',
    autoSave: true,
    autoSaveAmount: 200,
    autoSaveFrequency: 'Monthly',
    progress: 60
  },
  {
    id: '2',
    name: 'New Laptop',
    targetAmount: 2000,
    currentAmount: 1200,
    deadline: '2023-09-15',
    category: 'Electronics',
    autoSave: true,
    autoSaveAmount: 150,
    autoSaveFrequency: 'Monthly',
    progress: 60
  },
  {
    id: '3',
    name: 'Emergency Fund',
    targetAmount: 10000,
    currentAmount: 4500,
    deadline: '2024-06-30',
    category: 'Emergency',
    autoSave: true,
    autoSaveAmount: 300,
    autoSaveFrequency: 'Monthly',
    progress: 45
  }
]
const SavingsGoalsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    deadline: '',
    category: 'Travel',
    autoSave: true,
    autoSaveAmount: '',
    autoSaveFrequency: 'Monthly'
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : e.target.value
    setFormData({
      ...formData,
      [e.target.name]: value
    })
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    setIsModalOpen(false)
    // Reset form
    setFormData({
      name: '',
      targetAmount: '',
      deadline: '',
      category: 'Travel',
      autoSave: true,
      autoSaveAmount: '',
      autoSaveFrequency: 'Monthly'
    })
  }
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Savings Goals</h1>
          <p className="text-gray-600">Track and manage your savings goals</p>
        </div>
        <Button 
          variant="primary" 
          className="flex items-center"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusIcon size={16} className="mr-1" /> New Goal
        </Button>
      </div>
      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savingsGoals.map(goal => (
          <div key={goal.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{goal.name}</h3>
                <p className="text-sm text-gray-500">{goal.category}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <PiggyBankIcon size={20} className="text-green-600" />
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-500">Progress</span>
                <span className="text-sm font-medium">{goal.progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full" 
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500">Current</p>
                <p className="text-lg font-medium text-gray-900">${goal.currentAmount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Target</p>
                <p className="text-lg font-medium text-gray-900">${goal.targetAmount.toLocaleString()}</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-xs text-gray-500">Deadline</p>
              <p className="text-sm text-gray-700">{new Date(goal.deadline).toLocaleDateString()}</p>
            </div>
            {goal.autoSave && (
              <div className="mb-4 bg-blue-50 p-2 rounded-lg flex items-center">
                <TrendingUpIcon size={16} className="text-blue-600 mr-2" />
                <p className="text-xs text-blue-800">
                  Auto-saving ${goal.autoSaveAmount} {goal.autoSaveFrequency}
                </p>
              </div>
            )}
            <div className="border-t border-gray-100 pt-4 mt-2 flex justify-between">
              <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                <EditIcon size={14} className="mr-1" /> Edit
              </button>
              <button className="text-red-600 hover:text-red-800 text-sm flex items-center">
                <TrashIcon size={14} className="mr-1" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* New Goal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Create New Savings Goal</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Goal Name*
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Vacation Fund"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Target Amount*
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2">$</span>
                      <input
                        type="number"
                        name="targetAmount"
                        value={formData.targetAmount}
                        onChange={handleChange}
                        required
                        min="1"
                        step="1"
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Target Date*
                    </label>
                    <input
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Travel">Travel</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Home">Home</option>
                      <option value="Education">Education</option>
                      <option value="Emergency">Emergency</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="autoSave"
                        name="autoSave"
                        checked={formData.autoSave}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="autoSave" className="ml-2 block text-sm text-gray-900">
                        Set up automatic savings
                      </label>
                    </div>
                  </div>
                  {formData.autoSave && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Auto-save Amount
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2">$</span>
                          <input
                            type="number"
                            name="autoSaveAmount"
                            value={formData.autoSaveAmount}
                            onChange={handleChange}
                            min="1"
                            step="1"
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Frequency
                        </label>
                        <select
                          name="autoSaveFrequency"
                          value={formData.autoSaveFrequency}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Weekly">Weekly</option>
                          <option value="Bi-weekly">Bi-weekly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>
                    </div>
                  )}
                  <div className="pt-4 border-t border-gray-200 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <Button type="submit">
                      Create Goal
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default SavingsGoalsPage
