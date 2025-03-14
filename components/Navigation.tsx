'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Navigation() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  
  return (
    <motion.nav 
      className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-indigo-400">
          SOMNIUM
        </Link>
        
        <div className="hidden md:flex space-x-8">
          <Link href="#technology" className="text-gray-300 hover:text-white transition">Technology</Link>
          <Link href="#dreams" className="text-gray-300 hover:text-white transition">Dreams</Link>
          <Link href="#science" className="text-gray-300 hover:text-white transition">Science</Link>
          <Link href="#about" className="text-gray-300 hover:text-white transition">About</Link>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            className="text-yellow-300 p-2 rounded-full"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>
          
          <motion.button
            className="bg-indigo-500 text-white px-6 py-2 rounded-full text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('purchase')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Subscribe
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
} 