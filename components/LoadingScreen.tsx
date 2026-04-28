'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
    let step = 0
    const interval = setInterval(() => {
      step++
      setProgress(step * 25)
      if (step < messages.length) setStatusText(messages[step])
      if (step >= 4) {
        clearInterval(interval)
        setTimeout(() => setVisible(false), 600)
      }
    }, 550)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] bg-ash-black flex flex-col items-center justify-center"
        >
          {/* Scanline overlay */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 80 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-px bg-white/[0.02]"
                style={{ top: `${i * 1.25}%` }}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center px-8 max-w-md w-full"
          >
            {/* Mockingjay silhouette */}
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mb-8"
            >
              <svg viewBox="0 0 100 100" className="w-16 h-16 mx-auto" fill="none">
                <circle cx="50" cy="35" r="8" fill="#ff6b00" opacity="0.8" />
                <path d="M50 43 L50 70" stroke="#ff6b00" strokeWidth="3" />
                <path d="M50 55 L35 65" stroke="#ff6b00" strokeWidth="2.5" />
                <path d="M50 55 L65 65" stroke="#ff6b00" strokeWidth="2.5" />
                <path d="M50 70 L40 82" stroke="#ff6b00" strokeWidth="2.5" />
                <path d="M50 70 L60 82" stroke="#ff6b00" strokeWidth="2.5" />
                <path d="M30 30 Q20 15 35 25 Q25 10 45 28" fill="#ff6b00" opacity="0.7" />
                <path d="M70 30 Q80 15 65 25 Q75 10 55 28" fill="#ff6b00" opacity="0.7" />
              </svg>
            </motion.div>

            {/* Terminal text */}
            <div className="font-cinzel mb-2 text-flame-orange text-sm tracking-[0.3em] uppercase">
              DISTRICT 12 REBEL NETWORK
            </div>
            <div className="text-smoke text-xs font-noto mb-8 tracking-widest">
              第十二區反抗網絡
            </div>

            {/* Status */}
            <motion.div
              key={statusText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-noto text-sm text-gold mb-6 h-5"
            >
              {statusText}
            </motion.div>

            {/* Progress bar */}
            <div className="w-full h-1 bg-charcoal rounded-full overflow-hidden mb-2">
              <motion.div
                className="h-full bg-gradient-to-r from-flame-red via-flame-orange to-gold"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
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
