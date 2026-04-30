'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const tributes = [
  {
    en: 'Katniss Everdeen',
    zh: '凱妮絲·艾佛丁',
    district: 'District 12 / 第十二區',
    role: 'The Mockingjay / 反抗之鳥',
    tribute: 'The girl on fire who became a symbol, a spark, and a revolution.',
    tributeZh: '那個燃燒的女孩，成為了一個象徵、一道火花，以及一場革命。',
    status: 'ALIVE',
    statusZh: '存活',
    threat: 'EXTREME',
    id: 'EVD-12-F-01',
  },
  {
    en: 'Peeta Mellark',
    zh: '比達·麥拉克',
    district: 'District 12 / 第十二區',
    role: 'The Boy with the Bread / 麵包男孩',
    tribute: 'His love was an act of defiance. His survival, an act of grace.',
    tributeZh: '他的愛是一種反抗，他的存活是一種恩典。',
    status: 'ALIVE',
    statusZh: '存活',
    threat: 'HIGH',
    id: 'MLK-12-M-01',
  },
  {
    en: 'Finnick Odair',
    zh: '費尼克·奧戴爾',
    district: 'District 4 / 第四區',
    role: 'Victor & Rebel Spy / 勝者與反抗間諜',
    tribute: 'He looked like a god but fought like a man — for Annie, always for Annie.',
    tributeZh: '他外表如神祇，卻以凡人之姿戰鬥——為了安妮，永遠為了安妮。',
    status: 'KIA',
    statusZh: '陣亡',
    threat: 'CRITICAL',
    id: 'ODR-04-M-01',
  },
  {
    en: 'Rue',
    zh: '芮',
    district: 'District 11 / 第十一區',
    role: 'The Little Bird / 小小的鳥',
    tribute: 'Her song still echoes through the fields. She was the first true spark.',
    tributeZh: '她的歌聲仍迴盪在田野間。她是第一道真正的火花。',
    status: 'KIA',
    statusZh: '陣亡',
    threat: 'LOW',
    id: 'RUE-11-F-01',
  },
  {
    en: 'Haymitch Abernathy',
    zh: '海米契·艾柏納希',
    district: 'District 12 / 第十二區',
    role: 'Mentor & Survivor / 導師與倖存者',
    tribute: "He drank to forget. He stayed to make sure they didn't have to.",
    tributeZh: '他飲酒是為了忘記；他留下來是為了確保他們不必這樣做。',
    status: 'ALIVE',
    statusZh: '存活',
    threat: 'MODERATE',
    id: 'ABN-12-M-75',
  },
]

// Single shared typewriter queue — avoids multiple simultaneous setIntervals
function useTypewriter(text: string, speed = 35, active = false) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    if (!active) return
    let i = 0
    setDisplayed('')
    const iv = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(iv)
    }, speed)
    return () => clearInterval(iv)
  }, [active, text, speed])

  return displayed
}

function TributeCard({ tribute, index }: { tribute: typeof tributes[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [unlocked, setUnlocked] = useState(false)

  // Only start typewriter when in view + staggered delay
  const [twActive, setTwActive] = useState(false)
  useEffect(() => {
    if (!isInView) return
    const t = setTimeout(() => {
      setUnlocked(true)
      setTwActive(true)
    }, index * 150 + 400)
    return () => clearTimeout(t)
  }, [isInView, index])

  const unlockLabel = `FILE UNLOCKED — 檔案已解鎖 — ${tribute.id}`
  const unlockText = useTypewriter(unlockLabel, 40, twActive)

  const isKIA = tribute.status === 'KIA'
  const threatColors: Record<string, string> = {
    EXTREME: 'text-red-400 border-red-400/50',
    CRITICAL: 'text-flame-orange border-flame-orange/50',
    HIGH: 'text-yellow-400 border-yellow-400/50',
    MODERATE: 'text-blue-400 border-blue-400/50',
    LOW: 'text-green-400 border-green-400/50',
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      className="relative border border-ash-gray/30 bg-charcoal/80 rounded-sm overflow-hidden scan-effect group hover:border-flame-orange/40 transition-all duration-500"
      role="article"
      aria-label={`${tribute.en} — ${tribute.zh}`}
    >
      {/* CRT scanlines */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="absolute w-full h-px bg-white/[0.015]" style={{ top: `${i * 3.4}%` }} />
        ))}
      </div>

      {/* Header bar */}
      <div className="bg-ash-gray/10 border-b border-ash-gray/20 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${unlocked ? 'bg-green-400' : 'bg-red-500'} animate-pulse`} />
          <span className="font-cinzel text-xs tracking-[0.25em] text-smoke">
            CAPITOL CLASSIFICATION SYSTEM
          </span>
        </div>
        <span className="font-cinzel text-xs text-ash-gray">{tribute.id}</span>
      </div>

      {/* Unlock text */}
      <div className="px-4 py-2 border-b border-flame-orange/10 min-h-[28px]">
        <span className={`font-cinzel text-xs tracking-widest ${unlocked ? 'text-flame-orange' : 'text-ash-gray'}`}>
          {unlockText}
          {twActive && unlockText.length < unlockLabel.length && (
            <span className="animate-pulse">█</span>
          )}
        </span>
      </div>

      {/* Main content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-cinzel font-bold text-xl text-gray-100 group-hover:text-flame-orange transition-colors">
              {tribute.en}
            </h3>
            <p className="font-noto text-base text-gold/70 mt-0.5">{tribute.zh}</p>
          </div>
          <div className="text-right">
            <div className={`font-cinzel text-xs px-2 py-1 border rounded-sm ${
              isKIA ? 'text-red-400 border-red-400/50 bg-red-400/10' : 'text-green-400 border-green-400/50 bg-green-400/10'
            }`}>
              {tribute.status}
            </div>
            <div className="font-noto text-xs text-smoke mt-1">{tribute.statusZh}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
          <div className="bg-ash-gray/10 p-3 rounded-sm border border-ash-gray/20">
            <div className="font-cinzel tracking-widest text-ash-gray mb-1">DISTRICT</div>
            <div className="font-noto text-smoke">{tribute.district}</div>
          </div>
          <div className="bg-ash-gray/10 p-3 rounded-sm border border-ash-gray/20">
            <div className="font-cinzel tracking-widest text-ash-gray mb-1">ROLE</div>
            <div className="font-noto text-smoke">{tribute.role}</div>
          </div>
        </div>

        {/* Threat level */}
        <div className="flex items-center gap-2 mb-4">
          <span className="font-cinzel text-xs text-ash-gray tracking-widest">THREAT LEVEL:</span>
          <span className={`font-cinzel text-xs px-2 py-0.5 border rounded-sm ${threatColors[tribute.threat] || 'text-smoke border-smoke/30'}`}>
            {tribute.threat}
          </span>
        </div>

        {/* Tribute text */}
        <div className="border-t border-ash-gray/20 pt-4">
          <p className="font-playfair italic text-sm text-gray-300 leading-relaxed mb-2">
            &ldquo;{tribute.tribute}&rdquo;
          </p>
          <p className="font-noto text-xs text-gold/60 leading-relaxed">
            「{tribute.tributeZh}」
          </p>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-flame-orange/40" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-flame-orange/40" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-flame-orange/40" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-flame-orange/40" />
    </motion.div>
  )
}

export default function TributesSection() {
  const titleRef = useRef(null)
  const isTitleInView = useInView(titleRef, { once: true })

  return (
    <section id="tributes" className="relative py-24 px-6 z-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="font-cinzel text-xs tracking-[0.5em] text-flame-orange/70 uppercase mb-4">
            — Capitol Archives: BREACHED —
          </div>
          <h2 className="font-cinzel font-bold text-4xl md:text-5xl mb-2">
            <span className="text-gray-400">Tributes</span>
          </h2>
          <p className="font-noto text-xl text-gold/60 tracking-wide mb-4">角色致敬</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-red-500/40 bg-red-500/5 rounded-sm">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-cinzel text-xs text-red-400 tracking-widest">
              SYSTEM COMPROMISED — 系統已遭入侵
            </span>
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tributes.map((t, i) => (
            <TributeCard key={t.id} tribute={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
