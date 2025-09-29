import React, { useState } from 'react'
import { SearchIcon, CalendarIcon, UserIcon, TagIcon, ArrowRightIcon } from 'lucide-react'
import Button from '../components/Button'
// Blog post data
const blogPosts = [
  {
    id: 1,
    title: "Understanding Credit Scores: How They Impact Your Financial Health",
    excerpt: "Learn how credit scores are calculated, why they matter, and practical steps to improve your score over time.",
    category: "Personal Finance",
    author: "Sarah Johnson",
    date: "June 15, 2023",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 2,
    title: "Investing 101: Building a Diversified Portfolio for Beginners",
    excerpt: "A comprehensive guide to creating a balanced investment portfolio, even if you're just starting with a small amount.",
    category: "Investing",
    author: "Michael Chen",
    date: "May 28, 2023",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 3,
    title: "Digital Banking Security: Protecting Yourself from Online Fraud",
    excerpt: "Essential tips and best practices to safeguard your accounts and personal information in an increasingly digital world.",
    category: "Security",
    author: "Alex Rivera",
    date: "May 12, 2023",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 4,
    title: "Saving for Retirement: Strategies for Every Age Group",
    excerpt: "Whether you're in your 20s or approaching retirement, discover tailored approaches to build your nest egg.",
    category: "Retirement",
    author: "Emily Rodriguez",
    date: "April 29, 2023",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1559519529-0936e4058364?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 5,
    title: "Navigating the Mortgage Process: From Application to Closing",
    excerpt: "A step-by-step guide to understanding and successfully completing the home loan process with confidence.",
    category: "Mortgages",
    author: "David Kim",
    date: "April 15, 2023",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 6,
    title: "Smart Budgeting Techniques for Financial Freedom",
    excerpt: "Practical budgeting methods that can help you gain control of your finances and achieve your long-term goals.",
    category: "Personal Finance",
    author: "Priya Patel",
    date: "March 28, 2023",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  }
]
// Categories
const categories = [
  "All",
  "Personal Finance",
  "Investing",
  "Security",
  "Retirement",
  "Mortgages",
  "Credit Cards",
  "Small Business"
]
const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  // Filter posts based on category and search term
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">NexusBank Blog</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Insights, tips, and expert advice on personal finance, investing, and making the most of your money.
          </p>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Search and Filter */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="relative md:max-w-md w-full">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <SearchIcon className="absolute left-4 top-3.5 text-gray-400" size={20} />
              </div>
              <div className="overflow-x-auto">
                <div className="flex space-x-2 min-w-max">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm ${
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
            </div>
          </div>
          {/* Featured Post */}
          {filteredPosts.length > 0 && (
            <div className="mb-16">
              <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md">
                <div className="grid md:grid-cols-2">
                  <div className="h-64 md:h-auto">
                    <img
                      src={filteredPosts[0].image}
                      alt={filteredPosts[0].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center mb-4">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                          {filteredPosts[0].category}
                        </span>
                        <span className="text-gray-500 text-sm ml-3">{filteredPosts[0].readTime}</span>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">{filteredPosts[0].title}</h2>
                      <p className="text-gray-600 mb-6">{filteredPosts[0].excerpt}</p>
                    </div>
                    <div>
                      <div className="flex items-center mb-4">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <UserIcon size={18} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{filteredPosts[0].author}</p>
                          <div className="flex items-center text-gray-500 text-sm">
                            <CalendarIcon size={14} className="mr-1" />
                            <span>{filteredPosts[0].date}</span>
                          </div>
                        </div>
                      </div>
                      <Button href="#" className="w-full md:w-auto">
                        Read Article <ArrowRightIcon size={16} className="ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Blog Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(1).map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="h-48">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-gray-500 text-sm ml-2">{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <UserIcon size={14} className="mr-1" />
                        <span>{post.author}</span>
                        <span className="mx-2">•</span>
                        <CalendarIcon size={14} className="mr-1" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button href="#" variant="outline" className="w-full text-center">
                        Read More
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No articles found for "{searchTerm}"</p>
              <Button onClick={() => setSearchTerm("")} variant="secondary">
                Clear Search
              </Button>
            </div>
          )}
          {/* Newsletter Subscription */}
          <div className="mt-20 bg-blue-50 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated with Financial Insights</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive the latest articles, tips, and exclusive content directly in your inbox.
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Button className="whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                By subscribing, you agree to our Privacy Policy. You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
export default BlogPage
