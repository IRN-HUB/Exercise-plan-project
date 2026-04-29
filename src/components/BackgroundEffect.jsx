import { useEffect, useRef } from 'react'

// ===== Golden Floating Particles (keep subtle) =====
class Sparkle {
  constructor(w, h) {
    this.reset(w, h)
  }
  reset(w, h) {
    this.x = w * 0.15 + Math.random() * w * 0.7
    this.y = Math.random() * h
    this.size = Math.random() * 2 + 0.5
    this.speedY = -(Math.random() * 0.2 + 0.05)
    this.speedX = (Math.random() - 0.5) * 0.1
    this.opacity = Math.random() * 0.3 + 0.1
    this.phase = Math.random() * Math.PI * 2
    this.phaseSpeed = Math.random() * 0.03 + 0.01
    this.w = w; this.h = h
  }
  update(w, h) {
    this.x += this.speedX; this.y += this.speedY; this.phase += this.phaseSpeed
    if (this.y < -10) { this.y = h + 10; this.x = w * 0.15 + Math.random() * w * 0.7 }
    if (this.x < -10) this.x = w + 10
    if (this.x > w + 10) this.x = -10
  }
  draw(ctx) {
    const glow = Math.sin(this.phase) * 0.4 + 0.6
    const alpha = this.opacity * glow
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = `hsla(50, 100%, 85%, ${alpha})`
    ctx.fill()
  }
}

// ===== Manga-Style Flame Tongue =====
class MangaFlame {
  constructor(side, w, h) {
    this.side = side // 'blue' | 'purple'
    this.reset(w, h)
  }

  reset(w, h) {
    this.w = w; this.h = h
    this.baseX = this.side === 'blue' ? w * 0.04 : w * 0.96
    this.baseY = h * (0.65 + Math.random() * 0.25)
    this.baseYBottom = h * (0.7 + Math.random() * 0.3)

    // Flame shape parameters
    this.height = 60 + Math.random() * 100
    this.width = 20 + Math.random() * 35
    this.lean = (Math.random() - 0.5) * 0.6 // how much it bends
    this.curl = Math.random() * 1.5 - 0.5 // curl at the tip

    // The spread direction: blue flame spreads right, purple spreads left
    this.spreadDir = this.side === 'blue' ? 1 : -1

    // Lifecycle
    this.life = Math.random() * 0.5 + 0.5
    this.lifeDir = 0.005 + Math.random() * 0.01
    this.maxLife = 1

    // Wobble animation
    this.wobble = Math.random() * Math.PI * 2
    this.wobbleSpeed = 0.02 + Math.random() * 0.02

    // Color config
    if (this.side === 'blue') {
      this.hue1 = 195; this.hue2 = 220; this.hue3 = 240
      this.strokeColor = 'hsla(210, 100%, 40%, 0.8)'
    } else {
      this.hue1 = 260; this.hue2 = 280; this.hue3 = 300
      this.strokeColor = 'hsla(270, 100%, 50%, 0.8)'
    }
  }

  update() {
    this.life += this.lifeDir
    if (this.life > this.maxLife || this.life < 0.3) this.lifeDir *= -1
    this.wobble += this.wobbleSpeed

    // Subtle movement
    this.baseX += Math.sin(this.wobble * 0.5) * 0.1
  }

  draw(ctx) {
    const life = this.life
    const height = this.height * life
    const width = this.width * (0.6 + life * 0.4)
    const wobbleOffset = Math.sin(this.wobble) * 6
    const curlOffset = Math.sin(this.wobble * 0.7) * 8

    const cx = this.baseX
    const by = this.baseY
    const dir = this.spreadDir

    // Build flame path - a dynamic tongue shape
    const tipX = cx + dir * (width * 0.8 + wobbleOffset * 0.5) + (this.lean * 30)
    const tipY = by - height
    const curlX = tipX + dir * this.curl * 25 + curlOffset
    const curlY = tipY - 10

    // Control points for the flame curve
    const midY = by - height * 0.5
    const midX = cx + dir * (width * 0.3) + wobbleOffset * 0.3

    // Left edge control
    const leftC1x = cx - width * 0.15 + Math.sin(this.wobble * 1.3) * 4
    const leftC1y = by - height * 0.35
    const leftC2x = cx - width * 0.05 + Math.sin(this.wobble * 1.7) * 5
    const leftC2y = by - height * 0.7

    // Right edge control
    const rightC1x = cx + dir * width * 0.4 + Math.sin(this.wobble * 1.1) * 5
    const rightC1y = by - height * 0.3
    const rightC2x = tipX + Math.sin(this.wobble * 1.5) * 6
    const rightC2y = by - height * 0.75

    // Draw the flame tongue with stroke
    ctx.beginPath()
    ctx.moveTo(cx, by)

    // Left side going up
    ctx.bezierCurveTo(
      cx + dir * 5, by - height * 0.1,
      leftC1x, leftC1y,
      leftC2x, leftC2y
    )
    // Curve to tip
    ctx.bezierCurveTo(
      leftC2x - dir * 10, leftC2y - 10,
      tipX - dir * 10, tipY + 15,
      tipX, tipY
    )
    // The curl at the tip
    ctx.bezierCurveTo(
      tipX + dir * 10, tipY - 5,
      curlX, curlY + 5,
      curlX, curlY
    )
    // Right side going down
    ctx.bezierCurveTo(
      curlX, curlY + 15,
      rightC2x + dir * 15, rightC2y,
      rightC1x, rightC1y
    )
    ctx.bezierCurveTo(
      rightC1x - dir * 8, rightC1y + 30,
      cx + dir * 10, by - height * 0.1,
      cx, by
    )

    ctx.closePath()

    // Fill with gradient
    const grad = ctx.createLinearGradient(cx, by, cx, tipY)
    if (this.side === 'blue') {
      grad.addColorStop(0, `hsla(${this.hue1}, 100%, 60%, ${life * 0.5})`)
      grad.addColorStop(0.4, `hsla(${this.hue2}, 100%, 55%, ${life * 0.35})`)
      grad.addColorStop(0.7, `hsla(${this.hue3}, 90%, 65%, ${life * 0.25})`)
      grad.addColorStop(1, `hsla(${this.hue3 + 20}, 80%, 70%, ${life * 0.08})`)
    } else {
      grad.addColorStop(0, `hsla(${this.hue1}, 100%, 65%, ${life * 0.5})`)
      grad.addColorStop(0.4, `hsla(${this.hue2}, 100%, 60%, ${life * 0.35})`)
      grad.addColorStop(0.7, `hsla(${this.hue3}, 90%, 65%, ${life * 0.25})`)
      grad.addColorStop(1, `hsla(${this.hue3 + 20}, 80%, 75%, ${life * 0.08})`)
    }
    ctx.fillStyle = grad
    ctx.fill()

    // Thick comic-style outline
    ctx.strokeStyle = this.side === 'blue'
      ? `hsla(210, 100%, 35%, ${life * 0.7})`
      : `hsla(270, 100%, 45%, ${life * 0.7})`
    ctx.lineWidth = 2.5
    ctx.lineJoin = 'round'
    ctx.stroke()

    // Inner bright highlight (comic-style inner glow)
    ctx.beginPath()
    ctx.moveTo(cx + dir * 3, by - 5)
    ctx.bezierCurveTo(
      cx + dir * 5, by - height * 0.15,
      cx + dir * width * 0.2, by - height * 0.4,
      tipX - dir * 5, tipY + 10
    )
    ctx.strokeStyle = this.side === 'blue'
      ? `hsla(190, 100%, 85%, ${life * 0.3})`
      : `hsla(280, 100%, 85%, ${life * 0.3})`
    ctx.lineWidth = 1.5
    ctx.stroke()
  }
}

// ===== Manga Sparkles / Action Stars =====
class MangaSpark {
  constructor(w, h, side) {
    this.side = side
    this.reset(w, h)
  }

  reset(w, h) {
    this.x = this.side === 'blue'
      ? Math.random() * w * 0.08
      : w - Math.random() * w * 0.08
    this.y = Math.random() * h * 0.7
    this.size = Math.random() * 3 + 1.5
    this.rotation = Math.random() * Math.PI * 2
    this.rotSpeed = (Math.random() - 0.5) * 0.05
    this.life = Math.random() * 0.5 + 0.5
    this.lifeDir = 0.005 + Math.random() * 0.01
    if (this.side === 'blue') {
      this.color = `hsla(200, 100%, 80%, 0.8)`
    } else {
      this.color = `hsla(280, 100%, 80%, 0.8)`
    }
  }

  update() {
    this.life += this.lifeDir
    if (this.life > 1 || this.life < 0.2) this.lifeDir *= -1
    this.rotation += this.rotSpeed
  }

  draw(ctx) {
    const s = this.size * this.life
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.rotation)
    ctx.beginPath()
    // 4-point star
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2
      const outerR = s
      const innerR = s * 0.35
      if (i === 0) {
        ctx.moveTo(Math.cos(a) * outerR, Math.sin(a) * outerR)
      } else {
        ctx.lineTo(Math.cos(a - Math.PI / 4) * innerR, Math.sin(a - Math.PI / 4) * innerR)
        ctx.lineTo(Math.cos(a) * outerR, Math.sin(a) * outerR)
      }
    }
    ctx.closePath()
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.strokeStyle = this.side === 'blue'
      ? `hsla(210, 100%, 50%, ${0.3 * this.life})`
      : `hsla(270, 100%, 60%, ${0.3 * this.life})`
    ctx.lineWidth = 0.8
    ctx.stroke()
    ctx.restore()
  }
}

// ===== Action Speed Lines (Manga effect) =====
class SpeedLine {
  constructor(w, h, side) {
    this.side = side
    this.reset(w, h)
  }

  reset(w, h) {
    this.y = Math.random() * h
    this.length = 30 + Math.random() * 60
    this.opacity = Math.random() * 0.15 + 0.05
    this.w = w; this.h = h
    this.x = this.side === 'blue'
      ? 5 + Math.random() * 15
      : w - 20 - Math.random() * 15
    this.speed = Math.random() * 0.3 + 0.1
  }

  update() {
    this.y -= this.speed
    if (this.y < -this.length) {
      this.y = this.h + this.length
      this.x = this.side === 'blue'
        ? 5 + Math.random() * 15
        : this.w - 20 - Math.random() * 15
    }
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.x, this.y + this.length)
    ctx.strokeStyle = this.side === 'blue'
      ? `hsla(210, 100%, 60%, ${this.opacity})`
      : `hsla(270, 100%, 70%, ${this.opacity})`
    ctx.lineWidth = 1.5
    ctx.stroke()
  }
}

// ===== Main Component =====
export default function BackgroundEffect() {
  const canvasRef = useRef(null)
  const sparklesRef = useRef([])
  const blueFlamesRef = useRef([])
  const purpleFlamesRef = useRef([])
  const blueSparksRef = useRef([])
  const purpleSparksRef = useRef([])
  const blueLinesRef = useRef([])
  const purpleLinesRef = useRef([])
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let w, h

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w
      canvas.height = h

      sparklesRef.current = Array.from({ length: 35 }, () => new Sparkle(w, h))
      blueFlamesRef.current = Array.from({ length: 12 }, () => new MangaFlame('blue', w, h))
      purpleFlamesRef.current = Array.from({ length: 12 }, () => new MangaFlame('purple', w, h))
      blueSparksRef.current = Array.from({ length: 8 }, () => new MangaSpark(w, h, 'blue'))
      purpleSparksRef.current = Array.from({ length: 8 }, () => new MangaSpark(w, h, 'purple'))
      blueLinesRef.current = Array.from({ length: 10 }, () => new SpeedLine(w, h, 'blue'))
      purpleLinesRef.current = Array.from({ length: 10 }, () => new SpeedLine(w, h, 'purple'))
    }

    resize()
    window.addEventListener('resize', resize)

    const animate = () => {
      ctx.clearRect(0, 0, w, h)

      // Draw speed lines (behind)
      for (const line of blueLinesRef.current) { line.update(); line.draw(ctx) }
      for (const line of purpleLinesRef.current) { line.update(); line.draw(ctx) }

      // Draw manga flames
      for (const f of blueFlamesRef.current) { f.update(); f.draw(ctx) }
      for (const f of purpleFlamesRef.current) { f.update(); f.draw(ctx) }

      // Draw manga sparkles
      for (const s of blueSparksRef.current) { s.update(); s.draw(ctx) }
      for (const s of purpleSparksRef.current) { s.update(); s.draw(ctx) }

      // Draw golden sparkles (subtle)
      for (const s of sparklesRef.current) { s.update(w, h); s.draw(ctx) }

      rafRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}
    />
  )
}
