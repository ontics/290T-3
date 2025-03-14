'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Cluster {
  x: number
  y: number
  radius: number
  connections: number[]
  active: boolean
  activationTime: number
  color: string
  region: string
  dreamContent: string
}

// Brain regions and associated dream content with more variety
const brainRegions = [
  { 
    name: 'PREFRONTAL CORTEX', 
    dreams: [
      'PLANNING A JOURNEY TO MARS',
      'SOLVING COMPLEX PUZZLES',
      'ORGANIZING A LIBRARY OF MEMORIES',
      'DESIGNING AN IMPOSSIBLE STRUCTURE',
      'CREATING A NEW LANGUAGE',
      'DEBATING WITH HISTORICAL FIGURES',
      'INVENTING A TIME MACHINE'
    ] 
  },
  { 
    name: 'VISUAL CORTEX', 
    dreams: [
      'VIBRANT LANDSCAPES SHIFTING COLORS',
      'FACES MORPHING INTO ONE ANOTHER',
      'GEOMETRIC PATTERNS UNFOLDING',
      'CITIES BUILT FROM LIGHT',
      'KALEIDOSCOPIC VISIONS',
      'SEEING THROUGH ANOTHER PERSON\'S EYES',
      'WATCHING STARS BEING BORN'
    ] 
  },
  { 
    name: 'TEMPORAL LOBE', 
    dreams: [
      'CONVERSATIONS WITH FORGOTTEN FRIENDS',
      'MUSIC THAT CHANGES THE ENVIRONMENT',
      'MEMORIES REPLAYING WITH NEW ENDINGS',
      'UNDERSTANDING AN UNKNOWN LANGUAGE',
      'HEARING COLORS AS SOUNDS',
      'RELIVING CHILDHOOD MOMENTS',
      'LISTENING TO THE THOUGHTS OF OTHERS'
    ] 
  },
  { 
    name: 'LIMBIC SYSTEM', 
    dreams: [
      'FLYING THROUGH ENDLESS SKIES',
      'BEING CHASED THROUGH DARK CORRIDORS',
      'REUNITING WITH LOVED ONES',
      'DISCOVERING HIDDEN TREASURES',
      'FALLING ENDLESSLY',
      'FINDING A SECRET DOOR',
      'BECOMING INVISIBLE'
    ] 
  },
  { 
    name: 'MOTOR CORTEX', 
    dreams: [
      'RUNNING WITHOUT TOUCHING THE GROUND',
      'DANCING WITH IMPOSSIBLE MOVEMENTS',
      'SWIMMING THROUGH AIR',
      'CLIMBING AN ENDLESS STAIRCASE',
      'MOVING OBJECTS WITH THOUGHTS',
      'FLOATING WEIGHTLESSLY',
      'TRANSFORMING INTO DIFFERENT CREATURES'
    ] 
  }
]

// Color palettes for more variation
const colorPalettes = [
  // Purples and pinks
  ['rgba(230, 150, 230, 0.7)', 'rgba(210, 140, 240, 0.7)', 'rgba(180, 130, 230, 0.7)', 'rgba(200, 120, 210, 0.7)'],
  // Blues and cyans
  ['rgba(130, 170, 255, 0.7)', 'rgba(140, 200, 240, 0.7)', 'rgba(120, 180, 230, 0.7)', 'rgba(100, 160, 220, 0.7)'],
  // Pinks and reds
  ['rgba(255, 150, 180, 0.7)', 'rgba(240, 130, 150, 0.7)', 'rgba(230, 120, 170, 0.7)', 'rgba(220, 140, 160, 0.7)'],
  // Purples and blues
  ['rgba(180, 130, 230, 0.7)', 'rgba(160, 140, 240, 0.7)', 'rgba(140, 150, 230, 0.7)', 'rgba(170, 140, 220, 0.7)'],
  // Magentas and violets
  ['rgba(220, 120, 200, 0.7)', 'rgba(200, 110, 220, 0.7)', 'rgba(190, 130, 210, 0.7)', 'rgba(210, 120, 190, 0.7)']
]

// Brain outline path data (top view with two hemispheres)
const brainPathData = {
  // Left hemisphere
  leftHemisphere: [
    { x: 0.5, y: 0.2 },  // Top center
    { x: 0.45, y: 0.18 }, // Top curve left
    { x: 0.38, y: 0.17 },
    { x: 0.3, y: 0.18 },
    { x: 0.22, y: 0.2 },
    { x: 0.15, y: 0.25 },
    { x: 0.1, y: 0.32 },
    { x: 0.08, y: 0.4 },
    { x: 0.07, y: 0.5 },
    { x: 0.08, y: 0.6 },
    { x: 0.12, y: 0.7 },
    { x: 0.18, y: 0.78 },
    { x: 0.25, y: 0.82 },
    { x: 0.35, y: 0.84 },
    { x: 0.42, y: 0.85 },
    { x: 0.5, y: 0.85 }, // Bottom center
  ],
  // Right hemisphere
  rightHemisphere: [
    { x: 0.5, y: 0.2 },  // Top center
    { x: 0.55, y: 0.18 }, // Top curve right
    { x: 0.62, y: 0.17 },
    { x: 0.7, y: 0.18 },
    { x: 0.78, y: 0.2 },
    { x: 0.85, y: 0.25 },
    { x: 0.9, y: 0.32 },
    { x: 0.92, y: 0.4 },
    { x: 0.93, y: 0.5 },
    { x: 0.92, y: 0.6 },
    { x: 0.88, y: 0.7 },
    { x: 0.82, y: 0.78 },
    { x: 0.75, y: 0.82 },
    { x: 0.65, y: 0.84 },
    { x: 0.58, y: 0.85 },
    { x: 0.5, y: 0.85 }, // Bottom center
  ],
  // Central dividing line
  centralLine: [
    { x: 0.5, y: 0.2 },  // Top
    { x: 0.5, y: 0.85 }, // Bottom
  ]
}

export default function BrainNetworkAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState<{x: number, y: number} | null>(null)
  const [tooltipContent, setTooltipContent] = useState<{content: string, region: string}>({
    content: 'RESTING',
    region: ''
  })
  
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    
    setCanvasDimensions()
    window.addEventListener('resize', setCanvasDimensions)
    
    // Define brain regions for cluster assignment
    const regions = [
      { name: 'PREFRONTAL CORTEX', center: { x: 0.25, y: 0.3 }, radius: 0.15, colors: colorPalettes[0] },
      { name: 'VISUAL CORTEX', center: { x: 0.5, y: 0.75 }, radius: 0.15, colors: colorPalettes[1] },
      { name: 'TEMPORAL LOBE', center: { x: 0.2, y: 0.6 }, radius: 0.12, colors: colorPalettes[2] },
      { name: 'LIMBIC SYSTEM', center: { x: 0.5, y: 0.5 }, radius: 0.1, colors: colorPalettes[3] },
      { name: 'MOTOR CORTEX', center: { x: 0.75, y: 0.3 }, radius: 0.15, colors: colorPalettes[4] }
    ]
    
    // Function to check if a point is inside the brain outline
    const isInsideBrain = (x: number, y: number): boolean => {
      // Convert to normalized coordinates
      const nx = x / canvas.width
      const ny = y / canvas.height
      
      // Check if point is in left hemisphere
      const inLeft = isPointInPolygon(nx, ny, brainPathData.leftHemisphere)
      
      // Check if point is in right hemisphere
      const inRight = isPointInPolygon(nx, ny, brainPathData.rightHemisphere)
      
      return inLeft || inRight
    }
    
    // Create neuron clusters
    const clusters: Cluster[] = []
    const clusterCount = 300
    
    // Create clusters within the brain area
    let attemptsCount = 0
    while (clusters.length < clusterCount && attemptsCount < 1000) {
      attemptsCount++
      
      // Random position within the canvas
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      
      // Only add if inside brain outline
      if (isInsideBrain(x, y)) {
        // Determine which region this cluster belongs to
        let clusterRegion = 'GENERAL'
        let clusterColor = 'rgba(180, 150, 220, 0.7)'
        let dreamContent = 'EXPLORING UNKNOWN REALMS'
        
        const nx = x / canvas.width
        const ny = y / canvas.height
        
        for (const region of regions) {
          const dx = nx - region.center.x
          const dy = ny - region.center.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < region.radius) {
            clusterRegion = region.name
            clusterColor = region.colors[Math.floor(Math.random() * region.colors.length)]
            
            const regionDreams = brainRegions.find(r => r.name === region.name)?.dreams || []
            dreamContent = regionDreams[Math.floor(Math.random() * regionDreams.length)]
            break
          }
        }
        
        // Vary the size - many small neurons with a few larger ones
        const size = Math.random() < 0.8 
          ? 1 + Math.random() * 2 // 80% small neurons (1-3px)
          : 3 + Math.random() * 3 // 20% larger neurons (3-6px)
        
        clusters.push({
          x,
          y,
          radius: size,
          connections: [],
          active: false,
          activationTime: 0,
          color: clusterColor,
          region: clusterRegion,
          dreamContent
        })
      }
    }
    
    // Create connections between clusters
    clusters.forEach((cluster, i) => {
      // Connect to 2-5 nearby clusters
      const connectionCount = 2 + Math.floor(Math.random() * 4)
      
      // Calculate distances to all other clusters
      const distances = clusters.map((otherCluster, j) => {
        if (i === j) return { index: j, distance: Infinity }
        
        const dx = otherCluster.x - cluster.x
        const dy = otherCluster.y - cluster.y
        return {
          index: j,
          distance: Math.sqrt(dx * dx + dy * dy)
        }
      })
      
      // Sort by distance
      distances.sort((a, b) => a.distance - b.distance)
      
      // Connect to the closest clusters
      for (let j = 0; j < Math.min(connectionCount, distances.length - 1); j++) {
        cluster.connections.push(distances[j].index)
      }
    })
    
    // Handle click to activate clusters
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      // Find clusters near the click
      const clickRadius = 50 // Larger activation radius
      let activatedCount = 0
      
      clusters.forEach(cluster => {
        const dx = cluster.x - x
        const dy = cluster.y - y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < clickRadius && activatedCount < 5) {
          cluster.active = true
          cluster.activationTime = performance.now()
          activatedCount++
        }
      })
      
      // If no clusters were directly clicked, activate the closest one
      if (activatedCount === 0) {
        let closestCluster = null
        let minDistance = Infinity
        
        clusters.forEach(cluster => {
          const dx = cluster.x - x
          const dy = cluster.y - y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < minDistance) {
            closestCluster = cluster
            minDistance = distance
          }
        })
        
        if (closestCluster) {
          closestCluster.active = true
          closestCluster.activationTime = performance.now()
        }
      }
    }
    
    // Handle mouse move to update cursor position and find active clusters
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      // Update mouse position for tooltip
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      // Find the closest active cluster for tooltip content
      let closestCluster = null
      let minDistance = 40 // Detection radius
      
      clusters.forEach(cluster => {
        // Only consider active or recently active clusters (within last 2 seconds)
        const isRecentlyActive = cluster.active || 
          (performance.now() - cluster.activationTime < 2000 && cluster.activationTime > 0)
        
        if (isRecentlyActive) {
          const dx = cluster.x - x
          const dy = cluster.y - y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < minDistance) {
            closestCluster = cluster
            minDistance = distance
          }
        }
      })
      
      if (closestCluster) {
        setTooltipContent({
          content: closestCluster.dreamContent,
          region: closestCluster.region
        })
      } else {
        // Set to resting state when not over an active cluster
        setTooltipContent({
          content: 'RESTING',
          region: ''
        })
      }
    }
    
    // Handle mouse leave
    const handleMouseLeave = () => {
      setMousePosition(null)
    }
    
    // Add event listeners to the container instead of just the canvas
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)
    canvas.addEventListener('click', handleClick)
    
    // Draw the brain outline
    const drawBrainOutline = () => {
      ctx.strokeStyle = 'rgba(180, 150, 220, 0.4)'
      ctx.lineWidth = 1.5
      
      // Draw left hemisphere with bezier curves
      ctx.beginPath()
      ctx.moveTo(0.5 * canvas.width, 0.2 * canvas.height) // Top center
      
      // Top left curve
      ctx.bezierCurveTo(
        0.4 * canvas.width, 0.15 * canvas.height, // control point 1
        0.3 * canvas.width, 0.15 * canvas.height, // control point 2
        0.2 * canvas.width, 0.25 * canvas.height  // end point
      )
      
      // Left side curve
      ctx.bezierCurveTo(
        0.1 * canvas.width, 0.35 * canvas.height, // control point 1
        0.05 * canvas.width, 0.45 * canvas.height, // control point 2
        0.1 * canvas.width, 0.6 * canvas.height  // end point
      )
      
      // Bottom left curve
      ctx.bezierCurveTo(
        0.15 * canvas.width, 0.75 * canvas.height, // control point 1
        0.3 * canvas.width, 0.85 * canvas.height, // control point 2
        0.5 * canvas.width, 0.85 * canvas.height  // end point (bottom center)
      )
      
      ctx.stroke()
      
      // Draw right hemisphere with bezier curves
      ctx.beginPath()
      ctx.moveTo(0.5 * canvas.width, 0.2 * canvas.height) // Top center
      
      // Top right curve
      ctx.bezierCurveTo(
        0.6 * canvas.width, 0.15 * canvas.height, // control point 1
        0.7 * canvas.width, 0.15 * canvas.height, // control point 2
        0.8 * canvas.width, 0.25 * canvas.height  // end point
      )
      
      // Right side curve
      ctx.bezierCurveTo(
        0.9 * canvas.width, 0.35 * canvas.height, // control point 1
        0.95 * canvas.width, 0.45 * canvas.height, // control point 2
        0.9 * canvas.width, 0.6 * canvas.height  // end point
      )
      
      // Bottom right curve
      ctx.bezierCurveTo(
        0.85 * canvas.width, 0.75 * canvas.height, // control point 1
        0.7 * canvas.width, 0.85 * canvas.height, // control point 2
        0.5 * canvas.width, 0.85 * canvas.height  // end point (bottom center)
      )
      
      ctx.stroke()
      
      // Draw central dividing line
      ctx.beginPath()
      ctx.setLineDash([5, 5])
      ctx.moveTo(0.5 * canvas.width, 0.2 * canvas.height)
      ctx.lineTo(0.5 * canvas.width, 0.85 * canvas.height)
      ctx.stroke()
      ctx.setLineDash([])
    }
    
    // Animation loop
    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw brain outline
      drawBrainOutline()
      
      // Process activations - slower propagation
      clusters.forEach((cluster) => {
        if (cluster.active) {
          const activationAge = timestamp - cluster.activationTime
          
          // Deactivate after a longer time
          if (activationAge > 4000) {
            cluster.active = false
          }
          
          // Propagate activation to connected clusters - slower
          if (activationAge > 300 && activationAge < 800) {
            cluster.connections.forEach(connIndex => {
              if (!clusters[connIndex].active && Math.random() < 0.2) { // Only 20% chance to propagate
                clusters[connIndex].active = true
                clusters[connIndex].activationTime = timestamp
              }
            })
          }
        }
      })
      
      // Draw connections
      clusters.forEach((cluster) => {
        cluster.connections.forEach(connIndex => {
          const otherCluster = clusters[connIndex]
          
          // Determine if this connection is active
          const isActive = cluster.active && otherCluster.active
          
          ctx.beginPath()
          ctx.moveTo(cluster.x, cluster.y)
          ctx.lineTo(otherCluster.x, otherCluster.y)
          
          if (isActive) {
            // Active connection
            const activationAge = Math.min(
              timestamp - cluster.activationTime,
              timestamp - otherCluster.activationTime
            )
            
            const alpha = Math.max(0, 1 - activationAge / 4000)
            ctx.strokeStyle = `rgba(255, 200, 220, ${alpha * 0.7})`
            ctx.lineWidth = 1.5
          } else {
            // Inactive connection - very subtle
            ctx.strokeStyle = 'rgba(200, 150, 220, 0.1)'
            ctx.lineWidth = 0.5
          }
          
          ctx.stroke()
        })
      })
      
      // Draw clusters
      clusters.forEach((cluster) => {
        ctx.beginPath()
        
        if (cluster.active) {
          // Active cluster with subtle pulsating effect
          const activationAge = timestamp - cluster.activationTime
          const pulseScale = 1 + 0.3 * Math.sin(activationAge / 300) // Reduced pulse scale
          const alpha = Math.max(0.3, 1 - activationAge / 4000)
          
          ctx.arc(cluster.x, cluster.y, cluster.radius * pulseScale, 0, Math.PI * 2)
          ctx.fillStyle = cluster.color.replace(/[\d.]+\)$/, alpha.toString() + ')')
          
          // Add subtle glow for active clusters
          const glow = ctx.createRadialGradient(
            cluster.x, cluster.y, 0,
            cluster.x, cluster.y, cluster.radius * 4
          )
          glow.addColorStop(0, cluster.color.replace(/[\d.]+\)$/, (alpha * 0.6) + ')'))
          glow.addColorStop(1, cluster.color.replace(/[\d.]+\)$/, '0)'))
          
          ctx.save()
          ctx.globalCompositeOperation = 'lighter'
          ctx.fillStyle = glow
          ctx.fill()
          ctx.restore()
        } else {
          // Inactive cluster
          ctx.arc(cluster.x, cluster.y, cluster.radius, 0, Math.PI * 2)
          ctx.fillStyle = cluster.color.replace(/[\d.]+\)$/, '0.3)')
        }
        
        ctx.fill()
      })
      
      // Randomly activate clusters occasionally for ambient effect - less frequent
      if (Math.random() < 0.003) {
        const randomIndex = Math.floor(Math.random() * clusters.length)
        if (!clusters[randomIndex].active) {
          clusters[randomIndex].active = true
          clusters[randomIndex].activationTime = timestamp
        }
      }
      
      requestAnimationFrame(animate)
    }
    
    const animationId = requestAnimationFrame(animate)
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('click', handleClick)
      cancelAnimationFrame(animationId)
    }
  }, [])
  
  // Helper function to check if a point is inside a polygon
  function isPointInPolygon(x: number, y: number, polygon: {x: number, y: number}[]): boolean {
    let inside = false
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].x, yi = polygon[i].y
      const xj = polygon[j].x, yj = polygon[j].y
      
      const intersect = ((yi > y) !== (yj > y)) &&
        (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
      if (intersect) inside = !inside
    }
    return inside
  }
  
  return (
    <div ref={containerRef} className="relative w-full h-full">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full cursor-pointer"
      />
      
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 to-purple-900/10 pointer-events-none" />
      
      {/* Dream content tooltip that follows cursor */}
      {mousePosition && (
        <motion.div 
          className="fixed z-50 bg-gray-900/90 text-white px-4 py-2 rounded-md pointer-events-none max-w-[280px] backdrop-blur-sm border border-gray-700/50"
          style={{ 
            left: `${mousePosition.x + 15}px`, 
            top: `${mousePosition.y + 15}px`,
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15 }}
        >
          {tooltipContent.region && (
            <div className="text-xs text-purple-300 mb-1 font-medium tracking-wider">
              {tooltipContent.region}
            </div>
          )}
          <div className="text-sm font-medium tracking-wide">
            {tooltipContent.content === 'RESTING' ? (
              <em>RESTING</em>
            ) : (
              tooltipContent.content
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
} 