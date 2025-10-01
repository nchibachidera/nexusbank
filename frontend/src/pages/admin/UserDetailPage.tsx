import React from "react";
import {
  UserIcon,
  ArrowLeftIcon,
  EditIcon,
  KeyIcon,
  CreditCardIcon,
  ShieldIcon,
  ClipboardListIcon,
  HistoryIcon,
  LockIcon,
  UnlockIcon,
  AlertTriangleIcon,
  CheckIcon,
  XIcon,
} from "lucide-react";

const UserDetailPage = () => {
  const user = {
    id: 1,
    name: "Jane Doe",
    email: "jane.doe@example.com",
    status: "Active",
    role: "Customer",
    accounts: [
      { id: "ACC12345", type: "Savings", balance: 5000 },
      { id: "ACC67890", type: "Checking", balance: 2000 },
    ],
    lastLogin: "2024-09-25 14:30",
    createdAt: "2022-01-15",
  };

  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <button className="flex items-center text-sm text-gray-600 hover:text-blue-600">
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Back to Users
      </button>

      {/* User Info */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-4">
          <UserIcon className="w-16 h-16 text-gray-400" />
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <span
              className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
                user.status === "Active"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {user.status}
            </span>
          </div>
        </div>
      </div>

      {/* Account Info */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <CreditCardIcon className="w-5 h-5 mr-2" />
          Accounts
        </h3>
        <ul className="space-y-2">
          {user.accounts.map((account) => (
            <li
              key={account.id}
              className="flex justify-between p-3 border rounded"
            >
              <span>
                {account.type} ({account.id})
              </span>
              <span className="font-bold">${account.balance}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="flex items-center justify-center p-4 bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
          <EditIcon className="w-5 h-5 mr-2" />
          Edit
        </button>
        <button className="flex items-center justify-center p-4 bg-yellow-50 text-yellow-600 rounded hover:bg-yellow-100">
          <KeyIcon className="w-5 h-5 mr-2" />
          Reset Password
        </button>
        <button className="flex items-center justify-center p-4 bg-red-50 text-red-600 rounded hover:bg-red-100">
          <LockIcon className="w-5 h-5 mr-2" />
          Suspend
        </button>
        <button className="flex items-center justify-center p-4 bg-green-50 text-green-600 rounded hover:bg-green-100">
          <UnlockIcon className="w-5 h-5 mr-2" />
          Activate
        </button>
      </div>

      {/* Activity Logs */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <HistoryIcon className="w-5 h-5 mr-2" />
          Activity Logs
        </h3>
        <ul className="space-y-2">
          <li className="flex items-center text-sm text-gray-600">
            <CheckIcon className="w-4 h-4 text-green-600 mr-2" />
            User logged in on {user.lastLogin}
          </li>
          <li className="flex items-center text-sm text-gray-600">
            <XIcon className="w-4 h-4 text-red-600 mr-2" />
            Failed login attempt on 2024-09-20
          </li>
          <li className="flex items-center text-sm text-gray-600">
            <ShieldIcon className="w-4 h-4 text-blue-600 mr-2" />
            Account created on {user.createdAt}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDetailPage;
