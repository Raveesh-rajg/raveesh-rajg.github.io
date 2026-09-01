import { useEffect, useRef } from 'react'

const LAYERS = [
  { x: -1.55, label: 'SOURCE', count: 5, color: '#1f37ff' },
  { x: -0.52, label: 'MODEL', count: 6, color: '#11110f' },
  { x: 0.52, label: 'VERIFY', count: 5, color: '#1f37ff' },
  { x: 1.55, label: 'DECIDE', count: 3, color: '#11110f' },
]

function createPoints() {
  const points = []
  LAYERS.forEach((layer, layerIndex) => {
    for (let i = 0; i < layer.count; i += 1) {
      const angle = (Math.PI * 2 * i) / layer.count + layerIndex * 0.48
      points.push({
        layer: layerIndex,
        x: layer.x,
        y: Math.sin(angle) * (0.58 + layerIndex * 0.04),
        z: Math.cos(angle) * (0.74 - layerIndex * 0.05),
        color: layer.color,
      })
    }
  })
  return points
}

const points = createPoints()
const links = []
for (let layer = 0; layer < LAYERS.length - 1; layer += 1) {
  const from = points.map((p, i) => ({ ...p, i })).filter(p => p.layer === layer)
  const to = points.map((p, i) => ({ ...p, i })).filter(p => p.layer === layer + 1)
  from.forEach((p, i) => {
    links.push([p.i, to[i % to.length].i])
    links.push([p.i, to[(i + 1) % to.length].i])
  })
}

function rotate(point, rx, ry) {
  const cosY = Math.cos(ry)
  const sinY = Math.sin(ry)
  const x1 = point.x * cosY - point.z * sinY
  const z1 = point.x * sinY + point.z * cosY
  const cosX = Math.cos(rx)
  const sinX = Math.sin(rx)
  return {
    x: x1,
    y: point.y * cosX - z1 * sinX,
    z: point.y * sinX + z1 * cosX,
  }
}

export function EvidenceField() {
  const canvasRef = useRef(null)
  const shellRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const shell = shellRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !shell || !context) return undefined

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let dpr = 1
    let frame = 0
    let visible = true
    let pointerX = 0
    let pointerY = 0
    let targetX = 0
    let targetY = 0
    let time = 0

    const resize = () => {
      const rect = shell.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const project = point => {
      const depth = 4.6 + point.z
      const scale = Math.min(width, height) * 0.29 * (4.6 / depth)
      return {
        x: width * 0.5 + point.x * scale,
        y: height * 0.49 + point.y * scale,
        depth,
        scale,
      }
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)
      context.fillStyle = '#f4f3ec'
      context.fillRect(0, 0, width, height)

      pointerX += (targetX - pointerX) * 0.045
      pointerY += (targetY - pointerY) * 0.045
      if (!reduced) time += 0.0032

      const rx = -0.12 + pointerY * 0.2
      const ry = 0.22 + pointerX * 0.32 + time
      const transformed = points.map(point => {
        const rotated = rotate(point, rx, ry)
        return { ...project(rotated), color: point.color, z: rotated.z }
      })

      context.lineWidth = 1
      links
        .slice()
        .sort((a, b) => transformed[a[0]].z - transformed[b[0]].z)
        .forEach(([a, b]) => {
          const one = transformed[a]
          const two = transformed[b]
          const alpha = Math.max(0.13, Math.min(0.42, 0.25 + (one.z + two.z) * 0.06))
          context.strokeStyle = `rgba(17,17,15,${alpha})`
          context.beginPath()
          context.moveTo(one.x, one.y)
          context.lineTo(two.x, two.y)
          context.stroke()
        })

      transformed
        .slice()
        .sort((a, b) => a.z - b.z)
        .forEach(point => {
          const size = Math.max(3.5, 5.5 * (4.6 / point.depth))
          context.fillStyle = point.color
          context.beginPath()
          context.arc(point.x, point.y, size, 0, Math.PI * 2)
          context.fill()
          context.strokeStyle = '#f4f3ec'
          context.lineWidth = 1.5
          context.stroke()
        })

      context.strokeStyle = 'rgba(31,55,255,.7)'
      context.lineWidth = 1
      const cx = width * 0.5
      const cy = height * 0.49
      const r = Math.min(width, height) * 0.39
      context.beginPath()
      context.arc(cx, cy, r, Math.PI * 1.08, Math.PI * 1.88)
      context.stroke()

      if (visible && !reduced) frame = requestAnimationFrame(draw)
    }

    const onPointer = event => {
      const rect = shell.getBoundingClientRect()
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    }
    const onLeave = () => {
      targetX = 0
      targetY = 0
    }

    const resizeObserver = new ResizeObserver(resize)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      const next = entry.isIntersecting
      if (next && !visible && !reduced) {
        visible = true
        frame = requestAnimationFrame(draw)
      } else if (!next) {
        visible = false
        cancelAnimationFrame(frame)
      }
    })

    resizeObserver.observe(shell)
    intersectionObserver.observe(shell)
    shell.addEventListener('pointermove', onPointer)
    shell.addEventListener('pointerleave', onLeave)
    resize()
    draw()

    return () => {
      visible = false
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      shell.removeEventListener('pointermove', onPointer)
      shell.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div className="evidence-field" ref={shellRef} role="img" aria-label="A spatial data system connecting source, model, verification, and decision layers">
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="field-label field-label-source"><span>01</span> Source</div>
      <div className="field-label field-label-model"><span>02</span> Model</div>
      <div className="field-label field-label-verify"><span>03</span> Verify</div>
      <div className="field-label field-label-decide"><span>04</span> Decide</div>
      <div className="field-caption">A decision is only as credible as the path behind it.</div>
    </div>
  )
}
