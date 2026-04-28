'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const LINES = [
  'ACCESSING PANEM NETWORK...',
  'DISTRICT NODE: NOT FOUND',
  'CAPITOL FIREWALL DETECTED',
  'THIS SECTOR HAS BEEN OCCUPIED.',
  '此區域已被首都佔領。',
]

export default function NotFound() {
  const [shown, setShown] = useState<string[]>([])

  useEffect(() => {
    LINES.forEach((line, i) => {
      setTimeout(() => setShown((prev) => [...prev, line]), i * 600 + 400)
    })
  }, [])

  return (
    <div className="min-h-screen bg-ash-black flex flex-col items-center justify-center px-6 text-center">
      {/* Scanlines */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {Array.from({ length: 60 }).map((_, i) => (
          <div key={i} className="absolute w-full h-px bg-white/[0.02]" style={{ top: `${i * 1.67}%` }} />
        ))}
      </div>

      <div className="relative z-10 max-w-lg w-full">
        {/* Glitchy 404 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative mb-8"
        >
          <motion.h1
            className="font-cinzel font-black text-[6rem] md:text-[8rem] leading-none text-flame-orange/20 select-none"
            animate={{ x: [0, -2, 2, 0], skewX: [0, -1, 1, 0] }}
            transition={{ duration: 0.12, repeat: Infinity, repeatDelay: 3 }}
          >
            404
          </motion.h1>
          <motion.h1
            className="font-cinzel font-black text-[6rem] md:text-[8rem] leading-none text-flame-orange absolute inset-0 flame-text"
            animate={{ x: [0, 2, -2, 0], opacity: [1, 0.8, 1] }}
            transition={{ duration: 0.12, repeat: Infinity, repeatDelay: 3 }}
          >
            404
          </motion.h1>
        </motion.div>

        {/* Terminal lines */}
        <div className="border border-flame-orange/20 bg-charcoal/60 rounded-sm p-6 mb-8 text-left font-cinzel text-xs tracking-widest">
          <div className="text-flame-orange/60 mb-3">{'>'} DISTRICT 12 REBEL NETWORK — TERMINAL v1.3</div>
          {shown.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`mb-1.5 ${i === LINES.length - 1 ? 'text-red-400' : i === LINES.length - 2 ? 'text-gold/70 font-noto normal-case tracking-normal text-xs' : 'text-smoke'}`}
            >
              <span className="text-flame-orange/40 mr-2">{'>'}</span>
              {line}
              {i === shown.length - 1 && <span className="animate-pulse ml-1">█</span>}
            </motion.div>
          ))}
        </div>

        {/* Mockingjay icon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
          className="mb-8"
        >
          <svg viewBox="0 0 48 48" className="w-12 h-12 mx-auto fill-none opacity-60" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="nf-body" cx="50%" cy="40%" r="55%">
                <stop offset="0%" stopColor="#ffb347" />
                <stop offset="55%" stopColor="#ff6b00" />
                <stop offset="100%" stopColor="#cc2200" />
              </radialGradient>
            </defs>
            <path d="M24 22 Q16 14 4 10 Q10 18 10 24 Q17 20 24 22Z" fill="url(#nf-body)" />
            <path d="M24 22 Q32 14 44 10 Q38 18 38 24 Q31 20 24 22Z" fill="url(#nf-body)" />
            <ellipse cx="24" cy="27" rx="3.5" ry="5" fill="url(#nf-body)" />
            <circle cx="24" cy="19" r="3.8" fill="url(#nf-body)" />
            <path d="M26.5 18 L31.5 20 L26.5 22Z" fill="#d4af37" />
            <circle cx="26" cy="18.5" r="1.1" fill="#1a0600" />
            <path d="M24 32 Q21 38 19 44 Q22 38 24 35 Q26 38 29 44 Q27 38 24 32Z" fill="url(#nf-body)" opacity="0.88" />
            <line x1="14" y1="36" x2="34" y2="36" stroke="#d4af37" strokeWidth="1.2" />
            <path d="M32 33.5 L35.5 36 L32 38.5Z" fill="#d4af37" />
            <path d="M16 33.5 L12.5 36 L16 38.5Z" fill="#d4af37" />
          </svg>
        </motion.div>

        {/* Return link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 0.8 }}
        >
          <p className="font-noto text-sm text-smoke mb-6">
            此頁面不存在，但反抗的火焰仍在燃燒。
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-3 px-6 py-3 border border-flame-orange/50 text-flame-orange font-cinzel text-xs tracking-[0.25em] hover:bg-flame-orange/10 hover:border-flame-orange transition-all duration-300 rounded-sm uppercase"
          >
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-current">
              <path d="M8 1 L1 8 L8 15 M1 8 L15 8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
            Return to District 12
            <span className="font-noto normal-case tracking-normal text-gold/70">返回首頁</span>
          </a>
        </motion.div>
      </div>
    </div>
  )
}
