'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

// Opt-8: individual finger icons with hover lift + glow
const saluteFingers = [
  {
    label: 'Index finger',
    svg: (
      <svg key="idx" viewBox="0 0 20 30" className="w-7 h-10 fill-current">
        <rect x="7" y="0" width="6" height="18" rx="3" />
        <rect x="2" y="14" width="16" height="12" rx="4" />
        <rect x="0" y="18" width="6" height="7" rx="3" transform="rotate(-10 3 21)" />
      </svg>
    ),
  },
  {
    label: 'Two fingers',
    svg: (
      <svg key="v" viewBox="0 0 24 30" className="w-7 h-10 fill-current">
        <rect x="2" y="0" width="6" height="18" rx="3" transform="rotate(-6 5 9)" />
        <rect x="10" y="0" width="6" height="18" rx="3" transform="rotate(6 13 9)" />
        <rect x="4" y="14" width="16" height="12" rx="4" />
        <rect x="0" y="18" width="5" height="6" rx="2.5" transform="rotate(-15 2 21)" />
      </svg>
    ),
  },
  {
    label: 'Three fingers',
    svg: (
      <svg key="three" viewBox="0 0 28 30" className="w-7 h-10 fill-current">
        <rect x="2" y="2" width="5" height="16" rx="2.5" transform="rotate(-6 4 10)" />
        <rect x="9" y="0" width="5" height="18" rx="2.5" />
        <rect x="16" y="2" width="5" height="16" rx="2.5" transform="rotate(6 18 10)" />
        <rect x="4" y="14" width="20" height="12" rx="4" />
        <rect x="0" y="18" width="5" height="7" rx="2.5" transform="rotate(-15 2 22)" />
      </svg>
    ),
  },
]

export default function Footer() {
  const [rueHovered, setRueHovered] = useState(false)
  const [hoveredFinger, setHoveredFinger] = useState<number | null>(null)

  return (
    <footer className="relative z-20 border-t border-ash-gray/20 bg-charcoal/40 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">

        {/* Opt-8: Three finger salute — re-triggers each time on hover, staggered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex justify-center gap-6 mb-4">
            {saluteFingers.map((finger, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
                // Opt-8: hover lifts the finger + brightens glow
                whileHover={{ y: -6, scale: 1.15 }}
                onHoverStart={() => setHoveredFinger(i)}
                onHoverEnd={() => setHoveredFinger(null)}
                className={`salute-rise cursor-pointer transition-colors duration-300 ${
                  hoveredFinger === i ? 'text-gold' : 'text-flame-orange/70'
                }`}
                style={{
                  filter: hoveredFinger === i
                    ? 'drop-shadow(0 0 8px rgba(212,175,55,0.8))'
                    : 'drop-shadow(0 0 3px rgba(255,107,0,0.3))',
                  transition: 'filter 0.3s',
                }}
              >
                {finger.svg}
              </motion.div>
            ))}
          </div>

          {/* Opt-8: Rue memorial — hover glows + plays whistle note via CSS pulse */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.8 }}
            onMouseEnter={() => setRueHovered(true)}
            onMouseLeave={() => setRueHovered(false)}
            className="cursor-default select-none inline-block"
          >
            <motion.p
              animate={rueHovered ? { textShadow: '0 0 16px rgba(255,107,0,0.9), 0 0 32px rgba(212,175,55,0.5)' } : { textShadow: 'none' }}
              transition={{ duration: 0.4 }}
              className="font-cinzel text-sm tracking-[0.3em] text-flame-orange/80 uppercase mb-1"
            >
              In Memory of Rue
            </motion.p>
            <motion.p
              animate={rueHovered ? { color: 'rgba(212,175,55,0.9)' } : { color: 'rgba(212,175,55,0.7)' }}
              transition={{ duration: 0.4 }}
              className="font-noto text-base"
            >
              向 Rue 致敬 — 願你安息
            </motion.p>
            {/* Four-note whistle dots — animate on hover */}
            <div className="flex justify-center gap-2 mt-3 h-5">
              {[0, 1, 2, 3].map((n) => (
                <motion.div
                  key={n}
                  className="rounded-full bg-gold"
                  initial={{ opacity: 0, scale: 0, y: 0 }}
                  animate={rueHovered
                    ? { opacity: [0, 0.9, 0], scale: [0.5, 1, 0.5], y: [0, -8, 0] }
                    : { opacity: 0, scale: 0 }
                  }
                  transition={{ delay: n * 0.18, duration: 0.7, repeat: rueHovered ? Infinity : 0, repeatDelay: 1.2 }}
                  style={{ width: 6, height: 6 }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-48 h-px bg-gradient-to-r from-transparent via-flame-orange/50 to-transparent mx-auto mb-8"
        />

        {/* Mockingjay mini logo */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-6"
        >
          <svg viewBox="0 0 60 60" className="w-10 h-10 mx-auto opacity-40">
            <circle cx="30" cy="18" r="5" fill="#ff6b00" />
            <path d="M30 23 L30 42" stroke="#ff6b00" strokeWidth="2" />
            <path d="M30 32 L20 38" stroke="#ff6b00" strokeWidth="1.5" />
            <path d="M30 32 L40 38" stroke="#ff6b00" strokeWidth="1.5" />
            <path d="M18 14 Q10 4 19 12 Q12 2 28 16"   fill="#ff6b00" opacity="0.8" />
            <path d="M42 14 Q50 4 41 12 Q48 2 32 16"   fill="#ff6b00" opacity="0.8" />
          </svg>
        </motion.div>

        {/* Main footer quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-8"
        >
          <p className="font-playfair italic text-lg text-gray-400">
            &ldquo;Fire is catching. And if we burn, you burn with us.&rdquo;
          </p>
          <p className="font-noto text-sm text-gold/50 mt-2">
            「火焰會蔓延。若我們燃燒，你也將與我們同焚。」
          </p>
        </motion.div>

        {/* Bottom info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="space-y-2"
        >
          <p className="font-cinzel text-xs tracking-[0.3em] text-smoke uppercase">
            The Mockingjay Lives — 反抗之鳥永不熄滅
          </p>
          <p className="font-noto text-xs text-ash-gray">
            致敬《飢餓遊戲》三部曲 — Suzanne Collins
          </p>
          <p className="font-cinzel text-xs text-ash-gray/40 tracking-widest mt-4">
            MAY THE ODDS BE EVER IN YOUR FAVOR
          </p>
          <p className="font-noto text-xs text-ash-gray/30">
            願命運永遠站在你這邊
          </p>
        </motion.div>

        {/* Scan line decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-flame-orange/20 to-transparent" />
      </div>
    </footer>
  )
}
