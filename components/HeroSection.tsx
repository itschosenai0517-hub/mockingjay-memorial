'use client'

import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Radial flame glow background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-flame-orange/5 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-flame-orange/10 blur-[60px]" />
      </div>

      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
        {/* Mockingjay SVG */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.4, duration: 1, ease: 'easeOut' }}
          className="relative mb-10"
        >
          <MockingjayLogo />
        </motion.div>

        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.8, duration: 0.9 }}
        >
          <h1 className="font-cinzel font-black text-5xl md:text-7xl lg:text-8xl tracking-wider mb-2 flame-text">
            THE MOCKINGJAY
          </h1>
          <h1 className="font-cinzel font-black text-5xl md:text-7xl lg:text-8xl tracking-wider mb-4 gold-text">
            LIVES
          </h1>
          <p className="font-noto text-xl md:text-2xl text-gold/80 tracking-[0.2em] mb-8">
            反抗之鳥永不熄滅
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 4.2, duration: 0.8 }}
          className="w-64 h-px bg-gradient-to-r from-transparent via-flame-orange to-transparent mb-8"
        />

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.4, duration: 0.9 }}
          className="max-w-2xl"
        >
          <blockquote className="font-playfair italic text-xl md:text-2xl text-gray-200 mb-3 leading-relaxed">
            &ldquo;If we burn, you burn with us.&rdquo;
          </blockquote>
          <p className="font-noto text-base md:text-lg text-gold/70 tracking-wide">
            「若我們燃燒，你也將與我們同焚。」
          </p>
          <p className="font-cinzel text-xs text-smoke tracking-[0.3em] mt-4">
            — KATNISS EVERDEEN
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-cinzel text-xs text-smoke tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-flame-orange to-transparent"
          />
        </motion.div>
      </div>
    </section>
  )
}

function MockingjayLogo() {
  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64">
      {/* Outer ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle
            cx="100" cy="100" r="96"
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6b00" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#d4af37" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ff6b00" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Glow ring */}
      <div className="absolute inset-4 rounded-full border border-flame-orange/20 shadow-[0_0_30px_rgba(255,107,0,0.3)]" />

      {/* Main bird SVG */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="bodyGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffb347" />
            <stop offset="40%" stopColor="#ff6b00" />
            <stop offset="100%" stopColor="#cc2200" />
          </radialGradient>
          <radialGradient id="flameGrad" cx="50%" cy="100%" r="60%">
            <stop offset="0%" stopColor="#ff9500" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#ff6b00" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#cc2200" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Flame beneath bird */}
        <motion.ellipse
          cx="100" cy="160"
          rx="30" ry="25"
          fill="url(#flameGrad)"
          className="flame-anim"
          filter="url(#glow)"
        />
        <motion.ellipse
          cx="100" cy="155"
          rx="18" ry="18"
          fill="#ff9500"
          opacity="0.4"
          animate={{ scaleY: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />

        {/* Left wing */}
        <motion.path
          d="M100 100 Q70 70 30 55 Q50 75 45 95 Q65 85 100 100"
          fill="url(#bodyGrad)"
          filter="url(#glow)"
          className="wing-left"
        />
        <motion.path
          d="M100 100 Q75 65 20 40 Q45 70 40 90 Q65 78 100 100"
          fill="#ff6b00"
          opacity="0.6"
          className="wing-left"
        />

        {/* Right wing */}
        <motion.path
          d="M100 100 Q130 70 170 55 Q150 75 155 95 Q135 85 100 100"
          fill="url(#bodyGrad)"
          filter="url(#glow)"
          className="wing-right"
        />
        <motion.path
          d="M100 100 Q125 65 180 40 Q155 70 160 90 Q135 78 100 100"
          fill="#ff6b00"
          opacity="0.6"
          className="wing-right"
        />

        {/* Body */}
        <ellipse cx="100" cy="105" rx="12" ry="18" fill="url(#bodyGrad)" filter="url(#glow)" />

        {/* Head */}
        <circle cx="100" cy="82" r="10" fill="url(#bodyGrad)" filter="url(#glow)" />

        {/* Beak */}
        <path d="M100 79 L108 83 L100 87 Z" fill="#d4af37" />

        {/* Eye */}
        <circle cx="103" cy="80" r="2.5" fill="#1a0a00" />
        <circle cx="103.8" cy="79.2" r="0.8" fill="#fff" />

        {/* Tail feathers */}
        <motion.path
          d="M100 120 Q88 138 80 155 Q92 140 100 130 Q108 140 120 155 Q112 138 100 120"
          fill="url(#bodyGrad)"
          opacity="0.9"
          animate={{ scaleY: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Arrow in talons */}
        <line x1="85" y1="148" x2="115" y2="148" stroke="#d4af37" strokeWidth="2" />
        <path d="M113 144 L118 148 L113 152 Z" fill="#d4af37" />
        <path d="M87 144 L85 148 L87 152 L84 148 Z" fill="#d4af37" />
      </svg>

      {/* Flame glow overlay */}
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-flame-orange/20 blur-2xl pointer-events-none"
      />
    </div>
  )
}
