import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Somnium | Dream Technology',
  description: 'Experience the future of sleep and dream technology with Somnium\'s Nightcap neural interface.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/images/somnium-logo-white.png" type="image/png" />
      </head>
      <body className={`${inter.className} bg-[#050510] text-white`}>
        {children}
      </body>
    </html>
  )
} 