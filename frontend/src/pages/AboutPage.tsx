import React from 'react'
import { ShieldCheckIcon, BarChartIcon, UsersIcon, AwardIcon, BuildingIcon, TrendingUpIcon } from 'lucide-react'
import Button from '../components/Button'
const AboutPage = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About NexusBank</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            We're on a mission to transform banking through innovation, transparency, and a customer-first approach.
          </p>
        </div>
      </section>
      {/* Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <div className="inline-block bg-blue-100 text-blue-600 font-medium px-4 py-1 rounded-full mb-4">Our Mission</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Building a Better Financial Future</h2>
              <p className="text-lg text-gray-600 mb-6">
                At NexusBank, we believe everyone deserves access to simple, transparent, and innovative banking solutions. We're committed to empowering our customers with the tools and knowledge they need to achieve financial wellness.
              </p>
              <p className="text-lg text-gray-600">
                Our mission is to combine cutting-edge technology with personalized service to create banking experiences that are secure, efficient, and tailored to the unique needs of each customer.
              </p>
            </div>
            <div>
              <div className="inline-block bg-blue-100 text-blue-600 font-medium px-4 py-1 rounded-full mb-4">Our Vision</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Redefining Banking for the Digital Age</h2>
              <p className="text-lg text-gray-600 mb-6">
                We envision a world where banking is seamlessly integrated into people's lives, providing not just services but insights and opportunities that help them thrive financially.
              </p>
              <p className="text-lg text-gray-600">
                By 2030, we aim to be the most trusted financial partner for millions of individuals and businesses worldwide, known for our innovation, security, and customer-centric approach.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do at NexusBank, from product development to customer service.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <ShieldCheckIcon size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Trust & Security</h3>
              <p className="text-gray-600">
                We prioritize the security of our customers' data and funds above all else, implementing the highest standards of protection.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <UsersIcon size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Customer Centricity</h3>
              <p className="text-gray-600">
                Every decision we make is driven by the question: "How does this benefit our customers?" Their success is our success.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <TrendingUpIcon size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We constantly push the boundaries of what's possible in banking, embracing new technologies to create better experiences.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Leadership Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the experienced professionals guiding NexusBank's vision and strategy.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Alexandra Chen",
                title: "Chief Executive Officer",
                bio: "With over 20 years in financial services, Alexandra has led NexusBank to become a leader in digital banking innovation."
              },
              {
                name: "Marcus Johnson",
                title: "Chief Technology Officer",
                bio: "Marcus brings expertise from Silicon Valley to our banking technology, ensuring our platforms are secure, fast, and user-friendly."
              },
              {
                name: "Sophia Rodriguez",
                title: "Chief Financial Officer",
                bio: "Sophia's strategic financial leadership has been instrumental in our sustainable growth and industry-leading customer returns."
              },
              {
                name: "David Kim",
                title: "Chief Operations Officer",
                bio: "David ensures our operations run smoothly and efficiently, maintaining our high standards of service across all channels."
              },
              {
                name: "Priya Patel",
                title: "Chief Customer Officer",
                bio: "Priya champions the customer perspective in everything we do, constantly improving our service and experience."
              },
              {
                name: "James Wilson",
                title: "Chief Risk Officer",
                bio: "James' forward-thinking approach to risk management keeps us secure while enabling innovation and growth."
              }
            ].map((leader, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8">
                <div className="h-24 w-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <UsersIcon size={40} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1 text-center">{leader.name}</h3>
                <p className="text-blue-600 mb-4 text-center">{leader.title}</p>
                <p className="text-gray-600 text-center">{leader.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Compliance Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Licenses & Compliance</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              NexusBank operates under the highest regulatory standards to ensure the security and integrity of your finances.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <BuildingIcon size={32} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Federal Reserve Member</h3>
              <p className="text-gray-600 text-center">Licensed and regulated by the Federal Reserve System</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <AwardIcon size={32} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">FDIC Insured</h3>
              <p className="text-gray-600 text-center">Deposits insured up to $250,000 per depositor</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <ShieldCheckIcon size={32} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">SOC 2 Certified</h3>
              <p className="text-gray-600 text-center">Highest standards for security, availability, and confidentiality</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <BarChartIcon size={32} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">PCI DSS Compliant</h3>
              <p className="text-gray-600 text-center">Adherence to payment card industry security standards</p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Better Banking?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied customers who have made the switch to NexusBank. Open your account today.
          </p>
          <div className="flex justify-center">
            <Button href="/signup" variant="secondary" size="lg">
              Get Started Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
export default AboutPage
