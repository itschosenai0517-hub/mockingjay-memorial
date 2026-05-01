'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

// Morse code: "THE MOCKINGJAY LIVES" → triggers hidden reveal
const SECRET_MORSE = '- .... . / -- --- -.-. -.- .. -. --. .--- .- -.-- / .-.. .. ...- . ...'
const SECRET_TRIGGER = '...---...' // SOS as simpler trigger in 3s window

const morseMap: Record<string, string> = {
  'A':'.-','B':'-...','C':'-.-.','D':'-..','E':'.','F':'..-.','G':'--.','H':'....','I':'..','J':'.---',
  'K':'-.-','L':'.-..','M':'--','N':'-.','O':'---','P':'.--.','Q':'--.-','R':'.-.','S':'...','T':'-',
  'U':'..-','V':'...-','W':'.--','X':'-..-','Y':'-.--','Z':'--..',
  '1':'.----','2':'..---','3':'...--','4':'....-','5':'.....','6':'-....','7':'--...','8':'---..','9':'----.','0':'-----',
}

function encodeMorse(text: string): string {
  return text.toUpperCase().split('').map(c => c === ' ' ? '/' : (morseMap[c] || '')).join(' ')
}

const HIDDEN_MESSAGE = 'THE MOCKINGJAY LIVES'
const HIDDEN_ZH = '反抗之鳥永不熄滅'

export default function MorseEasterEgg() {
  const [input, setInput] = useState('')
  const [flashes, setFlashes] = useState<string[]>([])
  const [unlocked, setUnlocked] = useState(false)
  const [glitch, setGlitch] = useState(false)
  const [hint, setHint] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Detect "... --- ..." (SOS / D13 signal) or full message
  useEffect(() => {
    const cleaned = input.replace(/\s+/g, ' ').trim()
    const encoded = encodeMorse(HIDDEN_MESSAGE)
    if (cleaned === encoded || cleaned.includes(SECRET_TRIGGER)) {
      triggerUnlock()
    }
  }, [input])

  const triggerUnlock = () => {
    setGlitch(true)
    setTimeout(() => {
      setGlitch(false)
      setUnlocked(true)
    }, 1200)
  }

  const addDot = () => {
    setInput(p => p ? p + ' .' : '.')
    setFlashes(p => [...p.slice(-30), '.'])
  }
  const addDash = () => {
    setInput(p => p ? p + ' -' : '-')
    setFlashes(p => [...p.slice(-30), '-'])
  }
  const addSpace = () => {
    setInput(p => p + ' /')
    setFlashes(p => [...p.slice(-30), '/'])
  }
  const clearInput = () => { setInput(''); setFlashes([]) }

  const encodedHint = encodeMorse(HIDDEN_MESSAGE)

  return (
    <section id="morse" className="relative py-24 px-6 z-20">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="font-cinzel text-xs tracking-[0.5em] text-red-500/70 uppercase mb-4">
            — Encrypted Transmission —
          </div>
          <h2 className="font-cinzel font-bold text-4xl md:text-5xl gold-text mb-3">
            District 13 Signal
          </h2>
          <p className="font-noto text-xl text-gold/60 tracking-wide mb-3">第十三區密碼訊號</p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-32 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto"
          />
        </motion.div>

        <div className="border border-red-500/20 bg-charcoal/80 rounded-sm overflow-hidden">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-2 bg-black/40 border-b border-red-500/20">
            <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-2 h-2 rounded-full bg-red-500" />
            <span className="font-cinzel text-[10px] tracking-widest text-red-400/60 uppercase">D13 Morse Terminal — 第十三區摩斯密碼機</span>
          </div>

          {/* Glitch overlay */}
          <AnimatePresence>
            {glitch && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0.3, 0.9, 0.1, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0 z-10 pointer-events-none bg-red-600/30 mix-blend-screen"
              />
            )}
          </AnimatePresence>

          <div className={`p-6 relative transition-all duration-300 ${glitch ? 'glitch-active' : ''}`}>
            {/* Scanlines */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="absolute w-full h-px bg-white/5" style={{ top: `${i * 5}%` }} />
              ))}
            </div>

            <AnimatePresence mode="wait">
              {!unlocked ? (
                <motion.div key="locked" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {/* Instruction */}
                  <p className="font-cinzel text-xs text-red-400/60 tracking-widest mb-1">INTERCEPTED BROADCAST — 截獲的廣播：</p>
                  <p className="font-noto text-[11px] text-smoke mb-4">
                    輸入摩斯密碼以解鎖 District 13 的隱藏訊息。<br />
                    <span className="text-ash-gray/50">Use • (dot) and — (dash). Space between letters, / between words.</span>
                  </p>

                  {/* Flash display */}
                  <div className="bg-black/50 rounded-sm p-4 mb-4 min-h-[60px] font-mono text-sm text-green-400/80 tracking-widest break-all leading-relaxed border border-green-900/30">
                    {flashes.length > 0 ? (
                      <span>{flashes.join(' ')}</span>
                    ) : (
                      <span className="text-ash-gray/30 text-xs">awaiting signal...</span>
                    )}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                      className="inline-block w-2 h-4 bg-green-400/60 ml-1 align-middle"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 mb-4">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={addDot}
                      className="flex-1 py-3 border border-green-500/40 text-green-400 font-cinzel text-sm tracking-widest hover:bg-green-500/10 transition-all rounded-sm"
                    >
                      • DOT
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={addDash}
                      className="flex-1 py-3 border border-green-500/40 text-green-400 font-cinzel text-sm tracking-widest hover:bg-green-500/10 transition-all rounded-sm"
                    >
                      — DASH
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={addSpace}
                      className="py-3 px-4 border border-ash-gray/30 text-ash-gray/60 font-cinzel text-xs tracking-widest hover:bg-ash-gray/5 transition-all rounded-sm"
                    >
                      /
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={clearInput}
                      className="py-3 px-4 border border-red-500/20 text-red-400/40 font-cinzel text-xs hover:text-red-400/70 hover:border-red-500/40 transition-all rounded-sm"
                    >
                      CLR
                    </motion.button>
                  </div>

                  {/* Hint toggle */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setHint(h => !h)}
                      className="font-cinzel text-[10px] tracking-widest text-ash-gray/40 hover:text-red-400/60 transition-colors uppercase"
                    >
                      {hint ? '▲ Hide hint' : '▼ Show hint — 顯示提示'}
                    </button>
                    <span className="font-cinzel text-[10px] text-ash-gray/20 tracking-widest">
                      {input.replace(/\s/g,'').length} symbols
                    </span>
                  </div>

                  <AnimatePresence>
                    {hint && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 p-3 bg-black/30 border border-red-500/10 rounded-sm overflow-hidden"
                      >
                        <p className="font-cinzel text-[10px] text-red-400/50 tracking-widest mb-1">ENCRYPTED MESSAGE:</p>
                        <p className="font-mono text-[10px] text-green-400/40 break-all leading-relaxed">{encodedHint}</p>
                        <p className="font-noto text-[10px] text-ash-gray/30 mt-1">Try entering: ... --- ... (SOS) to unlock quickly</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div
                  key="unlocked"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="text-center py-4"
                >
                  {/* Alert ping */}
                  <div className="flex justify-center mb-4">
                    <span className="flex h-4 w-4 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500" />
                    </span>
                  </div>

                  <p className="font-cinzel text-xs text-red-400 tracking-[0.4em] mb-4 uppercase">
                    Signal Decoded — 訊號已解密
                  </p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="font-cinzel font-black text-3xl flame-text mb-2">{HIDDEN_MESSAGE}</p>
                    <p className="font-noto text-xl text-gold/80 mb-6">{HIDDEN_ZH}</p>
                    <div className="border border-flame-orange/20 rounded-sm p-4 text-left space-y-2 mb-6">
                      <p className="font-cinzel text-[10px] text-red-400/60 tracking-widest">D13 CLASSIFIED BROADCAST:</p>
                      <p className="font-noto text-sm text-smoke leading-relaxed">
                        District 13 was never destroyed. The Capitol lied. We rebuilt underground, we trained, we waited — for her. The Mockingjay has risen. The rebellion is real.
                      </p>
                      <p className="font-noto text-xs text-gold/40 leading-relaxed">
                        第十三區從未被摧毀。首都說謊了。我們在地底重建、訓練、等待——等待她。反抗之鳥已然崛起。革命是真實的。
                      </p>
                    </div>
                  </motion.div>

                  <button
                    onClick={() => { setUnlocked(false); clearInput() }}
                    className="font-cinzel text-xs tracking-widest text-ash-gray/40 hover:text-flame-orange/60 transition-colors border border-ash-gray/20 hover:border-flame-orange/30 px-4 py-2 rounded-sm"
                  >
                    Reset — 重置
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
