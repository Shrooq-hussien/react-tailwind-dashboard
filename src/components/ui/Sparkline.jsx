// src/components/ui/Sparkline.jsx
import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'

/**
 * Minimal sparkline SVG with Framer Motion draw animation.
 * @param {Object} props
 * @param {{day:string,value:number}[]} props.data
 * @param {number} [props.width=160]
 * @param {number} [props.height=40]
 * @param {string} [props.color='#3b82f6'] // tailwind brand-500
 */
function Sparkline({ data = [], width = 160, height = 40, color = '#3b82f6' }) {
  const { points, min, max } = useMemo(() => {
    const vals = data.map(d => d.value)
    const lo = Math.min(...vals, 0)
    const hi = Math.max(...vals, 1)
    const span = Math.max(1, hi - lo)
    const pad = 4
    const w = width - pad * 2
    const h = height - pad * 2

    const pts = data.map((d, i) => {
      const x = pad + (i / Math.max(1, data.length - 1)) * w
      const y = pad + h - ((d.value - lo) / span) * h
      return `${x.toFixed(1)},${y.toFixed(1)}`
    }).join(' ')
    return { points: pts, min: lo, max: hi }
  }, [data, width, height])

  // Fill under the line
  const fillPath = useMemo(() => {
    if (!points) return ''
    const firstX = 0
    const lastX = width
    // convert "x,y x,y ..." to array
    const arr = points.split(' ').map(p => p.split(',').map(Number))
    if (arr.length === 0) return ''

    const topPath = arr.map(([x, y]) => `${x},${y}`).join(' ')
    return `M ${arr[0][0]},${arr[0][1]} L ${topPath.replace(/ /g, ' L ')} L ${arr[arr.length-1][0]},${height} L ${arr[0][0]},${height} Z`
  }, [points, height, width])

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="sparkline">
      {/* subtle background grid */}
      <rect x="0" y="0" width={width} height={height} fill="none" />
      <path d={fillPath} fill={`${color}20`} />
      <motion.polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0.6 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default memo(Sparkline)
