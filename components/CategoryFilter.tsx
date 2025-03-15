'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

type DreamCategory = 'trending' | 'learn' | 'play' | 'recover'

interface CategoryFilterProps {
  onCategoryChange: (category: DreamCategory) => void
}

export default function CategoryFilter({ onCategoryChange }: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState<DreamCategory>('trending')
  
  const handleCategoryChange = (category: DreamCategory) => {
    setActiveCategory(category)
    onCategoryChange(category)
  }
  
  return (
    <div className="flex justify-center mb-8">
      <div className="inline-flex bg-gray-800/50 rounded-full p-1">
        <button
          className={`relative px-4 py-2 rounded-full text-sm md:text-base transition-all ${
            activeCategory === 'trending' ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => handleCategoryChange('trending')}
        >
          <span className="hidden md:inline">Trending</span>
          <span className="md:hidden">🔥</span>
          {activeCategory === 'trending' && (
            <motion.div
              className="absolute inset-0 bg-indigo-600 rounded-full -z-10"
              layoutId="categoryBackground"
              transition={{ type: 'spring', duration: 0.6 }}
            />
          )}
        </button>
        
        <button
          className={`relative px-4 py-2 rounded-full text-sm md:text-base transition-all ${
            activeCategory === 'recover' ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => handleCategoryChange('recover')}
        >
          <span className="hidden md:inline">Recover</span>
          <span className="md:hidden">🧘</span>
          {activeCategory === 'recover' && (
            <motion.div
              className="absolute inset-0 bg-indigo-600 rounded-full -z-10"
              layoutId="categoryBackground"
              transition={{ type: 'spring', duration: 0.6 }}
            />
          )}
        </button>
        
        <button
          className={`relative px-4 py-2 rounded-full text-sm md:text-base transition-all ${
            activeCategory === 'learn' ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => handleCategoryChange('learn')}
        >
          <span className="hidden md:inline">Learn</span>
          <span className="md:hidden">📚</span>
          {activeCategory === 'learn' && (
            <motion.div
              className="absolute inset-0 bg-indigo-600 rounded-full -z-10"
              layoutId="categoryBackground"
              transition={{ type: 'spring', duration: 0.6 }}
            />
          )}
        </button>
        
        <button
          className={`relative px-4 py-2 rounded-full text-sm md:text-base transition-all ${
            activeCategory === 'play' ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => handleCategoryChange('play')}
        >
          <span className="hidden md:inline">Play</span>
          <span className="md:hidden">🎮</span>
          {activeCategory === 'play' && (
            <motion.div
              className="absolute inset-0 bg-indigo-600 rounded-full -z-10"
              layoutId="categoryBackground"
              transition={{ type: 'spring', duration: 0.6 }}
            />
          )}
        </button>
      </div>
    </div>
  )
} 