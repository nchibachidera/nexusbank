import React, { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from 'lucide-react'
import Button from '../components/Button'
// FAQ Item component
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="border-b border-gray-200 py-5">
      <button
        className="flex w-full justify-between items-center text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        <span className="ml-6 flex-shrink-0">
          {isOpen ? (
            <ChevronUpIcon className="h-5 w-5 text-blue-600" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-gray-500" />
          )}
        </span>
      </button>
      {isOpen && (
        <div className="mt-3 pr-12">
          <p className="text-base text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  )
}
// FAQ Categories
const categories = [
  "All",
  "Account Management",
  "Online Banking",
  "Transfers & Payments",
  "Security",
  "Loans & Mortgages",
  "Fees & Charges"
]
k
// FAQ Data
const faqData = [
  {
    category: "Account Management",
    question: "How do I open a new bank account?",
    answer: "You can open a new account online by visiting our website and clicking on the 'Open Account' button. You'll need to provide identification documents, proof of address, and complete an application form. Alternatively, you can visit any of our branches with the required documents."
  },
  {
    category: "Account Management",
    question: "What documents do I need to open an account?",
    answer: "To open an account, you'll need a government-issued photo ID (passport, driver's license), proof of address (utility bill, bank statement), and your Social Security Number or Tax Identification Number. For non-U.S. residents, additional documentation may be required."
  },
  {
    category: "Account Management",
    question: "How long does it take to open an account?",
    answer: "Online applications typically take 10-15 minutes to complete. Once submitted, your account can be approved within 1-2 business days, depending on verification processes. In-branch applications can often be processed on the same day."
  },
  {
    category: "Online Banking",
    question: "How do I reset my online banking password?",
    answer: "To reset your password, click the 'Forgot Password' link on the login page. You'll receive a password reset link via your registered email address or phone number. For security reasons, this link expires after 30 minutes."
  },
  {
    category: "Online Banking",
    question: "Is mobile banking secure?",
    answer: "Yes, our mobile banking app uses bank-grade encryption and multiple layers of security. We employ biometric authentication (fingerprint, face ID), two-factor authentication, and real-time fraud monitoring to ensure your information remains secure."
  },
  {
    category: "Transfers & Payments",
    question: "How long do transfers take between NexusBank accounts?",
    answer: "Transfers between NexusBank accounts are processed immediately and funds are available right away. This applies to transfers between your own accounts as well as transfers to other NexusBank customers."
  },
  {
    category: "Transfers & Payments",
    question: "What are the daily transfer limits?",
    answer: "Default daily transfer limits are $10,000 for external transfers and $50,000 for internal transfers. These limits can be adjusted based on your account history and needs by contacting customer support or visiting a branch."
  },
  {
    category: "Security",
    question: "How does NexusBank protect my personal information?",
    answer: "We use industry-leading encryption standards, multi-factor authentication, and continuous security monitoring. Our systems are regularly audited by independent security firms, and we never share your personal information with third parties without your explicit consent."
  },
  {
    category: "Security",
    question: "What should I do if I notice suspicious activity on my account?",
    answer: "Contact our 24/7 fraud hotline immediately at 1-800-123-4567. You can also freeze your account instantly through the mobile app or online banking. We recommend changing your password and enabling additional security features like transaction alerts."
  },
  {
    category: "Loans & Mortgages",
    question: "What types of loans does NexusBank offer?",
    answer: "We offer a variety of loans including personal loans, auto loans, home mortgages, home equity lines of credit (HELOC), student loans, and small business loans. Each loan type has different qualification requirements and interest rates."
  },
  {
    category: "Loans & Mortgages",
    question: "How do I apply for a mortgage?",
    answer: "You can apply for a mortgage online, by phone, or in-person at any branch. The application process requires proof of income, employment verification, credit history check, and property appraisal. Our mortgage specialists can guide you through each step."
  },
  {
    category: "Fees & Charges",
    question: "Are there monthly fees for checking accounts?",
    answer: "Our Basic Checking account has a $5 monthly fee that can be waived with direct deposits totaling $500+ per month or maintaining a $1,500 minimum daily balance. Our Premium Checking account has a $12 monthly fee with different waiver requirements. Student and senior accounts have no monthly fees."
  },
  {
    category: "Fees & Charges",
    question: "What are the ATM fees?",
    answer: "There are no fees for using NexusBank ATMs. For non-NexusBank ATMs, there's a $2.50 fee per withdrawal plus any fee charged by the ATM operator. Premium account holders receive up to 5 non-NexusBank ATM fee reimbursements per month."
  }
]
const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  // Filter FAQs based on category and search term
  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Find answers to common questions about our banking services, accounts, and features.
          </p>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <SearchIcon className="absolute left-4 top-3.5 text-gray-400" size={20} />
            </div>
          </div>
          {/* Category Tabs */}
          <div className="mb-10 overflow-x-auto">
            <div className="flex space-x-2 min-w-max pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                    activeCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          {/* FAQ Items */}
          <div className="max-w-3xl mx-auto">
            {filteredFAQs.length > 0 ? (
              <>
                <div className="border-t border-gray-200">
                  {filteredFAQs.map((faq, index) => (
                    <FAQItem key={index} question={faq.question} answer={faq.answer} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No results found for "{searchTerm}"</p>
                <Button onClick={() => setSearchTerm("")} variant="secondary">
                  Clear Search
                </Button>
              </div>
            )}
          </div>
          {/* Still Have Questions */}
          <div className="mt-16 bg-blue-50 rounded-xl p-8 max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h3>
            <p className="text-gray-600 mb-6">
              Our customer support team is available 24/7 to assist you with any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button href="/contact" variant="primary">
                Contact Us
              </Button>
              <Button href="#" variant="outline">
                Live Chat
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
export default FAQPage
