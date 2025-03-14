'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const categories = [
  { id: 'therapy', name: 'Therapy' },
  { id: 'skills', name: 'Skills' },
  { id: 'creativity', name: 'Creativity' },
]

export default function CategoryFilter() {
  const [activeCategory, setActiveCategory] = useState('therapy')
  
  return (
    <div className="flex justify-center gap-4 mt-12">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          className={`px-8 py-3 rounded-full text-lg transition-all ${
            activeCategory === category.id 
              ? 'bg-indigo-600 text-white' 
              : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
          }`}
          onClick={() => setActiveCategory(category.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {category.name}
        </motion.button>
      ))}
    </div>
  )
} 