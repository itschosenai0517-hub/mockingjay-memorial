import AshCanvas from '@/components/AshCanvas'
import LoadingScreen from '@/components/LoadingScreen'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import DistrictsSection from '@/components/DistrictsSection'
import QuizSection from '@/components/QuizSection'
import MorseEasterEgg from '@/components/MorseEasterEgg'
import HangingTreePlayer from '@/components/HangingTreePlayer'
import TimelineSection from '@/components/TimelineSection'
import RelationshipMap from '@/components/RelationshipMap'
import SparksSection from '@/components/SparksSection'
import TributesSection from '@/components/TributesSection'
import ManifestoSection from '@/components/ManifestoSection'
import Footer from '@/components/Footer'

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
