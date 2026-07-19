import { useRef } from 'react'
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Navigation2 } from 'lucide-react'
import { legs } from '../data/journey'
import { SPRING_FLIGHT, clamp01 } from '../motion/motionSystem'
import { useMediaQuery } from '../motion/useMediaQuery'

const ROUTES = [
  { d: 'M35 84 C230 26 470 104 700 52 S 930 70 965 58', start: [35, 84], end: [965, 58] },
  { d: 'M35 56 C210 100 480 20 720 78 S 920 40 965 66', start: [35, 56], end: [965, 66] },
  { d: 'M35 70 C260 92 450 30 690 86 S 910 96 965 48', start: [35, 70], end: [965, 48] },
]

function StaticLegCard({ leg }) {
  return (
    <section aria-label={`Traveling from ${leg.from} to ${leg.to}`} className="relative flex min-h-[46vh] items-center overflow-hidden bg-ink text-white">
      <div className="map-grid absolute inset-0 opacity-25" />
      <div className="site-shell relative z-10 w-full py-16">
        <div className="flex items-end justify-between gap-6">
          <div><span className="eyebrow text-gold">Leaving</span><h3 className="mt-2 font-display text-4xl sm:text-6xl">{leg.from}</h3></div>
          <div className="text-right"><span className="eyebrow text-gold">Next stop</span><h3 className="mt-2 font-display text-4xl sm:text-6xl">{leg.to}</h3></div>
        </div>
        <div className="relative mt-10 h-24">
          <svg viewBox="0 0 1000 120" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <path d="M35 80 C250 30 480 100 965 55" fill="none" stroke="#f6bd3b" strokeWidth="3" strokeLinecap="round" />
            <circle cx="35" cy="80" r="7" fill="#f6bd3b" />
            <circle cx="965" cy="55" r="7" fill="#f6bd3b" />
          </svg>
        </div>
        <p className="flex items-center gap-2 text-[10px] uppercase tracking-[.22em] text-white/50"><Navigation2 size={13} className="text-gold" />{leg.headline}</p>
      </div>
    </section>
  )
}

export default function MapFlight({ index }) {
  const leg = legs[index]
  const route = ROUTES[index % ROUTES.length]
  const ref = useRef(null)
  const pathRef = useRef(null)
  const reduce = useReducedMotion()
  const isPhone = useMediaQuery('(max-width: 639px)')
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const smooth = useSpring(scrollYProgress, SPRING_FLIGHT)

  const draw = useTransform(smooth, [0.22, 0.78], [0, 1])
  const cx = useMotionValue(route.start[0])
  const cy = useMotionValue(route.start[1])
  useMotionValueEvent(draw, 'change', v => {
    const el = pathRef.current
    if (!el) return
    const point = el.getPointAtLength(el.getTotalLength() * clamp01(v))
    cx.set(point.x)
    cy.set(point.y)
  })

  const fromOpacity = useTransform(draw, [0, 0.6, 1], [1, 0.85, 0.35])
  const toOpacity = useTransform(draw, [0, 0.4, 1], [0.35, 0.7, 1])
  const toScale = useTransform(draw, [0, 1], [0.96, 1])
  const arrivalPop = useTransform(draw, [0.85, 1], [0, 1])
  const pct = useTransform(draw, v => `${Math.round(clamp01(v) * 100)}%`)

  if (reduce || isPhone) return <StaticLegCard leg={leg} />

  return (
    <section ref={ref} aria-label={`Traveling from ${leg.from} to ${leg.to}`} className="relative flex min-h-[52vh] items-center overflow-hidden bg-ink">
      <div className="map-grid absolute inset-0 opacity-25" aria-hidden="true" />
      <div className="site-shell relative z-10 w-full py-16 text-white">
          <div className="flex items-end justify-between gap-6">
            <motion.div style={{ opacity: fromOpacity }}><span className="eyebrow text-gold">Leaving</span><h3 className="mt-2 font-display text-4xl sm:text-6xl">{leg.from}</h3></motion.div>
            <motion.div style={{ opacity: toOpacity, scale: toScale }} className="origin-bottom-right text-right"><span className="eyebrow text-gold">Next stop</span><h3 className="mt-2 font-display text-4xl sm:text-6xl">{leg.to}</h3></motion.div>
          </div>
          <div className="relative mt-12 h-28 sm:h-32">
            <svg viewBox="0 0 1000 120" fill="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
              <path d={route.d} stroke="rgba(255,255,255,.14)" strokeWidth="2" strokeDasharray="3 9" strokeLinecap="round" />
              <motion.path ref={pathRef} d={route.d} style={{ pathLength: draw }} stroke="#f6bd3b" strokeWidth="3" strokeLinecap="round" />
              <circle cx={route.start[0]} cy={route.start[1]} r="7" fill="#f6bd3b" />
              <motion.circle cx={route.end[0]} cy={route.end[1]} r="9" fill="#f6bd3b" style={{ scale: arrivalPop, opacity: arrivalPop }} />
              <motion.circle cx={cx} cy={cy} r="14" fill="#f6bd3b" opacity=".22" />
              <motion.circle cx={cx} cy={cy} r="5.5" fill="#fff4c4" />
            </svg>
          </div>
          <div className="mt-8 flex items-center justify-between border-t border-white/15 pt-4 text-[10px] uppercase tracking-[.22em] text-white/50">
            <span className="flex items-center gap-2"><Navigation2 size={13} className="text-gold" />{leg.headline}</span>
            <motion.span className="font-semibold text-gold">{pct}</motion.span>
          </div>
      </div>
    </section>
  )
}
