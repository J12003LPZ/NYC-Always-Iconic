import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight, CloudSun, Compass, Map, Play, Ticket, X } from 'lucide-react'

const quickActions = [
  { icon: Compass, title: 'Top Attractions', copy: 'Must-see places', href: '#must-see' },
  { icon: Map, title: 'Plan Your Trip', copy: 'Itineraries & tips', href: '#plan' },
  { icon: Map, title: 'City Guide', copy: 'Know before you go', href: '#journey' },
  { icon: Ticket, title: 'Book Tickets', copy: 'Attractions & tours', href: '#plan' },
]

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [showFilm, setShowFilm] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.24])
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '10%'])
  const contentY = useTransform(scrollYProgress, [0, .75], [0, reduce ? 0 : 90])
  const opacity = useTransform(scrollYProgress, [0, .62], [1, .08])

  return (
    <section id="top" ref={ref} className="relative min-h-[860px] overflow-hidden bg-ink text-white lg:min-h-[920px]">
      <motion.div style={{ scale, y: imageY }} className="absolute inset-0 origin-center">
        <video src="/videos/brooklyn_bridge_perfect_loop.mp4" autoPlay loop muted playsInline preload="auto" aria-hidden="true" className="h-full w-full object-cover object-[62%_center]" />
      </motion.div>
      <div className="hero-grade absolute inset-0" />
      <div className="absolute inset-0 opacity-[.14] noise" />

      <motion.div style={{ y: contentY, opacity }} className="site-shell relative z-10 flex min-h-[860px] items-center pb-44 pt-28 lg:min-h-[920px] lg:pb-40">
        <div className="max-w-[670px]">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -8, 0] }}
            transition={reduce ? { delay: .45, duration: .8 } : { opacity: { delay: .45, duration: .8 }, y: { delay: 1.25, duration: 1.6, repeat: Infinity, repeatDelay: 1.1, ease: 'easeInOut' } }}
            className="mb-3 font-script text-5xl text-gold sm:text-6xl"
          >Welcome to</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 45 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .55, duration: 1, ease: [0.16, 1, 0.3, 1] }} className="mt-0 font-display text-[clamp(6.4rem,12vw,11rem)] leading-[.74] tracking-[.005em] text-paper">
            New York<br />City
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .75, duration: .8 }} className="mt-8 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">
            The city that never sleeps. Iconic sights, endless energy, unforgettable moments.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .9, duration: .8 }} className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#journey" className="button-gold">Start Exploring <ArrowRight size={17} /></a>
            <button onClick={() => setShowFilm(true)} className="button-ghost"><span className="grid size-11 place-items-center rounded-full border border-gold text-gold"><Play size={17} fill="currentColor" /></span>Watch Video</button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1 }} className="absolute right-[7vw] top-[28%] z-20 hidden rounded-2xl border border-white/10 bg-ink/40 p-5 shadow-float backdrop-blur-md lg:block">
        <div className="flex items-center gap-4"><motion.div animate={reduce ? undefined : { y: [0, -4, 0], x: [0, 2, 0], rotate: [0, 3, -1, 0] }} transition={reduce ? undefined : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}><CloudSun className="text-gold" size={34} /></motion.div><span className="font-display text-4xl">72°F</span></div>
        <p className="mt-2 text-[11px] uppercase tracking-[.2em] text-white/50">Sunny · New York, USA</p>
      </motion.div>

      <div className="absolute bottom-0 left-1/2 z-20 w-[min(1180px,92vw)] -translate-x-1/2 border-t border-white/15 bg-ink/70 backdrop-blur-xl">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {quickActions.map(({ icon: Icon, title, copy, href }, index) => (
            <a key={title} href={href} className="group flex min-h-[104px] items-center gap-4 border-white/10 px-5 transition-colors hover:bg-white/5 lg:border-r lg:px-7">
              <Icon className="shrink-0 text-gold transition-transform group-hover:-translate-y-1" size={25} />
              <span><strong className="block text-sm font-medium">{title}</strong><small className="mt-1 block text-[11px] text-white/50">{copy}</small></span>
              {index === 3 && <ArrowRight className="ml-auto hidden text-gold xl:block" size={17} />}
            </a>
          ))}
        </div>
      </div>
      <a href="#journey" aria-label="Scroll to start the journey" className="absolute bottom-32 right-6 z-30 hidden flex-col items-center gap-2 text-[9px] uppercase tracking-[.3em] text-white/60 lg:flex"><span>Scroll</span><ArrowDown className="animate-bounce text-gold" size={16} /></a>

      <AnimatePresence>
        {showFilm && (
          <motion.div className="fixed inset-0 z-[100] grid place-items-center bg-ink/95 p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="New York in motion">
            <motion.div initial={{ scale: .94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: .96, opacity: 0 }} className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-[1.5rem] border border-white/15">
              <video src="/videos/times_square_perfect_loop.mp4" autoPlay loop muted playsInline preload="auto" aria-hidden="true" className="h-full w-full object-cover" />
              <div className="absolute inset-0 grid place-items-center bg-ink/50 text-center"><div><p className="font-script text-4xl text-gold">New York in motion</p><h2 className="font-display text-6xl sm:text-8xl">The city is calling</h2></div></div>
              <button autoFocus onClick={() => setShowFilm(false)} className="icon-button absolute right-4 top-4 bg-ink/50" aria-label="Close video"><X /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
