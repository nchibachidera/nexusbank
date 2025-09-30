import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import DashboardLayout from './components/layout/DashboardLayout.tsx'
import AdminLayout from './components/layout/AdminLayout.ts'
// Public Pages
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import FAQPage from './pages/FAQPage'
import BlogPage from './pages/BlogPage'
import CareersPage from './pages/CareersPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
// Dashboard Pages (Phase 3)
import DashboardHome from './pages/dashboard/DashboardHome'
import AccountsPage from './pages/dashboard/AccountsPage'
import AccountDetailPage from './pages/dashboard/AccountDetailPage.tsx'
// Money Movement Pages (Phase 4)
import NewTransferPage from './pages/dashboard/transfers/NewTransferPage'
import BetweenAccountsPage from './pages/dashboard/transfers/BetweenAccountsPage'
import ExternalTransferPage from './pages/dashboard/transfers/ExternalTransferPage'
import TransactionsPage from './pages/dashboard/TransactionsPage'
import TransactionDetailPage from './pages/dashboard/TransactionDetailPage'
import UtilitiesPaymentPage from './pages/dashboard/bills/UtilitiesPaymentPage'
import AirtimeTopupPage from './pages/dashboard/bills/AirtimeTopupPage'
import SubscriptionsPage from './pages/dashboard/bills/SubscriptionsPage'
// Extra Value Pages (Phase 5)
import SavingsGoalsPage from './pages/dashboard/SavingsGoalsPage'
import RewardsPage from './pages/dashboard/RewardsPage'
import ReferralsPage from './pages/dashboard/ReferralsPage'
// User Management Pages (Phase 6)
import ProfilePage from './pages/dashboard/ProfilePage'
import SecurityPage from './pages/dashboard/SecurityPage'
// Admin Pages (Phase 7)
import AdminDashboard from './pages/admin/AdminDashboard'
import UserManagementPage from './pages/admin/UserManagementPage'
import UserDetailPage from './pages/admin/UserDetailPage'
import TransactionMonitoringPage from './pages/admin/TransactionMonitoringPage'
import FraudAlertsPage from './pages/admin/FraudAlertsPage'
import AuditLogsPage from './pages/admin/AuditLogsPage'
import RolesPermissionsPage from './pages/admin/RolesPermissionsPage'
// Public Layout Component
const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen bg-gray-50">
    <Navbar />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
)
export function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <PublicLayout>
              <HomePage />
            </PublicLayout>
          } />
          <Route path="/about" element={
            <PublicLayout>
              <AboutPage />
            </PublicLayout>
          } />
          <Route path="/contact" element={
            <PublicLayout>
              <ContactPage />
            </PublicLayout>
          } />
          <Route path="/faq" element={
            <PublicLayout>
              <FAQPage />
            </PublicLayout>
          } />
          <Route path="/blog" element={
            <PublicLayout>
              <BlogPage />
            </PublicLayout>
          } />
          <Route path="/careers" element={
            <PublicLayout>
              <CareersPage />
            </PublicLayout>
          } />
          <Route path="/login" element={
            <PublicLayout>
              <LoginPage />
            </PublicLayout>
          } />
          <Route path="/signup" element={
            <PublicLayout>
              <SignupPage />
            </PublicLayout>
          } />
          {/* Dashboard Routes (Protected) */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="accounts" element={<AccountsPage />} />
            <Route path="accounts/:id" element={<AccountDetailPage />} />
            <Route path="transfers/new" element={<NewTransferPage />} />
            <Route path="transfers/between-accounts" element={<BetweenAccountsPage />} />
            <Route path="transfers/external" element={<ExternalTransferPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="transactions/:id" element={<TransactionDetailPage />} />
            <Route path="bills/utilities" element={<UtilitiesPaymentPage />} />
            <Route path="bills/airtime" element={<AirtimeTopupPage />} />
            <Route path="bills/subscriptions" element={<SubscriptionsPage />} />
            <Route path="savings" element={<SavingsGoalsPage />} />
            <Route path="rewards" element={<RewardsPage />} />
            <Route path="referrals" element={<ReferralsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="security" element={<SecurityPage />} />
          </Route>
          {/* Admin Routes (Protected) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UserManagementPage />} />
            <Route path="users/:id" element={<UserDetailPage />} />
            <Route path="transactions" element={<TransactionMonitoringPage />} />
            <Route path="alerts" element={<FraudAlertsPage />} />
            <Route path="logs" element={<AuditLogsPage />} />
            <Route path="roles" element={<RolesPermissionsPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}
