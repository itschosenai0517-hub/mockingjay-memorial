'use client'

import { useEffect, useRef } from 'react'

interface Particle {
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

const MAX_PARTICLES_NORMAL = 80
const MAX_PARTICLES_LOW    = 30
// 手機（窄螢幕）額外降低粒子數，避免影響捲動效能
const MAX_PARTICLES_MOBILE = 20

const SPAWN_RATE_NORMAL = 0.12
const SPAWN_RATE_LOW    = 0.05
const SPAWN_RATE_MOBILE = 0.04

export default function AshCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let animationId: number
    let particles: Particle[] = []

    // 手機偵測：寬度 ≤ 768px 視為手機
    const isMobile = window.innerWidth <= 768
    const isLowPerf = !isMobile && typeof navigator !== 'undefined' && navigator.hardwareConcurrency <= 2

    const maxParticles = isMobile ? MAX_PARTICLES_MOBILE : isLowPerf ? MAX_PARTICLES_LOW : MAX_PARTICLES_NORMAL
    const spawnRate    = isMobile ? SPAWN_RATE_MOBILE    : isLowPerf ? SPAWN_RATE_LOW    : SPAWN_RATE_NORMAL

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const createParticle = (): Particle => ({
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

    const seedCount = Math.min(isMobile ? 10 : 40, maxParticles)
    for (let i = 0; i < seedCount; i++) {
      const p = createParticle()
      p.y = Math.random() * canvas.height
      particles.push(p)
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const now = Date.now()

      particles.forEach((p, i) => {
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
          particles[i] = createParticle()
        }
      })

      if (Math.random() < spawnRate && particles.length < maxParticles) {
        particles.push(createParticle())
      } else if (particles.length > maxParticles) {
        particles.splice(0, particles.length - maxParticles)
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
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
