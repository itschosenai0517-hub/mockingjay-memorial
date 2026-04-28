'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const districts = [
  { num: 1,  enName: 'Luxury',      zhName: '奢侈品',    industry: 'Luxury goods for the Capitol', zhIndustry: '為首都製造奢侈品',   color: '#a78bfa', rebellion: 'Low',  zhNum: '一' },
  { num: 2,  enName: 'Masonry',     zhName: '石造工業',  industry: 'Stone & weapons manufacturing', zhIndustry: '石材與武器製造',     color: '#94a3b8', rebellion: 'Low',  zhNum: '二' },
  { num: 3,  enName: 'Technology',  zhName: '科技',      industry: 'Electronics & technology',      zhIndustry: '電子與科技產品',     color: '#60a5fa', rebellion: 'Mid',  zhNum: '三' },
  { num: 4,  enName: 'Fishing',     zhName: '漁業',      industry: 'Fishing & seafood',             zhIndustry: '漁業與海產',         color: '#22d3ee', rebellion: 'High', zhNum: '四' },
  { num: 5,  enName: 'Power',       zhName: '電力',      industry: 'Electrical power generation',   zhIndustry: '電力能源生產',       color: '#facc15', rebellion: 'Mid',  zhNum: '五' },
  { num: 6,  enName: 'Transport',   zhName: '運輸',      industry: 'Transportation & logistics',    zhIndustry: '交通運輸業',         color: '#f97316', rebellion: 'Mid',  zhNum: '六' },
  { num: 7,  enName: 'Lumber',      zhName: '木材',      industry: 'Lumber & paper industries',     zhIndustry: '木材與造紙業',       color: '#4ade80', rebellion: 'Mid',  zhNum: '七' },
  { num: 8,  enName: 'Textiles',    zhName: '紡織',      industry: 'Textiles & clothing',           zhIndustry: '紡織品與服裝',       color: '#f472b6', rebellion: 'High', zhNum: '八' },
  { num: 9,  enName: 'Grain',       zhName: '穀物',      industry: 'Grain & food processing',       zhIndustry: '穀物與食品加工',     color: '#d4af37', rebellion: 'Mid',  zhNum: '九' },
  { num: 10, enName: 'Livestock',   zhName: '畜牧',      industry: 'Livestock & animal husbandry',  zhIndustry: '畜牧業',             color: '#a3e635', rebellion: 'Low',  zhNum: '十' },
  { num: 11, enName: 'Agriculture', zhName: '農業',      industry: 'Agriculture & farming',         zhIndustry: '農業與耕作',         color: '#86efac', rebellion: 'High', zhNum: '十一' },
  { num: 12, enName: 'Coal Mining', zhName: '煤礦開採',  industry: 'Coal mining & energy',          zhIndustry: '煤礦與能源',         color: '#ff6b00', rebellion: 'HIGH — ORIGIN', zhNum: '十二' },
]

const specialDistricts = [12, 11, 4, 13]

// F: Panem SVG map – stylised hexagon grid representing the 12 districts
function PanemMap({ selected, onSelect }: { selected: number | null; onSelect: (n: number | null) => void }) {
  // 4-column grid layout positions (col, row) for districts 1-12
  const positions: Record<number, [number, number]> = {
    1: [2, 0], 2: [3, 0], 3: [2, 1], 4: [3, 1],
    5: [1, 1], 6: [0, 1], 7: [1, 2], 8: [0, 2],
    9: [1, 3], 10:[0, 3], 11:[2, 3], 12:[3, 3],
  }
  const W = 56, H = 46, GAP = 4
  const cols = 4, rows = 4
  const svgW = cols * (W + GAP) - GAP + 20
  const svgH = rows * (H + GAP) - GAP + 20

  return (
    <svg
      viewBox={`0 0 ${svgW} ${svgH}`}
      className="w-full max-w-sm mx-auto"
      style={{ filter: 'drop-shadow(0 0 12px rgba(255,107,0,0.15))' }}
    >
      {districts.map((d) => {
        const [col, row] = positions[d.num]
        const x = 10 + col * (W + GAP)
        const y = 10 + row * (H + GAP)
        const isSelected = selected === d.num
        const isSpecial = specialDistricts.includes(d.num)
        const fillColor = isSelected
          ? d.color
          : isSpecial
          ? 'rgba(255,107,0,0.15)'
          : 'rgba(60,60,60,0.7)'
        const strokeColor = isSelected ? d.color : isSpecial ? '#ff6b00' : '#4a4a4a'
        const strokeW = isSelected ? 2 : isSpecial ? 1.5 : 1

        return (
          <g
            key={d.num}
            onClick={() => onSelect(isSelected ? null : d.num)}
            style={{ cursor: 'pointer' }}
          >
            <rect
              x={x} y={y} width={W} height={H}
              rx="4"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth={strokeW}
              style={{ transition: 'fill 0.2s, stroke 0.2s' }}
            />
            {/* District number */}
            <text
              x={x + W / 2} y={y + 14}
              textAnchor="middle"
              fontSize="9"
              fontFamily="'Cinzel', serif"
              fontWeight="700"
              fill={isSelected ? '#1a0a00' : isSpecial ? '#ff9500' : '#888'}
            >
              {d.num}
            </text>
            {/* English name */}
            <text
              x={x + W / 2} y={y + 26}
              textAnchor="middle"
              fontSize="7.5"
              fontFamily="'Cinzel', serif"
              fill={isSelected ? '#1a0a00' : '#ccc'}
            >
              {d.enName}
            </text>
            {/* Chinese name */}
            <text
              x={x + W / 2} y={y + 38}
              textAnchor="middle"
              fontSize="7"
              fontFamily="'Noto Sans TC', sans-serif"
              fill={isSelected ? '#1a0a0088' : '#888'}
            >
              {d.zhName}
            </text>
          </g>
        )
      })}
      {/* District 13 – secret */}
      <g style={{ cursor: 'pointer' }}>
        <rect x={10 + 3*(W+GAP)} y={10 + 2*(H+GAP)} width={W} height={H} rx="4"
          fill="rgba(255,0,0,0.08)" stroke="rgba(255,60,60,0.4)" strokeWidth="1" strokeDasharray="3 2" />
        <text x={10 + 3*(W+GAP) + W/2} y={10 + 2*(H+GAP)+14} textAnchor="middle"
          fontSize="9" fontFamily="'Cinzel', serif" fontWeight="700" fill="#ef4444">13</text>
        <text x={10 + 3*(W+GAP) + W/2} y={10 + 2*(H+GAP)+26} textAnchor="middle"
          fontSize="7" fontFamily="'Cinzel', serif" fill="#ef4444">CLASSIFIED</text>
        <text x={10 + 3*(W+GAP) + W/2} y={10 + 2*(H+GAP)+38} textAnchor="middle"
          fontSize="7" fontFamily="'Cinzel', serif" fill="#ef4444">機密</text>
      </g>
    </svg>
  )
}

export default function DistrictsSection() {
  const titleRef = useRef(null)
  const isTitleInView = useInView(titleRef, { once: true })
  const [selected, setSelected] = useState<number | null>(null)
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

        {/* F: Interactive Panem map + detail panel */}
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
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
            <PanemMap selected={selected} onSelect={setSelected} />
          </motion.div>

          {/* Detail panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-72 min-h-[280px]"
          >
            {selectedData ? (
              <motion.div
                key={selectedData.num}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="border border-flame-orange/30 bg-charcoal/80 rounded-sm p-6 relative"
              >
                {/* Accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t-sm"
                  style={{ background: selectedData.color }}
                />
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-sm flex items-center justify-center font-cinzel font-bold text-sm"
                    style={{ background: selectedData.color + '22', color: selectedData.color, border: `1px solid ${selectedData.color}55` }}
                  >
                    {selectedData.num}
                  </div>
                  <div>
                    <div className="font-cinzel font-bold text-lg text-gray-100">{selectedData.enName}</div>
                    <div className="font-noto text-sm text-gold/70">{selectedData.zhName}</div>
                  </div>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="flex gap-2">
                    <span className="font-cinzel text-ash-gray tracking-widest w-20 shrink-0">INDUSTRY</span>
                    <span className="font-noto text-smoke">{selectedData.industry}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-cinzel text-ash-gray tracking-widest w-20 shrink-0">產業</span>
                    <span className="font-noto text-smoke">{selectedData.zhIndustry}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-cinzel text-ash-gray tracking-widest w-20 shrink-0">REBELLION</span>
                    <span
                      className="font-cinzel tracking-wider"
                      style={{ color: selectedData.color }}
                    >
                      {selectedData.rebellion}
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="border border-ash-gray/20 bg-charcoal/40 rounded-sm p-6 h-full flex flex-col items-center justify-center text-center min-h-[200px]">
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

        {/* District 13 footnote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 border border-flame-orange/20 rounded-sm bg-ember/20">
            <span className="text-flame-orange text-lg">⚠</span>
            <div>
              <span className="font-cinzel text-xs text-flame-orange tracking-widest">DISTRICT 13 — CLASSIFIED</span>
              <span className="font-noto text-xs text-smoke ml-3">第十三區 — 機密</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
