'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
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

// #15 Quote matching game
const quizQuotes = [
  { quote: '"I volunteer! I volunteer as tribute!"', quoteZh: '「我自願！我自願成為貢品！」', answer: 'Katniss Everdeen', options: ['Katniss Everdeen', 'Johanna Mason', 'Finnick Odair', 'Haymitch'] },
  { quote: '"Real or not real?"', quoteZh: '「真實還是虛假？」', answer: 'Peeta Mellark', options: ['Peeta Mellark', 'Katniss Everdeen', 'Annie Cresta', 'Gale'] },
  { quote: '"It\'s the things we love most that destroy us."', quoteZh: '「那些我們最深愛的事物，往往將我們摧毀。」', answer: 'President Snow', options: ['President Snow', 'Haymitch', 'Coin', 'Caesar'] },
  { quote: '"Remember who the real enemy is."', quoteZh: '「記住，誰才是真正的敵人。」', answer: 'Haymitch Abernathy', options: ['Haymitch Abernathy', 'Katniss Everdeen', 'Finnick Odair', 'Cinna'] },
  { quote: '"You here to finish me off, sweetheart?"', quoteZh: '「你是來給我最後一擊的嗎，甜心？」', answer: 'Peeta Mellark', options: ['Peeta Mellark', 'Finnick Odair', 'Haymitch', 'Thresh'] },
  { quote: '"Fire is catching."', quoteZh: '「火焰會蔓延。」', answer: 'Katniss Everdeen', options: ['Katniss Everdeen', 'Cinna', 'Peeta Mellark', 'Rue'] },
]

function QuoteMatchGame() {
  const [qIdx, setQIdx] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [shake, setShake] = useState(false)

  const current = quizQuotes[qIdx]
  const isCorrect = selected === current.answer
  const isAnswered = selected !== null

  const handleSelect = (opt: string) => {
    if (isAnswered) return
    setSelected(opt)
    if (opt === current.answer) {
      setScore(s => s + 1)
    } else {
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  const handleNext = () => {
    if (qIdx + 1 >= quizQuotes.length) {
      setDone(true)
    } else {
      setQIdx(q => q + 1)
      setSelected(null)
    }
  }

  const reset = () => {
    setQIdx(0); setSelected(null); setScore(0); setDone(false); setShake(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-16 border border-gold/20 bg-charcoal/60 rounded-sm overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-black/30 border-b border-gold/10">
        <div className="flex items-center gap-2">
          <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-2 h-2 rounded-full bg-gold/60" />
          <span className="font-cinzel text-xs tracking-[0.3em] text-gold/60 uppercase">Quote Identification — 名言配對</span>
        </div>
        <span className="font-cinzel text-xs text-flame-orange/60">{score} / {quizQuotes.length}</span>
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={qIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Progress */}
              <div className="flex gap-1.5 mb-6">
                {quizQuotes.map((_, i) => (
                  <div key={i} className="flex-1 h-0.5 rounded-full"
                    style={{ background: i < qIdx ? '#d4af37' : i === qIdx ? '#ff6b00' : '#333' }} />
                ))}
              </div>

              {/* Quote */}
              <div className={`mb-6 transition-transform ${shake ? 'animate-bounce' : ''}`}>
                <blockquote className="font-playfair italic text-lg text-gray-200 mb-2 leading-relaxed">
                  {current.quote}
                </blockquote>
                <p className="font-noto text-sm text-gold/50">{current.quoteZh}</p>
                <p className="font-cinzel text-[10px] tracking-widest text-ash-gray/40 mt-2 uppercase">— Who said this? 這是誰說的？</p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 gap-3">
                {current.options.map((opt) => {
                  const isThis = selected === opt
                  const isRight = opt === current.answer
                  let cls = 'border-ash-gray/30 text-smoke hover:border-gold/40 hover:text-gold cursor-pointer'
                  if (isAnswered) {
                    if (isRight) cls = 'border-green-500/60 bg-green-500/10 text-green-400 cursor-default'
                    else if (isThis) cls = 'border-red-500/60 bg-red-500/10 text-red-400 cursor-default'
                    else cls = 'border-ash-gray/10 text-ash-gray/20 cursor-default'
                  }
                  return (
                    <motion.button key={opt} whileHover={!isAnswered ? { scale: 1.02 } : {}}
                      onClick={() => handleSelect(opt)}
                      className={`text-left px-4 py-3 border rounded-sm font-noto text-sm transition-all duration-200 ${cls}`}
                    >
                      {opt}
                    </motion.button>
                  )
                })}
              </div>

              {isAnswered && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex items-center justify-between">
                  <span className={`font-cinzel text-xs tracking-widest ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                    {isCorrect ? '✓ Correct — 正確！' : `✗ It was ${current.answer}`}
                  </span>
                  <button onClick={handleNext}
                    className="px-4 py-1.5 border border-flame-orange/40 text-flame-orange font-cinzel text-xs tracking-widest hover:bg-flame-orange/10 transition-all rounded-sm">
                    {qIdx + 1 >= quizQuotes.length ? 'See Results →' : 'Next →'}
                  </button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
              <div className="font-cinzel font-black text-5xl gold-text mb-2">{score}/{quizQuotes.length}</div>
              <p className="font-playfair italic text-gray-300 mb-1">
                {score === quizQuotes.length ? '"You know your tributes well."' :
                  score >= 4 ? '"The rebellion recognizes you."' :
                  '"Study the archives, soldier."'}
              </p>
              <p className="font-noto text-sm text-gold/40 mb-6">
                {score === quizQuotes.length ? '全部答對！你是真正的飢餓遊戲迷。' :
                  score >= 4 ? '答得不錯！革命向你致敬。' :
                  '繼續研究首都的檔案。'}
              </p>
              <button onClick={reset}
                className="px-6 py-2.5 border border-flame-orange/40 text-flame-orange font-cinzel text-xs tracking-widest hover:bg-flame-orange/10 transition-all rounded-sm">
                Try Again — 再試一次
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
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

        {/* #15 Quote matching game */}
        <QuoteMatchGame />
      </div>
    </section>
  )
}
