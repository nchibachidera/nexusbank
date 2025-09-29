import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheckIcon, ArrowRightIcon, CreditCardIcon, BarChartIcon, PiggyBankIcon, UsersIcon, StarIcon } from 'lucide-react'
import Button from '../components/Button'
const HomePage = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-20 md:py-32 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Banking Made Simple for Everyone
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Secure, fast, and rewarding banking solutions tailored to your financial needs.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button href="/signup" size="lg">
                Open an Account
              </Button>
              <Button href="/login" variant="outline" size="lg">
                Login
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-10">
            <div className="bg-white rounded-xl shadow-2xl p-6 transform rotate-2">
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Current Balance</p>
                    <p className="text-2xl font-bold text-blue-900">$24,562.00</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <CreditCardIcon className="text-blue-600" size={20} />
                  </div>
                </div>
                <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <ArrowRightIcon className="text-green-600 transform rotate-180" size={16} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Salary Deposit</p>
                      <p className="text-sm text-gray-500">May 15, 2023</p>
                    </div>
                  </div>
                  <p className="font-medium text-green-600">+$3,500.00</p>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <ArrowRightIcon className="text-red-600" size={16} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Rent Payment</p>
                      <p className="text-sm text-gray-500">May 2, 2023</p>
                    </div>
                  </div>
                  <p className="font-medium text-red-600">-$1,200.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Banking Features That Work for You
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the next generation of banking with features designed to make your financial life easier and more rewarding.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-xl p-8 text-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheckIcon size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Bank-Grade Security</h3>
              <p className="text-gray-600">
                Your money and data are protected with industry-leading security protocols and encryption.
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-8 text-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChartIcon size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Analytics</h3>
              <p className="text-gray-600">
                Gain insights into your spending habits and receive personalized financial advice.
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-8 text-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <PiggyBankIcon size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Automated Savings</h3>
              <p className="text-gray-600">
                Set savings goals and let our intelligent system help you reach them faster.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied customers who have transformed their banking experience with NexusBank.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon key={star} size={20} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "The mobile app is incredibly intuitive. I can manage all my accounts, make transfers, and pay bills in seconds. Best banking experience I've ever had!"
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <UsersIcon size={24} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">Small Business Owner</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon key={star} size={20} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "The savings features have helped me save for my dream vacation without even thinking about it. The automatic transfers and goal tracking make saving enjoyable."
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <UsersIcon size={24} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Michael Chen</p>
                  <p className="text-sm text-gray-500">Software Developer</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon key={star} size={20} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "The customer service is exceptional. When I had an issue with a transaction, they resolved it immediately. I've never experienced such responsive support from a bank."
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <UsersIcon size={24} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Emily Rodriguez</p>
                  <p className="text-sm text-gray-500">Healthcare Professional</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Banking Experience?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join NexusBank today and discover a smarter way to manage your finances. Open an account in minutes and start banking better.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button href="/signup" variant="secondary" size="lg">
              Open an Account
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
export default HomePage
