'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const districts = [
  { num: 1,  enName: 'Luxury',      zhName: '奢侈品',    industry: 'Luxury goods for the Capitol', zhIndustry: '為首都製造奢侈品' },
  { num: 2,  enName: 'Masonry',     zhName: '石造工業',  industry: 'Stone & weapons manufacturing', zhIndustry: '石材與武器製造' },
  { num: 3,  enName: 'Technology',  zhName: '科技',      industry: 'Electronics & technology',      zhIndustry: '電子與科技產品' },
  { num: 4,  enName: 'Fishing',     zhName: '漁業',      industry: 'Fishing & seafood',             zhIndustry: '漁業與海產' },
  { num: 5,  enName: 'Power',       zhName: '電力',      industry: 'Electrical power generation',   zhIndustry: '電力能源生產' },
  { num: 6,  enName: 'Transport',   zhName: '運輸',      industry: 'Transportation & logistics',    zhIndustry: '交通運輸業' },
  { num: 7,  enName: 'Lumber',      zhName: '木材',      industry: 'Lumber & paper industries',     zhIndustry: '木材與造紙業' },
  { num: 8,  enName: 'Textiles',    zhName: '紡織',      industry: 'Textiles & clothing',           zhIndustry: '紡織品與服裝' },
  { num: 9,  enName: 'Grain',       zhName: '穀物',      industry: 'Grain & food processing',       zhIndustry: '穀物與食品加工' },
  { num: 10, enName: 'Livestock',   zhName: '畜牧',      industry: 'Livestock & animal husbandry',  zhIndustry: '畜牧業' },
  { num: 11, enName: 'Agriculture', zhName: '農業',      industry: 'Agriculture & farming',         zhIndustry: '農業與耕作' },
  { num: 12, enName: 'Coal Mining', zhName: '煤礦開採',  industry: 'Coal mining & energy',          zhIndustry: '煤礦與能源' },
]

// Special highlight for District 12
const specialDistricts = [12, 11, 4, 13]

function DistrictCard({ district, index }: { district: typeof districts[0], index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const isSpecial = specialDistricts.includes(district.num)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      className={`flame-border relative group rounded-sm border ${
        isSpecial
          ? 'border-flame-orange/40 bg-gradient-to-br from-ember to-charcoal'
          : 'border-ash-gray/20 bg-charcoal/60'
      } p-5 transition-all duration-300 hover:-translate-y-1`}
    >
      {/* District number badge */}
      <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-cinzel font-bold border ${
        isSpecial
          ? 'bg-flame-orange border-gold text-black'
          : 'bg-ash-gray/30 border-ash-gray/50 text-smoke'
      }`}>
        {district.num}
      </div>

      {/* Content */}
      <div className="space-y-2">
        <div>
          <div className="font-cinzel text-xs tracking-[0.25em] text-smoke uppercase mb-0.5">
            District {district.num}
          </div>
          <div className="font-noto text-xs text-ash-gray/70">
            第{['一','二','三','四','五','六','七','八','九','十','十一','十二'][district.num - 1]}區
          </div>
        </div>

        <div className="w-8 h-px bg-gradient-to-r from-flame-orange/50 to-transparent group-hover:w-16 transition-all duration-500" />

        <div>
          <div className={`font-playfair font-bold text-lg leading-tight ${
            isSpecial ? 'text-flame-orange group-hover:text-gold' : 'text-gray-300 group-hover:text-flame-orange'
          } transition-colors duration-300`}>
            {district.enName}
          </div>
          <div className="font-noto text-sm text-gold/70 mt-0.5">{district.zhName}</div>
        </div>

        <div className="pt-2 border-t border-white/5">
          <div className="font-noto text-xs text-smoke leading-relaxed">{district.industry}</div>
          <div className="font-noto text-xs text-ash-gray/50 mt-0.5">{district.zhIndustry}</div>
        </div>
      </div>

      {/* Hover glow corner */}
      <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[20px] border-b-[20px] border-l-transparent border-b-flame-orange/0 group-hover:border-b-flame-orange/30 transition-all duration-300 rounded-bl-sm" />
    </motion.div>
  )
}

export default function DistrictsSection() {
  const titleRef = useRef(null)
  const isTitleInView = useInView(titleRef, { once: true })

  return (
    <section id="districts" className="relative py-24 px-6 z-20">
      {/* Background decoration */}
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

        {/* Districts grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {districts.map((d, i) => (
            <DistrictCard key={d.num} district={d} index={i} />
          ))}
        </div>

        {/* District 13 footnote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
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
