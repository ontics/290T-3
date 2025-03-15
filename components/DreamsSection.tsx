'use client'

import { useState } from 'react'
import CategoryFilter from './CategoryFilter'
import DreamCarousel from './DreamCarousel'

type DreamCategory = 'trending' | 'learn' | 'play' | 'recover'

export default function DreamsSection() {
  const [activeCategory, setActiveCategory] = useState<DreamCategory>('trending')
  
  return (
    <div className="relative mt-12 px-4 md:px-12">
      <CategoryFilter onCategoryChange={setActiveCategory} />
      <DreamCarousel activeCategory={activeCategory} />
    </div>
  )
} 