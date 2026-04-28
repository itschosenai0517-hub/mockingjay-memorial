'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// B: Wing animation frames (simplified path morph via opacity layers)
const WING_FRAMES = [
  // wings up
  { left: 'M24 26 Q18 18 8 14 Q13 21 13 26 Q18 23 24 26Z', right: 'M24 26 Q30 18 40 14 Q35 21 35 26 Q30 23 24 26Z' },
  // wings mid
  { left: 'M24 26 Q14 22 4 20 Q10 25 11 28 Q17 26 24 26Z', right: 'M24 26 Q34 22 44 20 Q38 25 37 28 Q31 26 24 26Z' },
  // wings down
  { left: 'M24 26 Q12 28 2 30 Q9 28 11 30 Q17 28 24 26Z', right: 'M24 26 Q36 28 46 30 Q39 28 37 30 Q31 28 24 26Z' },
]

function FlyingMockingjay() {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setFrame((f) => (f + 1) % WING_FRAMES.length), 280)
    return () => clearInterval(t)
  }, [])
  const { left, right } = WING_FRAMES[frame]
  return (
    <svg viewBox="0 0 48 48" className="w-16 h-16 mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ls-body" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#ffb347" />
          <stop offset="55%" stopColor="#ff6b00" />
          <stop offset="100%" stopColor="#cc2200" />
        </radialGradient>
      </defs>
      <motion.path d={left} fill="url(#ls-body)" animate={{ d: left }} transition={{ duration: 0.25 }} />
      <motion.path d={right} fill="url(#ls-body)" animate={{ d: right }} transition={{ duration: 0.25 }} />
      <ellipse cx="24" cy="29" rx="3.5" ry="5" fill="url(#ls-body)" />
      <circle cx="24" cy="21" r="3.8" fill="url(#ls-body)" />
      <path d="M26.5 20 L31 22 L26.5 24Z" fill="#d4af37" />
      <circle cx="26" cy="20" r="1.1" fill="#1a0600" />
      <circle cx="26.4" cy="19.5" r="0.38" fill="#fff" />
      <path d="M24 34 Q21 39 19 44 Q22 39 24 37 Q26 39 29 44 Q27 39 24 34Z" fill="url(#ls-body)" opacity="0.88" />
    </svg>
  )
}

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState('Initializing secure connection...')

  const messages = [
    'Connecting to District 12...',
    'Bypassing Capitol firewall...',
    'Decrypting rebel transmissions...',
    'The Mockingjay lives...',
  ]

  useEffect(() => {
    // B: reduced motion check
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setProgress(100)
      setStatusText(messages[3])
      setTimeout(() => setVisible(false), 400)
      return
    }

    // B: shorter total duration (~1.5s instead of 3s+)
    let step = 0
    const interval = setInterval(() => {
      step++
      setProgress(step * 25)
      if (step < messages.length) setStatusText(messages[step])
      if (step >= 4) {
        clearInterval(interval)
        setTimeout(() => setVisible(false), 400)
      }
    }, 350)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] bg-ash-black flex flex-col items-center justify-center"
        >
          {/* Scanlines */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
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
            {/* B: Flapping Mockingjay */}
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
            >
              {statusText}
            </motion.div>

            <div className="w-full h-1 bg-charcoal rounded-full overflow-hidden mb-2">
              <motion.div
                className="h-full bg-gradient-to-r from-flame-red via-flame-orange to-gold"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>
            <div className="text-ash-gray text-xs font-cinzel tracking-widest">
              {progress}%
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
