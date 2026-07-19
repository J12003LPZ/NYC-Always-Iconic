import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowDownRight } from 'lucide-react'

export function JourneyIntro() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const frameY = useTransform(scrollYProgress, [0, .5, 1], reduce ? [0, 0, 0] : [42, 0, -24])
  const frameScale = useTransform(scrollYProgress, [0, .5, 1], reduce ? [1, 1, 1] : [.96, 1, .985])
  const frameOpacity = useTransform(scrollYProgress, [0, .18, .8, 1], reduce ? [1, 1, 1, 1] : [0, 1, 1, .82])
  return (
    <section id="journey" ref={ref} className="relative overflow-hidden bg-paper py-24 text-ink sm:py-32">
      <motion.div style={{ y: frameY, scale: frameScale, opacity: frameOpacity }} className="site-shell grid items-end gap-12 will-change-transform lg:grid-cols-[1fr_.9fr]">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: .35 }}
          transition={{ duration: .7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow text-[#ad791b]">A scroll-driven city guide</p>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(4.4rem,9vw,8.8rem)] leading-[.82] tracking-wide">One city.<br /><span className="text-[#ad791b]">A world</span> to explore.</h2>
        </motion.div>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: .35 }}
          transition={{ delay: .14, duration: .7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-lg pb-2 lg:ml-auto"
        >
          <p className="text-lg leading-relaxed text-ink/70">Follow the route from river to skyline. Each scroll moves you closer to a new landmark, then slows down so you can take it in.</p>
          <div className="mt-8 flex items-center gap-4 text-xs font-semibold uppercase tracking-[.18em]"><span className="grid size-11 place-items-center rounded-full bg-ink text-gold"><ArrowDownRight size={19} /></span>Scroll to travel</div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 30 })
  return (
    <div className="fixed right-3 top-1/2 z-40 hidden h-32 w-px -translate-y-1/2 bg-white/20 mix-blend-difference lg:block" aria-hidden="true">
      <motion.div style={{ scaleY }} className="h-full w-full origin-top bg-gold" />
      <span className="absolute -left-[3px] -top-1 size-[7px] rounded-full bg-gold" />
    </div>
  )
}
