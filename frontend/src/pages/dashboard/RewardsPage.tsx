 import React, { useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { Card, CardHeader, CardContent, CardFooter } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { 
  GiftIcon, 
  CheckIcon, 
  ShoppingBagIcon, 
  CoffeeIcon, 
  PlaneIcon,
  CreditCardIcon,
  TrendingUpIcon,
  CalendarIcon,
  ArrowUpRightIcon,
  ArrowDownLeftIcon
} from 'lucide-react'
const RewardsPage: React.FC = () => {
  const [showRedemptionModal, setShowRedemptionModal] = useState(false)
  const [selectedReward, setSelectedReward] = useState<any>(null)
  const [redemptionSuccess, setRedemptionSuccess] = useState(false)
  // Dummy rewards data
  const rewards = {
    points: 7850,
    pointsValue: 78.50,
    nextTier: {
      name: 'Platinum',
      pointsNeeded: 10000,
      pointsToGo: 2150
    },
    currentTier: {
      name: 'Gold',
      benefits: [
        '2x points on all purchases',
        'Priority customer service',
        'No foreign transaction fees',
        'Complimentary airport lounge access (2 visits/year)'
      ]
    }
  }
  // Dummy rewards history
  const rewardsHistory = [
    {
      id: 'REW-12345',
      date: '2023-10-12',
      description: 'Points earned from purchases',
      points: 250,
      type: 'earned'
    },
    {
      id: 'REW-12344',
      date: '2023-10-05',
      description: 'Bonus points - Account anniversary',
      points: 1000,
      type: 'earned'
    },
    {
      id: 'REW-12343',
      date: '2023-09-28',
      description: 'Redeemed for Amazon gift card',
      points: 500,
      type: 'redeemed'
    },
    {
      id: 'REW-12342',
      date: '2023-09-15',
      description: 'Points earned from purchases',
      points: 175,
      type: 'earned'
    },
    {
      id: 'REW-12341',
      date: '2023-09-01',
      description: 'Referral bonus - John Smith',
      points: 1000,
      type: 'earned'
    }
  ]
  // Dummy redemption options
  const redemptionOptions = [
    {
      id: 'RED-001',
      name: 'Amazon Gift Card',
      description: '$25 Amazon Gift Card',
      pointsRequired: 2500,
      image: <ShoppingBagIcon size={24} className="text-yellow-500" />
    },
    {
      id: 'RED-002',
      name: 'Starbucks Gift Card',
      description: '$10 Starbucks Gift Card',
      pointsRequired: 1000,
      image: <CoffeeIcon size={24} className="text-green-500" />
    },
    {
      id: 'RED-003',
      name: 'Statement Credit',
      description: '$50 Statement Credit',
      pointsRequired: 5000,
      image: <CreditCardIcon size={24} className="text-blue-500" />
    },
    {
      id: 'RED-004',
      name: 'Travel Voucher',
      description: '$100 Travel Voucher',
      pointsRequired: 10000,
      image: <PlaneIcon size={24} className="text-purple-500" />
    }
  ]
  const handleRewardSelect = (reward: any) => {
    setSelectedReward(reward)
    setShowRedemptionModal(true)
  }
  const confirmRedemption = () => {
    // Here you would handle the actual redemption submission to backend
    setRedemptionSuccess(true)
    // Reset after a delay
    setTimeout(() => {
      setRedemptionSuccess(false)
      setShowRedemptionModal(false)
      setSelectedReward(null)
    }, 3000)
  }
  return (
    <DashboardLayout title="Rewards">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Rewards Summary Card */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">Your Rewards</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-6">
                    <p className="text-sm font-medium text-gray-500">Available Points</p>
                    <div className="flex items-baseline">
                      <p className="text-3xl font-semibold text-gray-900">{rewards.points.toLocaleString()}</p>
                      <p className="ml-2 text-sm text-gray-500">points</p>
                    </div>
                    <p className="text-sm text-gray-500">Worth approximately ${rewards.pointsValue.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Progress to {rewards.nextTier.name}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${(rewards.points / rewards.nextTier.pointsNeeded) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500">
                      {rewards.nextTier.pointsToGo.toLocaleString()} more points needed
                    </p>
                  </div>
                </div>
                <div>
                  <div className="p-4 bg-gradient-to-r from-amber-50 to-yellow-100 rounded-lg border border-yellow-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge variant="warning" className="mb-2">{rewards.currentTier.name} Member</Badge>
                        <h3 className="font-medium text-gray-900">Your Benefits</h3>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-yellow-400 flex items-center justify-center">
                        <span className="text-white font-bold">G</span>
                      </div>
                    </div>
                    <ul className="mt-3 space-y-1">
                      {rewards.currentTier.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <svg className="h-4 w-4 text-yellow-600 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 flex space-x-3">
                    <Button 
                      variant="primary"
                      fullWidth
                      icon={<GiftIcon size={18} />}
                      onClick={() => document.getElementById('redemption-options')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Redeem Points
                    </Button>
                    <Button 
                      variant="outline"
                      fullWidth
                      icon={<TrendingUpIcon size={18} />}
                    >
                      Earn More
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Redemption Options */}
          <div id="redemption-options">
            <Card className="mt-6">
              <CardHeader>
                <h3 className="text-lg font-medium text-gray-900">Redeem Your Points</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {redemptionOptions.map((option) => (
                    <div 
                      key={option.id} 
                      className={`border rounded-lg p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer ${
                        rewards.points >= option.pointsRequired ? 'border-gray-200' : 'border-gray-200 opacity-60'
                      }`}
                      onClick={() => {
                        if (rewards.points >= option.pointsRequired) {
                          handleRewardSelect(option)
                        }
                      }}
                    >
                      <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                        {option.image}
                      </div>
                      <h4 className="font-medium text-gray-900">{option.name}</h4>
                      <p className="text-sm text-gray-500 mb-3">{option.description}</p>
                      <div className="mt-auto">
                        <Badge variant={rewards.points >= option.pointsRequired ? 'primary' : 'default'}>
                          {option.pointsRequired.toLocaleString()} points
                        </Badge>
                      </div>
                      {rewards.points < option.pointsRequired && (
                        <p className="text-xs text-gray-500 mt-2">
                          You need {(option.pointsRequired - rewards.points).toLocaleString()} more points
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Points History */}
          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Points History</h3>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Points
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rewardsHistory.map((history) => (
                    <tr key={history.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(history.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{history.description}</div>
                        <div className="text-xs text-gray-500">ID: {history.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                        {history.points.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {history.type === 'earned' ? (
                          <div className="flex items-center justify-end">
                            <ArrowDownLeftIcon size={16} className="text-green-500 mr-1" />
                            <span className="text-green-600">Earned</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end">
                            <ArrowUpRightIcon size={16} className="text-red-500 mr-1" />
                            <span className="text-red-600">Redeemed</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <CardFooter className="flex justify-center">
              <Button variant="outline">View All History</Button>
            </CardFooter>
          </Card>
        </div>
        <div className="lg:col-span-1">
          {/* Ways to Earn */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Ways to Earn Points</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <CreditCardIcon size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Make Purchases</p>
                    <p className="text-xs text-gray-500 mt-1">Earn 2 points for every $1 spent using your card</p>
                  </div>
                </div>
              </div>
              <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <UsersIcon size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Refer Friends</p>
                    <p className="text-xs text-gray-500 mt-1">Get 1,000 bonus points for each approved referral</p>
                  </div>
                </div>
              </div>
              <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <CalendarIcon size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Account Anniversary</p>
                    <p className="text-xs text-gray-500 mt-1">Receive 1,000 bonus points every year on your account anniversary</p>
                  </div>
                </div>
              </div>
              <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <ShoppingBagIcon size={16} className="text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Shop with Partners</p>
                    <p className="text-xs text-gray-500 mt-1">Earn up to 5x points when shopping with our retail partners</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" fullWidth>
                View All Earning Options
              </Button>
            </CardFooter>
          </Card>
          {/* Featured Rewards */}
          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Featured Rewards</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-lg border border-blue-200">
                <Badge variant="info" className="mb-2">Limited Time</Badge>
                <h4 className="font-medium text-gray-900">Double Points Weekend</h4>
                <p className="text-sm text-gray-600 mt-1">Earn 2x points on all purchases this weekend!</p>
                <div className="mt-3 flex justify-between items-center">
                  <p className="text-xs text-gray-500">Ends in 3 days</p>
                  <Button variant="primary" size="sm">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-100 rounded-lg border border-green-200">
                <Badge variant="success" className="mb-2">New</Badge>
                <h4 className="font-medium text-gray-900">Travel Package</h4>
                <p className="text-sm text-gray-600 mt-1">Redeem 25,000 points for a weekend getaway package</p>
                <div className="mt-3 flex justify-between items-center">
                  <p className="text-xs text-gray-500">Limited availability</p>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Points Calculator */}
          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Points Calculator</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label htmlFor="spendAmount" className="block text-sm font-medium text-gray-700 mb-1">
                    Enter Amount Spent
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="spendAmount"
                      id="spendAmount"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder="0.00"
                      defaultValue="100"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">USD</span>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-md">
                  <div className="flex justify-between mb-1">
                    <p className="text-sm text-gray-500">Regular Earnings:</p>
                    <p className="text-sm font-medium text-gray-900">200 points</p>
                  </div>
                  <div className="flex justify-between mb-1">
                    <p className="text-sm text-gray-500">Gold Tier Bonus:</p>
                    <p className="text-sm font-medium text-gray-900">200 points</p>
                  </div>
                  <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between">
                    <p className="text-sm font-medium text-gray-700">Total Points:</p>
                    <p className="text-sm font-bold text-gray-900">400 points</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" fullWidth>
                  Calculate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Redemption Modal */}
      {showRedemptionModal && selectedReward && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              {redemptionSuccess ? (
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex flex-col items-center justify-center py-6">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                      <CheckIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Redemption Successful!</h3>
                    <p className="text-sm text-gray-500 text-center">
                      You have successfully redeemed {selectedReward.pointsRequired.toLocaleString()} points for {selectedReward.name}.
                    </p>
                    <div className="mt-6">
                      <Button
                        variant="primary"
                        onClick={() => {
                          setRedemptionSuccess(false)
                          setShowRedemptionModal(false)
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
                        <GiftIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Confirm Redemption
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            You are about to redeem {selectedReward.pointsRequired.toLocaleString()} points for {selectedReward.description}. This action cannot be undone.
                          </p>
                        </div>
                        <div className="mt-4 p-3 bg-gray-50 rounded-md">
                          <div className="flex justify-between mb-1">
                            <p className="text-sm text-gray-500">Reward:</p>
                            <p className="text-sm font-medium text-gray-900">{selectedReward.name}</p>
                          </div>
                          <div className="flex justify-between mb-1">
                            <p className="text-sm text-gray-500">Points Required:</p>
                            <p className="text-sm font-medium text-gray-900">{selectedReward.pointsRequired.toLocaleString()}</p>
                          </div>
                          <div className="flex justify-between mb-1">
                            <p className="text-sm text-gray-500">Your Points Balance:</p>
                            <p className="text-sm font-medium text-gray-900">{rewards.points.toLocaleString()}</p>
                          </div>
                          <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between">
                            <p className="text-sm font-medium text-gray-700">Remaining Balance:</p>
                            <p className="text-sm font-bold text-gray-900">
                              {(rewards.points - selectedReward.pointsRequired).toLocaleString()} points
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <Button
                      variant="primary"
                      onClick={confirmRedemption}
                      className="ml-3"
                    >
                      Confirm Redemption
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowRedemptionModal(false)}
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
// Import missing icon
function UsersIcon(props: any) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
export default RewardsPage