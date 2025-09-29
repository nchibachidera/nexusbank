Footer.tsx"
import React from 'react'
import { Link } from 'react-router-dom'
import { PhoneIcon, MailIcon, MapPinIcon, FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon } from 'lucide-react'
const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-white"></div>
              <span className="text-xl font-bold">NexusBank</span>
            </div>
            <p className="text-blue-100 mb-6">
              Providing secure, innovative banking solutions for a better financial future.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-blue-300">
                <FacebookIcon size={20} />
              </a>
              <a href="#" className="text-white hover:text-blue-300">
                <TwitterIcon size={20} />
              </a>
              <a href="#" className="text-white hover:text-blue-300">
                <InstagramIcon size={20} />
              </a>
              <a href="#" className="text-white hover:text-blue-300">
                <LinkedinIcon size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-blue-100 hover:text-white">Home</Link></li>
              <li><Link to="/about" className="text-blue-100 hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-blue-100 hover:text-white">Contact</Link></li>
              <li><Link to="/faq" className="text-blue-100 hover:text-white">FAQ</Link></li>
              <li><Link to="/blog" className="text-blue-100 hover:text-white">Blog</Link></li>
              <li><Link to="/careers" className="text-blue-100 hover:text-white">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Banking Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-100 hover:text-white">Personal Banking</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white">Business Banking</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white">Online Banking</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white">Mobile Banking</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white">Loans & Mortgages</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white">Investments</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPinIcon size={20} className="mr-2 mt-1 flex-shrink-0" />
                <span>123 Finance Street, Banking District, NY 10001</span>
              </li>
              <li className="flex items-center">
                <PhoneIcon size={20} className="mr-2 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <MailIcon size={20} className="mr-2 flex-shrink-0" />
                <span>support@nexusbank.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-800 mt-10 pt-6 text-center text-blue-200">
          <p>&copy; {new Date().getFullYear()} NexusBank. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
export default Footer
