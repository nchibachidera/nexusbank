import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MenuIcon, XIcon } from 'lucide-react'
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-blue-600"></div>
          <span className="text-xl font-bold text-blue-900">NexusBank</span>
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">About</Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</Link>
          <Link to="/faq" className="text-gray-700 hover:text-blue-600 font-medium">FAQ</Link>
          <Link to="/blog" className="text-gray-700 hover:text-blue-600 font-medium">Blog</Link>
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login" className="px-4 py-2 text-blue-600 font-medium hover:text-blue-800">Log In</Link>
          <Link to="/signup" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
            Open Account
          </Link>
        </div>
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <Link to="/" className="text-gray-700 py-2 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/about" className="text-gray-700 py-2 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/contact" className="text-gray-700 py-2 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            <Link to="/faq" className="text-gray-700 py-2 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>FAQ</Link>
            <Link to="/blog" className="text-gray-700 py-2 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>Blog</Link>
            <div className="flex flex-col space-y-2 pt-3 border-t">
              <Link to="/login" className="py-2 text-blue-600 font-medium hover:text-blue-800" onClick={() => setIsMenuOpen(false)}>Log In</Link>
              <Link to="/signup" className="py-2 px-4 bg-blue-600 text-white rounded-lg font-medium text-center hover:bg-blue-700" onClick={() => setIsMenuOpen(false)}>
                Open Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
export default Navbar
