'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import CategoryFilter from '@/components/CategoryFilter'
import DreamCard from '@/components/DreamCard'
import JourneyButton from '@/components/JourneyButton'
import LayeredImage from '@/components/LayeredImage'
import Footer from '@/components/Footer'
import { setupScroll } from '@/lib/scroll'
import { placeholderImages } from '@/lib/placeholders'
import Image from 'next/image'
import HeroAnimation from '@/components/HeroAnimation'
import BrainNetworkAnimation from '@/components/BrainNetworkAnimation'

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState('hero')
  
  useEffect(() => {
    const cleanup = setupScroll(containerRef)
    
    // Set up intersection observers for each section
    const sections = document.querySelectorAll('section[id]')
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, { threshold: 0.5 })
    
    sections.forEach(section => {
      observer.observe(section)
    })
    
    return () => {
      cleanup()
      sections.forEach(section => {
        observer.unobserve(section)
      })
    }
  }, [])

  return (
    <main ref={containerRef} className="bg-[#050510] text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section id="hero" className="min-h-screen pt-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row min-h-[80vh] items-center">
            <div className="w-full md:w-1/2 pr-0 md:pr-12">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Explore Your <span className="text-indigo-400">Dreamscape</span>
              </h1>
              <p className="text-xl text-gray-300 mt-6">
                Somnium's Crown neural interface enhances your sleep experience, allowing you to explore, create, and control your dreams like never before.
              </p>
              <div className="pt-8 flex gap-4">
                <motion.button 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full text-lg font-medium flex items-center gap-2 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Discover More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.button>
                <motion.button 
                  className="border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded-full text-lg font-medium transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Watch Demo
                </motion.button>
              </div>
            </div>
            <div className="w-full md:w-1/2 mt-12 md:mt-0 h-[400px]">
              <BrainNetworkAnimation />
            </div>
          </div>
        </div>
      </section>
      
      {/* Product Features Sections with Layered Image */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left column for content */}
          <div className="px-6 md:px-12 lg:px-24">
            {/* Crown Section */}
            <section id="crown" className="min-h-screen py-24 flex items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">The Crown</h2>
                <p className="text-gray-300 mb-8">
                  Our revolutionary neural interface that monitors and enhances your sleep patterns.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-indigo-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Advanced EEG monitoring</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-indigo-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Comfortable, lightweight design</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-indigo-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>All-night battery life</span>
                  </li>
                </ul>
              </div>
            </section>
            
            {/* Thermal Regulation Section */}
            <section id="thermal" className="min-h-screen py-24 flex items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Thermal Regulation</h2>
                <p className="text-gray-300 mb-8">
                  Precision cooling technology maintains optimal brain temperature for deeper, more restorative sleep.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-indigo-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Adaptive temperature control</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-indigo-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Enhanced slow-wave sleep</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-indigo-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Silent operation</span>
                  </li>
                </ul>
              </div>
            </section>
            
            {/* Technology Section */}
            <section id="technology" className="min-h-screen py-24 flex items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Dream Technology</h2>
                <p className="text-gray-300 mb-8">
                  Advanced neural interface technology allows for unprecedented dream control.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-indigo-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Lucid dream induction</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-indigo-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Dream content guidance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-indigo-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Memory consolidation</span>
                  </li>
                </ul>
                
                <p className="text-gray-300 mt-8">
                  Our proprietary algorithms detect REM sleep and deliver subtle neural stimulation to enhance dream vividness and control.
                </p>
              </div>
            </section>
          </div>
          
          {/* Right column for sticky image */}
          <div className="hidden md:block">
            <div className="sticky top-0 h-screen flex items-center justify-center">
              <LayeredImage activeSection={activeSection} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Dreams Marketplace Section */}
      <section id="dreams" className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Explore our curated collection of dream experiences designed to enhance your sleep
          </h2>
          
          <CategoryFilter />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <DreamCard 
              title="Stress Relief" 
              description="Float through serene landscapes that dissolve tension and anxiety" 
              image={placeholderImages.dreams.stressRelief} 
            />
            <DreamCard 
              title="Trauma Processing" 
              description="Safely process difficult memories in a controlled dreamscape" 
              image={placeholderImages.dreams.traumaProcessing} 
            />
            <DreamCard 
              title="Deep Relaxation" 
              description="Experience profound states of calm and restoration" 
              image={placeholderImages.dreams.deepRelaxation} 
            />
            <DreamCard 
              title="Anxiety Management" 
              description="Transform anxious thoughts into peaceful experiences" 
              image={placeholderImages.dreams.anxietyManagement} 
            />
          </div>
          
          <div className="flex justify-center mt-16">
            <JourneyButton />
          </div>
        </div>
      </section>
      
      <section id="purchase" className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-8 text-center">The Crown</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-center mb-16">
            Experience the future of sleep and dream technology
          </p>
          
          <div className="flex flex-col md:flex-row bg-gray-900/50 rounded-2xl overflow-hidden">
            <div className="w-full md:w-1/2 p-8 md:p-12">
              <h3 className="text-2xl font-semibold mb-4">Premium Package</h3>
              <p className="text-gray-300 mb-8">
                Includes the Crown device, travel case, and unlimited access to our dream library.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-indigo-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Neural interface with EEG sensors</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-indigo-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Thermal regulation system</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-indigo-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Dream library subscription</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-indigo-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Premium travel case</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-indigo-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>2-year warranty</span>
                </li>
              </ul>
              
              <div className="flex items-center justify-between mb-8">
                <span className="text-3xl font-bold">$1,499</span>
                <span className="text-gray-400">or $125/month</span>
              </div>
              
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-lg text-lg font-medium transition-all">
                Pre-order Now
              </button>
            </div>
            
            <div className="w-full md:w-1/2 bg-indigo-900/20 flex items-center justify-center p-8">
              <div className="relative w-full h-[300px]">
                <Image 
                  src={placeholderImages.product.main}
                  alt="The Crown device" 
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
} 