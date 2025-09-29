import React from 'react'
import { Link } from 'react-router-dom'
import { CreditCardIcon, ArrowRightIcon, PlusIcon } from 'lucide-react'
import Button from '../../components/Button'
// Mock data
const accounts = [
  { 
    id: '1', 
    name: 'Current Account', 
    number: '1234 5678 9012 4567', 
    balance: 24562.00, 
    type: 'current',
    availableBalance: 24562.00,
    currency: 'USD',
    status: 'active',
    openDate: '2020-03-15',
    transactions: 156
  },
  { 
    id: '2', 
    name: 'Savings Account', 
    number: '1234 5678 9012 7890', 
    balance: 15750.25, 
    type: 'savings',
    availableBalance: 15750.25,
    currency: 'USD',
    status: 'active',
    openDate: '2020-05-22',
    transactions: 87
  },
  { 
    id: '3', 
    name: 'Fixed Deposit', 
    number: '1234 5678 9012 1234', 
    balance: 50000.00, 
    type: 'fixed',
    availableBalance: 0.00,
    currency: 'USD',
    status: 'active',
    openDate: '2022-01-10',
    maturityDate: '2023-01-10',
    interestRate: '3.5%',
    transactions: 2
  },
  { 
    id: '4', 
    name: 'Joint Account', 
    number: '1234 5678 9012 5678', 
    balance: 8920.75, 
    type: 'joint',
    availableBalance: 8920.75,
    currency: 'USD',
    status: 'active',
    openDate: '2021-07-30',
    transactions: 67
  }
]
const AccountCard = ({ account }: { account: typeof accounts[0] }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">{account.name}</h3>
          <p className="text-sm text-gray-500">{account.number.slice(0, -4).replace(/\d/g, '*') + account.number.slice(-4)}</p>
        </div>
        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
          account.type === 'current' ? 'bg-blue-100' : 
          account.type === 'savings' ? 'bg-green-100' : 
          account.type === 'fixed' ? 'bg-purple-100' : 'bg-yellow-100'
        }`}>
          <CreditCardIcon 
            size={20} 
            className={`${
              account.type === 'current' ? 'text-blue-600' : 
              account.type === 'savings' ? 'text-green-600' : 
              account.type === 'fixed' ? 'text-purple-600' : 'text-yellow-600'
            }`} 
          />
        </div>
      </div>
      <div className="mb-4">
        <p className="text-sm text-gray-500">Current Balance</p>
        <p className="text-2xl font-bold text-gray-900">${account.balance.toLocaleString()}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500">Available Balance</p>
          <p className="text-sm font-medium text-gray-900">${account.availableBalance.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Status</p>
          <p className="text-sm font-medium capitalize">
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
              account.status === 'active' ? 'bg-green-100 text-green-800' : 
              account.status === 'inactive' ? 'bg-gray-100 text-gray-800' : 'bg-red-100 text-red-800'
            }`}>
              {account.status}
            </span>
          </p>
        </div>
      </div>
      <div className="border-t border-gray-100 pt-4 mt-2 flex justify-between">
        <Link 
          to={`/dashboard/accounts/${account.id}`} 
          className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
        >
          View Details <ArrowRightIcon size={16} className="ml-1" />
        </Link>
        <Link 
          to={`/dashboard/transfers/new?from=${account.id}`} 
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          Make a Transfer
        </Link>
      </div>
    </div>
  )
}
const AccountsPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your Accounts</h1>
          <p className="text-gray-600">Manage all your accounts in one place</p>
        </div>
        <Button variant="primary" className="flex items-center">
          <PlusIcon size={16} className="mr-1" /> New Account
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map(account => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>
    </div>
  )
}
export default AccountsPage
