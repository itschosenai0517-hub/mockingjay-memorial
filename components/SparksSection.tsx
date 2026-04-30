'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useCallback } from 'react'

const quotes = [
  { en: 'Fire is catching.',                                               zh: '火焰會蔓延。',                                   source: 'Katniss Everdeen', align: 'left'  },
  { en: 'What I need is the dandelion in the spring.',                     zh: '我需要的，是春天的蒲公英。',                       source: 'Katniss Everdeen', align: 'right' },
  { en: "You don't forget the face of the person who was your last hope.", zh: '你不會忘記那個曾是你最後希望的人的臉。',           source: 'Katniss Everdeen', align: 'left'  },
  { en: 'I am not pretty. I am not beautiful. I am as radiant as the sun.',zh: '我不漂亮，我不美麗。但我如同太陽般光芒萬丈。', source: 'Katniss Everdeen', align: 'right' },
  { en: "You've got to go through it before you get out of it.",           zh: '你必須走過這一切，才能從中走出來。',               source: 'Haymitch Abernathy', align: 'left' },
  { en: 'Real or not real? Real.',                                         zh: '真實還是虛假？真實。',                             source: 'Peeta Mellark',    align: 'right' },
  { en: "It's the things we love most that destroy us.",                   zh: '那些我們最深愛的事物，往往將我們摧毀。',           source: 'President Snow',   align: 'left'  },
  { en: 'Remember, we are the fire.',                                      zh: '記住，我們就是那火焰。',                           source: 'The Rebellion',    align: 'right' },
]

// Copy & Share helpers
function useQuoteActions(quote: typeof quotes[0]) {
  const [copied, setCopied] = useState(false)
  const [shared, setShared] = useState(false)

  const fullText = `"${quote.en}" — ${quote.source}\n「${quote.zh}」`

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(fullText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const el = document.createElement('textarea')
      el.value = fullText
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [fullText])

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({ text: fullText, title: 'Mockingjay — Sparks of Revolution' })
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      } catch { /* user cancelled */ }
    } else {
      await navigator.clipboard.writeText(fullText).catch(() => {})
      setShared(true)
      setTimeout(() => setShared(false), 2000)
    }
  }, [fullText])

  return { copied, shared, handleCopy, handleShare }
}

function QuoteCard({ quote, index }: { quote: typeof quotes[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const isLeft = quote.align === 'left'
  const { copied, shared, handleCopy, handleShare } = useQuoteActions(quote)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.7, ease: 'easeOut' }}
      // 手機一律置中，md 以上才左右分流
      className={`flex justify-center ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}
    >
      <div
        className={`relative max-w-xl group ${
          isLeft
            ? 'border-l-2 border-flame-orange/60 pl-6'
            // 手機時取消 text-right，md 以上才右對齊
            : 'border-l-2 md:border-l-0 md:border-r-2 border-flame-orange/60 md:border-gold/60 pl-6 md:pl-0 md:pr-6 md:text-right'
        }`}
      >
        {/* Rebel flyer accent line */}
        <div
          className={`absolute top-0 w-1 h-full bg-gradient-to-b from-flame-orange via-gold to-flame-orange opacity-60 ${
            isLeft ? '-left-1' : 'left-[-1px] md:left-auto md:-right-1'
          }`}
        />

        {/* Torn paper decoration */}
        <div className="absolute -top-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-smoke/20 to-transparent" />

        {/* Quote number */}
        <div className={`font-cinzel text-[10px] tracking-[0.4em] text-flame-orange/40 mb-3 uppercase ${isLeft ? '' : 'md:text-right'}`}>
          #{String(index + 1).padStart(2, '0')} — SPARK
        </div>

        {/* English quote */}
        <blockquote className={`font-playfair italic text-xl md:text-2xl text-gray-100 leading-relaxed mb-3 group-hover:text-flame-bright transition-colors duration-500 ${isLeft ? '' : 'md:text-right'}`}>
          &ldquo;{quote.en}&rdquo;
        </blockquote>

        {/* Chinese translation */}
        <p className={`font-noto text-base md:text-lg text-gold/70 leading-relaxed mb-4 ${isLeft ? '' : 'md:text-right'}`}>
          「{quote.zh}」
        </p>

        {/* Source */}
        <div className={`font-cinzel text-xs tracking-[0.25em] text-smoke uppercase mb-4 ${isLeft ? '' : 'md:text-right'}`}>
          — {quote.source}
        </div>

        {/* Copy & Share action buttons */}
        <div className={`flex items-center gap-2 ${isLeft ? '' : 'md:justify-end'}`}>
          {/* Copy button */}
          <button
            onClick={handleCopy}
            title="Copy quote"
            className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-sm font-cinzel text-[10px] tracking-widest transition-all duration-300 ${
              copied
                ? 'border-green-500/60 text-green-400 bg-green-500/10'
                : 'border-ash-gray/30 text-ash-gray hover:border-flame-orange/50 hover:text-flame-orange hover:bg-flame-orange/5'
            }`}
          >
            {copied ? (
              <>
                <svg viewBox="0 0 16 16" className="w-3 h-3 fill-current">
                  <path d="M2 8 L6 12 L14 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                </svg>
                COPIED
              </>
            ) : (
              <>
                <svg viewBox="0 0 16 16" className="w-3 h-3 fill-current">
                  <rect x="5" y="5" width="9" height="10" rx="1.5" opacity="0.7" />
                  <rect x="2" y="2" width="9" height="10" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                COPY
              </>
            )}
          </button>

          {/* Share button */}
          <button
            onClick={handleShare}
            title="Share quote"
            className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-sm font-cinzel text-[10px] tracking-widest transition-all duration-300 ${
              shared
                ? 'border-gold/60 text-gold bg-gold/10'
                : 'border-ash-gray/30 text-ash-gray hover:border-gold/50 hover:text-gold hover:bg-gold/5'
            }`}
          >
            {shared ? (
              <>
                <svg viewBox="0 0 16 16" className="w-3 h-3 fill-current">
                  <path d="M2 8 L6 12 L14 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                </svg>
                SHARED
              </>
            ) : (
              <>
                <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
                  <circle cx="12" cy="3"  r="1.8" />
                  <circle cx="3"  cy="8"  r="1.8" />
                  <circle cx="12" cy="13" r="1.8" />
                  <line x1="4.8" y1="7.1"  x2="10.2" y2="4.1" />
                  <line x1="4.8" y1="8.9"  x2="10.2" y2="11.9" />
                </svg>
                SHARE
              </>
            )}
          </button>
        </div>

        {/* Hover flame underline */}
        <motion.div
          className={`absolute ${isLeft ? 'left-0' : 'right-0'} bottom-0 w-full h-px bg-gradient-to-r from-flame-orange/0 via-flame-orange/60 to-flame-orange/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
        />
      </div>
    </motion.div>
  )
}

export default function SparksSection() {
  const titleRef = useRef(null)
  const isTitleInView = useInView(titleRef, { once: true })

  return (
    <section id="sparks" className="relative py-24 px-6 z-20 overflow-hidden">
      {/* Background scatter effect */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-flame-orange/20"
            style={{ left: `${10 + i * 12}%`, top: `${15 + (i % 4) * 20}%`, transform: `rotate(${i * 23}deg)` }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <div className="font-cinzel text-xs tracking-[0.5em] text-flame-orange/70 uppercase mb-4">
            — Words of Resistance —
          </div>
          <h2 className="font-cinzel font-bold text-4xl md:text-5xl flame-text mb-3">Sparks</h2>
          <p className="font-noto text-xl text-gold/60 tracking-wide mb-4">火花語錄</p>
          <p className="font-noto text-sm text-smoke max-w-md mx-auto">
            These words became the kindling of revolution — scattered like rebel flyers across the districts.
          </p>
          <p className="font-noto text-xs text-ash-gray mt-2 max-w-md mx-auto">
            這些話語成為革命的引線——如反抗傳單般散落各區。
          </p>
        </motion.div>

        {/* Quotes — staggered layout */}
        <div className="space-y-14">
          {quotes.map((q, i) => (
            <QuoteCard key={i} quote={q} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
