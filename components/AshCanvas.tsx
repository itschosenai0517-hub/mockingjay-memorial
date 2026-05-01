'use client'

import { useEffect, useRef } from 'react'

interface AshParticle {
  x: number
  y: number
  size: number
  speedY: number
  speedX: number
  rotation: number
  rotationSpeed: number
  opacity: number
  type: 'ash' | 'ember'
  ashR: number
  ashG: number
  ashB: number
}

interface FlameParticle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  size: number
  hue: number
}

const MAX_PARTICLES_NORMAL = 80
const MAX_PARTICLES_LOW    = 30
const MAX_PARTICLES_MOBILE = 20

const SPAWN_RATE_NORMAL = 0.12
const SPAWN_RATE_LOW    = 0.05
const SPAWN_RATE_MOBILE = 0.04

/**
 * Unified canvas that renders both ambient ash particles and the flame cursor
 * trail — previously two separate requestAnimationFrame loops, now merged into
 * one to halve per-frame canvas work on low-end and mobile devices.
 */
export default function AshCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let animationId: number
    let ashParticles: AshParticle[] = []
    const flameParticles: FlameParticle[] = []

    const isMobile  = window.innerWidth <= 768
    const isLowPerf = !isMobile && typeof navigator !== 'undefined' && navigator.hardwareConcurrency <= 2

    const maxAsh   = prefersReduced ? 0 : (isMobile ? MAX_PARTICLES_MOBILE : isLowPerf ? MAX_PARTICLES_LOW : MAX_PARTICLES_NORMAL)
    const spawnRate = isMobile ? SPAWN_RATE_MOBILE : isLowPerf ? SPAWN_RATE_LOW : SPAWN_RATE_NORMAL

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // ── Ash particles ────────────────────────────────────────────────────────
    const createAsh = (): AshParticle => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 10,
      size: Math.random() * 4 + 1,
      speedY: -(Math.random() * 1.5 + 0.3),
      speedX: (Math.random() - 0.5) * 0.8,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.05,
      opacity: Math.random() * 0.6 + 0.1,
      type: Math.random() > 0.85 ? 'ember' : 'ash',
      ashR: 120 + Math.floor(Math.random() * 40),
      ashG: 110 + Math.floor(Math.random() * 30),
      ashB: 100 + Math.floor(Math.random() * 20),
    })

    if (!prefersReduced) {
      const seedCount = Math.min(isMobile ? 10 : 40, maxAsh)
      for (let i = 0; i < seedCount; i++) {
        const p = createAsh()
        p.y = Math.random() * canvas.height
        ashParticles.push(p)
      }
    }

    // ── Flame cursor trail ───────────────────────────────────────────────────
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (prefersReduced) return
      const cx = e instanceof MouseEvent ? e.clientX : e.touches[0]?.clientX
      const cy = e instanceof MouseEvent ? e.clientY : e.touches[0]?.clientY
      if (!cx || !cy) return
      for (let i = 0; i < 4; i++) {
        flameParticles.push({
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
    window.addEventListener('touchmove', onMove, { passive: true })

    // ── Unified draw loop ────────────────────────────────────────────────────
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const now = Date.now()

      // Draw ash
      ashParticles.forEach((p, i) => {
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.globalAlpha = p.opacity

        if (p.type === 'ember') {
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 2)
          gradient.addColorStop(0, '#ff9500')
          gradient.addColorStop(0.5, '#ff6b00')
          gradient.addColorStop(1, 'transparent')
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(0, 0, p.size * 2, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.fillStyle = `rgba(${p.ashR}, ${p.ashG}, ${p.ashB}, ${p.opacity})`
          ctx.beginPath()
          ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()

        p.y += p.speedY
        p.x += p.speedX + Math.sin(now / 2000 + i) * 0.3
        p.rotation += p.rotationSpeed
        p.opacity -= 0.0008

        if (p.y < -20 || p.opacity <= 0) {
          ashParticles[i] = createAsh()
        }
      })

      if (Math.random() < spawnRate && ashParticles.length < maxAsh) {
        ashParticles.push(createAsh())
      } else if (ashParticles.length > maxAsh) {
        ashParticles.splice(0, ashParticles.length - maxAsh)
      }

      // Draw flame trail (screen blend mode via globalCompositeOperation)
      ctx.globalCompositeOperation = 'screen'
      for (let i = flameParticles.length - 1; i >= 0; i--) {
        const p = flameParticles[i]
        p.life -= 0.032
        if (p.life <= 0) { flameParticles.splice(i, 1); continue }
        p.x += p.vx; p.y += p.vy; p.vy -= 0.05; p.size *= 0.97
        const a = Math.max(0, p.life) * 0.85
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)
        g.addColorStop(0, `hsla(${p.hue},100%,80%,${a})`)
        g.addColorStop(0.4, `hsla(${p.hue + 15},100%,55%,${a * 0.7})`)
        g.addColorStop(1, `hsla(${p.hue + 25},80%,30%,0)`)
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = g; ctx.fill()
      }
      ctx.globalCompositeOperation = 'source-over'

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="ash-canvas"
      className="fixed inset-0 pointer-events-none z-10"
      aria-hidden="true"
    />
  )
}
