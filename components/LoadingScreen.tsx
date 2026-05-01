'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Animation timing — single source of truth shared with HeroSection delays
export const LOADING_DURATION_MS = 1750 // 350ms × 5 steps

const WING_FRAMES = [
  { left: 'M24 26 Q18 18 8 14 Q13 21 13 26 Q18 23 24 26Z', right: 'M24 26 Q30 18 40 14 Q35 21 35 26 Q30 23 24 26Z' },
  { left: 'M24 26 Q14 22 4 20 Q10 25 11 28 Q17 26 24 26Z', right: 'M24 26 Q34 22 44 20 Q38 25 37 28 Q31 26 24 26Z' },
  { left: 'M24 26 Q12 28 2 30 Q9 28 11 30 Q17 28 24 26Z',  right: 'M24 26 Q36 28 46 30 Q39 28 37 30 Q31 28 24 26Z' },
]

function FlyingMockingjay() {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setFrame((f: number) => (f + 1) % WING_FRAMES.length), 280)
    return () => clearInterval(t)
  }, [])
  const { left, right } = WING_FRAMES[frame]
  return (
    <svg viewBox="0 0 48 48" className="w-16 h-16 mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="ls-body" cx="50%" cy="40%" r="55%">
          <stop offset="0%"   stopColor="#ffb347" />
          <stop offset="55%"  stopColor="#ff6b00" />
          <stop offset="100%" stopColor="#cc2200" />
        </radialGradient>
      </defs>
      <motion.path d={left}  fill="url(#ls-body)" animate={{ d: left }}  transition={{ duration: 0.25 }} />
      <motion.path d={right} fill="url(#ls-body)" animate={{ d: right }} transition={{ duration: 0.25 }} />
      <ellipse cx="24" cy="29" rx="3.5" ry="5" fill="url(#ls-body)" />
      <circle  cx="24" cy="21" r="3.8"           fill="url(#ls-body)" />
      <path d="M26.5 20 L31 22 L26.5 24Z" fill="#d4af37" />
      <circle cx="26" cy="20" r="1.1" fill="#1a0600" />
      <circle cx="26.4" cy="19.5" r="0.38" fill="#fff" />
      <path d="M24 34 Q21 39 19 44 Q22 39 24 37 Q26 39 29 44 Q27 39 24 34Z" fill="url(#ls-body)" opacity="0.88" />
    </svg>
  )
}

const REPLAY_EVENT = 'mockingjay:replay-intro'

export function triggerReplay() {
  window.dispatchEvent(new Event(REPLAY_EVENT))
}

function LoadingOverlay({ onDone }: { onDone: () => void }) {
  const [progress,   setProgress]   = useState(0)
  const [statusText, setStatusText] = useState('Initializing secure connection...')

  const messages = [
    'Connecting to District 12...',
    'Bypassing Capitol firewall...',
    'Decrypting rebel transmissions...',
    'The Mockingjay lives...',
  ]

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setProgress(100)
      setStatusText(messages[3])
      setTimeout(onDone, 200)
      return
    }

    let step = 0
    const interval = setInterval(() => {
      step++
      setProgress(step * 25)
      if (step < messages.length) setStatusText(messages[step])
      if (step >= 4) {
        clearInterval(interval)
        setTimeout(onDone, 400)
      }
    }, 350)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[9999] bg-ash-black flex flex-col items-center justify-center"
      role="status"
      aria-label="Loading Mockingjay Memorial"
      aria-live="polite"
    >
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {Array.from({ length: 80 }).map((_, i) => (
          <div key={i} className="absolute w-full h-px bg-white/[0.02]" style={{ top: `${i * 1.25}%` }} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center px-8 max-w-md w-full"
      >
        <div className="mb-8">
          <FlyingMockingjay />
        </div>

        <div className="font-cinzel mb-2 text-flame-orange text-sm tracking-[0.3em] uppercase">
          DISTRICT 12 REBEL NETWORK
        </div>
        <div className="text-smoke text-xs font-noto mb-8 tracking-widest">
          第十二區反抗網絡
        </div>

        <motion.div
          key={statusText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-noto text-sm text-gold mb-6 h-5"
          aria-live="polite"
        >
          {statusText}
        </motion.div>

        <div className="w-full h-1 bg-charcoal rounded-full overflow-hidden mb-2" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <motion.div
            className="h-full bg-gradient-to-r from-flame-red via-flame-orange to-gold"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
        <div className="text-ash-gray text-xs font-cinzel tracking-widest mb-6">
          {progress}%
        </div>

        {/* Skip intro button */}
        <button
          onClick={onDone}
          className="font-cinzel text-[10px] tracking-[0.3em] text-smoke/50 hover:text-smoke transition-colors uppercase focus-ring rounded-sm px-2 py-1"
          aria-label="Skip intro animation"
        >
          Skip — 跳過
        </button>
      </motion.div>
    </motion.div>
  )
}

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [key,     setKey]     = useState(0)

  const handleDone = useCallback(() => setVisible(false), [])

  useEffect(() => {
    const handler = () => {
      setKey((k: number) => k + 1)
      setVisible(true)
    }
    window.addEventListener(REPLAY_EVENT, handler)
    return () => window.removeEventListener(REPLAY_EVENT, handler)
  }, [])

  return (
    <>
      <AnimatePresence>
        {visible && (
          <LoadingOverlay key={key} onDone={handleDone} />
        )}
      </AnimatePresence>

      {/* Hidden replay button — appears as a tiny corner icon after loading ends */}
      <AnimatePresence>
        {!visible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 2, duration: 0.5 }}
            onClick={() => triggerReplay()}
            title="Replay intro — 重播開場"
            className="fixed bottom-5 right-5 z-40 group w-9 h-9 flex items-center justify-center border border-flame-orange/20 bg-ash-black/80 rounded-full hover:border-flame-orange/60 hover:bg-flame-orange/10 transition-all duration-300 focus-ring"
            aria-label="Replay intro"
          >
            <svg viewBox="0 0 18 18" className="w-4 h-4 text-flame-orange/40 group-hover:text-flame-orange transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3.5 9 A5.5 5.5 0 1 1 6 13.5" />
              <polyline points="1,6 3.5,9 6,6" />
            </svg>
            <span className="absolute right-11 bottom-1 whitespace-nowrap font-cinzel text-[9px] tracking-widest text-flame-orange/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              REPLAY
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
