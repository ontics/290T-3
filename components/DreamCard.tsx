'use client'

import { useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import { motion } from 'framer-motion'
import { placeholderImages } from '@/lib/placeholders'

type DreamCategory = 'trending' | 'learn' | 'play' | 'recover'

interface DreamCardProps {
  title: string
  description: string
  image: StaticImageData
  categories: DreamCategory[]
}

export default function DreamCard({ title, description, image, categories }: DreamCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  // Use the provided image URL or fall back to a placeholder
  const imageUrl = image || placeholderImages.dreams.stressRelief
  
  return (
    <motion.div 
      className="relative rounded-lg overflow-hidden aspect-[4/3] h-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Image
        src={imageUrl}
        alt={title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
      
      <div className="absolute bottom-0 left-0 p-5 w-full">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        
        <motion.div 
          className="overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isHovered ? 'auto' : 0,
            opacity: isHovered ? 1 : 0,
            marginTop: isHovered ? 8 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm text-gray-200">{description}</p>
        </motion.div>
      </div>
    </motion.div>
  )
} 