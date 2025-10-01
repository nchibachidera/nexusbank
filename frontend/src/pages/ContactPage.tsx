import React, { useState } from 'react'
import { PhoneIcon, MailIcon, MapPinIcon, MessageCircleIcon, SendIcon } from 'lucide-react'
import Button from '../components/Button'
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    }, 1500)
  }
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Have questions or need assistance? Our team is here to help you with all your banking needs.
          </p>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <PhoneIcon size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone Support</h3>
                    <p className="text-gray-600 mb-1">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500">Mon-Fri: 8am-8pm, Sat: 9am-5pm</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <MailIcon size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600 mb-1">support@nexusbank.com</p>
                    <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <MessageCircleIcon size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Live Chat</h3>
                    <p className="text-gray-600 mb-1">Available on our website</p>
                    <p className="text-sm text-gray-500">24/7 for urgent matters</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPinIcon size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Main Office</h3>
                    <p className="text-gray-600">123 Finance Street, Banking District, New York, NY 10001</p>
                  </div>
                </div>
              </div>
              <div className="mt-10 pt-10 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Branch Locations</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <MapPinIcon size={18} className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Manhattan Branch</p>
                      <p className="text-gray-600 text-sm">456 Park Avenue, New York, NY 10022</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <MapPinIcon size={18} className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Brooklyn Branch</p>
                      <p className="text-gray-600 text-sm">789 Atlantic Avenue, Brooklyn, NY 11217</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <MapPinIcon size={18} className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Queens Branch</p>
                      <p className="text-gray-600 text-sm">321 Queens Blvd, Queens, NY 11101</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {/* Contact Form */}
            <div className="lg:col-span-2 bg-gray-50 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              {submitSuccess ? (
                <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-6">
                  <p className="font-medium">Thank you for your message!</p>
                  <p>We've received your inquiry and will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name*
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address*
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject*
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Account Support">Account Support</option>
                        <option value="Online Banking">Online Banking</option>
                        <option value="Loans & Mortgages">Loans & Mortgages</option>
                        <option value="Report an Issue">Report an Issue</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message*
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg transition-colors ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <SendIcon size={18} className="mr-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Map Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Find Us</h2>
          <div className="h-96 bg-gray-200 rounded-xl overflow-hidden">
            {/* This would be a Google Map in a real implementation */}
            <div className="w-full h-full flex items-center justify-center bg-blue-50">
              <div className="text-center">
                <MapPinIcon size={48} className="text-blue-600 mx-auto mb-4" />
                <p className="text-gray-700 font-medium">Map would be displayed here</p>
                <p className="text-gray-500">123 Finance Street, Banking District, New York, NY 10001</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
export default ContactPage
