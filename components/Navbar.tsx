'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '#hero', en: 'Home', zh: '首頁' },
  { href: '#districts', en: 'Districts', zh: '十二個區' },
  { href: '#sparks', en: 'Sparks', zh: '火花語錄' },
  { href: '#tributes', en: 'Tributes', zh: '角色致敬' },
  { href: '#manifesto', en: 'Manifesto', zh: '反抗宣言' },
]

// A: Realistic Mockingjay icon – wings spread, beak right, arrow in talons
export function MockingjayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="nb-body" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#ffb347" />
          <stop offset="50%" stopColor="#ff6b00" />
          <stop offset="100%" stopColor="#cc2200" />
        </radialGradient>
        <filter id="nb-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.8" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Left wing */}
      <path d="M24 22 Q16 14 4 10 Q10 18 10 24 Q17 20 24 22Z" fill="url(#nb-body)" filter="url(#nb-glow)" />
      <path d="M24 22 Q13 18 2 13 Q8 22 9 27 Q16 23 24 22Z" fill="#ff6b00" opacity="0.6" />
      {/* Right wing */}
      <path d="M24 22 Q32 14 44 10 Q38 18 38 24 Q31 20 24 22Z" fill="url(#nb-body)" filter="url(#nb-glow)" />
      <path d="M24 22 Q35 18 46 13 Q40 22 39 27 Q32 23 24 22Z" fill="#ff6b00" opacity="0.6" />
      {/* Body */}
      <ellipse cx="24" cy="27" rx="4" ry="6" fill="url(#nb-body)" filter="url(#nb-glow)" />
      {/* Head */}
      <circle cx="24" cy="19" r="4.2" fill="url(#nb-body)" filter="url(#nb-glow)" />
      {/* Crest */}
      <path d="M22 15 Q21 10 24 12 Q23 9 25 11 Q24 8 27 11" stroke="#ff9500" strokeWidth="0.8" fill="none" strokeLinecap="round" />
      {/* Beak – right */}
      <path d="M27.5 18 L33.5 20 L27.5 22Z" fill="#d4af37" />
      {/* Eye */}
      <circle cx="27" cy="18.5" r="1.3" fill="#1a0600" />
      <circle cx="27.5" cy="18" r="0.45" fill="#ffffff" />
      {/* Tail */}
      <path d="M24 33 Q20 40 18 46 Q22 40 24 36 Q26 40 30 46 Q28 40 24 33Z" fill="url(#nb-body)" opacity="0.9" />
      {/* Arrow */}
      <line x1="13" y1="36" x2="35" y2="36" stroke="#d4af37" strokeWidth="1.2" />
      <path d="M32.5 33.5 L36 36 L32.5 38.5Z" fill="#d4af37" />
      <path d="M15.5 33.5 L12 36 L15.5 38.5Z" fill="#d4af37" />
      <line x1="13" y1="34.5" x2="13" y2="37.5" stroke="#d4af37" strokeWidth="0.8" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLinkClick = () => setMobileOpen(false)

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'navbar-blur py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <MockingjayIcon className="w-9 h-9 drop-shadow-[0_0_6px_rgba(255,107,0,0.7)] group-hover:drop-shadow-[0_0_12px_rgba(255,107,0,1)] transition-all duration-300" />
            <div>
              <div className="font-cinzel text-xs font-bold text-flame-orange tracking-widest group-hover:text-gold transition-colors">
                MOCKINGJAY
              </div>
              <div className="font-noto text-[9px] text-smoke tracking-wider">反抗之鳥</div>
            </div>
          </a>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="group flex flex-col items-center gap-0.5">
                  <span className="font-cinzel text-xs tracking-[0.15em] text-smoke group-hover:text-flame-orange transition-colors uppercase">
                    {link.en}
                  </span>
                  <span className="font-noto text-[10px] text-ash-gray group-hover:text-gold transition-colors">
                    {link.zh}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* C: Mobile three-finger salute button – now functional */}
          <button
            className="md:hidden select-none focus:outline-none"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="開啟選單"
          >
            <svg viewBox="0 0 36 44" className="w-7 h-8 fill-flame-orange/80" xmlns="http://www.w3.org/2000/svg">
              <rect x="8" y="22" width="20" height="16" rx="4" />
              <rect x="10" y="8" width="5" height="16" rx="2.5" />
              <rect x="16.5" y="5" width="5" height="19" rx="2.5" />
              <rect x="23" y="8" width="5" height="16" rx="2.5" />
              <rect x="4" y="26" width="5" height="8" rx="2.5" transform="rotate(-15 6 30)" />
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* C: Mobile slide-out drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-ash-black border-l border-flame-orange/20 flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-ash-gray/20">
                <div className="flex items-center gap-3">
                  <MockingjayIcon className="w-8 h-8 drop-shadow-[0_0_6px_rgba(255,107,0,0.7)]" />
                  <span className="font-cinzel text-xs text-flame-orange tracking-widest">MENU</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="關閉選單"
                  className="text-smoke hover:text-flame-orange transition-colors text-xl leading-none"
                >
                  ✕
                </button>
              </div>
              <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={handleLinkClick}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.3 }}
                    className="group flex items-center gap-4 py-4 border-b border-ash-gray/10 last:border-none"
                  >
                    <span className="w-5 h-px bg-flame-orange/40 group-hover:w-8 group-hover:bg-flame-orange transition-all duration-300" />
                    <div>
                      <div className="font-cinzel text-sm tracking-[0.2em] text-smoke group-hover:text-flame-orange transition-colors uppercase">
                        {link.en}
                      </div>
                      <div className="font-noto text-xs text-ash-gray group-hover:text-gold transition-colors mt-0.5">
                        {link.zh}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </nav>
              <div className="px-6 py-5 border-t border-ash-gray/20 text-center">
                <p className="font-cinzel text-[10px] text-smoke tracking-widest">
                  IF WE BURN, YOU BURN WITH US
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
