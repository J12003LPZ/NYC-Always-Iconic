import { useRef } from 'react'
import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Clock3, MapPin } from 'lucide-react'
import { EASE_CINEMATIC, SPRING_SCROLL } from '../motion/motionSystem'
import ArrivalBadge from './ArrivalBadge'

const OPEN = 'inset(0% 0% 0% 0%)'
const NONE = 'none'

const VARIANTS = {
  'bridge-depth': {
    clip: ['inset(0% 100% 0% 0%)', OPEN],
    scale: [1.16, 1],
    card: { x: -70 },
  },
  'harbor-reveal': {
    clip: ['circle(13% at 66% 44%)', 'circle(125% at 50% 50%)'],
    scale: [1.22, 1],
    card: { x: 70 },
  },
  'park-descent': {
    clip: ['inset(0% 0% 100% 0%)', OPEN],
    scale: [1.18, 1],
    filter: ['blur(12px)', 'blur(0px)'],
    card: { y: 70 },
  },
  'street-rush': {
    scale: [1.35, 1],
    filter: ['blur(20px) brightness(1.65) saturate(1.45)', 'blur(0px) brightness(1) saturate(1)'],
    card: { scale: 0.88 },
  },
  'tower-rise': {
    clip: ['inset(100% 0% 0% 0%)', OPEN],
    scale: [1.12, 1],
    y: ['16%', '0%'],
    card: { y: 90 },
  },
}

function RevealTitle({ text }) {
  return (
    <span className="inline-flex flex-wrap gap-x-[.28em]">
      {text.split(' ').map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[.08em] align-top">
          <motion.span
            variants={{ hidden: { y: '112%' }, show: { y: 0 } }}
            transition={{ duration: 0.75, ease: EASE_CINEMATIC, delay: i * 0.07 }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

function DestinationContent({ destination, entrance }) {
  const inViewRef = useRef(null)
  const inView = useInView(inViewRef, { amount: 0.3, once: true })
  const card = {
    hidden: {
      opacity: 0,
      x: entrance.x ?? 0,
      y: entrance.y ?? 56,
      scale: entrance.scale ?? 1,
      rotate: entrance.x ? (entrance.x > 0 ? 1.5 : -1.5) : 0,
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.9, ease: EASE_CINEMATIC, staggerChildren: 0.09, delayChildren: 0.25 },
    },
  }
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_CINEMATIC } },
  }
  return (
    <motion.div
      ref={inViewRef}
      variants={card}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className={`destination-card ${destination.align === 'right' ? 'lg:ml-auto' : ''}`}
    >
      <motion.div variants={item} className="mb-7 flex items-center justify-between">
        <span className="font-display text-3xl" style={{ color: destination.accent }}>{destination.number}</span>
        <span className="text-[9px] font-semibold uppercase tracking-[.24em] text-ink/40">Destination chapter</span>
      </motion.div>
      <h2 className="font-display text-[clamp(4.1rem,7.6vw,7.8rem)] leading-[.76] tracking-wide text-ink">
        <RevealTitle text={destination.name} />
      </h2>
      <motion.p variants={item} className="mt-7 max-w-xl text-[15px] leading-relaxed text-ink/70 sm:text-base">{destination.description}</motion.p>
      <motion.div variants={item} className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs text-ink/60">
        <span className="flex items-center gap-2"><MapPin size={15} style={{ color: destination.accent }} />{destination.location}</span>
        <span className="flex items-center gap-2"><Clock3 size={15} style={{ color: destination.accent }} />{destination.timing}</span>
      </motion.div>
      <motion.div variants={item}>
        <a href="#plan" className="mt-8 inline-flex min-h-12 items-center gap-4 rounded-full px-6 text-sm font-semibold text-white transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" style={{ backgroundColor: destination.accent }}>{destination.cta}<ArrowRight size={16} /></a>
      </motion.div>
      <motion.p variants={item} className="mt-8 border-t border-ink/10 pt-5 font-serif text-lg italic text-ink/70">“{destination.quote}”</motion.p>
    </motion.div>
  )
}

export default function DestinationSection({ destination }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const v = VARIANTS[destination.concept] ?? VARIANTS['bridge-depth']
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] })
  const smooth = useSpring(scrollYProgress, SPRING_SCROLL)

  const clipPath = useTransform(smooth, [0.08, 0.85], reduce || !v.clip ? [OPEN, OPEN] : v.clip)
  const scale = useTransform(smooth, [0, 1], reduce ? [1, 1] : v.scale)
  const filter = useTransform(smooth, [0.1, 0.9], reduce || !v.filter ? [NONE, NONE] : v.filter)
  const y = useTransform(smooth, [0.08, 0.85], reduce || !v.y ? ['0%', '0%'] : v.y)
  const gradeOpacity = useTransform(smooth, [0.3, 0.8], [0, 1])

  return (
    <section id={destination.id} ref={ref} className="relative flex min-h-screen items-end overflow-hidden bg-ink">
      <motion.div style={{ clipPath, y }} className="absolute inset-0 will-change-[clip-path,transform]">
        <motion.video
          style={{ scale, filter }}
          src={destination.video}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          onCanPlay={event => { event.currentTarget.play().catch(() => {}) }}
          className="h-full w-full object-cover"
        />
        <motion.div
          style={{ opacity: gradeOpacity }}
          className={`absolute inset-0 ${destination.align === 'right' ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-ink/64 via-ink/15 to-transparent`}
        />
      </motion.div>
      <ArrivalBadge destination={destination} />
      <div className="site-shell relative z-20 w-full pb-8 pt-32 sm:pb-10 lg:pb-14">
        <DestinationContent destination={destination} entrance={v.card} />
      </div>
      <div className="paper-scratch absolute inset-x-0 bottom-0 z-10 h-4 bg-paper" />
    </section>
  )
}
