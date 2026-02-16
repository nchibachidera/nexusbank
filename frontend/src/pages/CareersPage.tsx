import React from 'react'
import { SearchIcon, MapPinIcon, BriefcaseIcon, ClockIcon, BarChartIcon, UsersIcon, HeartIcon, GlobeIcon } from 'lucide-react'
import Button from '../components/Button'
// Job listings data
const jobListings = [
  {
    id: 1,
    title: "Senior Software Engineer",
    department: "Technology",
    location: "New York, NY",
    type: "Full-time",
    level: "Senior",
    posted: "3 days ago"
  },
  {
    
    id: 2,
    title: "Customer Service Representative",
    department: "Operations",
    location: "Remote",
    type: "Full-time",
    level: "Entry-level",
    posted: "1 week ago"
  },
  {
    id: 3,
    title: "Financial Analyst",
    department: "Finance",
    location: "Chicago, IL",
    type: "Full-time",
    level: "Mid-level",
    posted: "2 days ago"
  },
  {
    id: 4,
    title: "UX/UI Designer",
    department: "Product",
    location: "San Francisco, CA",
    type: "Full-time",
    level: "Mid-level",
    posted: "5 days ago"
  },
  {
    id: 5,
    title: "Risk Assessment Manager",
    department: "Compliance",
    location: "Boston, MA",
    type: "Full-time",
    level: "Senior",
    posted: "1 day ago"
  },
  {
    id: 6,
    title: "Branch Manager",
    department: "Retail Banking",
    location: "Miami, FL",
    type: "Full-time",
    level: "Senior",
    posted: "2 weeks ago"
  },
]
const CareersPage = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Careers at NexusBank</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Join our team and be part of shaping the future of banking. We're looking for talented individuals who are passionate about innovation and customer service.
          </p>
        </div>
      </section>
      {/* Why Join Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Join NexusBank?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer more than just a job. At NexusBank, you'll find a supportive environment where you can grow professionally while making a real impact.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChartIcon size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Growth Opportunities</h3>
              <p className="text-gray-600">
                Clear career paths and continuous learning opportunities to help you reach your full potential.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <HeartIcon size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Comprehensive Benefits</h3>
              <p className="text-gray-600">
                Health, dental, vision coverage, retirement plans, and generous paid time off to support your wellbeing.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <UsersIcon size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Inclusive Culture</h3>
              <p className="text-gray-600">
                A diverse and supportive workplace where every voice is valued and everyone belongs.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <GlobeIcon size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Make an Impact</h3>
              <p className="text-gray-600">
                Work on meaningful projects that help our customers achieve their financial goals.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Open Positions */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Open Positions</h2>
          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto mb-10">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search positions..."
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <SearchIcon className="absolute left-4 top-3.5 text-gray-400" size={20} />
              </div>
              <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Departments</option>
                <option value="technology">Technology</option>
                <option value="operations">Operations</option>
                <option value="finance">Finance</option>
                <option value="product">Product</option>
                <option value="compliance">Compliance</option>
                <option value="retail">Retail Banking</option>
              </select>
              <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Locations</option>
                <option value="new-york">New York, NY</option>
                <option value="remote">Remote</option>
                <option value="chicago">Chicago, IL</option>
                <option value="san-francisco">San Francisco, CA</option>
                <option value="boston">Boston, MA</option>
                <option value="miami">Miami, FL</option>
              </select>
            </div>
          </div>
          {/* Job Listings */}
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {jobListings.map((job) => (
                <div key={job.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <BriefcaseIcon size={16} className="mr-1.5 text-gray-500" />
                          <span>{job.department}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPinIcon size={16} className="mr-1.5 text-gray-500" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center">
                          <ClockIcon size={16} className="mr-1.5 text-gray-500" />
                          <span>{job.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <div className="text-sm text-gray-500 mb-3 text-right">Posted {job.posted}</div>
                      <Button href="#" className="w-full md:w-auto whitespace-nowrap">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button href="#" variant="outline">
                View All Positions
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Application Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Our Application Process</h2>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 transform md:translate-x-0 translate-x-3"></div>
              <div className="space-y-12">
                {[
                  {
                    title: "Apply Online",
                    description: "Browse our open positions and submit your application through our careers portal. Make sure your resume highlights relevant skills and experience."
                  },
                  {
                    title: "Initial Screening",
                    description: "Our recruitment team will review your application and reach out to qualified candidates for an initial phone interview."
                  },
                  {
                    title: "Skills Assessment",
                    description: "Depending on the role, you may be asked to complete a skills assessment or technical challenge to demonstrate your expertise."
                  },
                  {
                    title: "Interview Process",
                    description: "Qualified candidates will participate in interviews with the hiring manager and team members, either in-person or virtually."
                  },
                  {
                    title: "Final Decision & Offer",
                    description: "Selected candidates will receive a job offer outlining compensation, benefits, and other important details."
                  }
                ].map((step, index) => (
                  <div key={index} className="relative flex flex-col md:flex-row">
                    <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0">
                      {index % 2 === 0 && (
                        <>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                          <p className="text-gray-600">{step.description}</p>
                        </>
                      )}
                    </div>
                    <div className="absolute left-4 md:left-1/2 top-0 h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center transform md:translate-x-[-50%] translate-x-[-50%]">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <div className="md:w-1/2 md:pl-12 pl-16">
                      {index % 2 === 1 && (
                        <>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                          <p className="text-gray-600">{step.description}</p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Our Team?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Explore our open positions and take the first step towards a rewarding career at NexusBank.
          </p>
          <Button href="#" variant="secondary" size="lg">
            View Open Positions
          </Button>
        </div>
      </section>
    </div>
  )
}
export default CareersPage
