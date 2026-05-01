'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '#hero',         en: 'Home',       zh: '首頁' },
  { href: '#districts',    en: 'Districts',  zh: '十二個區' },
  { href: '#quiz',         en: 'Quiz',       zh: '測驗' },
  { href: '#relations',    en: 'Web',        zh: '關係圖' },
  { href: '#timeline',     en: 'Timeline',   zh: '時間線' },
  { href: '#hanging-tree', en: 'Music',      zh: '音樂' },
  { href: '#morse',        en: 'Signal',     zh: '密碼' },
  { href: '#sparks',       en: 'Sparks',     zh: '火花語錄' },
  { href: '#tributes',     en: 'Tributes',   zh: '角色致敬' },
  { href: '#manifesto',    en: 'Manifesto',  zh: '反抗宣言' },
]

// Mockingjay icon using the actual mockingjay.png image
export function MockingjayIcon({ className }: { className?: string }) {
  return (
    <img
      src="/mockingjay.png"
      alt="Mockingjay"
      className={className}
    />
  )
}

export default function Navbar() {
  const [scrolled,    setScrolled]   = useState(false)
  const [mobileOpen,  setMobileOpen] = useState(false)
  // Opt-6: track which section is currently in view
  const [activeHref,  setActiveHref] = useState('#hero')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Opt-6: IntersectionObserver watches each section; last one crossing threshold wins
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1))
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveHref(`#${id}`)
        },
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
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
              <div className="font-noto text-[9px] text-smoke tracking-wider">學舌鳥</div>
            </div>
          </a>

          {/* Desktop nav links — Opt-6: active highlight */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeHref === link.href
              return (
                <li key={link.href} className="relative">
                  <a href={link.href} className="group flex flex-col items-center gap-0.5">
                    <span
                      className={`font-cinzel text-xs tracking-[0.15em] uppercase transition-colors duration-300 ${
                        isActive
                          ? 'text-flame-orange'
                          : 'text-smoke group-hover:text-flame-orange'
                      }`}
                    >
                      {link.en}
                    </span>
                    <span
                      className={`font-noto text-[10px] transition-colors duration-300 ${
                        isActive
                          ? 'text-gold'
                          : 'text-ash-gray group-hover:text-gold'
                      }`}
                    >
                      {link.zh}
                    </span>
                  </a>
                  {/* Active underline indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-bar"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-flame-orange to-transparent"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </li>
              )
            })}
          </ul>

          {/* Mobile three-finger salute button */}
          <button
            className="md:hidden select-none focus:outline-none"
            onClick={() => setMobileOpen((v: boolean) => !v)}
            aria-label="開啟選單"
          >
            <svg viewBox="0 0 36 44" className="w-7 h-8 fill-flame-orange/80" xmlns="http://www.w3.org/2000/svg">
              <rect x="8" y="22" width="20" height="16" rx="4" />
              <rect x="10" y="8"  width="5"  height="16" rx="2.5" />
              <rect x="16.5" y="5" width="5" height="19" rx="2.5" />
              <rect x="23" y="8"  width="5"  height="16" rx="2.5" />
              <rect x="4" y="26"  width="5"  height="8"  rx="2.5" transform="rotate(-15 6 30)" />
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile slide-out drawer — Opt-6: active highlight in mobile menu too */}
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
                {navLinks.map((link, i) => {
                  const isActive = activeHref === link.href
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={handleLinkClick}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.3 }}
                      className={`group flex items-center gap-4 py-4 border-b border-ash-gray/10 last:border-none ${
                        isActive ? 'text-flame-orange' : ''
                      }`}
                    >
                      <span
                        className={`h-px transition-all duration-300 ${
                          isActive ? 'w-8 bg-flame-orange' : 'w-5 bg-flame-orange/40 group-hover:w-8 group-hover:bg-flame-orange'
                        }`}
                      />
                      <div>
                        <div
                          className={`font-cinzel text-sm tracking-[0.2em] uppercase transition-colors ${
                            isActive ? 'text-flame-orange' : 'text-smoke group-hover:text-flame-orange'
                          }`}
                        >
                          {link.en}
                        </div>
                        <div
                          className={`font-noto text-xs mt-0.5 transition-colors ${
                            isActive ? 'text-gold' : 'text-ash-gray group-hover:text-gold'
                          }`}
                        >
                          {link.zh}
                        </div>
                      </div>
                    </motion.a>
                  )
                })}
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
