'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const events = [
  {
    book: 'The Hunger Games',
    bookZh: '飢餓遊戲',
    color: '#ff6b00',
    items: [
      {
        title: 'The Reaping',
        zh: '抽籤徵召',
        quote: '"I volunteer! I volunteer as tribute!"',
        quoteZh: '「我自願！我自願成為貢品！」',
        who: 'Katniss Everdeen',
        desc: 'Katniss steps forward to take her sister Prim\'s place, changing history forever.',
        descZh: 'Katniss 挺身代替妹妹 Prim，從此改寫了歷史。',
      },
      {
        title: 'The Cave',
        zh: '山洞時刻',
        quote: '"You here to finish me off, sweetheart?"',
        quoteZh: '「你是來給我最後一擊的嗎，甜心？」',
        who: 'Peeta Mellark',
        desc: 'Katniss finds a wounded Peeta hidden in the mud — their alliance and bond truly begins.',
        descZh: 'Katniss 找到受傷的 Peeta 藏在泥濘中——他們的聯盟與羈絆從此真正開始。',
      },
      {
        title: 'The Berries',
        zh: '漿果的反抗',
        quote: '"There is no way they can have a victor."',
        quoteZh: '「他們不可能再有一個勝者了。」',
        who: 'Katniss Everdeen',
        desc: 'Two tributes, two handfuls of nightlock. The Capitol blinks first. The spark is lit.',
        descZh: '兩名貢品，兩把毒漿果。首都率先退縮了。火花就此點燃。',
      },
    ],
  },
  {
    book: 'Catching Fire',
    bookZh: '星火燎原',
    color: '#d4af37',
    items: [
      {
        title: 'The Victory Tour',
        zh: '勝利巡迴',
        quote: '"They just want a good show. That\'s all they want."',
        quoteZh: '「他們只想看一場好戲。這就是他們想要的全部。」',
        who: 'Haymitch Abernathy',
        desc: 'Katniss witnesses the spark she lit still burning in the districts — and Snow\'s rage growing.',
        descZh: 'Katniss 目睹自己點燃的火花仍在各區燃燒——還有 Snow 不斷升溫的怒火。',
      },
      {
        title: 'The Quarter Quell',
        zh: '第七十五屆飢餓遊戲',
        quote: '"Remember who the real enemy is."',
        quoteZh: '「記住，誰才是真正的敵人。」',
        who: 'Haymitch Abernathy',
        desc: 'Past victors return to the arena. Alliances form. Betrayals are planned. The rebellion begins.',
        descZh: '過去的勝者重返競技場。聯盟形成，背叛悄悄謀劃。反抗就此展開。',
      },
      {
        title: 'The Escape',
        zh: '逃脫',
        quote: '"There is no District Twelve."',
        quoteZh: '「第十二區不復存在了。」',
        who: 'Gale Hawthorne',
        desc: 'The arena is destroyed. District 12 is bombed to ash. The war has begun.',
        descZh: '競技場被炸毀。第十二區化為灰燼。戰爭已然開始。',
      },
    ],
  },
  {
    book: 'Mockingjay',
    bookZh: '自由幻夢',
    color: '#ef4444',
    items: [
      {
        title: 'The Mockingjay Agrees',
        zh: '反抗之鳥的條件',
        quote: '"I want to be the Mockingjay."',
        quoteZh: '「我願意成為反抗之鳥。」',
        who: 'Katniss Everdeen',
        desc: 'Katniss sets her terms — and becomes the living symbol of revolution.',
        descZh: 'Katniss 提出她的條件——並成為革命的活體象徵。',
      },
      {
        title: 'The Hanging Tree Broadcast',
        zh: '絞刑樹廣播',
        quote: '"Are you, are you, coming to the tree..."',
        quoteZh: '「你是否來到這棵樹下……」',
        who: 'Katniss Everdeen',
        desc: 'A song from Katniss\'s childhood becomes the anthem of revolution, broadcast across Panem.',
        descZh: 'Katniss 兒時的一首歌，成為革命的頌歌，傳遍整個潘恩。',
      },
      {
        title: 'The Capitol Falls',
        zh: '首都的終結',
        quote: '"Fire is catching. And if we burn, you burn with us."',
        quoteZh: '「火焰會蔓延。若我們燃燒，你也將與我們同焚。」',
        who: 'Katniss Everdeen',
        desc: 'Snow is defeated. The Capitol falls. But at what cost?',
        descZh: 'Snow 被打敗了。首都淪陷了。但這代價是什麼？',
      },
    ],
  },
]

function TimelineItem({ item, color, idx, bookColor }: { item: typeof events[0]['items'][0], color: string, idx: number, bookColor: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      className="relative flex gap-4 md:gap-8 items-start"
    >
      {/* Timeline node */}
      <div className="relative flex flex-col items-center shrink-0 mt-1">
        <motion.div
          animate={inView ? { scale: [0, 1.2, 1] } : { scale: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.1 + 0.2 }}
          className="w-3 h-3 rounded-full border-2 z-10"
          style={{ borderColor: color, background: '#0a0a0a', boxShadow: `0 0 8px ${color}60` }}
        />
      </div>

      {/* Content */}
      <div
        className="flex-1 border rounded-sm p-5 mb-6 cursor-pointer transition-all duration-300 hover:bg-white/2"
        style={{ borderColor: color + '30' }}
        onClick={() => setExpanded(e => !e)}
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="font-cinzel font-bold text-base text-gray-100 mb-0.5">{item.title}</h4>
            <p className="font-noto text-sm text-gold/50">{item.zh}</p>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            className="shrink-0 mt-1"
          >
            <svg viewBox="0 0 16 16" className="w-4 h-4" style={{ fill: color + '80' }}>
              <path d="M8 10L2 4h12z"/>
            </svg>
          </motion.div>
        </div>

        <motion.div
          initial={false}
          animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ overflow: 'hidden' }}
        >
          <div className="pt-4 space-y-3">
            <blockquote className="border-l-2 pl-3 italic" style={{ borderColor: color }}>
              <p className="font-playfair text-sm text-gray-300">{item.quote}</p>
              <p className="font-noto text-xs text-gold/40 mt-1">{item.quoteZh}</p>
              <footer className="font-cinzel text-[10px] tracking-widest mt-2" style={{ color: color + 'aa' }}>
                — {item.who}
              </footer>
            </blockquote>
            <p className="font-noto text-sm text-smoke leading-relaxed">{item.desc}</p>
            <p className="font-noto text-xs text-ash-gray/60 leading-relaxed">{item.descZh}</p>
          </div>
        </motion.div>

        {!expanded && (
          <p className="font-cinzel text-[10px] tracking-widest mt-3 opacity-40" style={{ color }}>
            CLICK TO EXPAND — 點擊展開
          </p>
        )}
      </div>
    </motion.div>
  )
}

export default function TimelineSection() {
  return (
    <section id="timeline" className="relative py-24 px-6 z-20">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="font-cinzel text-xs tracking-[0.5em] text-flame-orange/70 uppercase mb-4">
            — Chronicle of Panem —
          </div>
          <h2 className="font-cinzel font-bold text-4xl md:text-5xl gold-text mb-3">
            The Timeline
          </h2>
          <p className="font-noto text-xl text-gold/60 tracking-wide mb-3">革命時間線</p>
          <p className="font-noto text-sm text-smoke max-w-md mx-auto leading-relaxed">
            From a single act of defiance to the fall of the Capitol — every moment that mattered.
          </p>
          <p className="font-noto text-xs text-ash-gray mt-1 max-w-md mx-auto">從一個反抗的瞬間到首都的覆滅——每一個關鍵時刻。</p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-32 h-px bg-gradient-to-r from-transparent via-flame-orange to-transparent mx-auto mt-8"
          />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[5px] top-0 bottom-0 w-px bg-gradient-to-b from-flame-orange/40 via-gold/20 to-red-500/40" />

          {events.map((book, bi) => (
            <div key={bi} className="mb-8">
              {/* Book label */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-6 ml-8"
              >
                <div className="h-px flex-1 max-w-[40px]" style={{ background: book.color + '60' }} />
                <span className="font-cinzel text-xs tracking-[0.3em] uppercase" style={{ color: book.color }}>
                  {book.book}
                </span>
                <span className="font-noto text-xs" style={{ color: book.color + '80' }}>
                  {book.bookZh}
                </span>
              </motion.div>

              {book.items.map((item, ii) => (
                <TimelineItem key={ii} item={item} color={book.color} idx={ii} bookColor={book.color} />
              ))}
            </div>
          ))}

          {/* End marker */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 ml-8 mt-4"
          >
            <div className="w-3 h-3 rounded-full bg-red-500/60 border border-red-400/40" style={{ boxShadow: '0 0 10px rgba(239,68,68,0.4)' }} />
            <span className="font-cinzel text-xs tracking-widest text-ash-gray/40 uppercase">End of the War — 戰爭終結</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
