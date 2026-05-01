import dynamic from 'next/dynamic'
import AshCanvas from '@/components/AshCanvas'
import LoadingScreen from '@/components/LoadingScreen'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import DistrictsSection from '@/components/DistrictsSection'

// Lazy-load heavy interactive components — reduces initial JS bundle
// These are below the fold and don't need to be parsed on first paint
const QuizSection        = dynamic(() => import('@/components/QuizSection'))
const RelationshipMap    = dynamic(() => import('@/components/RelationshipMap'))
const TimelineSection    = dynamic(() => import('@/components/TimelineSection'))
const HangingTreePlayer  = dynamic(() => import('@/components/HangingTreePlayer'))
const MorseEasterEgg     = dynamic(() => import('@/components/MorseEasterEgg'))
const SparksSection      = dynamic(() => import('@/components/SparksSection'))
const TributesSection    = dynamic(() => import('@/components/TributesSection'))
const ManifestoSection   = dynamic(() => import('@/components/ManifestoSection'))
const Footer             = dynamic(() => import('@/components/Footer'))

export default function Home() {
  return (
    <>
      {/* Loading screen */}
      <LoadingScreen />

      {/* Ambient falling ash particles */}
      <AshCanvas />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main className="relative">
        <HeroSection />
        <DistrictsSection />
        <QuizSection />
        <RelationshipMap />
        <TimelineSection />
        <HangingTreePlayer />
        <MorseEasterEgg />
        <SparksSection />
        <TributesSection />
        <ManifestoSection />
      </main>

      <Footer />
    </>
  )
}
