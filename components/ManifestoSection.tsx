'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function ManifestoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="manifesto" className="relative py-24 px-6 z-20">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="font-cinzel text-xs tracking-[0.5em] text-flame-orange/70 uppercase mb-4">
            — Personal Statement —
          </div>
          <h2 className="font-cinzel font-bold text-4xl md:text-5xl gold-text mb-3">
            My Manifesto
          </h2>
          <p className="font-noto text-xl text-gold/60 tracking-wide">我的反抗宣言</p>
        </motion.div>

        {/* Parchment document */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.96, y: 40 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="relative parchment rounded-sm p-10 md:p-14"
        >
          {/* Burning edge top */}
          <div className="absolute -top-px left-0 right-0 h-2 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-flame-red/60 via-flame-orange/80 to-flame-red/60 blur-sm" />
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute bottom-0 w-1.5 bg-gradient-to-t from-flame-orange to-transparent"
                style={{ left: `${i * 5.2}%`, height: `${8 + Math.random() * 12}px` }}
                animate={{ height: [`${8 + (i % 5) * 3}px`, `${14 + (i % 4) * 4}px`, `${8 + (i % 5) * 3}px`] }}
                transition={{ duration: 0.8 + (i % 4) * 0.2, repeat: Infinity, delay: i * 0.07 }}
              />
            ))}
          </div>

          {/* Burning edge bottom */}
          <div className="absolute -bottom-px left-0 right-0 h-2 overflow-hidden rotate-180">
            <div className="w-full h-full bg-gradient-to-r from-flame-red/40 via-flame-orange/60 to-flame-red/40 blur-sm" />
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute bottom-0 w-1.5 bg-gradient-to-t from-flame-red/70 to-transparent"
                style={{ left: `${i * 6.3}%`, height: `${6 + (i % 4) * 2}px` }}
                animate={{ height: [`${6 + (i % 3) * 2}px`, `${10 + (i % 5) * 3}px`, `${6 + (i % 3) * 2}px`] }}
                transition={{ duration: 1 + (i % 3) * 0.15, repeat: Infinity, delay: i * 0.09 }}
              />
            ))}
          </div>

          {/* Stain / aged paper marks */}
          <div className="absolute top-8 right-8 w-16 h-16 rounded-full bg-flame-orange/3 blur-2xl" />
          <div className="absolute bottom-12 left-6 w-12 h-12 rounded-full bg-gold/4 blur-xl" />

          {/* Header decoration */}
          <div className="text-center mb-8">
            <div className="font-cinzel text-xs tracking-[0.4em] text-flame-orange/60 uppercase mb-3">
              District 12 · Year of the Rebellion
              <br />
              <span className="font-noto text-xs text-gold/40 normal-case tracking-normal">第十二區 · 反抗之年</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold/30" />
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-gold/40">
                <path d="M12 2 L14 9 L22 9 L16 14 L18 21 L12 17 L6 21 L8 14 L2 9 L10 9 Z" />
              </svg>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold/30" />
            </div>
          </div>

          {/* Manifesto text placeholder */}
          <div className="space-y-5">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="font-caveat text-xl md:text-2xl text-parchment/90 leading-relaxed"
            >
              [YOUR_TEXT_HERE — 在此填入您的個人感言與反抗宣言]
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="font-caveat text-lg text-parchment/70 leading-relaxed"
            >
              The spark that lit the revolution was not a grand gesture — it was a girl who refused to let fear silence her. Who stood in the arena and chose love over survival, humanity over strategy.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="font-noto text-sm text-gold/60 leading-relaxed italic"
            >
              點燃革命的火花並非偉大的壯舉——而是一個女孩，她拒絕讓恐懼封住她的口。她站在競技場上，選擇了愛而非生存，選擇了人性而非策略。
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="font-caveat text-xl text-flame-orange/80 leading-relaxed"
            >
              [ADD YOUR OWN WORDS HERE — 加入您自己的話語]
            </motion.p>
          </div>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-10 flex items-end justify-between"
          >
            <div>
              <div className="w-32 h-px bg-gold/30 mb-1" />
              <div className="font-caveat text-base text-gold/60">Signed in fire</div>
              <div className="font-noto text-xs text-smoke">以火焰署名</div>
            </div>
            <div className="text-right">
              <svg viewBox="0 0 60 60" className="w-12 h-12 ml-auto mb-1 opacity-40">
                <circle cx="30" cy="20" r="5" fill="#ff6b00" />
                <path d="M30 25 L30 42" stroke="#ff6b00" strokeWidth="2" />
                <path d="M18 16 Q10 5 20 14 Q12 3 28 18" fill="#ff6b00" />
                <path d="M42 16 Q50 5 40 14 Q48 3 32 18" fill="#ff6b00" />
              </svg>
              <div className="font-cinzel text-xs text-flame-orange/50 tracking-widest">MOCKINGJAY</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
