'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import React, { useRef, useState, useEffect } from 'react'

const districts = [
  { num: 1,  enName: 'Luxury',      zhName: '奢侈品',    industry: 'Luxury goods for the Capitol', zhIndustry: '為首都製造奢侈品',   color: '#a78bfa', rebellion: 'Low',           zhNum: '一' },
  { num: 2,  enName: 'Masonry',     zhName: '石造工業',  industry: 'Stone & weapons manufacturing', zhIndustry: '石材與武器製造',     color: '#94a3b8', rebellion: 'Low',           zhNum: '二' },
  { num: 3,  enName: 'Technology',  zhName: '科技',      industry: 'Electronics & technology',      zhIndustry: '電子與科技產品',     color: '#60a5fa', rebellion: 'Mid',           zhNum: '三' },
  { num: 4,  enName: 'Fishing',     zhName: '漁業',      industry: 'Fishing & seafood',             zhIndustry: '漁業與海產',         color: '#22d3ee', rebellion: 'High',          zhNum: '四' },
  { num: 5,  enName: 'Power',       zhName: '電力',      industry: 'Electrical power generation',   zhIndustry: '電力能源生產',       color: '#facc15', rebellion: 'Mid',           zhNum: '五' },
  { num: 6,  enName: 'Transport',   zhName: '運輸',      industry: 'Transportation & logistics',    zhIndustry: '交通運輸業',         color: '#f97316', rebellion: 'Mid',           zhNum: '六' },
  { num: 7,  enName: 'Lumber',      zhName: '木材',      industry: 'Lumber & paper industries',     zhIndustry: '木材與造紙業',       color: '#4ade80', rebellion: 'Mid',           zhNum: '七' },
  { num: 8,  enName: 'Textiles',    zhName: '紡織',      industry: 'Textiles & clothing',           zhIndustry: '紡織品與服裝',       color: '#f472b6', rebellion: 'High',          zhNum: '八' },
  { num: 9,  enName: 'Grain',       zhName: '穀物',      industry: 'Grain & food processing',       zhIndustry: '穀物與食品加工',     color: '#d4af37', rebellion: 'Mid',           zhNum: '九' },
  { num: 10, enName: 'Livestock',   zhName: '畜牧',      industry: 'Livestock & animal husbandry',  zhIndustry: '畜牧業',             color: '#a3e635', rebellion: 'Low',           zhNum: '十' },
  { num: 11, enName: 'Agriculture', zhName: '農業',      industry: 'Agriculture & farming',         zhIndustry: '農業與耕作',         color: '#86efac', rebellion: 'High',          zhNum: '十一' },
  { num: 12, enName: 'Coal Mining', zhName: '煤礦開採',  industry: 'Coal mining & energy',          zhIndustry: '煤礦與能源',         color: '#ff6b00', rebellion: 'HIGH — ORIGIN', zhNum: '十二' },
]

const specialDistricts = [12, 11, 4, 13]

// District 13 reveal modal — with ESC key support
function District13Modal({ onClose }: { onClose: () => void }) {
  // ESC 鍵關閉
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center px-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

        {/* Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 24 }}
          animate={{ opacity: 1, scale: 1,    y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 16 }}
          transition={{ type: 'spring', stiffness: 220, damping: 22 }}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          className="relative max-w-md w-full border border-red-500/50 bg-ash-black rounded-sm p-8 z-10 overflow-hidden"
        >
          {/* Scanlines */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="absolute w-full h-px bg-white/[0.015]" style={{ top: `${i * 2.5}%` }} />
            ))}
          </div>

          {/* Red alert flash */}
          <motion.div
            className="absolute inset-0 bg-red-600/10"
            animate={{ opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />

          {/* X 關閉按鈕 */}
          <button
            onClick={onClose}
            aria-label="Close District 13 modal"
            className="absolute top-4 right-4 z-20 w-7 h-7 flex items-center justify-center border border-red-500/30 text-red-400/60 hover:text-red-400 hover:border-red-400/60 hover:bg-red-500/10 transition-all duration-200 rounded-sm font-cinzel text-xs"
          >
            ✕
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
            </span>
            <span className="font-cinzel text-xs text-red-400 tracking-[0.4em] uppercase">
              Capitol Classified — 首都機密
            </span>
          </div>

          <div className="font-cinzel text-4xl font-black text-red-400 mb-1">13</div>
          <div className="font-cinzel text-lg text-red-300 mb-1 tracking-widest">DISTRICT THIRTEEN</div>
          <div className="font-noto text-base text-red-200/70 mb-6">第十三區</div>

          <div className="space-y-4 text-xs">
            <div className="flex gap-3 border-b border-red-500/20 pb-3">
              <span className="font-cinzel text-red-400/70 tracking-widest w-24 shrink-0">STATUS</span>
              <span className="font-noto text-red-300">Presumed destroyed — 據稱已被摧毀</span>
            </div>
            <div className="flex gap-3 border-b border-red-500/20 pb-3">
              <span className="font-cinzel text-red-400/70 tracking-widest w-24 shrink-0">INDUSTRY</span>
              <span className="font-noto text-smoke">Nuclear weapons & graphite — 核武器與石墨</span>
            </div>
            <div className="flex gap-3 border-b border-red-500/20 pb-3">
              <span className="font-cinzel text-red-400/70 tracking-widest w-24 shrink-0">REBELLION</span>
              <span className="font-cinzel text-red-400 tracking-wider">COMMAND</span>
            </div>
            <div className="flex gap-3">
              <span className="font-cinzel text-red-400/70 tracking-widest w-24 shrink-0">TRUTH</span>
              <span className="font-noto text-smoke leading-relaxed">
                District 13 never fell. It negotiated. Underground, it rebuilt its arsenal and waited — for the Mockingjay.
                <br />
                <span className="text-red-300/60 text-[10px] leading-relaxed block mt-1">第十三區從未被消滅。它選擇了談判，在地下重建武裝，等待著——反抗之鳥的到來。</span>
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="mt-8 w-full py-2 border border-red-500/40 text-red-400 font-cinzel text-xs tracking-widest hover:bg-red-500/10 transition-colors rounded-sm uppercase"
          >
            Close — 關閉
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function PanemMap({ selected, onSelect, onReveal13 }: {
  selected: number | null
  onSelect: (n: number | null) => void
  onReveal13: () => void
}) {
  const positions: Record<number, [number, number]> = {
    1: [2, 0], 2: [3, 0], 3: [2, 1], 4: [3, 1],
    5: [1, 1], 6: [0, 1], 7: [1, 2], 8: [0, 2],
    9: [1, 3], 10:[0, 3], 11:[2, 3], 12:[3, 3],
  }
  // 放大：W/H 從 56x46 → 72x58，GAP 從 4 → 6
  const W = 72, H = 58, GAP = 6
  const cols = 4, rows = 4
  const svgW = cols * (W + GAP) - GAP + 24
  const svgH = rows * (H + GAP) - GAP + 24

  return (
    <svg
      viewBox={`0 0 ${svgW} ${svgH}`}
      // max-w-sm → max-w-lg（512px）
      className="w-full max-w-lg mx-auto"
      style={{ filter: 'drop-shadow(0 0 16px rgba(255,107,0,0.18))' }}
      role="group"
      aria-label="Map of Panem Districts"
    >
      {districts.map((d) => {
        const [col, row] = positions[d.num]
        const x = 12 + col * (W + GAP)
        const y = 12 + row * (H + GAP)
        const isSelected = selected === d.num
        const isSpecial  = specialDistricts.includes(d.num)
        const fillColor  = isSelected ? d.color : isSpecial ? 'rgba(255,107,0,0.15)' : 'rgba(60,60,60,0.7)'
        const strokeColor = isSelected ? d.color : isSpecial ? '#ff6b00' : '#4a4a4a'
        const strokeW     = isSelected ? 2 : isSpecial ? 1.5 : 1

        return (
          <g
            key={d.num}
            onClick={() => onSelect(isSelected ? null : d.num)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(isSelected ? null : d.num) }}
            tabIndex={0}
            role="button"
            aria-label={`District ${d.num} ${d.enName}`}
            aria-pressed={isSelected}
            style={{ cursor: 'pointer', outline: 'none' }}
          >
            <rect x={x} y={y} width={W} height={H} rx="4"
              fill={fillColor} stroke={strokeColor} strokeWidth={strokeW}
              style={{ transition: 'fill 0.2s, stroke 0.2s' }} />
            {/* 字體大小同步放大：9→11, 7.5→9, 7→8.5 */}
            <text x={x + W / 2} y={y + 17} textAnchor="middle" fontSize="11"
              fontFamily="'Cinzel', serif" fontWeight="700"
              fill={isSelected ? '#1a0a00' : isSpecial ? '#ff9500' : '#888'}>
              {d.num}
            </text>
            <text x={x + W / 2} y={y + 33} textAnchor="middle" fontSize="9"
              fontFamily="'Cinzel', serif" fill={isSelected ? '#1a0a00' : '#ccc'}>
              {d.enName}
            </text>
            <text x={x + W / 2} y={y + 48} textAnchor="middle" fontSize="8.5"
              fontFamily="'Noto Sans TC', sans-serif" fill={isSelected ? '#1a0a0088' : '#888'}>
              {d.zhName}
            </text>
          </g>
        )
      })}

      {/* District 13 — clickable, keyboard accessible */}
      <g
        onClick={onReveal13}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onReveal13() }}
        tabIndex={0}
        style={{ cursor: 'pointer', outline: 'none' }}
        role="button"
        aria-label="Reveal District 13 — Classified"
      >
        {/* Pulse ring */}
        <rect
          x={12 + 3*(W+GAP) - 3} y={12 + 2*(H+GAP) - 3} width={W + 6} height={H + 6} rx="7"
          fill="none" stroke="rgba(239,68,68,0.25)" strokeWidth="1.5"
        >
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
          <animate attributeName="stroke-width" values="1;2.5;1" dur="2s" repeatCount="indefinite" />
        </rect>
        <rect x={12 + 3*(W+GAP)} y={12 + 2*(H+GAP)} width={W} height={H} rx="4"
          fill="rgba(255,0,0,0.10)" stroke="rgba(255,60,60,0.5)" strokeWidth="1.2" strokeDasharray="3 2">
          <animate attributeName="stroke-opacity" values="0.4;0.9;0.4" dur="1.8s" repeatCount="indefinite" />
        </rect>
        <text x={12 + 3*(W+GAP) + W/2} y={12 + 2*(H+GAP)+17} textAnchor="middle"
          fontSize="11" fontFamily="'Cinzel', serif" fontWeight="700" fill="#ef4444">13</text>
        <text x={12 + 3*(W+GAP) + W/2} y={12 + 2*(H+GAP)+33} textAnchor="middle"
          fontSize="8" fontFamily="'Cinzel', serif" fill="#ef4444">CLASSIFIED</text>
        <text x={12 + 3*(W+GAP) + W/2} y={12 + 2*(H+GAP)+48} textAnchor="middle"
          fontSize="8.5" fontFamily="'Cinzel', serif" fill="#ef4444">機密</text>
      </g>
    </svg>
  )
}

export default function DistrictsSection() {
  const titleRef = useRef(null)
  const isTitleInView = useInView(titleRef, { once: true })
  const [selected,     setSelected]     = useState<number | null>(null)
  const [show13Modal,  setShow13Modal]  = useState(false)
  const selectedData = districts.find((d) => d.num === selected)

  return (
    <section id="districts" className="relative py-24 px-6 z-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal/30 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="font-cinzel text-xs tracking-[0.5em] text-flame-orange/70 uppercase mb-4">
            — Panem et Circenses —
          </div>
          <h2 className="font-cinzel font-bold text-4xl md:text-5xl gold-text mb-3">
            The Districts
          </h2>
          <p className="font-noto text-xl text-gold/60 tracking-wide mb-6">十二個區</p>
          <p className="font-noto text-sm text-smoke max-w-lg mx-auto leading-relaxed">
            Panem is built on the labor of twelve districts, each serving the Capitol in silence—until the fire of rebellion could no longer be contained.
          </p>
          <p className="font-noto text-xs text-ash-gray mt-2 max-w-lg mx-auto">
            潘恩由十二個區的勞動所建立，各區在沉默中服侍首都——直到反抗的火焰再也無法遏制。
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isTitleInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-32 h-px bg-gradient-to-r from-transparent via-flame-orange to-transparent mx-auto mt-8"
          />
        </motion.div>

        {/* Map + detail panel */}
        <div className="flex flex-col lg:flex-row gap-10 items-start justify-center">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-auto"
          >
            <p className="font-cinzel text-xs text-smoke tracking-widest text-center mb-4 uppercase">
              — Click a district to reveal —<br />
              <span className="font-noto normal-case text-ash-gray/60">點擊區域查看詳情</span>
            </p>
            <PanemMap selected={selected} onSelect={setSelected} onReveal13={() => setShow13Modal(true)} />
            <p className="font-cinzel text-[10px] tracking-widest text-red-500/50 text-center mt-3 animate-pulse">
              ▲ DISTRICT 13 — CLICK TO UNCLASSIFY
            </p>
          </motion.div>

          {/* Detail panel — w-72 → w-96, min-h-[280px] → min-h-[360px] */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-96 min-h-[360px]"
          >
            {selectedData ? (
              <motion.div
                key={selectedData.num}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="border border-flame-orange/30 bg-charcoal/80 rounded-sm p-7 relative"
              >
                {/* 關閉（取消選取）按鈕 */}
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Deselect district"
                  className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center border border-ash-gray/30 text-ash-gray/40 hover:text-flame-orange hover:border-flame-orange/50 transition-all duration-200 rounded-sm font-cinzel text-xs"
                >
                  ✕
                </button>

                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t-sm"
                  style={{ background: selectedData.color }}
                />
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className="w-12 h-12 rounded-sm flex items-center justify-center font-cinzel font-bold text-base"
                    style={{ background: selectedData.color + '22', color: selectedData.color, border: `1px solid ${selectedData.color}55` }}
                  >
                    {selectedData.num}
                  </div>
                  <div>
                    <div className="font-cinzel font-bold text-xl text-gray-100">{selectedData.enName}</div>
                    <div className="font-noto text-sm text-gold/70">{selectedData.zhName}</div>
                  </div>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="flex gap-3">
                    <span className="font-cinzel text-ash-gray tracking-widest w-24 shrink-0 text-xs pt-0.5">INDUSTRY</span>
                    <span className="font-noto text-smoke">{selectedData.industry}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-cinzel text-ash-gray tracking-widest w-24 shrink-0 text-xs pt-0.5">產業</span>
                    <span className="font-noto text-smoke">{selectedData.zhIndustry}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-cinzel text-ash-gray tracking-widest w-24 shrink-0 text-xs pt-0.5">REBELLION</span>
                    <span className="font-cinzel tracking-wider text-sm" style={{ color: selectedData.color }}>
                      {selectedData.rebellion}
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="border border-ash-gray/20 bg-charcoal/40 rounded-sm p-6 h-full flex flex-col items-center justify-center text-center min-h-[280px]">
                <div className="text-ash-gray/40 mb-3">
                  <svg viewBox="0 0 40 40" className="w-10 h-10 mx-auto fill-none stroke-current">
                    <rect x="6" y="6" width="28" height="28" rx="4" strokeWidth="1.5" strokeDasharray="4 2" />
                    <circle cx="20" cy="20" r="4" strokeWidth="1.5" />
                  </svg>
                </div>
                <p className="font-cinzel text-xs text-ash-gray/50 tracking-widest uppercase">Select a district</p>
                <p className="font-noto text-xs text-ash-gray/30 mt-1">點擊地圖上的區域</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* District 13 reveal modal */}
      {show13Modal && <District13Modal onClose={() => setShow13Modal(false)} />}
    </section>
  )
}
