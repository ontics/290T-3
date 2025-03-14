'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { placeholderImages } from '@/lib/placeholders'

interface LayeredImageProps {
  activeSection: string
}

export default function LayeredImage({ activeSection }: LayeredImageProps) {
  const [visibleOverlay, setVisibleOverlay] = useState<string | null>(null)
  
  useEffect(() => {
    // Change the overlay based on active section
    if (activeSection === 'crown') {
      setVisibleOverlay('overlay1')
    } else if (activeSection === 'thermal') {
      setVisibleOverlay('overlay2')
    } else if (activeSection === 'technology') {
      setVisibleOverlay('overlay3')
    } else {
      setVisibleOverlay(null)
    }
  }, [activeSection])
  
  return (
    <div className="relative w-[500px] h-[500px] mx-auto">
      {/* Base image */}
      <motion.div 
        className="absolute inset-0 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image 
          src={placeholderImages.product.main}
          alt="Somnium Crown Device"
          fill
          className="object-cover"
        />
      </motion.div>
      
      {/* Overlay 1 - Crown */}
      <motion.div 
        className="absolute inset-0 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: visibleOverlay === 'overlay1' ? 0.8 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-indigo-500/30 z-10" />
        <Image 
          src={placeholderImages.product.overlay1}
          alt="Crown Feature"
          fill
          className="object-cover"
        />
      </motion.div>
      
      {/* Overlay 2 - Thermal */}
      <motion.div 
        className="absolute inset-0 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: visibleOverlay === 'overlay2' ? 0.8 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-blue-500/30 z-10" />
        <Image 
          src={placeholderImages.product.overlay2}
          alt="Thermal Feature"
          fill
          className="object-cover"
        />
      </motion.div>
      
      {/* Overlay 3 - Technology */}
      <motion.div 
        className="absolute inset-0 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: visibleOverlay === 'overlay3' ? 0.8 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-purple-500/30 z-10" />
        <Image 
          src={placeholderImages.product.overlay3}
          alt="Technology Feature"
          fill
          className="object-cover"
        />
      </motion.div>
    </div>
  )
} 