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
}

export default function AshCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let particles: Particle[] = []

    const resize = () => {
      canvas.width = window.innerWidth
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
    })

    for (let i = 0; i < 60; i++) {
      const p = createParticle()
      p.y = Math.random() * canvas.height
      particles.push(p)
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

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
          ctx.fillStyle = `rgba(${120 + Math.random() * 40}, ${110 + Math.random() * 30}, ${100 + Math.random() * 20}, ${p.opacity})`
          ctx.beginPath()
          ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()

        p.y += p.speedY
        p.x += p.speedX + Math.sin(Date.now() / 2000 + i) * 0.3
        p.rotation += p.rotationSpeed
        p.opacity -= 0.0008

        if (p.y < -20 || p.opacity <= 0) {
          particles[i] = createParticle()
        }
      })

      if (Math.random() < 0.15) {
        particles.push(createParticle())
        if (particles.length > 120) {
          particles.splice(0, 1)
        }
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
