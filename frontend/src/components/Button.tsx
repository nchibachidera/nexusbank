import React from 'react'
import { Link } from 'react-router-dom'
type ButtonProps = {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  className?: string
  onClick?: () => void
}
const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  href,
  className = '',
  onClick
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors'
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    outline: 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50'
  }
  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'px-4 py-2',
    lg: 'text-lg px-6 py-3'
  }
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
  if (href) {
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    )
  }
  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  )
}
export default Button