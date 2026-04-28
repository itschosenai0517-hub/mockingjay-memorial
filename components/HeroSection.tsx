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
        {/* A: Upgraded Mockingjay SVG */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.0, duration: 1, ease: 'easeOut' }}
          className="relative mb-10"
        >
          <MockingjayHeroLogo />
        </motion.div>

        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.9 }}
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
          transition={{ delay: 2.8, duration: 0.8 }}
          className="w-64 h-px bg-gradient-to-r from-transparent via-flame-orange to-transparent mb-8"
        />

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.0, duration: 0.9 }}
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
          transition={{ delay: 3.5, duration: 1 }}
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

// A: Full hero Mockingjay – detailed realistic bird with outspread wings
function MockingjayHeroLogo() {
  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64">
      {/* Rotating outer ring */}
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

      {/* A: Detailed Mockingjay SVG */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="heroBodyGrad" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#ffcf77" />
            <stop offset="35%" stopColor="#ff8c00" />
            <stop offset="70%" stopColor="#ff6b00" />
            <stop offset="100%" stopColor="#b82200" />
          </radialGradient>
          <radialGradient id="heroFlameGrad" cx="50%" cy="100%" r="60%">
            <stop offset="0%" stopColor="#ff9500" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#ff6b00" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#cc2200" stopOpacity="0" />
          </radialGradient>
          <filter id="heroGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="heroGlowSoft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Flame beneath bird */}
        <motion.ellipse
          cx="100" cy="162"
          rx="32" ry="26"
          fill="url(#heroFlameGrad)"
          filter="url(#heroGlow)"
          animate={{ scaleX: [1, 1.1, 1], scaleY: [1, 0.95, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
        <motion.ellipse
          cx="100" cy="158"
          rx="18" ry="18"
          fill="#ff9500"
          opacity="0.35"
          animate={{ scaleY: [1, 1.4, 1], opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />

        {/* Left wing – upper primary */}
        <path
          d="M100 100 Q78 72 38 52 Q55 78 50 100 Q72 88 100 100Z"
          fill="url(#heroBodyGrad)"
          filter="url(#heroGlow)"
        />
        {/* Left wing – secondary feather layer */}
        <path
          d="M100 100 Q80 66 22 40 Q44 72 42 96 Q68 82 100 100Z"
          fill="#ff6b00"
          opacity="0.55"
        />
        {/* Left wing – tip feather lines */}
        <path d="M55 76 Q38 60 22 42" stroke="#ff9500" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
        <path d="M60 85 Q46 70 34 55" stroke="#ff9500" strokeWidth="0.8" opacity="0.4" strokeLinecap="round" />

        {/* Right wing – upper primary */}
        <path
          d="M100 100 Q122 72 162 52 Q145 78 150 100 Q128 88 100 100Z"
          fill="url(#heroBodyGrad)"
          filter="url(#heroGlow)"
        />
        {/* Right wing – secondary feather layer */}
        <path
          d="M100 100 Q120 66 178 40 Q156 72 158 96 Q132 82 100 100Z"
          fill="#ff6b00"
          opacity="0.55"
        />
        {/* Right wing – tip feather lines */}
        <path d="M145 76 Q162 60 178 42" stroke="#ff9500" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
        <path d="M140 85 Q154 70 166 55" stroke="#ff9500" strokeWidth="0.8" opacity="0.4" strokeLinecap="round" />

        {/* Body */}
        <ellipse cx="100" cy="108" rx="13" ry="20" fill="url(#heroBodyGrad)" filter="url(#heroGlowSoft)" />

        {/* Head */}
        <circle cx="100" cy="82" r="12" fill="url(#heroBodyGrad)" filter="url(#heroGlow)" />

        {/* Crest feathers */}
        <path d="M96 70 Q93 60 97 64 Q94 56 99 62 Q96 52 102 60" stroke="#ffb347" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M101 69 Q100 57 104 63" stroke="#ff9500" strokeWidth="1" fill="none" strokeLinecap="round" />

        {/* Beak – pointing right */}
        <path d="M111 79 L124 83 L111 87Z" fill="#d4af37" filter="url(#heroGlowSoft)" />

        {/* Eye */}
        <circle cx="109" cy="79" r="3.5" fill="#1a0a00" />
        <circle cx="110.2" cy="77.8" r="1.1" fill="#ffffff" />

        {/* Tail feathers */}
        <motion.path
          d="M100 126 Q90 142 84 160 Q94 145 100 136 Q106 145 116 160 Q110 142 100 126Z"
          fill="url(#heroBodyGrad)"
          opacity="0.92"
          animate={{ scaleY: [1, 1.06, 1] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
        {/* Extra tail feather detail */}
        <path d="M100 126 Q94 143 90 162" stroke="#ff9500" strokeWidth="0.8" opacity="0.4" strokeLinecap="round" />
        <path d="M100 126 Q106 143 110 162" stroke="#ff9500" strokeWidth="0.8" opacity="0.4" strokeLinecap="round" />

        {/* Arrow in talons */}
        <line x1="74" y1="150" x2="126" y2="150" stroke="#d4af37" strokeWidth="2.2" />
        <path d="M122 145 L130 150 L122 155Z" fill="#d4af37" />
        <path d="M78 145 L70 150 L78 155Z" fill="#d4af37" />
        {/* Arrow fletchings */}
        <path d="M74 147 L70 143" stroke="#d4af37" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M74 153 L70 157" stroke="#d4af37" strokeWidth="1.2" strokeLinecap="round" />
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
