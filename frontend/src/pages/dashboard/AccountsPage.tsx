import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CreditCardIcon, ArrowRightIcon, PlusIcon } from 'lucide-react'
import Button from '../../components/Button'
import { getAccounts } from '../../api/accountApi'

// Define account type from API
interface Account {
  id: string
  accountNumber: string
  accountType: string
  balance: number
  currency: string
  createdAt: string
  updatedAt: string
}

const AccountCard = ({ account }: { account: Account }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">{account.accountType} Account</h3>
          <p className="text-sm text-gray-500">
            {account.accountNumber.slice(0, -4).replace(/\d/g, '*') + account.accountNumber.slice(-4)}
          </p>
        </div>
        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
          account.accountType === 'current' ? 'bg-blue-100' : 
          account.accountType === 'savings' ? 'bg-green-100' : 
          account.accountType === 'fixed' ? 'bg-purple-100' : 'bg-yellow-100'
        }`}>
          <CreditCardIcon 
            size={20} 
            className={`${
              account.accountType === 'current' ? 'text-blue-600' : 
              account.accountType === 'savings' ? 'text-green-600' : 
              account.accountType === 'fixed' ? 'text-purple-600' : 'text-yellow-600'
            }`} 
          />
        </div>
      </div>
      <div className="mb-4">
        <p className="text-sm text-gray-500">Current Balance</p>
        <p className="text-2xl font-bold text-gray-900">
          {account.currency} {account.balance.toLocaleString()}
        </p>
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
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await getAccounts()
        setAccounts(res.data.accounts || []) // Fixed: Get accounts from response object
      } catch (error) {
        console.error("Error fetching accounts", error)
        setAccounts([]) // Set empty array on error
      } finally {
        setLoading(false)
      }
    }
    fetchAccounts()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading accounts...</p>
        </div>
      </div>
    )
  }

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
      {accounts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 text-center">
          <p className="text-gray-500 mb-4">You don't have any accounts yet</p>
          <Button variant="primary" className="flex items-center mx-auto">
            <PlusIcon size={16} className="mr-1" /> Create Your First Account
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map(account => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>
      )}
    </div>
  )
}

export default AccountsPage

