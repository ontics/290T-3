'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

// Define the illustrations to use with your actual filenames
const ILLUSTRATIONS = [
  '/images/sleep-illustrations/sleep-1.png',
  '/images/sleep-illustrations/sleep-2.png',
  '/images/sleep-illustrations/sleep-3.png',
  '/images/sleep-illustrations/sleep-4.png',
  '/images/sleep-illustrations/sleep-5.png',
]

// Map sections to illustration indices
const SECTION_TO_ILLUSTRATION = {
  'hero': 0,
  'nightcap': 1,
  'thermal': 2,
  'technology': 3,
  'tfus': 4,
  'dreams': 4,
  'purchase': 4,
}

export default function SleepIllustrationAnimation() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [previousIndex, setPreviousIndex] = useState(0)
  
  useEffect(() => {
    // Function to update the active section based on scroll position
    const handleSectionChange = (activeSection: string) => {
      const newIndex = SECTION_TO_ILLUSTRATION[activeSection as keyof typeof SECTION_TO_ILLUSTRATION] || 0
      if (newIndex !== activeIndex) {
        setPreviousIndex(activeIndex)
        setActiveIndex(newIndex)
      }
    }
    
    // Listen for custom events from your scroll setup
    const handleCustomEvent = (e: CustomEvent) => {
      handleSectionChange(e.detail.section)
    }
    
    // Use the existing activeSection state from the parent component
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-active-section') {
          const activeSection = document.body.getAttribute('data-active-section')
          if (activeSection) {
            handleSectionChange(activeSection)
          }
        }
      })
    })
    
    // Observe the body element for changes to the data-active-section attribute
    observer.observe(document.body, { attributes: true })
    
    // Also listen for custom events if you're using them
    window.addEventListener('sectionChange' as any, handleCustomEvent)
    
    // Initial check - get the current active section if available
    const currentSection = document.body.getAttribute('data-active-section')
    if (currentSection) {
      handleSectionChange(currentSection)
    }
    
    return () => {
      observer.disconnect()
      window.removeEventListener('sectionChange' as any, handleCustomEvent)
    }
  }, [activeIndex])
  
  return (
    <div className="relative w-full h-full">
      {/* Previous image fading out */}
      <motion.div
        key={`prev-${previousIndex}`}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="relative w-full h-full">
          <Image
            src={ILLUSTRATIONS[previousIndex]}
            alt={`Sleep illustration ${previousIndex + 1}`}
            fill
            className="object-contain"
            priority={previousIndex === 0}
          />
        </div>
      </motion.div>
      
      {/* Current image fading in */}
      <motion.div
        key={`current-${activeIndex}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="relative w-full h-full">
          <Image
            src={ILLUSTRATIONS[activeIndex]}
            alt={`Sleep illustration ${activeIndex + 1}`}
            fill
            className="object-contain"
            priority={activeIndex === 0}
          />
        </div>
      </motion.div>
    </div>
  )
} 