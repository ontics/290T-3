'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { placeholderImages } from '@/lib/placeholders'

interface DreamCardProps {
  title: string
  description: string
  image: string
}

export default function DreamCard({ title, description, image }: DreamCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  // Use the provided image URL or fall back to a placeholder
  const imageUrl = image || placeholderImages.dreams.stressRelief
  
  return (
    <motion.div 
      className="relative rounded-lg overflow-hidden h-60 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.03 }}
    >
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      
      <div className="absolute bottom-0 left-0 p-4 w-full">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        
        <div 
          className={`overflow-hidden transition-all duration-300 ${
            isHovered ? 'max-h-20 opacity-100 mt-2' : 'max-h-0 opacity-0'
          }`}
        >
          <p className="text-sm text-gray-200">{description}</p>
        </div>
      </div>
    </motion.div>
  )
} 