import { StaticImageData } from 'next/image'

// Create a type-safe image object
const createImageObject = (src: string, width: number = 800, height: number = 600): StaticImageData => ({
  src,
  height,
  width,
})

// Use Unsplash images for placeholders
export const placeholderImages = {
  // Dream marketplace images
  dreams: {
    stressRelief: createImageObject('https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?q=80&w=800&h=600&auto=format'),
    traumaProcessing: createImageObject('https://images.unsplash.com/photo-1502230831726-fe5549140034?q=80&w=800&h=600&auto=format'),
    deepRelaxation: createImageObject('https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?q=80&w=800&h=600&auto=format'),
    anxietyManagement: createImageObject('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&h=600&auto=format'),
    languageLearning: createImageObject('https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&h=600&auto=format'),
    memoryEnhancement: createImageObject('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&h=600&auto=format'),
    creativeProblemSolving: createImageObject('https://images.unsplash.com/photo-1456428746267-a1756408f782?q=80&w=800&h=600&auto=format'),
    adventureExploration: createImageObject('https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&h=600&auto=format'),
  },
  
  // Layered section images
  product: {
    main: '/images/product/main.jpg',
    overlay1: '/images/product/overlay1.jpg',
    overlay2: '/images/product/overlay2.jpg',
    overlay3: '/images/product/overlay3.jpg',
  }
} 