import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { EASE_CINEMATIC } from '../motion/motionSystem'

export default function ArrivalBadge({ destination }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { amount: 0.4, once: true })

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: -14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE_CINEMATIC }}
      className="site-shell absolute inset-x-0 top-28 z-10 flex items-center justify-between text-white"
    >
      <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.23em]">
        <MapPin size={16} style={{ color: destination.accent }} />
        <span>Arriving at · {destination.coordinates}</span>
      </div>
      <span className="hidden text-[9px] uppercase tracking-[.28em] text-white/50 sm:block">{destination.neighborhood}</span>
    </motion.div>
  )
}
