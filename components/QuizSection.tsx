'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const questions = [
  {
    q: 'What do you value most in life?',
    zh: '你最重視生命中的什麼？',
    options: [
      { text: 'Beauty & artistry', zh: '美麗與藝術', scores: { 1: 3, 2: 0, 3: 1, 4: 1, 5: 0, 6: 0, 7: 1, 8: 2, 9: 0, 10: 0, 11: 1, 12: 0 } },
      { text: 'Strength & order', zh: '力量與秩序', scores: { 1: 0, 2: 3, 3: 0, 4: 1, 5: 1, 6: 0, 7: 0, 8: 0, 9: 0, 10: 1, 11: 0, 12: 0 } },
      { text: 'Knowledge & innovation', zh: '知識與創新', scores: { 1: 0, 2: 0, 3: 3, 4: 0, 5: 2, 6: 1, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0 } },
      { text: 'Freedom & community', zh: '自由與社群', scores: { 1: 0, 2: 0, 3: 0, 4: 2, 5: 0, 6: 1, 7: 2, 8: 1, 9: 1, 10: 1, 11: 2, 12: 3 } },
    ],
  },
  {
    q: 'How do you face danger?',
    zh: '你如何面對危險？',
    options: [
      { text: 'With calculated strategy', zh: '以縝密的策略', scores: { 1: 1, 2: 3, 3: 2, 4: 0, 5: 1, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 1 } },
      { text: 'With speed & instinct', zh: '以速度與本能', scores: { 1: 0, 2: 0, 3: 0, 4: 3, 5: 0, 6: 2, 7: 1, 8: 0, 9: 0, 10: 1, 11: 0, 12: 2 } },
      { text: 'By protecting others first', zh: '先保護他人', scores: { 1: 0, 2: 0, 3: 0, 4: 1, 5: 0, 6: 0, 7: 2, 8: 2, 9: 1, 10: 1, 11: 3, 12: 2 } },
      { text: 'By outsmarting the situation', zh: '以智謀化解', scores: { 1: 2, 2: 0, 3: 3, 4: 0, 5: 2, 6: 1, 7: 0, 8: 1, 9: 0, 10: 0, 11: 0, 12: 0 } },
    ],
  },
  {
    q: 'What environment feels like home?',
    zh: '什麼樣的環境讓你感到像家？',
    options: [
      { text: 'A vibrant city or workshop', zh: '充滿活力的城市或工坊', scores: { 1: 2, 2: 1, 3: 2, 4: 0, 5: 2, 6: 2, 7: 0, 8: 2, 9: 0, 10: 0, 11: 0, 12: 0 } },
      { text: 'The open sea or water', zh: '廣闊的海洋或水邊', scores: { 1: 0, 2: 0, 3: 0, 4: 3, 5: 0, 6: 1, 7: 0, 8: 0, 9: 0, 10: 1, 11: 0, 12: 0 } },
      { text: 'Fields & farmland', zh: '田野與農地', scores: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 1, 8: 0, 9: 2, 10: 3, 11: 3, 12: 1 } },
      { text: 'Forests & rugged wilderness', zh: '森林與荒野', scores: { 1: 0, 2: 1, 3: 0, 4: 1, 5: 0, 6: 0, 7: 3, 8: 0, 9: 0, 10: 1, 11: 1, 12: 3 } },
    ],
  },
  {
    q: 'What is your greatest strength?',
    zh: '你最大的優點是什麼？',
    options: [
      { text: 'Creativity & charm', zh: '創造力與魅力', scores: { 1: 3, 2: 0, 3: 1, 4: 2, 5: 0, 6: 0, 7: 0, 8: 2, 9: 0, 10: 0, 11: 0, 12: 0 } },
      { text: 'Loyalty & endurance', zh: '忠誠與耐力', scores: { 1: 0, 2: 1, 3: 0, 4: 1, 5: 0, 6: 1, 7: 2, 8: 1, 9: 2, 10: 2, 11: 2, 12: 3 } },
      { text: 'Intelligence & adaptability', zh: '智慧與適應力', scores: { 1: 1, 2: 0, 3: 3, 4: 0, 5: 3, 6: 2, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 1 } },
      { text: 'Physical skill & precision', zh: '體能與精準度', scores: { 1: 0, 2: 3, 3: 0, 4: 2, 5: 0, 6: 0, 7: 1, 8: 0, 9: 1, 10: 1, 11: 1, 12: 2 } },
    ],
  },
  {
    q: 'In the rebellion, what role would you play?',
    zh: '在反抗中，你會扮演什麼角色？',
    options: [
      { text: 'The symbol who inspires millions', zh: '激勵眾人的象徵', scores: { 1: 0, 2: 0, 3: 0, 4: 1, 5: 0, 6: 0, 7: 0, 8: 1, 9: 0, 10: 0, 11: 1, 12: 3 } },
      { text: 'The strategist in the shadows', zh: '暗中籌謀的策略家', scores: { 1: 1, 2: 2, 3: 3, 4: 0, 5: 2, 6: 1, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0 } },
      { text: 'The one who feeds and sustains', zh: '供給與維持眾人的人', scores: { 1: 0, 2: 0, 3: 0, 4: 2, 5: 0, 6: 1, 7: 2, 8: 1, 9: 3, 10: 3, 11: 2, 12: 1 } },
      { text: 'The fighter on the frontline', zh: '前線的戰士', scores: { 1: 0, 2: 3, 3: 0, 4: 2, 5: 0, 6: 0, 7: 1, 8: 2, 9: 0, 10: 0, 11: 2, 12: 2 } },
    ],
  },
]

type DistrictNum = 1|2|3|4|5|6|7|8|9|10|11|12

const districtDetails: Record<DistrictNum, { name: string; zh: string; color: string; desc: string; descZh: string; notable: string }> = {
  1:  { name: 'Luxury',      zh: '奢侈品',    color: '#a78bfa', desc: 'Artisans of beauty, creators for the Capitol.',           descZh: '為首都打造奢華的工匠，擅長美學與手工藝。',         notable: 'Glimmer, Marvel' },
  2:  { name: 'Masonry',     zh: '石造工業',  color: '#94a3b8', desc: 'Strong, disciplined builders and weapon-makers.',         descZh: '紀律嚴明的建設者與武器製造者，力量是你的語言。',  notable: 'Cato, Clove' },
  3:  { name: 'Technology',  zh: '科技',      color: '#60a5fa', desc: 'Brilliant engineers who rewire the world.',               descZh: '重新定義世界的天才工程師，科技是你的武器。',       notable: 'Beetee, Wiress' },
  4:  { name: 'Fishing',     zh: '漁業',      color: '#22d3ee', desc: 'Free spirits of the sea, swift and formidable.',          descZh: '海洋的自由靈魂，迅捷而令人生畏。',               notable: 'Finnick, Annie' },
  5:  { name: 'Power',       zh: '電力',      color: '#facc15', desc: 'Unseen but essential — you keep the lights on.',          descZh: '看不見卻不可或缺——是你讓世界運轉。',             notable: 'Foxface' },
  6:  { name: 'Transport',   zh: '運輸',      color: '#f97316', desc: 'The connectors who keep Panem moving forward.',          descZh: '串連整個潘恩的連接者，讓一切持續運轉。',         notable: 'Morphlings' },
  7:  { name: 'Lumber',      zh: '木材',      color: '#4ade80', desc: 'Deep in the forest, patient and purposeful.',            descZh: '深居林間，沉穩而有目標的森林之子。',              notable: 'Johanna Mason' },
  8:  { name: 'Textiles',    zh: '紡織',      color: '#f472b6', desc: 'Weavers of fabric — and of revolution.',                 descZh: '紡織者，也是革命的編織者。',                      notable: 'Twill, Bonnie' },
  9:  { name: 'Grain',       zh: '穀物',      color: '#d4af37', desc: 'The quiet backbone of Panem, steady and resilient.',     descZh: '潘恩沉默的脊樑，穩固而韌性十足。',               notable: 'Unknown tributes' },
  10: { name: 'Livestock',   zh: '畜牧',      color: '#a3e635', desc: 'Caretakers of life — patient, grounded, protective.',    descZh: '生命的守護者——耐心、踏實、保護他人。',           notable: 'Unnamed tributes' },
  11: { name: 'Agriculture', zh: '農業',      color: '#86efac', desc: 'The first to light a spark — solidarity runs deep here.', descZh: '第一個點燃火花的區——團結深植於此。',            notable: 'Rue, Thresh' },
  12: { name: 'Coal Mining', zh: '煤礦開採',  color: '#ff6b00', desc: 'From the ashes, the fire of revolution was born.',       descZh: '從灰燼中，革命的火焰就此誕生。',                  notable: 'Katniss, Peeta, Haymitch' },
}

export default function QuizSection() {
  const [step, setStep] = useState<'intro' | 'quiz' | 'result'>('intro')
  const [current, setCurrent] = useState(0)
  const [scores, setScores] = useState<Record<number, number>>({1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0})
  const [result, setResult] = useState<DistrictNum | null>(null)
  const [selected, setSelected] = useState<number | null>(null)

  const handleAnswer = (optionIdx: number) => {
    setSelected(optionIdx)
    const s = questions[current].options[optionIdx].scores
    const newScores = { ...scores }
    Object.entries(s).forEach(([k, v]) => {
      newScores[Number(k)] = (newScores[Number(k)] || 0) + v
    })

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setScores(newScores)
        setCurrent(current + 1)
        setSelected(null)
      } else {
        // Find result
        let maxD = 1 as DistrictNum
        let maxV = -1
        Object.entries(newScores).forEach(([k, v]) => {
          if (v > maxV) { maxV = v; maxD = Number(k) as DistrictNum }
        })
        setResult(maxD)
        setStep('result')
      }
    }, 400)
  }

  const reset = () => {
    setStep('intro')
    setCurrent(0)
    setScores({1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0})
    setResult(null)
    setSelected(null)
  }

  const d = result ? districtDetails[result] : null
  const progress = (current / questions.length) * 100

  return (
    <section id="quiz" className="relative py-24 px-6 z-20">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="font-cinzel text-xs tracking-[0.5em] text-flame-orange/70 uppercase mb-4">
            — Reaping Assignment —
          </div>
          <h2 className="font-cinzel font-bold text-4xl md:text-5xl gold-text mb-3">
            Your District
          </h2>
          <p className="font-noto text-xl text-gold/60 tracking-wide mb-3">你屬於哪個區？</p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-32 h-px bg-gradient-to-r from-transparent via-flame-orange to-transparent mx-auto"
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border border-flame-orange/30 bg-charcoal/80 rounded-sm p-8 text-center"
            >
              <div className="mb-6">
                <svg viewBox="0 0 80 80" className="w-16 h-16 mx-auto mb-4 opacity-60">
                  <circle cx="40" cy="40" r="36" fill="none" stroke="#ff6b00" strokeWidth="1.5" strokeDasharray="6 3" />
                  <text x="40" y="46" textAnchor="middle" fontSize="22" fontFamily="Cinzel" fill="#ff6b00" fontWeight="bold">?</text>
                </svg>
                <p className="font-playfair italic text-gray-300 text-lg leading-relaxed mb-2">
                  &ldquo;Which district would claim you — and would you be proud to stand with them?&rdquo;
                </p>
                <p className="font-noto text-sm text-gold/50">哪個區會認領你——你又是否以此為榮？</p>
              </div>
              <p className="font-noto text-sm text-smoke mb-8">
                Answer {questions.length} questions to discover where you truly belong in Panem.<br />
                <span className="text-ash-gray text-xs">回答 {questions.length} 道問題，找出你在潘恩的歸屬。</span>
              </p>
              <button
                onClick={() => setStep('quiz')}
                className="px-8 py-3 border border-flame-orange/60 text-flame-orange font-cinzel text-sm tracking-widest hover:bg-flame-orange/10 transition-all duration-300 uppercase rounded-sm"
              >
                Begin — 開始
              </button>
            </motion.div>
          )}

          {step === 'quiz' && (
            <motion.div
              key={`q-${current}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              className="border border-flame-orange/30 bg-charcoal/80 rounded-sm p-8"
            >
              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-cinzel text-xs text-ash-gray tracking-widest">
                    {current + 1} / {questions.length}
                  </span>
                  <span className="font-cinzel text-xs text-flame-orange/60">{Math.round(progress)}%</span>
                </div>
                <div className="h-px bg-ash-gray/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-flame-red to-flame-orange"
                    initial={{ width: `${(current / questions.length) * 100}%` }}
                    animate={{ width: `${((current) / questions.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <p className="font-playfair text-xl text-gray-100 mb-1 leading-relaxed">
                  {questions[current].q}
                </p>
                <p className="font-noto text-sm text-gold/50">{questions[current].zh}</p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {questions[current].options.map((opt, i) => (
                  <motion.button
                    key={i}
                    onClick={() => selected === null && handleAnswer(i)}
                    whileHover={selected === null ? { x: 4 } : {}}
                    className={`w-full text-left px-5 py-4 border rounded-sm transition-all duration-200 ${
                      selected === i
                        ? 'border-flame-orange bg-flame-orange/20 text-flame-orange'
                        : selected !== null
                        ? 'border-ash-gray/10 text-ash-gray/40 cursor-default'
                        : 'border-ash-gray/30 hover:border-flame-orange/50 hover:bg-flame-orange/5 cursor-pointer'
                    }`}
                  >
                    <span className="font-cinzel text-xs tracking-widest mr-3 opacity-50">
                      {String.fromCharCode(65 + i)}.
                    </span>
                    <span className="font-noto text-sm">{opt.text}</span>
                    <span className="font-noto text-xs text-gold/40 block mt-0.5 ml-6">{opt.zh}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'result' && d && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="border rounded-sm p-8 text-center relative overflow-hidden"
              style={{ borderColor: d.color + '60', background: 'rgba(20,20,20,0.9)' }}
            >
              {/* Top color bar */}
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: d.color }} />

              {/* Glow */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none"
                style={{ background: d.color }}
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="font-cinzel text-xs tracking-[0.5em] text-ash-gray/60 uppercase mb-4">
                  You belong to — 你屬於
                </div>
                <div
                  className="font-cinzel font-black text-7xl md:text-8xl mb-2"
                  style={{ color: d.color, textShadow: `0 0 30px ${d.color}80` }}
                >
                  {result}
                </div>
                <div className="font-cinzel text-2xl mb-1" style={{ color: d.color }}>
                  DISTRICT {result}
                </div>
                <div className="font-cinzel text-xl text-gray-300 mb-1">{d.name}</div>
                <div className="font-noto text-lg text-gold/60 mb-6">第{['一','二','三','四','五','六','七','八','九','十','十一','十二'][result-1]}區・{d.zh}</div>

                <div className="w-16 h-px mx-auto mb-6" style={{ background: d.color + '60' }} />

                <p className="font-playfair italic text-gray-300 text-base leading-relaxed mb-2">{d.desc}</p>
                <p className="font-noto text-sm text-gold/50 mb-6">{d.descZh}</p>

                <div className="border rounded-sm px-4 py-2 inline-block mb-8" style={{ borderColor: d.color + '30' }}>
                  <span className="font-cinzel text-xs tracking-widest text-ash-gray/60 mr-2">NOTABLE:</span>
                  <span className="font-noto text-sm" style={{ color: d.color }}>{d.notable}</span>
                </div>

                <div>
                  <button
                    onClick={reset}
                    className="px-6 py-2.5 border border-ash-gray/30 text-ash-gray font-cinzel text-xs tracking-widest hover:border-flame-orange/50 hover:text-flame-orange transition-all duration-300 uppercase rounded-sm"
                  >
                    Try Again — 再試一次
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
