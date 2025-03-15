'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { setupScroll } from '@/lib/scroll'
import Image from 'next/image'
import PositionedSleepIllustration from '@/components/PositionedSleepIllustration'
import DreamsSection from '@/components/DreamsSection'
import JourneyButton from '@/components/JourneyButton'

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
          // Also set a data attribute on the body for components to access
          document.body.setAttribute('data-active-section', entry.target.id)
          
          // Optionally dispatch a custom event
          window.dispatchEvent(
            new CustomEvent('sectionChange', { 
              detail: { section: entry.target.id } 
            })
          )
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
      document.body.removeAttribute('data-active-section')
    }
  }, [])

  return (
    <main ref={containerRef} className="bg-[#050510] text-white overflow-x-hidden">
      <Navigation />
      
      {/* Positioned sleep illustration that stays fixed while scrolling */}
      <PositionedSleepIllustration />
      
      {/* Hero Section */}
      <section id="hero" className="min-h-screen pt-24 md:pt-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row min-h-[80vh] items-center">
            <div className="w-full md:w-1/2 pr-0 md:pr-12 z-20 mt-8 md:mt-0">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
                Explore Your <span className="text-indigo-400">Dreamscape</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mt-6">
                Somnium's Nightcap neural interface enhances your sleep experience, allowing you to explore, create, and control your dreams like never before.
              </p>
              <div className="pt-8 flex flex-wrap gap-4">
                <motion.a 
                  href="#nightcap"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 md:px-6 py-2.5 md:py-3 rounded-full text-base md:text-lg font-medium flex items-center gap-2 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Our Product
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </motion.a>
                <motion.a 
                  href="/our-story"
                  className="border border-white/30 hover:bg-white/10 text-white px-5 md:px-6 py-2.5 md:py-3 rounded-full text-base md:text-lg font-medium transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Our Story
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Product Features Sections */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left column for content */}
          <div className="px-6 md:px-12 lg:px-24 z-20">
            {/* Nightcap Section */}
            <section id="nightcap" className="min-h-screen py-24 flex items-center">
              <div className="max-w-lg">
                <h2 className="text-3xl font-bold mb-6">The Nightcap</h2>
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
              <div className="max-w-lg">
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
            
            {/* Technology Section - Updated to focus on EEG and dream recording */}
            <section id="technology" className="min-h-screen py-24 flex items-center">
              <div className="max-w-lg">
                <h2 className="text-3xl font-bold mb-6">Dream Recording</h2>
                <p className="text-gray-300 mb-8">
                  Advanced EEG sensors capture your brain activity during sleep, allowing for unprecedented dream recording and analysis.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-indigo-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>High-resolution EEG monitoring</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-indigo-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Dream content visualization</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-indigo-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Long-term dream analytics</span>
                  </li>
                </ul>
                
                <p className="text-gray-300 mt-8">
                  Our proprietary algorithms translate neural patterns into visual and narrative content, allowing you to review and share your dreams the next morning.
                </p>
              </div>
            </section>
            
            {/* tFUS Technology Section */}
            <section id="tfus" className="min-h-screen py-24 flex items-center">
              <div className="max-w-lg">
                <h2 className="text-3xl font-bold mb-6">Dream Induction</h2>
                <p className="text-gray-300 mb-8">
                  Revolutionary transcranial Focused Ultrasound (tFUS) technology enables precise neural stimulation to shape and guide dream content.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-indigo-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Non-invasive neural stimulation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-indigo-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Targeted dream content induction</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-indigo-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Emotional tone modulation</span>
                  </li>
                </ul>
                
                <p className="text-gray-300 mt-8">
                  Our patented tFUS system gently activates specific neural pathways to introduce imagery, themes, and emotional states into your dreams, creating immersive experiences tailored to your preferences.
                </p>
              </div>
            </section>
          </div>
          
          {/* Right column - empty placeholder to maintain layout */}
          <div className="hidden md:block">
            {/* This is just a spacer div to maintain the layout */}
          </div>
        </div>
      </div>
      
      {/* Dreams Marketplace Section */}
      <section id="dreams" className="pt-48 pb-24 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">
              Explore our curated collection of dreams
            </h2>
            
            <p className="text-gray-300 mb-8">
              The Nightcap's advanced neural analysis continuously learns from your sleep patterns, 
              building a personalized profile of your dreaming mind. Our AI then recommends specific 
              dream experiences tailored to your unique needs—whether you're seeking emotional healing, 
              skill enhancement, or creative inspiration.
            </p>
            
            <p className="text-gray-300 mb-12">
              As you use the Nightcap over time, its recommendations become increasingly precise, 
              identifying which dream experiences will most effectively help you process emotions, 
              consolidate memories, and unlock your cognitive potential.
            </p>
          </div>
          
          <DreamsSection />
          
          <div className="flex justify-center mt-16">
            <JourneyButton />
          </div>
        </div>
      </section>
      
      <section id="purchase" className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-8 text-center">The Nightcap</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-center mb-16">
            Experience the future of sleep and dream technology
          </p>
          
          <div className="flex flex-col md:flex-row bg-gray-900/50 rounded-2xl overflow-hidden">
            <div className="w-full md:w-1/2 p-8 md:p-12">
              <h3 className="text-2xl font-semibold mb-4">Somnium Sleep Kit</h3>
              <p className="text-gray-300 mb-8">
                Includes the Nightcap device, travel case, and unlimited access to our dream library.
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
            
            <div className="w-full md:w-1/2 bg-indigo-900/20 flex items-center justify-center p-4">
              <div className="relative w-full h-[360px]">
                <Image 
                  src="/images/product-photo.png"
                  alt="The Nightcap device" 
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