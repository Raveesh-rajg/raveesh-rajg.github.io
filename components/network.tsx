'use client'
/* HeroNetwork — a lightweight animated data-network canvas for the hero's
   right side: nodes drift, edges connect nearby ones, and pulses travel the
   links (the "analytics command center" motif). Performance-conscious:
   ~18 nodes, capped DPR, pauses when the tab is hidden, and renders a single
   static frame under prefers-reduced-motion. Purely decorative (aria-hidden). */

import { useEffect, useRef } from 'react'

interface Node { x: number; y: number; vx: number; vy: number; r: number }

export function HeroNetwork() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return
    // Bind non-null locals so nested closures type-check under strict mode.
    const cv: HTMLCanvasElement = canvas
    const ctx: CanvasRenderingContext2D = context

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let W = 0, H = 0
    const nodes: Node[] = []
    const N = 18
    const LINK = 150

    function resize() {
      const rect = cv.getBoundingClientRect()
      W = rect.width; H = rect.height
      cv.width = W * dpr; cv.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < N; i++) {
      nodes.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.8 + 1.2,
      })
    }

    let t = 0
    function frame() {
      ctx.clearRect(0, 0, W, H)
      // edges
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y
          const d = Math.hypot(dx, dy)
          if (d < LINK) {
            const a = (1 - d / LINK) * 0.5
            ctx.strokeStyle = `rgba(94,234,212,${a})`
            ctx.lineWidth = 0.7
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke()
            // travelling pulse
            const p = (t * 0.004 + (i + j) * 0.13) % 1
            const px = nodes[i].x + dx * -p, py = nodes[i].y + dy * -p
            ctx.fillStyle = `rgba(167,139,250,${a * 1.4})`
            ctx.beginPath(); ctx.arc(px, py, 1.4, 0, Math.PI * 2); ctx.fill()
          }
        }
      }
      // nodes
      for (const n of nodes) {
        ctx.fillStyle = 'rgba(94,234,212,0.9)'
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = 'rgba(94,234,212,0.12)'
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 3.5, 0, Math.PI * 2); ctx.fill()
        if (!reduced) {
          n.x += n.vx; n.y += n.vy
          if (n.x < 0 || n.x > W) n.vx *= -1
          if (n.y < 0 || n.y > H) n.vy *= -1
        }
      }
    }

    let raf = 0
    function loop() {
      if (!document.hidden) { t++; frame() }
      raf = requestAnimationFrame(loop)
    }
    if (reduced) { frame() } else { loop() }

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas ref={ref} aria-hidden
      className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[46%] opacity-70 lg:block"
      style={{ maskImage: 'radial-gradient(ellipse 80% 90% at 70% 50%, #000 40%, transparent 85%)', WebkitMaskImage: 'radial-gradient(ellipse 80% 90% at 70% 50%, #000 40%, transparent 85%)' }}
    />
  )
}
