'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold">somnium</span>
            <Image 
              src="/images/somnium-logo-white.png" 
              alt="Somnium Logo" 
              width={28} 
              height={28} 
              className="h-7 w-auto"
            />
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/#nightcap" 
              className={`text-gray-300 hover:text-white transition`}
            >
              Nightcap
            </Link>
            <Link 
              href="/#dreams" 
              className={`text-gray-300 hover:text-white transition`}
            >
              Dreams
            </Link>
            <Link 
              href="/our-story" 
              className={`${pathname === '/our-story' ? 'text-white' : 'text-gray-300 hover:text-white'} transition`}
            >
              Our Story
            </Link>
          </nav>
          
          <Link 
            href="/#purchase" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full transition-colors"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </header>
  )
} 