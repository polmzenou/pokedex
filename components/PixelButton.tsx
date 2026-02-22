'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  active?: boolean
}

export default function PixelButton({
  children,
  variant = 'primary',
  size = 'md',
  active = false,
  className = '',
  ...props
}: PixelButtonProps) {
  const baseClasses = `
    font-pixel uppercase tracking-wider
    border-2 rounded
    transition-all duration-100
    active:translate-y-1 active:shadow-none
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-gameboy-lightest
  `

  const variantClasses = {
    primary: active
      ? 'bg-gameboy-light text-white border-gameboy-lightest shadow-[3px_3px_0_#1e3a5f]'
      : 'bg-gameboy-dark text-gameboy-lightest border-gameboy-light shadow-[3px_3px_0_#0a1628] hover:bg-gameboy-light hover:text-white',
    secondary: active
      ? 'bg-gameboy-lightest text-gameboy-darkest border-white shadow-[3px_3px_0_#1e3a5f]'
      : 'bg-gameboy-darkest text-gameboy-lightest border-gameboy-dark shadow-[3px_3px_0_#0a1628] hover:border-gameboy-light',
    danger:
      'bg-red-600 text-white border-red-400 shadow-[3px_3px_0_#7f1d1d] hover:bg-red-500',
  }

  const sizeClasses = {
    sm: 'px-2 py-1 text-[8px]',
    md: 'px-4 py-2 text-[10px]',
    lg: 'px-6 py-3 text-xs',
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
