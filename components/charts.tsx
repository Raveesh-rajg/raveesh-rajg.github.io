'use client'
/* Lightweight animated SVG charts — every number a measured result. */

import { motion } from 'framer-motion'

export interface BarItem { label: string; v: number; color?: string }

export function Bars({ items, unit = '%', max }: { items: BarItem[]; unit?: string; max?: number }) {
  const top = max ?? Math.max(...items.map(i => i.v)) * 1.15
  return (
    <div className="my-3 flex flex-col gap-3" role="img"
      aria-label={items.map(i => `${i.label}: ${i.v}${unit}`).join(', ')}>
      {items.map((it, i) => (
        <div key={it.label} className="grid grid-cols-[minmax(110px,210px)_1fr_76px] items-center gap-3">
          <span className="text-right font-mono text-xs text-muted">{it.label}</span>
          <div className="h-[22px] overflow-hidden rounded-md bg-white/5">
            <motion.div className="h-full rounded-md" style={{ background: it.color ?? '#5eead4' }}
              initial={{ width: 0 }} whileInView={{ width: `${(it.v / top) * 100}%` }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 60, damping: 18, delay: i * 0.12 }} />
          </div>
          <span className="font-mono text-[13px]">{it.v}{unit}</span>
        </div>
      ))}
    </div>
  )
}

export function Line({ points, labels, refLine }: { points: number[]; labels: string[]; refLine?: number }) {
  const W = 520, H = 170, PAD = 28
  const all = refLine != null ? [...points, refLine] : points
  const max = Math.max(...all) * 1.15, min = Math.min(...all) * 0.85
  const x = (i: number) => PAD + (i / (points.length - 1)) * (W - PAD * 2)
  const y = (v: number) => H - PAD - ((v - min) / (max - min)) * (H - PAD * 2)
  const d = points.map((p, i) => `${i ? 'L' : 'M'}${x(i)},${y(p)}`).join(' ')
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 w-full max-w-[560px]" role="img"
      aria-label={points.map((p, i) => `${labels[i]}: ${p}`).join(', ')}>
      {refLine != null && (
        <line x1={PAD} x2={W - PAD} y1={y(refLine)} y2={y(refLine)}
          stroke="#5d6478" strokeDasharray="4 5" strokeWidth={1} />
      )}
      <motion.path d={d} fill="none" stroke="#5eead4" strokeWidth={2.5} strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: true }} transition={{ duration: 1.2, ease: 'easeOut' }} />
      {points.map((p, i) => (
        <g key={i}>
          <motion.circle cx={x(i)} cy={y(p)} r={4} fill="#5eead4"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.25 + i * 0.14 }} />
          <text x={x(i)} y={y(p) - 11} textAnchor="middle" className="fill-body font-mono text-[11px]">{p}</text>
          <text x={x(i)} y={H - 7} textAnchor="middle" className="fill-dim font-mono text-[10px]">{labels[i]}</text>
        </g>
      ))}
    </svg>
  )
}
