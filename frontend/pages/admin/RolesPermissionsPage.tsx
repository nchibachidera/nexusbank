 import React, { useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Card, CardHeader, CardContent, CardFooter } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { 
  ShieldIcon, 
  PlusIcon, 
  EditIcon, 
  TrashIcon, 
  SaveIcon, 
  XIcon,
  UserIcon,
  UsersIcon,
  LockIcon,
  CreditCardIcon,
  ClipboardListIcon,
  CheckIcon,
  AlertTriangleIcon
} from 'lucide-react'
const RolesPermissionsPage: React.FC = () => {
  const [showAddRoleModal, setShowAddRoleModal] = useState(false)
  const [showEditRoleModal, setShowEditRoleModal] = useState(false)
  const [showDeleteRoleModal, setShowDeleteRoleModal] = useState(false)
  const [selectedRole, setSelectedRole] = useState<any>(null)
  const [newRoleName, setNewRoleName] = useState('')
  const [newRoleDescription, setNewRoleDescription] = useState('')
  const [expandedRole, setExpandedRole] = useState<string | null>(null)
  // Dummy roles data
  const roles = [
    {
      id: 'ROLE-001',
      name: 'Administrator',
      description: 'Full system access with all permissions',
      userCount: 2,
      permissions: [
        { id: 'PERM-001', name: 'user_view', description: 'View user details' },
        { id: 'PERM-002', name: 'user_create', description: 'Create new users' },
        { id: 'PERM-003', name: 'user_edit', description: 'Edit user details' },
        { id: 'PERM-004', name: 'user_delete', description: 'Delete users' },
        { id: 'PERM-005', name: 'role_manage', description: 'Manage roles and permissions' },
        { id: 'PERM-006', name: 'transaction_view', description: 'View all transactions' },
        { id: 'PERM-007', name: 'transaction_approve', description: 'Approve transactions' },
        { id: 'PERM-008', name: 'transaction_cancel', description: 'Cancel transactions' },
        { id: 'PERM-009', name: 'account_manage', description: 'Manage account settings' },
        { id: 'PERM-010', name: 'system_settings', description: 'Modify system settings' },
        { id: 'PERM-011', name: 'audit_logs_view', description: 'View audit logs' },
        { id: 'PERM-012', name: 'security_manage', description: 'Manage security settings' }
      ]
    },
    {
      id: 'ROLE-002',
      name: 'Support Staff',
      description: 'Customer support with limited administrative access',
      userCount: 5,
      permissions: [
        { id: 'PERM-001', name: 'user_view', description: 'View user details' },
        { id: 'PERM-003', name: 'user_edit', description: 'Edit user details' },
        { id: 'PERM-006', name: 'transaction_view', description: 'View all transactions' },
        { id: 'PERM-013', name: 'support_ticket_manage', description: 'Manage support tickets' },
        { id: 'PERM-014', name: 'password_reset', description: 'Reset user passwords' }
      ]
    },
    {
      id: 'ROLE-003',
      name: 'Compliance Officer',
      description: 'Oversees regulatory compliance and audit',
      userCount: 3,
      permissions: [
        { id: 'PERM-001', name: 'user_view', description: 'View user details' },
        { id: 'PERM-006', name: 'transaction_view', description: 'View all transactions' },
        { id: 'PERM-011', name: 'audit_logs_view', description: 'View audit logs' },
        { id: 'PERM-015', name: 'compliance_reports', description: 'Generate compliance reports' },
        { id: 'PERM-016', name: 'kyc_review', description: 'Review KYC documents' }
      ]
    },
    {
      id: 'ROLE-004',
      name: 'Account Manager',
      description: 'Manages customer accounts and services',
      userCount: 8,
      permissions: [
        { id: 'PERM-001', name: 'user_view', description: 'View user details' },
        { id: 'PERM-003', name: 'user_edit', description: 'Edit user details' },
        { id: 'PERM-006', name: 'transaction_view', description: 'View all transactions' },
        { id: 'PERM-017', name: 'account_create', description: 'Create new accounts' },
        { id: 'PERM-018', name: 'account_close', description: 'Close accounts' },
        { id: 'PERM-019', name: 'service_manage', description: 'Manage account services' }
      ]
    },
    {
      id: 'ROLE-005',
      name: 'Read Only',
      description: 'View-only access for auditing purposes',
      userCount: 4,
      permissions: [
        { id: 'PERM-001', name: 'user_view', description: 'View user details' },
        { id: 'PERM-006', name: 'transaction_view', description: 'View all transactions' },
        { id: 'PERM-011', name: 'audit_logs_view', description: 'View audit logs' }
      ]
    }
  ]
  // All available permissions
  const allPermissions = [
    { id: 'PERM-001', name: 'user_view', description: 'View user details', category: 'user' },
    { id: 'PERM-002', name: 'user_create', description: 'Create new users', category: 'user' },
    { id: 'PERM-003', name: 'user_edit', description: 'Edit user details', category: 'user' },
    { id: 'PERM-004', name: 'user_delete', description: 'Delete users', category: 'user' },
    { id: 'PERM-005', name: 'role_manage', description: 'Manage roles and permissions', category: 'admin' },
    { id: 'PERM-006', name: 'transaction_view', description: 'View all transactions', category: 'transaction' },
    { id: 'PERM-007', name: 'transaction_approve', description: 'Approve transactions', category: 'transaction' },
    { id: 'PERM-008', name: 'transaction_cancel', description: 'Cancel transactions', category: 'transaction' },
    { id: 'PERM-009', name: 'account_manage', description: 'Manage account settings', category: 'account' },
    { id: 'PERM-010', name: 'system_settings', description: 'Modify system settings', category: 'admin' },
    { id: 'PERM-011', name: 'audit_logs_view', description: 'View audit logs', category: 'security' },
    { id: 'PERM-012', name: 'security_manage', description: 'Manage security settings', category: 'security' },
    { id: 'PERM-013', name: 'support_ticket_manage', description: 'Manage support tickets', category: 'support' },
    { id: 'PERM-014', name: 'password_reset', description: 'Reset user passwords', category: 'user' },
    { id: 'PERM-015', name: 'compliance_reports', description: 'Generate compliance reports', category: 'compliance' },
    { id: 'PERM-016', name: 'kyc_review', description: 'Review KYC documents', category: 'compliance' },
    { id: 'PERM-017', name: 'account_create', description: 'Create new accounts', category: 'account' },
    { id: 'PERM-018', name: 'account_close', description: 'Close accounts', category: 'account' },
    { id: 'PERM-019', name: 'service_manage', description: 'Manage account services', category: 'account' }
  ]
  // Group permissions by category
  const permissionsByCategory = allPermissions.reduce((acc: any, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = []
    }
    acc[permission.category].push(permission)
    return acc
  }, {})
  const handleAddRole = () => {
    // Here you would handle the actual role creation
    setShowAddRoleModal(false)
    setNewRoleName('')
    setNewRoleDescription('')
  }
  const handleEditRole = () => {
    // Here you would handle the actual role update
    setShowEditRoleModal(false)
  }
  const handleDeleteRole = () => {
    // Here you would handle the actual role deletion
    setShowDeleteRoleModal(false)
  }
  const handleRoleClick = (roleId: string) => {
    setExpandedRole(expandedRole === roleId ? null : roleId)
  }
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'user':
        return <UserIcon size={16} className="text-blue-600" />
      case 'admin':
        return <ShieldIcon size={16} className="text-purple-600" />
      case 'transaction':
        return <ClipboardListIcon size={16} className="text-green-600" />
      case 'account':
        return <CreditCardIcon size={16} className="text-yellow-600" />
      case 'security':
        return <LockIcon size={16} className="text-red-600" />
      case 'support':
        return <UsersIcon size={16} className="text-indigo-600" />
      case 'compliance':
        return <ClipboardCheckIcon size={16} className="text-teal-600" />
      default:
        return <ShieldIcon size={16} className="text-gray-600" />
    }
  }
  return (
    <AdminLayout title="Roles & Permissions">
      <div className="space-y-6">
        {/* Actions Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Manage Roles</h2>
          <Button 
            variant="primary" 
            size="sm"
            icon={<PlusIcon size={16} />}
            onClick={() => setShowAddRoleModal(true)}
          >
            Add New Role
          </Button>
        </div>
        {/* Roles List */}
        <div className="grid grid-cols-1 gap-6">
          {roles.map((role) => (
            <Card 
              key={role.id}
              className={expandedRole === role.id ? 'ring-2 ring-blue-500' : ''}
            >
              <CardHeader>
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => handleRoleClick(role.id)}
                >
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <ShieldIcon size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{role.name}</h3>
                      <p className="text-sm text-gray-500">{role.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="default">{role.userCount} Users</Badge>
                    <Badge variant="primary">{role.permissions.length} Permissions</Badge>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        icon={<EditIcon size={16} />}
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedRole(role)
                          setShowEditRoleModal(true)
                        }}
                      >
                        Edit
                      </Button>
                      {role.name !== 'Administrator' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          icon={<TrashIcon size={16} />}
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedRole(role)
                            setShowDeleteRoleModal(true)
                          }}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              {expandedRole === role.id && (
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium text-gray-900">Role Permissions</h4>
                      <Button 
                        variant="outline" 
                        size="sm"
                        icon={<EditIcon size={16} />}
                        onClick={() => {
                          setSelectedRole(role)
                          setShowEditRoleModal(true)
                        }}
                      >
                        Edit Permissions
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {role.permissions.map(permission => (
                        <div 
                          key={permission.id} 
                          className="p-3 border border-gray-200 rounded-md hover:bg-gray-50"
                        >
                          <div className="flex items-start">
                            <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center mr-2 flex-shrink-0">
                              {getCategoryIcon(allPermissions.find(p => p.id === permission.id)?.category || '')}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {permission.name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                              </p>
                              <p className="text-xs text-gray-500">{permission.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
      {/* Add Role Modal */}
      {showAddRoleModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <PlusIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Add New Role
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="roleName" className="block text-sm font-medium text-gray-700">
                          Role Name
                        </label>
                        <input
                          type="text"
                          name="roleName"
                          id="roleName"
                          value={newRoleName}
                          onChange={(e) => setNewRoleName(e.target.value)}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="Enter role name"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="roleDescription" className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <textarea
                          id="roleDescription"
                          name="roleDescription"
                          rows={3}
                          value={newRoleDescription}
                          onChange={(e) => setNewRoleDescription(e.target.value)}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="Enter role description"
                          required
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Permissions</h4>
                        <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md p-2">
                          {Object.entries(permissionsByCategory).map(([category, permissions]: [string, any]) => (
                            <div key={category} className="mb-4">
                              <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                {getCategoryIcon(category)}
                                <span className="ml-2">
                                  {category.charAt(0).toUpperCase() + category.slice(1)} Permissions
                                </span>
                              </h5>
                              <div className="space-y-2 ml-6">
                                {permissions.map((permission: any) => (
                                  <div key={permission.id} className="flex items-center">
                                    <input
                                      id={`permission-${permission.id}`}
                                      name={`permission-${permission.id}`}
                                      type="checkbox"
                                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor={`permission-${permission.id}`} className="ml-2 block text-sm text-gray-900">
                                      {permission.name.split('_').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                      <span className="text-xs text-gray-500 ml-1">- {permission.description}</span>
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <Button
                  variant="primary"
                  onClick={handleAddRole}
                  className="ml-3"
                  icon={<SaveIcon size={18} />}
                >
                  Create Role
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowAddRoleModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Edit Role Modal */}
      {showEditRoleModal && selectedRole && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <EditIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Edit Role: {selectedRole.name}
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="editRoleName" className="block text-sm font-medium text-gray-700">
                          Role Name
                        </label>
                        <input
                          type="text"
                          name="editRoleName"
                          id="editRoleName"
                          defaultValue={selectedRole.name}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="Enter role name"
                          required
                          disabled={selectedRole.name === 'Administrator'}
                        />
                      </div>
                      <div>
                        <label htmlFor="editRoleDescription" className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <textarea
                          id="editRoleDescription"
                          name="editRoleDescription"
                          rows={3}
                          defaultValue={selectedRole.description}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="Enter role description"
                          required
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Permissions</h4>
                        <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md p-2">
                          {Object.entries(permissionsByCategory).map(([category, permissions]: [string, any]) => (
                            <div key={category} className="mb-4">
                              <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                {getCategoryIcon(category)}
                                <span className="ml-2">
                                  {category.charAt(0).toUpperCase() + category.slice(1)} Permissions
                                </span>
                              </h5>
                              <div className="space-y-2 ml-6">
                                {permissions.map((permission: any) => (
                                  <div key={permission.id} className="flex items-center">
                                    <input
                                      id={`edit-permission-${permission.id}`}
                                      name={`edit-permission-${permission.id}`}
                                      type="checkbox"
                                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                      defaultChecked={selectedRole.permissions.some((p: any) => p.id === permission.id)}
                                      disabled={selectedRole.name === 'Administrator' && permission.id === 'PERM-005'}
                                    />
                                    <label htmlFor={`edit-permission-${permission.id}`} className="ml-2 block text-sm text-gray-900">
                                      {permission.name.split('_').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                      <span className="text-xs text-gray-500 ml-1">- {permission.description}</span>
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {selectedRole.name === 'Administrator' && (
                        <div className="bg-yellow-50 p-3 rounded-md flex">
                          <AlertTriangleIcon size={16} className="text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                          <p className="text-sm text-yellow-700">
                            The Administrator role name and core permissions cannot be modified for system security.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <Button
                  variant="primary"
                  onClick={handleEditRole}
                  className="ml-3"
                  icon={<SaveIcon size={18} />}
                >
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowEditRoleModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Delete Role Modal */}
      {showDeleteRoleModal && selectedRole && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <TrashIcon className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Delete Role
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete the role "{selectedRole.name}"? This action cannot be undone.
                        {selectedRole.userCount > 0 && ` There are currently ${selectedRole.userCount} users assigned to this role.`}
                      </p>
                    </div>
                    {selectedRole.userCount > 0 && (
                      <div className="mt-4 bg-yellow-50 p-3 rounded-md flex">
                        <AlertTriangleIcon size={16} className="text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                        <p className="text-sm text-yellow-700">
                          Warning: Deleting this role will remove it from all associated users. You should reassign users to another role first.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <Button
                  variant="danger"
                  onClick={handleDeleteRole}
                  className="ml-3"
                  icon={<TrashIcon size={18} />}
                >
                  Delete Role
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteRoleModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
// Import missing icon
function ClipboardCheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="2" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  );
}
export default RolesPermissionsPage