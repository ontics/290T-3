import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function setupScroll(containerRef: React.RefObject<HTMLDivElement>) {
  if (typeof window === 'undefined') return () => {}
  
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger)
  
  // Set up section highlighting without snapping
  const sections = document.querySelectorAll('section[id]')
  
  // Create markers for each section to track active state
  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 50%',
      end: 'bottom 50%',
      markers: false,
      onToggle: (self) => {
        if (self.isActive && section.id) {
          // Update active section without forcing scroll
          document.querySelectorAll('.section-nav-link').forEach(el => {
            el.classList.remove('active')
          })
          document.querySelector(`[data-section="${section.id}"]`)?.classList.add('active')
        }
      }
    })
  })
  
  // Make sure the hero illustration stays fixed
  const heroSection = document.getElementById('hero')
  const heroIllustration = heroSection?.querySelector('.hero-illustration-container')
  
  if (heroIllustration) {
    heroIllustration.classList.add('sticky-top')
  }
  
  // Clean up function
  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    
    if (heroIllustration) {
      heroIllustration.classList.remove('sticky-top')
    }
  }
} 