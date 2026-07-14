'use client'
/* CursorGlow — an ambient light that follows the pointer, giving the dark
   canvas a sense of depth and responsiveness (the signature "expensive"
   feel of Linear/Vercel). Desktop pointers only; disabled for touch and
   reduced-motion. Sits in the background layer, never intercepts input. */

import { useEffect, useRef } from 'react'

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return
    let raf = 0
    const move = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
        el.style.opacity = '1'
      })
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf) }
  }, [])
  return <div ref={ref} aria-hidden className="cursor-glow" />
}
