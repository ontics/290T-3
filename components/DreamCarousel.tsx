'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DreamCard from './DreamCard'
import { placeholderImages } from '@/lib/placeholders'

type DreamCategory = 'trending' | 'learn' | 'play' | 'recover'

interface Dream {
  id: string
  title: string
  description: string
  image: any
  categories: DreamCategory[]
}

// Updated dream data with Unsplash image URLs
const dreams: Record<DreamCategory, Dream[]> = {
  trending: [
    {
      id: 'peaceful-flight',
      title: "Peaceful Flight",
      description: "Float through serene landscapes that dissolve tension and anxiety",
      image: "https://images.unsplash.com/photo-1506268452458-bfb3757ed859?q=80&w=1000&auto=format&fit=crop",
      categories: ['trending'] as DreamCategory[]
    },
    {
      id: 'fluent-greek',
      title: "Fluent Greek",
      description: "Master Greek in your sleep with our language immersion dreams",
      image: "https://images.unsplash.com/photo-1631356394592-6da1b5f8d3dd",
      categories: ['trending', 'learn'] as DreamCategory[]
    },
    {
      id: 'new-perspective',
      title: "New Perspective",
      description: "See the world through someone else's eyes and expand your empathy",
      image: "https://images.unsplash.com/photo-1523324761162-d261f3f30ab1",
      categories: ['trending'] as DreamCategory[]
    },
    {
      id: 'deep-recovery',
      title: "Deep Recovery",
      description: "Experience profound states of calm and restoration",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop",
      categories: ['recover'] as DreamCategory[]
    }
  ],
  recover: [
    {
      id: 'peaceful-flight',
      title: "Peaceful Flight",
      description: "Float through serene landscapes that dissolve tension and anxiety",
      image: "https://images.unsplash.com/photo-1506268452458-bfb3757ed859?q=80&w=1000&auto=format&fit=crop",
      categories: ['recover'] as DreamCategory[]
    },
    {
      id: 'find-forgiveness',
      title: "Find Forgiveness",
      description: "Safely process difficult memories in a controlled dreamscape",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1000&auto=format&fit=crop",
      categories: ['recover'] as DreamCategory[]
    },
    {
      id: 'deep-recovery',
      title: "Deep Recovery",
      description: "Experience profound states of calm and restoration",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop",
      categories: ['recover'] as DreamCategory[]
    },
    {
      id: 'overcome-fears',
      title: "Overcome Your Fears",
      description: "Transform anxious thoughts into peaceful experiences",
      image: "https://images.unsplash.com/photo-1484950763426-56b5bf172dbb?q=80&w=1000&auto=format&fit=crop",
      categories: ['recover'] as DreamCategory[]
    },
    {
      id: 'introspection',
      title: "Introspection",
      description: "Repair emotional wounds through guided dream therapy",
      image: "https://images.unsplash.com/photo-1499988921418-b7df40ff03f9?q=80&w=1000&auto=format&fit=crop",
      categories: ['recover'] as DreamCategory[]
    }
  ],
  learn: [
    {
      id: 'fluent-greek',
      title: 'Fluent Greek',
      description: 'Master Greek in your sleep with our language immersion dreams',
      image: 'https://images.unsplash.com/photo-1631356394592-6da1b5f8d3dd',
      categories: ['learn'] as DreamCategory[]
    },
    {
      id: 'new-perspective',
      title: "New Perspective",
      description: "See the world through someone else's eyes and expand your empathy",
      image: "https://images.unsplash.com/photo-1523324761162-d261f3f30ab1",
      categories: ['learn'] as DreamCategory[]
    },
    {
      id: 'memorise-flashcards',
      title: "Memorise Flashcards",
      description: "Strengthen memory consolidation during deep sleep phases",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop",
      categories: ['learn'] as DreamCategory[]
    },
    {
      id: 'kung-fu',
      title: "Kung Fu",
      description: "Master martial arts and become a legendary kung fu fighter",
      image: "https://images.unsplash.com/photo-1555597673-b21d5c935865",
      categories: ['learn'] as DreamCategory[]
    }
  ],
  play: [
    {
      id: 'wild-west',
      title: 'Wild West',
      description: 'Experience the frontier as a cowboy in the American Wild West',
      image: 'https://images.unsplash.com/photo-1624125278758-c0572f6ebc55',
      categories: ['play'] as DreamCategory[]
    },
    {
      id: 'wizarding-world',
      title: 'Wizarding World',
      description: 'Cast spells and brew potions in a magical wizarding academy',
      image: 'https://images.unsplash.com/photo-1656878564120-ab988c47f0b5',
      categories: ['play'] as DreamCategory[]
    },
    {
      id: 'kung-fu',
      title: 'Kung Fu',
      description: 'Master martial arts and become a legendary kung fu fighter',
      image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865',
      categories: ['play'] as DreamCategory[]
    },
    {
      id: 'space-rollercoaster',
      title: "Space Rollercoaster",
      description: "Experience the freedom of flight in vivid detail",
      image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1000&auto=format&fit=crop",
      categories: ['play'] as DreamCategory[]
    },
    {
      id: 'superhero-powers',
      title: "Superhero Powers",
      description: "Fight alongside your favourite superheros",
      image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?q=80&w=1000&auto=format&fit=crop",
      categories: ['play'] as DreamCategory[]
    }
  ]
}

interface DreamCarouselProps {
  activeCategory: DreamCategory
}

export default function DreamCarousel({ activeCategory }: DreamCarouselProps) {
  const [filteredDreams, setFilteredDreams] = useState<Dream[]>([])
  const [visibleItemCount, setVisibleItemCount] = useState(4)
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  
  // Filter dreams based on active category
  useEffect(() => {
    const filtered = dreams[activeCategory]
    setFilteredDreams(filtered)
    setCurrentIndex(0) // Reset position when category changes
  }, [activeCategory])
  
  // Calculate visible items based on screen width
  useEffect(() => {
    const calculateVisibleItems = () => {
      if (window.innerWidth < 640) {
        setVisibleItemCount(1)
      } else if (window.innerWidth < 768) {
        setVisibleItemCount(2)
      } else if (window.innerWidth < 1024) {
        setVisibleItemCount(3)
      } else {
        setVisibleItemCount(4)
      }
    }
    
    calculateVisibleItems()
    window.addEventListener('resize', calculateVisibleItems)
    
    return () => {
      window.removeEventListener('resize', calculateVisibleItems)
    }
  }, [])
  
  // Handle navigation
  const handleNavigation = (direction: 'left' | 'right') => {
    if (filteredDreams.length <= visibleItemCount) {
      // If all items fit on screen, don't scroll
      return
    }
    
    if (direction === 'left') {
      setCurrentIndex(prev => 
        prev === 0 
          ? Math.max(0, filteredDreams.length - visibleItemCount) // Go to end
          : Math.max(0, prev - visibleItemCount) // Go back one page
      )
    } else {
      setCurrentIndex(prev => {
        const nextIndex = prev + visibleItemCount
        // If next set would go beyond the end, loop back to start
        return nextIndex >= filteredDreams.length ? 0 : nextIndex
      })
    }
  }
  
  // No dreams found state
  if (filteredDreams.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No dreams found in this category yet.</p>
      </div>
    )
  }
  
  // Calculate if we need navigation buttons
  const needsNavigation = filteredDreams.length > visibleItemCount
  
  // Get visible dreams
  const visibleDreams = filteredDreams.slice(currentIndex, currentIndex + visibleItemCount)
  
  // If we don't have enough items to fill the view, add more from the beginning
  if (visibleDreams.length < visibleItemCount && filteredDreams.length > visibleItemCount) {
    const remaining = visibleItemCount - visibleDreams.length
    visibleDreams.push(...filteredDreams.slice(0, remaining))
  }
  
  return (
    <div className="relative mt-12 px-12">
      {/* Left navigation button - only show if needed */}
      {needsNavigation && (
        <motion.button 
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-indigo-600 text-white p-3 rounded-full shadow-lg"
          onClick={() => handleNavigation('left')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
      )}
      
      {/* Carousel container */}
      <div className="overflow-hidden">
        <motion.div 
          className="flex gap-6"
          initial={false}
          animate={{ 
            x: 0,
            transition: { type: "spring", stiffness: 300, damping: 30 }
          }}
        >
          {visibleDreams.map((dream, index) => (
            <motion.div 
              key={`${dream.id}-${currentIndex}-${index}`} 
              className="flex-none w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <DreamCard 
                title={dream.title}
                description={dream.description}
                image={dream.image}
                categories={dream.categories}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Right navigation button - only show if needed */}
      {needsNavigation && (
        <motion.button 
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-indigo-600 text-white p-3 rounded-full shadow-lg"
          onClick={() => handleNavigation('right')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      )}
      
      {/* Pagination indicators */}
      {needsNavigation && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: Math.ceil(filteredDreams.length / visibleItemCount) }).map((_, index) => {
            const isActive = index === Math.floor(currentIndex / visibleItemCount)
            return (
              <button
                key={`page-${index}`}
                className={`w-2 h-2 rounded-full transition-all ${
                  isActive ? 'bg-indigo-500 w-6' : 'bg-gray-500 hover:bg-gray-400'
                }`}
                onClick={() => setCurrentIndex(index * visibleItemCount)}
              />
            )
          })}
        </div>
      )}
    </div>
  )
} 