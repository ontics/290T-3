'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)
  
  // Effect to initialize theme from localStorage or system preference
  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== 'undefined') {
      // Check localStorage first
      const storedTheme = localStorage.getItem('theme')
      if (storedTheme) {
        setIsDark(storedTheme === 'dark')
      } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setIsDark(prefersDark)
      }
    }
  }, [])
  
  // Effect to update document when theme changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Store preference
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
      
      // Update document class
      if (isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [isDark])
  
  const toggleTheme = () => {
    setIsDark(!isDark)
  }
  
  return (
    <motion.button
      className="relative w-10 h-6 rounded-full bg-gray-600 flex items-center p-1 cursor-pointer"
      onClick={toggleTheme}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        className="w-4 h-4 rounded-full bg-white"
        animate={{ x: isDark ? 0 : 16 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
      
      {/* Sun icon */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-1.5 w-3.5 h-3.5 text-yellow-300"
        viewBox="0 0 20 20"
        fill="currentColor"
        animate={{ opacity: isDark ? 0 : 1 }}
      >
        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
      </motion.svg>
      
      {/* Moon icon */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-1.5 w-3.5 h-3.5 text-indigo-200"
        viewBox="0 0 20 20"
        fill="currentColor"
        animate={{ opacity: isDark ? 1 : 0 }}
      >
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
      </motion.svg>
    </motion.button>
  )
} 