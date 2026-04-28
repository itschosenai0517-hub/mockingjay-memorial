'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const navLinks = [
  { href: '#hero', en: 'Home', zh: '首頁' },
  { href: '#districts', en: 'Districts', zh: '十二個區' },
  { href: '#sparks', en: 'Sparks', zh: '火花語錄' },
  { href: '#tributes', en: 'Tributes', zh: '角色致敬' },
  { href: '#manifesto', en: 'Manifesto', zh: '反抗宣言' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 3.2, duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'navbar-blur py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
            <circle cx="20" cy="12" r="4" fill="#ff6b00" />
            <path d="M20 16 L20 30" stroke="#ff6b00" strokeWidth="2" />
            <path d="M11 10 Q6 2 13 9 Q8 1 18 12" fill="#ff6b00" opacity="0.8" />
            <path d="M29 10 Q34 2 27 9 Q32 1 22 12" fill="#ff6b00" opacity="0.8" />
          </svg>
          <div>
            <div className="font-cinzel text-xs font-bold text-flame-orange tracking-widest group-hover:text-gold transition-colors">
              MOCKINGJAY
            </div>
            <div className="font-noto text-[9px] text-smoke tracking-wider">反抗之鳥</div>
          </div>
        </a>

        {/* Nav links — hidden on mobile */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group flex flex-col items-center gap-0.5"
              >
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

        {/* Mobile: three finger salute icon */}
        <div className="md:hidden text-flame-orange text-xl select-none">☝️✌️🤟</div>
      </div>
    </motion.nav>
  )
}
