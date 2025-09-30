 import React, { useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { Card, CardHeader, CardContent, CardFooter } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { 
  UsersIcon, 
  LinkIcon, 
  CopyIcon, 
  MailIcon, 
  CheckIcon,
  GiftIcon,
  ShareIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon
} from 'lucide-react'
const ReferralsPage: React.FC = () => {
  const [copied, setCopied] = useState(false)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteSuccess, setInviteSuccess] = useState(false)
  // Dummy referral data
  const referralData = {
    code: 'FRIEND50',
    link: 'https://bankapp.com/refer/FRIEND50',
    totalReferred: 5,
    pendingReferred: 2,
    successfulReferred: 3,
    pointsEarned: 3000,
    reward: '1,000 points per successful referral',
    friendReward: '$50 welcome bonus'
  }
  // Dummy referrals list
  const referrals = [
    {
      id: 'REF-001',
      name: 'John Smith',
      email: 'john.smith@example.com',
      date: '2023-09-15',
      status: 'successful',
      pointsEarned: 1000
    },
    {
      id: 'REF-002',
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      date: '2023-09-28',
      status: 'successful',
      pointsEarned: 1000
    },
    {
      id: 'REF-003',
      name: 'Robert Johnson',
      email: 'robert.johnson@example.com',
      date: '2023-10-05',
      status: 'successful',
      pointsEarned: 1000
    },
    {
      id: 'REF-004',
      name: 'Emily Wilson',
      email: 'emily.wilson@example.com',
      date: '2023-10-10',
      status: 'pending',
      pointsEarned: 0
    },
    {
      id: 'REF-005',
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      date: '2023-10-12',
      status: 'pending',
      pointsEarned: 0
    }
  ]
  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralData.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralData.link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setInviteSuccess(true)
    // Reset form after a delay
    setTimeout(() => {
      setInviteSuccess(false)
      setInviteEmail('')
      setShowInviteModal(false)
    }, 3000)
  }
  return (
    <DashboardLayout title="Referrals">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Referral Summary Card */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">Refer Friends & Earn Rewards</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-6">
                    <p className="text-sm font-medium text-gray-500">Your Referral Code</p>
                    <div className="mt-1 flex items-center">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                          <span className="text-lg font-mono font-medium text-gray-900">{referralData.code}</span>
                          <button 
                            onClick={handleCopyCode}
                            className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                            title="Copy code"
                          >
                            <CopyIcon size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Your Referral Link</p>
                    <div className="mt-1 flex items-center">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between bg-gray-100 p-2 rounded-md overflow-hidden">
                          <span className="text-sm font-medium text-gray-900 truncate">{referralData.link}</span>
                          <button 
                            onClick={handleCopyLink}
                            className="ml-2 p-1 text-gray-400 hover:text-gray-600 flex-shrink-0"
                            title="Copy link"
                          >
                            <CopyIcon size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {copied && (
                    <div className="mt-2 flex items-center text-green-600 text-sm">
                      <CheckIcon size={16} className="mr-1" />
                      Copied to clipboard!
                    </div>
                  )}
                  <div className="mt-6 flex space-x-3">
                    <Button 
                      variant="primary"
                      icon={<MailIcon size={18} />}
                      onClick={() => setShowInviteModal(true)}
                    >
                      Invite via Email
                    </Button>
                    <Button 
                      variant="outline"
                      icon={<ShareIcon size={18} />}
                    >
                      Share
                    </Button>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <GiftIcon size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Referral Rewards</h3>
                      <ul className="mt-2 space-y-2">
                        <li className="flex items-start text-sm">
                          <svg className="h-4 w-4 text-blue-600 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>
                            <strong>You get:</strong> {referralData.reward}
                          </span>
                        </li>
                        <li className="flex items-start text-sm">
                          <svg className="h-4 w-4 text-blue-600 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>
                            <strong>Your friend gets:</strong> {referralData.friendReward}
                          </span>
                        </li>
                        <li className="flex items-start text-sm">
                          <svg className="h-4 w-4 text-blue-600 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">

```
/>
                          </svg>
                          <span>
                            <strong>No limit:</strong> Refer as many friends as you want
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-2xl font-semibold text-gray-900">{referralData.totalReferred}</p>
                        <p className="text-xs text-gray-500">Total Referred</p>
                      </div>
                      <div>
                        <p className="text-2xl font-semibold text-gray-900">{referralData.successfulReferred}</p>
                        <p className="text-xs text-gray-500">Successful</p>
                      </div>
                      <div>
                        <p className="text-2xl font-semibold text-blue-600">{referralData.pointsEarned}</p>
                        <p className="text-xs text-gray-500">Points Earned</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Referrals List */}
          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Your Referrals</h3>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Points Earned
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {referrals.map((referral) => (
                    <tr key={referral.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-600 font-medium">
                              {referral.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{referral.name}</div>
                            <div className="text-xs text-gray-500">ID: {referral.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {referral.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(referral.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <Badge 
                          variant={referral.status === 'successful' ? 'success' : 'warning'}
                        >
                          {referral.status === 'successful' ? 'Successful' : 'Pending'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                        {referral.pointsEarned.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <CardFooter className="flex justify-center">
              <Button variant="outline">View All Referrals</Button>
            </CardFooter>
          </Card>
        </div>
        <div className="lg:col-span-1">
          {/* How It Works */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">How It Works</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-blue-600 font-medium">1</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Share Your Referral Code</p>
                  <p className="text-xs text-gray-500 mt-1">Send your unique referral code or link to friends</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-blue-600 font-medium">2</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Friend Opens an Account</p>
                  <p className="text-xs text-gray-500 mt-1">They sign up using your referral code</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-blue-600 font-medium">3</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Both of You Get Rewarded</p>
                  <p className="text-xs text-gray-500 mt-1">You earn points and they get a welcome bonus</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-yellow-50 rounded-md border border-yellow-100">
                <p className="text-sm text-yellow-800 font-medium">Note:</p>
                <p className="text-xs text-yellow-700 mt-1">Rewards are credited once your friend completes account verification and makes their first deposit of at least $100.</p>
              </div>
            </CardContent>
          </Card>
          {/* Share on Social */}
          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Share on Social Media</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-500">Spread the word and earn more rewards by sharing on your social networks.</p>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="flex items-center justify-center"
                    fullWidth
                  >
                    <FacebookIcon size={18} className="mr-2 text-blue-600" />
                    Facebook
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center justify-center"
                    fullWidth
                  >
                    <TwitterIcon size={18} className="mr-2 text-blue-400" />
                    Twitter
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center justify-center"
                    fullWidth
                  >
                    <LinkedinIcon size={18} className="mr-2 text-blue-700" />
                    LinkedIn
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center justify-center"
                    fullWidth
                  >
                    <InstagramIcon size={18} className="mr-2 text-pink-600" />
                    Instagram
                  </Button>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-900 font-medium mb-2">Suggested Message:</p>
                  <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-600">
                    I'm using BankApp for all my banking needs and loving it! Join me and get a $50 welcome bonus using my code: {referralData.code}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 w-full"
                    onClick={handleCopyLink}
                  >
                    <CopyIcon size={14} className="mr-1" />
                    Copy Message
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Referral FAQ */}
          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Frequently Asked Questions</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900">How long does it take for referral rewards to be credited?</h4>
                <p className="text-xs text-gray-500 mt-1">Rewards are typically credited within 7 business days after your friend meets all requirements.</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Is there a limit to how many friends I can refer?</h4>
                <p className="text-xs text-gray-500 mt-1">No, you can refer as many friends as you want and earn rewards for each successful referral.</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">What happens if my friend doesn't enter my referral code?</h4>
                <p className="text-xs text-gray-500 mt-1">Your friend must enter your referral code during sign-up for both of you to receive rewards.</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Can I refer existing customers?</h4>
                <p className="text-xs text-gray-500 mt-1">No, referral rewards are only for new customers who don't already have an account with us.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" fullWidth>
                View Full Terms & Conditions
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              {inviteSuccess ? (
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex flex-col items-center justify-center py-6">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                      <CheckIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Invitation Sent!</h3>
                    <p className="text-sm text-gray-500 text-center">
                      Your referral invitation has been sent successfully.
                    </p>
                    <div className="mt-6">
                      <Button
                        variant="primary"
                        onClick={() => {
                          setInviteSuccess(false)
                          setShowInviteModal(false)
                        }}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                        <MailIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Invite Friends via Email
                        </h3>
                        <div className="mt-4">
                          <form onSubmit={handleInviteSubmit}>
                            <div>
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Friend's Email Address
                              </label>
                              <input
                                type="email"
                                name="email"
                                id="email"
                                value={inviteEmail}
                                onChange={(e) => setInviteEmail(e.target.value)}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder="friend@example.com"
                                required
                              />
                            </div>
                            <div className="mt-4">
                              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                Personal Message (Optional)
                              </label>
                              <textarea
                                id="message"
                                name="message"
                                rows={3}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder="Hey! I thought you might be interested in BankApp. Join using my referral code and get a $50 bonus!"
                              />
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <Button
                      variant="primary"
                      onClick={handleInviteSubmit}
                      className="ml-3"
                      icon={<MailIcon size={18} />}
                    >
                      Send Invitation
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowInviteModal(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
    )
}
export default ReferralsPage