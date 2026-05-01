'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

// #10 Flame particle cursor trail
function FlameTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    interface Particle {
      x: number; y: number
      vx: number; vy: number
      life: number
      size: number; hue: number
    }

    const particles: Particle[] = []

    const onMove = (e: MouseEvent | TouchEvent) => {
      const cx = e instanceof MouseEvent ? e.clientX : e.touches[0]?.clientX
      const cy = e instanceof MouseEvent ? e.clientY : e.touches[0]?.clientY
      if (!cx || !cy) return
      for (let i = 0; i < 4; i++) {
        particles.push({
          x: cx + (Math.random() - 0.5) * 8,
          y: cy + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 1.2,
          vy: -(Math.random() * 2.5 + 1),
          life: 1,
          size: 4 + Math.random() * 6,
          hue: 10 + Math.random() * 30,
        })
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onMove)

    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life -= 0.032
        if (p.life <= 0) { particles.splice(i, 1); continue }
        p.x += p.vx; p.y += p.vy; p.vy -= 0.05; p.size *= 0.97
        const a = Math.max(0, p.life) * 0.85
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)
        g.addColorStop(0, `hsla(${p.hue},100%,80%,${a})`)
        g.addColorStop(0.4, `hsla(${p.hue+15},100%,55%,${a*0.7})`)
        g.addColorStop(1, `hsla(${p.hue+25},80%,30%,0)`)
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = g; ctx.fill()
      }
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[999]"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}

export default function HeroSection() {
  return (
    <>
    <FlameTrail />
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Radial flame glow background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-flame-orange/5 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-flame-orange/10 blur-[60px]" />
      </div>

      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
        {/* A: Upgraded Mockingjay SVG */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.0, duration: 1, ease: 'easeOut' }}
          className="relative mb-10"
        >
          <MockingjayHeroLogo />
        </motion.div>

        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.9 }}
        >
          <h1 className="font-cinzel font-black text-5xl md:text-7xl lg:text-8xl tracking-wider mb-2 flame-text">
            THE MOCKINGJAY
          </h1>
          <h1 className="font-cinzel font-black text-5xl md:text-7xl lg:text-8xl tracking-wider mb-4 gold-text">
            LIVES
          </h1>
          <p className="font-noto text-xl md:text-2xl text-gold/80 tracking-[0.2em] mb-8">
            反抗之鳥永不熄滅
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2.8, duration: 0.8 }}
          className="w-64 h-px bg-gradient-to-r from-transparent via-flame-orange to-transparent mb-8"
        />

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.0, duration: 0.9 }}
          className="max-w-2xl"
        >
          <blockquote className="font-playfair italic text-xl md:text-2xl text-gray-200 mb-3 leading-relaxed">
            &ldquo;If we burn, you burn with us.&rdquo;
          </blockquote>
          <p className="font-noto text-base md:text-lg text-gold/70 tracking-wide">
            「若我們燃燒，你也將與我們同焚。」
          </p>
          <p className="font-cinzel text-xs text-smoke tracking-[0.3em] mt-4">
            — KATNISS EVERDEEN
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-cinzel text-xs text-smoke tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-flame-orange to-transparent"
          />
        </motion.div>
      </div>
    </section>
    </>
  )
}

// A: Full hero Mockingjay – detailed realistic bird with outspread wings
function MockingjayHeroLogo() {
  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64">
      {/* Rotating outer ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle
            cx="100" cy="100" r="96"
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6b00" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#d4af37" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ff6b00" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Glow ring */}
      <div className="absolute inset-4 rounded-full border border-flame-orange/20 shadow-[0_0_30px_rgba(255,107,0,0.3)]" />

      {/* A: Mockingjay PNG image */}
      <img
        src="/mockingjay.png"
        alt="Mockingjay"
        className="absolute inset-0 w-full h-full object-contain"
        style={{ filter: 'drop-shadow(0 0 18px rgba(255,107,0,0.8))' }}
      />

      {/* Flame glow overlay */}
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-flame-orange/20 blur-2xl pointer-events-none"
      />
    </div>
  )
}
