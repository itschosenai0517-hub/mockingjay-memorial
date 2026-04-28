'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

// G: Typewriter hook for manifesto text
function useTypewriter(text: string, speed = 28, trigger = false) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!trigger) return
    setDisplayed('')
    setDone(false)
    let i = 0
    const iv = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) { clearInterval(iv); setDone(true) }
    }, speed)
    return () => clearInterval(iv)
  }, [trigger, text, speed])

  return { displayed, done }
}

const PARAGRAPH_1 = "She never asked to be a symbol. She only asked to keep the people she loved alive. But sometimes the most revolutionary act is simply to refuse — to refuse to kneel, to refuse to forget, to refuse to let the fire inside you die."
const PARAGRAPH_2 = "The spark that lit the revolution was not a grand gesture — it was a girl who refused to let fear silence her. Who stood in the arena and chose love over survival, humanity over strategy."
const PARAGRAPH_3 = "If we burn, you burn with us. The odds were never in our favour — and that is exactly why we fought."

export default function ManifestoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  // G: stagger paragraph reveals
  const [p1Started, setP1Started] = useState(false)
  const [p2Started, setP2Started] = useState(false)
  const [p3Started, setP3Started] = useState(false)

  const p1 = useTypewriter(PARAGRAPH_1, 26, p1Started)
  const p2 = useTypewriter(PARAGRAPH_2, 26, p2Started)
  const p3 = useTypewriter(PARAGRAPH_3, 30, p3Started)

  useEffect(() => {
    if (!isInView) return
    const t1 = setTimeout(() => setP1Started(true), 600)
    return () => clearTimeout(t1)
  }, [isInView])

  useEffect(() => {
    if (p1.done) {
      const t = setTimeout(() => setP2Started(true), 300)
      return () => clearTimeout(t)
    }
  }, [p1.done])

  useEffect(() => {
    if (p2.done) {
      const t = setTimeout(() => setP3Started(true), 300)
      return () => clearTimeout(t)
    }
  }, [p2.done])

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

          {/* Aged marks */}
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

          {/* G: Typewriter manifesto text */}
          <div className="space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold/20" />
              <div className="w-1.5 h-1.5 rotate-45 bg-flame-orange/50" />
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold/20" />
            </div>

            {/* Paragraph 1 */}
            <div className="font-caveat text-xl md:text-2xl text-parchment/90 leading-relaxed min-h-[4rem]">
              {p1.displayed}
              {p1Started && !p1.done && (
                <span className="inline-block w-0.5 h-5 bg-flame-orange align-middle ml-0.5 animate-pulse" />
              )}
            </div>

            {/* Paragraph 2 */}
            {p1.done && (
              <div className="font-caveat text-lg text-parchment/70 leading-relaxed min-h-[3.5rem]">
                {p2.displayed}
                {p2Started && !p2.done && (
                  <span className="inline-block w-0.5 h-5 bg-flame-orange align-middle ml-0.5 animate-pulse" />
                )}
              </div>
            )}

            {/* Chinese translation – fades in after p2 */}
            {p2.done && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="font-noto text-sm text-gold/60 leading-relaxed italic"
              >
                她從未要求成為一個象徵。她只要求讓她愛的人活下去。但有時候，最革命性的行動就是拒絕——拒絕跪下，拒絕遺忘，拒絕讓內心的火焰熄滅。點燃革命的火花並非偉大的壯舉——而是一個女孩，她拒絕讓恐懼封住她的口。
              </motion.p>
            )}

            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold/20" />
              <div className="w-1.5 h-1.5 rotate-45 bg-flame-orange/50" />
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold/20" />
            </div>

            {/* Paragraph 3 */}
            {p2.done && (
              <div className="font-caveat text-xl text-flame-orange/80 leading-relaxed min-h-[2rem]">
                {p3.displayed}
                {p3Started && !p3.done && (
                  <span className="inline-block w-0.5 h-5 bg-flame-orange align-middle ml-0.5 animate-pulse" />
                )}
              </div>
            )}

            {p3.done && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="font-noto text-xs text-flame-orange/50 leading-relaxed italic"
              >
                若我們燃燒，你也將與我們同焚。勝算從未站在我們這邊——而這正是我們戰鬥的原因。
              </motion.p>
            )}
          </div>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={p3.done ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
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
