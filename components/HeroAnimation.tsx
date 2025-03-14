'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    
    setCanvasDimensions()
    window.addEventListener('resize', setCanvasDimensions)
    
    // Create nodes for neural network
    const nodes: {x: number, y: number, vx: number, vy: number, radius: number, color: string}[] = []
    const nodeCount = 50
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        color: `rgba(${99 + Math.random() * 50}, ${102 + Math.random() * 50}, ${241 + Math.random() * 15}, ${0.5 + Math.random() * 0.5})`
      })
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        
        // Update position
        node.x += node.vx
        node.y += node.vy
        
        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1
        
        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.fill()
        
        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const otherNode = nodes[j]
          const dx = otherNode.x - node.x
          const dy = otherNode.y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(otherNode.x, otherNode.y)
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      
      requestAnimationFrame(animate)
    }
    
    const animationId = requestAnimationFrame(animate)
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions)
      cancelAnimationFrame(animationId)
    }
  }, [])
  
  return (
    <div className="relative w-full h-full">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Pulsing circles in the background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="w-64 h-64 rounded-full bg-indigo-900/30"
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute w-48 h-48 rounded-full bg-indigo-800/40"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        
        <motion.div 
          className="absolute w-32 h-32 rounded-full bg-indigo-700/50"
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{ 
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg className="w-8 h-8 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </div>
  )
} 