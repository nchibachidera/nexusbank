import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'

const SignupPage: React.FC = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: ''
  })

  const { signup, isLoading, error } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      const fullName = `${formData.firstName} ${formData.lastName}`

      await signup({
        fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone, // matches backend field
      })
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-6"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          {step === 1 && 'Create your account'}
          {step === 2 && 'Secure your account'}
          {step === 3 && 'Add details'}
        </h2>

        {/* Progress indicator */}
        <div className="flex justify-between mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-1/3 h-2 rounded-full ${
                step >= s ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            ></div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </>
          )}

          {step === 2 && (
            <>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              {formData.password &&
                formData.confirmPassword &&
                formData.password !== formData.confirmPassword && (
                  <p className="text-sm text-red-600">
                    Passwords do not match
                  </p>
                )}
            </>
          )}

          {step === 3 && (
            <>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="date"
                name="dateOfBirth"
                placeholder="Date of Birth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-between items-center">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              disabled={
                isLoading ||
                (step === 2 && formData.password !== formData.confirmPassword)
              }
              className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ml-auto ${
                (isLoading ||
                  (step === 2 &&
                    formData.password !== formData.confirmPassword)) &&
                'opacity-70 cursor-not-allowed'
              }`}
            >
              {isLoading
                ? 'Creating Account...'
                : step < 3
                ? 'Continue'
                : 'Create Account'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default SignupPage


