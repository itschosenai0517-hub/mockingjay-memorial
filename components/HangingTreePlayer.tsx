'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

// Web Audio API ambient tone generator — no external audio file needed
// Generates a haunting pentatonic melody reminiscent of The Hanging Tree

function createHangingTreeAmbience(ctx: AudioContext): AudioNode {
  const masterGain = ctx.createGain()
  masterGain.gain.setValueAtTime(0, ctx.currentTime)
  masterGain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 2)
  masterGain.connect(ctx.destination)

  const reverb = ctx.createConvolver()
  const reverbGain = ctx.createGain()
  reverbGain.gain.value = 0.6

  // Create impulse response for reverb
  const rate = ctx.sampleRate
  const length = rate * 3
  const impulse = ctx.createBuffer(2, length, rate)
  for (let c = 0; c < 2; c++) {
    const d = impulse.getChannelData(c)
    for (let i = 0; i < length; i++) {
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2.5)
    }
  }
  reverb.buffer = impulse
  reverb.connect(reverbGain)
  reverbGain.connect(masterGain)

  // The Hanging Tree melody — G minor pentatonic approximation
  // Frequencies: G3, Bb3, C4, D4, F4, G4
  const notes = [196, 233.08, 261.63, 293.66, 349.23, 392]
  // Simplified melody pattern inspired by the song
  const melody = [4, 3, 2, 1, 0, 1, 2, 4, 3, 2, 1, 2, 3, 4, 5, 4]
  const beatLen = 0.72 // ~83bpm, slow and haunting

  const scheduleNote = (noteIdx: number, startTime: number, duration: number, gain: number) => {
    const osc = ctx.createOscillator()
    const g = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = notes[noteIdx]
    g.gain.setValueAtTime(0, startTime)
    g.gain.linearRampToValueAtTime(gain, startTime + 0.06)
    g.gain.exponentialRampToValueAtTime(0.001, startTime + duration)
    osc.connect(g)
    g.connect(reverb)
    g.connect(masterGain)
    osc.start(startTime)
    osc.stop(startTime + duration + 0.1)
  }

  // Drone pad underneath
  const drone = ctx.createOscillator()
  const droneGain = ctx.createGain()
  drone.type = 'triangle'
  drone.frequency.value = 98 // G2
  droneGain.gain.value = 0.08
  drone.connect(droneGain)
  droneGain.connect(reverb)
  drone.start()

  // Schedule melody loop
  let t = ctx.currentTime + 1
  const scheduleMelody = () => {
    for (let i = 0; i < melody.length; i++) {
      scheduleNote(melody[i], t + i * beatLen, beatLen * 0.85, 0.18)
      // Add occasional harmony
      if (i % 4 === 0) {
        scheduleNote(Math.max(0, melody[i] - 2), t + i * beatLen + 0.04, beatLen * 0.7, 0.07)
      }
    }
    t += melody.length * beatLen + 1.5
  }

  // Initial schedule + repeat
  scheduleMelody()
  scheduleMelody()
  scheduleMelody()

  const interval = setInterval(() => {
    if (t < ctx.currentTime + 8) scheduleMelody()
  }, 1000)

  ;(masterGain as any)._cleanup = () => {
    clearInterval(interval)
    drone.stop()
  }

  return masterGain
}

// Animated waveform bars
function Waveform({ playing }: { playing: boolean }) {
  const bars = 28
  return (
    <div className="flex items-center justify-center gap-[3px] h-12">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full bg-gradient-to-t from-flame-orange to-gold"
          animate={playing ? {
            height: [
              `${6 + (i % 5) * 4}px`,
              `${14 + Math.sin(i * 0.7) * 10 + 8}px`,
              `${8 + (i % 3) * 6}px`,
              `${18 + Math.cos(i * 0.5) * 8}px`,
              `${6 + (i % 5) * 4}px`,
            ],
            opacity: [0.5, 1, 0.7, 1, 0.5],
          } : { height: '4px', opacity: 0.2 }}
          transition={playing ? {
            duration: 1.8 + (i % 4) * 0.3,
            repeat: Infinity,
            delay: i * 0.04,
            ease: 'easeInOut',
          } : { duration: 0.5 }}
          style={{ minHeight: '4px' }}
        />
      ))}
    </div>
  )
}

export default function HangingTreePlayer() {
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)
  const masterRef = useRef<AudioNode | null>(null)

  const togglePlay = () => {
    if (!playing) {
      if (!ctxRef.current) {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
        ctxRef.current = ctx
        masterRef.current = createHangingTreeAmbience(ctx)
      } else if (ctxRef.current.state === 'suspended') {
        ctxRef.current.resume()
      }
      setPlaying(true)
      setStarted(true)
    } else {
      ctxRef.current?.suspend()
      setPlaying(false)
    }
  }

  useEffect(() => {
    return () => {
      if (masterRef.current && (masterRef.current as any)._cleanup) {
        (masterRef.current as any)._cleanup()
      }
      ctxRef.current?.close()
    }
  }, [])

  return (
    <section id="hanging-tree" className="relative py-24 px-6 z-20">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="font-cinzel text-xs tracking-[0.5em] text-flame-orange/70 uppercase mb-4">
            — Are you, are you —
          </div>
          <h2 className="font-cinzel font-bold text-4xl md:text-5xl gold-text mb-3">
            The Hanging Tree
          </h2>
          <p className="font-noto text-xl text-gold/60 tracking-wide mb-3">絞刑樹之歌</p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-32 h-px bg-gradient-to-r from-transparent via-flame-orange to-transparent mx-auto"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="border border-flame-orange/30 bg-charcoal/80 rounded-sm overflow-hidden"
        >
          {/* Tree illustration header */}
          <div className="relative h-32 bg-gradient-to-b from-black/60 to-charcoal/80 flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 200 120" className="w-full h-full absolute inset-0 opacity-20">
              {/* Bare tree silhouette */}
              <line x1="100" y1="120" x2="100" y2="40" stroke="#ff6b00" strokeWidth="3"/>
              <line x1="100" y1="60" x2="60" y2="30" stroke="#ff6b00" strokeWidth="2"/>
              <line x1="100" y1="55" x2="140" y2="25" stroke="#ff6b00" strokeWidth="2"/>
              <line x1="100" y1="75" x2="70" y2="55" stroke="#ff6b00" strokeWidth="1.5"/>
              <line x1="100" y1="70" x2="130" y2="50" stroke="#ff6b00" strokeWidth="1.5"/>
              <line x1="60" y1="30" x2="45" y2="18" stroke="#ff6b00" strokeWidth="1.5"/>
              <line x1="60" y1="30" x2="72" y2="14" stroke="#ff6b00" strokeWidth="1.5"/>
              <line x1="140" y1="25" x2="128" y2="10" stroke="#ff6b00" strokeWidth="1.5"/>
              <line x1="140" y1="25" x2="155" y2="12" stroke="#ff6b00" strokeWidth="1.5"/>
              {/* Hanging rope */}
              <line x1="100" y1="40" x2="100" y2="10" stroke="#d4af37" strokeWidth="1" opacity="0.6"/>
            </svg>

            {/* Floating ember particles */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-flame-orange"
                style={{ left: `${20 + i * 10}%`, bottom: '20%' }}
                animate={{ y: [-10, -50 - i * 8], opacity: [0.8, 0], x: [0, (i % 2 === 0 ? 1 : -1) * (5 + i * 2)] }}
                transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.4, ease: 'easeOut' }}
              />
            ))}

            <div className="relative z-10 text-center">
              <p className="font-playfair italic text-sm text-gray-400 leading-relaxed px-6">
                &ldquo;Are you, are you, coming to the tree...&rdquo;
              </p>
              <p className="font-noto text-xs text-gold/40 mt-1">你是否來到這棵樹下……</p>
            </div>
          </div>

          {/* Player controls */}
          <div className="p-8">
            {/* Waveform */}
            <div className="mb-6">
              <Waveform playing={playing} />
            </div>

            {/* Track info */}
            <div className="text-center mb-6">
              <p className="font-cinzel text-sm tracking-widest text-flame-orange/80">THE HANGING TREE</p>
              <p className="font-noto text-xs text-gold/40 mt-1">Ambient Tribute · District 12</p>
              {playing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center gap-1 mt-2"
                >
                  {[0,1,2].map(i => (
                    <motion.span
                      key={i}
                      className="w-1 h-1 rounded-full bg-flame-orange"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                    />
                  ))}
                  <span className="font-cinzel text-[10px] tracking-widest text-flame-orange/60 ml-2">PLAYING</span>
                </motion.div>
              )}
            </div>

            {/* Play button */}
            <div className="flex justify-center mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={togglePlay}
                className="relative w-16 h-16 rounded-full border-2 border-flame-orange/60 flex items-center justify-center hover:bg-flame-orange/10 transition-all duration-300"
                style={{ boxShadow: playing ? '0 0 24px rgba(255,107,0,0.4)' : 'none' }}
              >
                {/* Pulse ring when playing */}
                {playing && (
                  <motion.div
                    className="absolute inset-0 rounded-full border border-flame-orange/30"
                    animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
                <AnimatePresence mode="wait">
                  {playing ? (
                    <motion.svg key="pause" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                      viewBox="0 0 24 24" className="w-6 h-6 fill-flame-orange">
                      <rect x="6" y="4" width="4" height="16" rx="1"/>
                      <rect x="14" y="4" width="4" height="16" rx="1"/>
                    </motion.svg>
                  ) : (
                    <motion.svg key="play" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                      viewBox="0 0 24 24" className="w-6 h-6 fill-flame-orange ml-1">
                      <path d="M8 5v14l11-7z"/>
                    </motion.svg>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Note */}
            <p className="font-noto text-[11px] text-ash-gray/30 text-center leading-relaxed">
              {!started
                ? '點擊播放生成的氛圍音樂 · Click play for generated ambient tribute'
                : '使用 Web Audio API 即時生成的氛圍音效 · Real-time generated via Web Audio API'}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
