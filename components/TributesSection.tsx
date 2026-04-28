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
    // E: quote audio line (spoken via Web Speech API)
    voiceLine: 'If we burn, you burn with us.',
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
    voiceLine: 'Stay alive. That is the only thing that matters.',
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
    voiceLine: 'It takes ten times as long to put yourself back together as it does to fall apart.',
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
    voiceLine: 'Will you sing for me? Like your sister does.',
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
    voiceLine: 'Embrace the probability of your imminent death, and know in your heart that there is nothing I can do to save you.',
    status: 'ALIVE',
    statusZh: '存活',
    threat: 'MODERATE',
    id: 'ABN-12-M-75',
  },
]

function useTypewriter(text: string, speed = 35, startDelay = 0) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const delayTimer = setTimeout(() => setStarted(true), startDelay)
    return () => clearTimeout(delayTimer)
  }, [startDelay])

  useEffect(() => {
    if (!started) return
    let i = 0
    setDisplayed('')
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(interval)
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed, started])

  return displayed
}

// E: Play quote via Web Speech API
function speakLine(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utt = new SpeechSynthesisUtterance(text)
  utt.lang = 'en-US'
  utt.rate = 0.88
  utt.pitch = 0.95
  window.speechSynthesis.speak(utt)
}

function TributeCard({ tribute, index }: { tribute: typeof tributes[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [unlocked, setUnlocked] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const unlockText = useTypewriter(
    unlocked ? `FILE UNLOCKED — 檔案已解鎖 — ${tribute.id}` : '',
    40,
    0
  )

  useEffect(() => {
    if (isInView) {
      const t = setTimeout(() => setUnlocked(true), index * 150 + 400)
      return () => clearTimeout(t)
    }
  }, [isInView, index])

  // E: speak handler
  const handleSpeak = () => {
    if (speaking) {
      window.speechSynthesis?.cancel()
      setSpeaking(false)
      return
    }
    setSpeaking(true)
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utt = new SpeechSynthesisUtterance(tribute.voiceLine)
      utt.lang = 'en-US'
      utt.rate = 0.88
      utt.pitch = 0.95
      utt.onend = () => setSpeaking(false)
      utt.onerror = () => setSpeaking(false)
      window.speechSynthesis.speak(utt)
    }
  }

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
          {unlocked && unlockText.length < `FILE UNLOCKED — 檔案已解鎖 — ${tribute.id}`.length && (
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

        {/* E: Voice quote button */}
        <button
          onClick={handleSpeak}
          className={`mt-4 w-full flex items-center justify-center gap-2 py-2 px-3 border rounded-sm text-xs font-cinzel tracking-widest transition-all duration-300 ${
            speaking
              ? 'border-flame-orange/70 text-flame-orange bg-flame-orange/10'
              : 'border-ash-gray/30 text-ash-gray hover:border-flame-orange/50 hover:text-flame-orange hover:bg-flame-orange/5'
          }`}
        >
          {/* Speaker icon */}
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-current">
            {speaking ? (
              <>
                <rect x="1" y="5" width="3" height="6" rx="0.5" />
                <path d="M5 3 L5 13 L9 10 L9 6 Z" />
                <path d="M11 5 Q13 8 11 11" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                <path d="M12.5 3.5 Q15.5 8 12.5 12.5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              </>
            ) : (
              <>
                <rect x="1" y="5" width="3" height="6" rx="0.5" />
                <path d="M5 3 L5 13 L9 10 L9 6 Z" />
                <path d="M11 6 Q12.5 8 11 10" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              </>
            )}
          </svg>
          {speaking ? 'PLAYING... 播放中' : 'PLAY QUOTE 播放語音'}
        </button>
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
