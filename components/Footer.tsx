'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="relative z-20 border-t border-ash-gray/20 bg-charcoal/40 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Three finger salute */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex justify-center gap-2 mb-4">
            {['☝️', '✌️', '🤟'].map((emoji, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
                className="text-3xl salute-rise"
              >
                {emoji}
              </motion.span>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <p className="font-cinzel text-sm tracking-[0.3em] text-flame-orange/80 uppercase mb-1">
              In Memory of Rue
            </p>
            <p className="font-noto text-base text-gold/70">
              向 Rue 致敬 — 願你安息
            </p>
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
            <path d="M18 14 Q10 4 19 12 Q12 2 28 16" fill="#ff6b00" opacity="0.8" />
            <path d="M42 14 Q50 4 41 12 Q48 2 32 16" fill="#ff6b00" opacity="0.8" />
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
