'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

type RelType = 'love' | 'alliance' | 'mentor' | 'betrayal' | 'family' | 'enemy'

interface Character {
  id: string
  name: string
  zh: string
  color: string
  x: number
  y: number
  district: string
}

interface Relation {
  from: string
  to: string
  type: RelType
  label: string
  labelZh: string
}

const characters: Character[] = [
  { id: 'katniss', name: 'Katniss',  zh: '凱妮絲',  color: '#ff6b00', x: 50, y: 45, district: 'D12' },
  { id: 'peeta',   name: 'Peeta',    zh: '比德',    color: '#d4af37', x: 72, y: 30, district: 'D12' },
  { id: 'gale',    name: 'Gale',     zh: '蓋爾',    color: '#60a5fa', x: 28, y: 28, district: 'D12' },
  { id: 'prim',    name: 'Prim',     zh: '普林',    color: '#f472b6', x: 30, y: 65, district: 'D12' },
  { id: 'haymitch',name: 'Haymitch', zh: '海密奇',  color: '#a78bfa', x: 72, y: 62, district: 'D12' },
  { id: 'finnick', name: 'Finnick',  zh: '芬尼克',  color: '#22d3ee', x: 50, y: 15, district: 'D4'  },
  { id: 'rue',     name: 'Rue',      zh: 'Rue',     color: '#86efac', x: 15, y: 48, district: 'D11' },
  { id: 'snow',    name: 'Snow',     zh: '史諾',    color: '#ef4444', x: 85, y: 48, district: 'Capitol' },
  { id: 'coin',    name: 'Coin',     zh: '科恩',    color: '#94a3b8', x: 85, y: 80, district: 'D13' },
  { id: 'cinna',   name: 'Cinna',    zh: '辛納',    color: '#fbbf24', x: 15, y: 80, district: 'Capitol' },
]

const relations: Relation[] = [
  { from: 'katniss', to: 'peeta',    type: 'love',     label: 'Love',       labelZh: '愛情' },
  { from: 'katniss', to: 'gale',     type: 'love',     label: 'Love / Lost', labelZh: '愛情/失去' },
  { from: 'katniss', to: 'prim',     type: 'family',   label: 'Sisters',    labelZh: '姐妹' },
  { from: 'katniss', to: 'haymitch', type: 'mentor',   label: 'Mentor',     labelZh: '師徒' },
  { from: 'katniss', to: 'finnick',  type: 'alliance', label: 'Alliance',   labelZh: '同盟' },
  { from: 'katniss', to: 'rue',      type: 'alliance', label: 'Bond',       labelZh: '羈絆' },
  { from: 'katniss', to: 'snow',     type: 'enemy',    label: 'Enemy',      labelZh: '敵人' },
  { from: 'katniss', to: 'cinna',    type: 'alliance', label: 'Trust',      labelZh: '信任' },
  { from: 'katniss', to: 'coin',     type: 'enemy',    label: 'Enemy',      labelZh: '敵人' },
  { from: 'peeta',   to: 'haymitch', type: 'mentor',   label: 'Mentor',     labelZh: '師徒' },
  { from: 'peeta',   to: 'snow',     type: 'enemy',    label: 'Tortured',   labelZh: '被折磨' },
  { from: 'haymitch',to: 'snow',     type: 'enemy',    label: 'Survived',   labelZh: '倖存' },
  { from: 'coin',    to: 'snow',     type: 'enemy',    label: 'Rivals',     labelZh: '對手' },
  { from: 'cinna',   to: 'snow',     type: 'enemy',    label: 'Killed by',  labelZh: '被殺' },
]

const relColors: Record<RelType, string> = {
  love:     '#f472b6',
  alliance: '#22d3ee',
  mentor:   '#a78bfa',
  betrayal: '#f97316',
  family:   '#86efac',
  enemy:    '#ef4444',
}
const relLabels: Record<RelType, string> = {
  love: '❤ 愛情', alliance: '⚔ 同盟', mentor: '◈ 師徒',
  betrayal: '✗ 背叛', family: '⌂ 家人', enemy: '✦ 敵人',
}

function getCenter(c: Character, w: number, h: number) {
  return { x: (c.x / 100) * w, y: (c.y / 100) * h }
}

export default function RelationshipMap() {
  const [hover, setHover] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const W = 700, H = 420

  const activeId = selected || hover

  const activeRelations = activeId
    ? relations.filter(r => r.from === activeId || r.to === activeId)
    : []
  const activeCharIds = new Set(activeRelations.flatMap(r => [r.from, r.to]))

  const activeChar = activeId ? characters.find(c => c.id === activeId) : null

  return (
    <section id="relations" className="relative py-24 px-6 z-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="font-cinzel text-xs tracking-[0.5em] text-flame-orange/70 uppercase mb-4">
            — Bonds & Betrayals —
          </div>
          <h2 className="font-cinzel font-bold text-4xl md:text-5xl gold-text mb-3">
            Character Web
          </h2>
          <p className="font-noto text-xl text-gold/60 tracking-wide mb-3">角色關係圖</p>
          <p className="font-noto text-xs text-ash-gray max-w-sm mx-auto">Hover or click a character to reveal their connections · 點擊角色查看關係</p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-32 h-px bg-gradient-to-r from-transparent via-flame-orange to-transparent mx-auto mt-6"
          />
        </motion.div>

        <div className="border border-flame-orange/20 bg-charcoal/60 rounded-sm overflow-hidden">
          {/* Legend */}
          <div className="flex flex-wrap gap-3 px-5 py-3 border-b border-ash-gray/10">
            {(Object.entries(relLabels) as [RelType, string][]).map(([type, label]) => (
              <div key={type} className="flex items-center gap-1.5">
                <div className="w-4 h-px rounded" style={{ background: relColors[type] }} />
                <span className="font-noto text-[11px] text-ash-gray/60">{label}</span>
              </div>
            ))}
          </div>

          {/* SVG Map */}
          <div className="relative overflow-x-auto">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full"
              style={{ minWidth: '340px', background: 'transparent' }}
            >
              {/* Relation lines */}
              {relations.map((rel, i) => {
                const from = characters.find(c => c.id === rel.from)!
                const to   = characters.find(c => c.id === rel.to)!
                const fc = getCenter(from, W, H)
                const tc = getCenter(to, W, H)
                const isActive = activeId && (rel.from === activeId || rel.to === activeId)
                const isInactive = activeId && !isActive
                const mx = (fc.x + tc.x) / 2
                const my = (fc.y + tc.y) / 2

                return (
                  <g key={i}>
                    <line
                      x1={fc.x} y1={fc.y} x2={tc.x} y2={tc.y}
                      stroke={relColors[rel.type]}
                      strokeWidth={isActive ? 2 : 1}
                      strokeDasharray={rel.type === 'enemy' ? '4 3' : rel.type === 'betrayal' ? '6 2' : 'none'}
                      opacity={isInactive ? 0.05 : isActive ? 0.9 : 0.25}
                      style={{ transition: 'opacity 0.2s, stroke-width 0.2s' }}
                    />
                    {isActive && (
                      <text x={mx} y={my - 4} textAnchor="middle" fontSize="9"
                        fontFamily="'Cinzel', serif" fill={relColors[rel.type]} opacity="0.9">
                        {rel.label}
                      </text>
                    )}
                  </g>
                )
              })}

              {/* Character nodes */}
              {characters.map(c => {
                const { x, y } = getCenter(c, W, H)
                const isActive = c.id === activeId
                const isDimmed = activeId && !activeCharIds.has(c.id) && c.id !== activeId
                const r = isActive ? 22 : 16

                return (
                  <g
                    key={c.id}
                    onMouseEnter={() => setHover(c.id)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => setSelected(s => s === c.id ? null : c.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Glow */}
                    {isActive && (
                      <circle cx={x} cy={y} r={r + 8} fill={c.color} opacity="0.12" />
                    )}
                    {/* Pulse ring */}
                    {isActive && (
                      <circle cx={x} cy={y} r={r + 4} fill="none" stroke={c.color} strokeWidth="1" opacity="0.4">
                        <animate attributeName="r" values={`${r+4};${r+10};${r+4}`} dur="1.5s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" values="0.4;0;0.4" dur="1.5s" repeatCount="indefinite"/>
                      </circle>
                    )}
                    {/* Node */}
                    <circle
                      cx={x} cy={y} r={r}
                      fill={isActive ? c.color : '#1a1a1a'}
                      stroke={c.color}
                      strokeWidth={isActive ? 2.5 : 1.5}
                      opacity={isDimmed ? 0.15 : 1}
                      style={{ transition: 'all 0.2s' }}
                    />
                    {/* Name */}
                    <text x={x} y={y + 3.5} textAnchor="middle" fontSize={isActive ? "10" : "9"}
                      fontFamily="'Cinzel', serif" fontWeight={isActive ? "700" : "400"}
                      fill={isActive ? '#0a0a0a' : c.color}
                      opacity={isDimmed ? 0.2 : 1}
                      style={{ transition: 'all 0.2s' }}
                    >
                      {c.name.length > 7 ? c.name.slice(0, 6) + '…' : c.name}
                    </text>
                    {/* District badge */}
                    <text x={x} y={y + r + 12} textAnchor="middle" fontSize="7.5"
                      fontFamily="'Noto Sans TC', sans-serif"
                      fill={c.color} opacity={isDimmed ? 0.1 : 0.6}
                    >
                      {c.district}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Detail panel */}
          <AnimatePresence>
            {activeChar && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25 }}
                className="border-t px-5 py-4"
                style={{ borderColor: activeChar.color + '30' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-cinzel text-xs font-bold"
                    style={{ borderColor: activeChar.color, color: activeChar.color, background: activeChar.color + '15' }}>
                    {activeChar.name[0]}
                  </div>
                  <div>
                    <span className="font-cinzel text-sm font-bold" style={{ color: activeChar.color }}>{activeChar.name}</span>
                    <span className="font-noto text-xs text-ash-gray/60 ml-2">{activeChar.zh} · {activeChar.district}</span>
                  </div>
                  <button onClick={() => setSelected(null)} className="ml-auto text-ash-gray/40 hover:text-flame-orange font-cinzel text-xs">✕</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeRelations.map((rel, i) => {
                    const other = rel.from === activeId
                      ? characters.find(c => c.id === rel.to)
                      : characters.find(c => c.id === rel.from)
                    return (
                      <div key={i} className="flex items-center gap-1.5 border rounded-full px-3 py-1"
                        style={{ borderColor: relColors[rel.type] + '50', background: relColors[rel.type] + '10' }}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: relColors[rel.type] }} />
                        <span className="font-cinzel text-[10px]" style={{ color: relColors[rel.type] }}>{rel.label}</span>
                        <span className="font-noto text-[10px] text-ash-gray/60">→ {other?.name}</span>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
