'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import SleepIllustrationAnimation from './SleepIllustrationAnimation'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function PositionedSleepIllustration() {
  const [position, setPosition] = useState({ x: -90, y: 180 })
  const [size, setSize] = useState({ width: 1320, height: 1320 })
  const [displayMode, setDisplayMode] = useState('fixed') // 'fixed', 'static', or 'hidden'
  const [absoluteTopPosition, setAbsoluteTopPosition] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(0)
  const [screenWidth, setScreenWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const transitionPointRef = useRef(0)
  const pathname = usePathname()
  
  // Initialize viewport dimensions and handle direct navigation
  useEffect(() => {
    // Set initial dimensions
    setViewportHeight(window.innerHeight)
    setScreenWidth(window.innerWidth)
    
    // Check if we're on the home page
    if (pathname !== '/') {
      setDisplayMode('hidden')
      return
    }
    
    // Calculate the transition point once
    const calculateTransitionPoint = () => {
      const dreamsSection = document.getElementById('dreams')
      if (dreamsSection) {
        const dreamsSectionTop = dreamsSection.getBoundingClientRect().top + window.scrollY
        transitionPointRef.current = dreamsSectionTop - window.innerHeight
        
        // If we're already past the transition point, set to static immediately
        if (window.scrollY >= transitionPointRef.current || window.location.hash === '#dreams') {
          const staticPosition = dreamsSectionTop - 300
          setAbsoluteTopPosition(staticPosition)
          setDisplayMode('static')
        }
      }
    }
    
    // Wait a moment for the page to fully render before calculating
    setTimeout(calculateTransitionPoint, 100)
    
    // Adjust size based on screen width
    const handleResize = () => {
      setViewportHeight(window.innerHeight)
      setScreenWidth(window.innerWidth)
      
      if (window.innerWidth < 768) {
        // Mobile - larger size and positioned lower
        const mobileWidth = Math.min(window.innerWidth * 1.8, 800)
        setSize({ width: mobileWidth, height: mobileWidth })
        setPosition({ x: 0, y: 0 })
      } else if (window.innerWidth < 1280) {
        // Medium screens
        setSize({ width: 1100, height: 1100 })
        setPosition({ x: -40, y: 180 })
      } else if (window.innerWidth < 1536) {
        // Large screens
        setSize({ width: 1320, height: 1320 })
        setPosition({ x: -90, y: 180 })
      } else {
        // Extra large screens
        setSize({ width: 1500, height: 1500 })
        setPosition({ x: -120, y: 180 })
      }
      
      // Recalculate transition point after resize
      calculateTransitionPoint()
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    
    // Add a class to the body to prevent horizontal scrolling
    document.body.classList.add('overflow-x-hidden')
    
    return () => {
      window.removeEventListener('resize', handleResize)
      document.body.classList.remove('overflow-x-hidden')
    }
  }, [pathname])
  
  // Force a style update when size changes
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current
      container.style.width = `${size.width}px`
      container.style.height = `${size.height}px`
    }
  }, [size])
  
  // Handle scroll events and section changes
  useEffect(() => {
    // Only run this on the home page
    if (pathname !== '/') return
    
    const handleScroll = () => {
      const scrollY = window.scrollY
      
      // Check if we're in the dreams section on mobile
      if (window.innerWidth < 768) {
        const dreamsSection = document.getElementById('dreams')
        if (dreamsSection) {
          const dreamsSectionRect = dreamsSection.getBoundingClientRect()
          // If dreams section is in view, hide the illustration
          if (dreamsSectionRect.top < window.innerHeight && dreamsSectionRect.bottom > 0) {
            if (displayMode !== 'hidden') {
              setDisplayMode('hidden')
            }
            return
          } else if (dreamsSectionRect.top >= window.innerHeight && displayMode === 'hidden') {
            // If we've scrolled back up, show the illustration again
            setDisplayMode('fixed')
            return
          }
        }
      }
      
      // Desktop behavior
      if (window.innerWidth >= 768) {
        // Use the cached transition point
        if (scrollY >= transitionPointRef.current) {
          if (displayMode !== 'static') {
            // Get the dreams section position
            const dreamsSection = document.getElementById('dreams')
            if (dreamsSection) {
              // Calculate the exact position where the fixed illustration is at the transition point
              // This ensures the static illustration appears exactly where the fixed one was
              const viewportCenterY = transitionPointRef.current + (viewportHeight / 2)
              const staticPosition = viewportCenterY + position.y
              
              // Set the position once and don't update it while scrolling below the transition point
              setAbsoluteTopPosition(staticPosition)
              setDisplayMode('static')
            }
          }
        } else {
          if (displayMode !== 'fixed') {
            setDisplayMode('fixed')
          }
        }
      }
    }
    
    // Initial check
    handleScroll()
    
    // Set up event listeners
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [displayMode, pathname, position.y, viewportHeight])
  
  // If we're not on the home page, don't render anything
  if (pathname !== '/' || displayMode === 'hidden') {
    return null
  }
  
  // Mobile version (fixed at bottom of viewport)
  if (screenWidth < 768) {
    return (
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-10 pointer-events-none overflow-hidden" style={{ height: '60vh' }}>
        <div 
          ref={containerRef}
          className="absolute bottom-0"
          style={{ 
            width: `${size.width}px`,
            height: `${size.height}px`,
            left: '50%',
            transform: 'translateX(-50%) translateY(33%)', // Move down by 33% to hide bottom third
          }}
        >
          <SleepIllustrationAnimation />
        </div>
      </div>
    )
  }
  
  return (
    <>
      {displayMode === 'fixed' && (
        <div 
          className="hidden md:block fixed top-0 right-0 w-1/2 h-screen z-10 pointer-events-none overflow-visible"
        >
          <div 
            ref={containerRef}
            className="absolute" 
            style={{ 
              top: `calc(50% + ${position.y}px)`, 
              right: `calc(50% - ${position.x}px)`, 
              transform: 'translate(50%, -50%)',
              width: `${size.width}px`,
              height: `${size.height}px`,
            }}
          >
            <SleepIllustrationAnimation />
          </div>
        </div>
      )}
      
      {displayMode === 'static' && (
        <div 
          className="hidden md:block absolute pointer-events-none overflow-visible"
          style={{
            top: `${absoluteTopPosition}px`,
            right: '0',
            width: '50%',
            zIndex: 10,
          }}
        >
          <div 
            ref={containerRef}
            className="absolute"
            style={{ 
              transform: 'translate(50%, -50%)',
              right: `calc(50% - ${position.x}px)`, 
              width: `${size.width}px`,
              height: `${size.height}px`,
            }}
          >
            <Image
              src="/images/sleep-illustrations/sleep-5.png"
              alt="Sleep illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  )
} 