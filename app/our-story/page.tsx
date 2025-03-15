'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

// Press data
const pressItems = [
  {
    id: 'military',
    image: '/images/somnium-darpa.png',
    alt: 'DARPA',
    quote: 'Following promising findings that Somnium was able to accelerate PTSD recovery through dream-interfacing therapy, the US military has penned contracts with Somnium to offer their veterans state-of-the-art therapy. Initial trials showed a 78% reduction in PTSD symptoms after just 8 weeks of treatment.',
    source: 'Military Health Review, 2048'
  },
  {
    id: 'nhs',
    image: '/images/somnium-nhs.png',
    alt: 'UK National Health Service',
    quote: 'In a landmark initiative to address the homelessness crisis, the UK Government has declared rough sleeping a national health emergency and ordered 100,000 Somnium Nightcaps to be included in their Rough Sleeper Kits. The technology will help rehabilitate rough sleepers by addressing trauma and improving sleep quality.',
    source: 'UK Health Journal, 2049'
  },
  {
    id: 'education',
    image: '/images/somnium-school.png',
    alt: 'Global Education Initiative',
    quote: 'The Global Education Initiative has partnered with Somnium to revolutionize language learning in schools worldwide. Students using the Nightcap\'s language acquisition program have demonstrated a 340% increase in vocabulary retention and significantly improved pronunciation compared to traditional methods.',
    source: 'Education Technology Today, 2049'
  },
  {
    id: 'space',
    image: '/images/somnium-iss.png',
    alt: 'International Space Agency',
    quote: 'The International Space Agency has announced that Somnium\'s Nightcap will be standard equipment on all long-duration space missions. The technology will help astronauts maintain cognitive function, process the psychological challenges of isolation, and optimize sleep in zero-gravity environments.',
    source: 'Space Exploration Quarterly, 2048'
  }
]

export default function OurStory() {
  const [featuredPress, setFeaturedPress] = useState(pressItems[0])
  const [autoAdvanceEnabled, setAutoAdvanceEnabled] = useState(true)
  const autoAdvanceTimerRef = useRef(null)
  const userInteractionTimerRef = useRef(null)
  
  // Function to set the featured press item
  const handleFeaturePress = (pressItem) => {
    // Clear any existing timers
    if (autoAdvanceTimerRef.current) {
      clearInterval(autoAdvanceTimerRef.current)
      autoAdvanceTimerRef.current = null
    }
    
    if (userInteractionTimerRef.current) {
      clearTimeout(userInteractionTimerRef.current)
    }
    
    // Disable auto-advance immediately
    setAutoAdvanceEnabled(false)
    
    // Set the selected press item
    setFeaturedPress(pressItem)
    
    // Re-enable auto-advance after 30 seconds of inactivity
    userInteractionTimerRef.current = setTimeout(() => {
      setAutoAdvanceEnabled(true)
    }, 30000)
  }
  
  // Get the remaining press items (not featured)
  const remainingPressItems = pressItems.filter(item => item.id !== featuredPress.id)
  
  // Set up auto-advance when enabled
  useEffect(() => {
    if (autoAdvanceEnabled) {
      autoAdvanceTimerRef.current = setInterval(() => {
        // Find the current index
        const currentIndex = pressItems.findIndex(item => item.id === featuredPress.id)
        // Get the next item (or loop back to the first)
        const nextItem = pressItems[(currentIndex + 1) % pressItems.length]
        setFeaturedPress(nextItem)
      }, 8000)
    }
    
    return () => {
      if (autoAdvanceTimerRef.current) {
        clearInterval(autoAdvanceTimerRef.current)
      }
    }
  }, [autoAdvanceEnabled, featuredPress])
  
  // Clean up all timers when component unmounts
  useEffect(() => {
    return () => {
      if (autoAdvanceTimerRef.current) {
        clearInterval(autoAdvanceTimerRef.current)
      }
      if (userInteractionTimerRef.current) {
        clearTimeout(userInteractionTimerRef.current)
      }
    }
  }, [])

  // Update the DOM elements when currentPress changes
  useEffect(() => {
    // Update image
    const imageElement = document.getElementById('press-image') as HTMLImageElement
    if (imageElement) {
      imageElement.src = featuredPress.image
      imageElement.alt = featuredPress.alt
    }
    
    // Update quote
    const quoteElement = document.getElementById('press-quote')
    if (quoteElement) {
      quoteElement.textContent = featuredPress.quote
    }
    
    // Update source
    const sourceElement = document.getElementById('press-source')
    if (sourceElement) {
      sourceElement.textContent = `— ${featuredPress.source}`
    }
    
    // Update pagination dots
    for (let i = 0; i < pressItems.length; i++) {
      const dot = document.getElementById(`press-dot-${i}`)
      if (dot) {
        if (i === pressItems.findIndex(item => item.id === featuredPress.id)) {
          dot.className = 'w-3 h-3 rounded-full bg-indigo-500'
        } else {
          dot.className = 'w-3 h-3 rounded-full bg-gray-500 hover:bg-gray-400'
        }
      }
    }
  }, [featuredPress])

  return (
    <main className="bg-[#050510] text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center relative overflow-hidden bg-gradient-to-b from-indigo-900/30 to-[#050510]">
        <div className="container mx-auto px-6 z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Story</h1>
            <p className="text-xl text-gray-300">
              From a DARPA-backed research project to the world's leading dream technology company, 
              discover how Somnium is revolutionizing the way we sleep, dream, and learn.
            </p>
          </div>
        </div>
      </section>
      
      {/* Company History Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Pioneering Dream Technology</h2>
              <p className="text-gray-300 mb-6">
                Somnium was founded on the principle that sleep is an underutilised cognitive state with immense potential for personal development, mental health, and research.
              </p>
              <p className="text-gray-300 mb-6">
                Originally developed as part of a DARPA-backed programme to aid veterans with PTSD, our technology has evolved into a fully-fledged consumer-grade neural interface designed to facilitate lucid dreaming, memory reinforcement, and cognitive enhancement.
              </p>
              <p className="text-gray-300">
                Today, we're at the forefront of neurotechnology, helping millions of people around the world unlock the hidden potential of their dreams.
              </p>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image 
                src="/images/somnium-medical.png" 
                alt="Soldier wearing early Somnium BCI prototype" 
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* White Paper Section */}
      <section className="py-24 bg-indigo-900/20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-2 text-center">Somnium White Paper</h2>
            <h3 className="text-xl text-gray-300 mb-12 text-center">The Science Behind the Nightcap</h3>
            
            <div className="bg-gray-900/50 rounded-xl p-8 mb-12">
              <h4 className="text-xl font-semibold mb-4">Abstract</h4>
              <p className="text-gray-300">
                Somnium's Nightcap represents a pioneering advancement in non-invasive neural interfacing, enabling precise dream modulation through cutting-edge Transcranial Focused Ultrasound Stimulation (tFUS) and high-density EEG monitoring. This white paper outlines the underlying neuroscience, technological innovations, and potential applications in research, healthcare, and consumer well-being.
              </p>
            </div>
            
            <div className="space-y-12">
              <div>
                <h4 className="text-xl font-semibold mb-4">1. Neurotechnological Foundations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gray-900/30 p-6 rounded-lg">
                    <h5 className="text-lg font-medium mb-3 text-indigo-400">High-Density EEG Monitoring</h5>
                    <p className="text-gray-300 text-sm">
                      The Nightcap features a high-density EEG array with advanced source localisation algorithms capable of resolving neural activity at a resolution of 10,000 to 100,000-neuron ensembles. Unlike traditional EEG systems, which suffer from low spatial precision, the Nightcap employs dry soft-contact electrodes optimized for comfort and signal fidelity.
                    </p>
                  </div>
                  <div className="bg-gray-900/30 p-6 rounded-lg">
                    <h5 className="text-lg font-medium mb-3 text-indigo-400">Transcranial Focused Ultrasound Stimulation</h5>
                    <p className="text-gray-300 text-sm">
                      Unlike conventional neuromodulation techniques such as tDCS or TMS, tFUS offers deep-brain targeting with high spatial precision while remaining non-invasive. The Nightcap utilises an array of miniaturised ultrasound emitters, enabling precise neuromodulation of prefrontal, occipital, and limbic structures.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold mb-4">2. Applications and Research Potential</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-900/30 p-6 rounded-lg">
                    <h5 className="text-lg font-medium mb-3 text-indigo-400">Consumer Applications</h5>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• Achieve lucid dreaming with greater consistency</li>
                      <li>• Engage in skill rehearsal during REM sleep</li>
                      <li>• Enhance emotional processing and memory consolidation</li>
                    </ul>
                  </div>
                  <div className="bg-gray-900/30 p-6 rounded-lg">
                    <h5 className="text-lg font-medium mb-3 text-indigo-400">Medical Research</h5>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• PTSD & Trauma Recovery</li>
                      <li>• Neurorehabilitation for post-stroke patients</li>
                      <li>• Treatment of sleep disorders</li>
                    </ul>
                  </div>
                  <div className="bg-gray-900/30 p-6 rounded-lg">
                    <h5 className="text-lg font-medium mb-3 text-indigo-400">Academic Research</h5>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• Neuroscience of sleep and memory</li>
                      <li>• Cognitive enhancement studies</li>
                      <li>• Dream content analysis</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold mb-4">3. Ethical Considerations & Data Privacy</h4>
                <p className="text-gray-300 mb-4">
                  Somnium is committed to ethical deployment of neurotechnology:
                </p>
                <ul className="text-gray-300 space-y-2 mb-6">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>All user data is encrypted and locally stored, with optional cloud-based features requiring explicit consent.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Dream modulation safeguards prevent cognitive over-stimulation, ensuring the device prioritises sleep quality over dream intensity.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Somnium upholds transparent research collaborations, with findings openly shared to advance the field of neuroethics and responsible BCI development.</span>
                  </li>
                </ul>
                <div className="bg-indigo-900/30 p-6 rounded-lg">
                  <p className="text-gray-300 italic">
                    "The Nightcap by Somnium represents a paradigm shift in the way we interface with the mind during sleep. Through advancements in tFUS neuromodulation, high-resolution EEG, and adaptive neural decoding, it offers an unparalleled platform for dream shaping, cognitive enhancement, and sleep science research."
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <a 
                href="https://drive.google.com/file/d/1RBKv0g9Pr5zaR0-uldEMwWoCuizFIejx/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer" 
                className="inline-flex items-center text-indigo-400 hover:text-indigo-300"
              >
                <span>Download the full white paper</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* In The Press Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-16 text-center">In The Press</h2>
          
          <div className="max-w-6xl mx-auto">
            {/* Featured Press Item */}
            <motion.div 
              className="bg-gray-900/30 rounded-xl overflow-hidden mb-12"
              key={featuredPress.id}
              initial={{ opacity: 0.8, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image column */}
                <div className="relative h-[300px] md:h-auto">
                  <Image 
                    src={featuredPress.image}
                    alt={featuredPress.alt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent md:hidden"></div>
                </div>
                
                {/* Content column */}
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <blockquote className="text-gray-300 text-lg mb-6">
                    "{featuredPress.quote}"
                  </blockquote>
                  <p className="text-sm text-gray-400 font-medium">— {featuredPress.source}</p>
                </div>
              </div>
            </motion.div>
            
            {/* Other Press Items - 3 column grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {remainingPressItems.map((item) => (
                <motion.div 
                  key={item.id}
                  className="bg-gray-900/30 rounded-xl overflow-hidden cursor-pointer hover:bg-gray-800/30 transition-colors"
                  onClick={() => handleFeaturePress(item)}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="h-48 relative">
                    <Image 
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <blockquote className="text-gray-300 mb-4 line-clamp-4">
                      "{item.quote}"
                    </blockquote>
                    <p className="text-sm text-gray-400">— {item.source}</p>
                    <div className="mt-4 text-indigo-400 text-sm flex items-center">
                      <span>Read more</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-indigo-900/20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Sleep?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            Experience the Nightcap and discover a new dimension of dreaming, learning, and resting.
          </p>
          
          <Link href="/#nightcap">
            <motion.button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Discover the Nightcap
            </motion.button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </main>
  )
} 