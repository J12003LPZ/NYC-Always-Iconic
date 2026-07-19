import { motion } from 'framer-motion'
import { ArrowRight, Binoculars, Building2, Camera, Heart, MapPinned } from 'lucide-react'

const stats = [
  { icon: Camera, value: '100+', label: 'Attractions' },
  { icon: Building2, value: '5', label: 'Boroughs' },
  { icon: MapPinned, value: 'Endless', label: 'Experiences' },
  { icon: Heart, value: '1', label: 'Unforgettable city' },
]

const resources = [
  { title: '3-Day Itinerary', copy: 'The perfect first visit, mapped day by day.', video: '/videos/brooklyn_bridge_perfect_loop.mp4' },
  { title: 'Local Experiences', copy: 'Eat, explore, and see the city like a local.', video: '/videos/central_park_perfect_loop.mp4' },
  { title: 'Best Views', copy: 'See the skyline from its most cinematic angles.', video: '/videos/times_square_perfect_loop.mp4' },
]

export default function QuotePlan() {
  return (
    <>
      <section id="quote" className="cv-auto relative overflow-hidden bg-ink py-24 text-white sm:py-32">
        <video src="/videos/brooklyn_bridge_perfect_loop.mp4" autoPlay loop muted playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover opacity-20" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-ink/76" />
        <div className="site-shell relative z-10 grid gap-16 lg:grid-cols-[1.05fr_1.4fr] lg:items-center">
          <motion.blockquote initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative font-serif text-4xl leading-tight sm:text-5xl">
            <span className="absolute -left-2 -top-9 font-display text-8xl text-gold">“</span>New York is not a city,<br />it’s a world of its own.<cite className="mt-6 block font-script text-3xl not-italic text-gold">— an endless invitation</cite>
          </motion.blockquote>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {stats.map(({ icon: Icon, value, label }, index) => (
              <motion.div key={label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .1 }} className="border-l border-white/15 pl-5">
                <Icon className="mb-5 text-gold" size={25} /><strong className="font-display text-4xl sm:text-5xl">{value}</strong><span className="mt-1 block text-[10px] uppercase tracking-[.16em] text-white/50">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="plan" className="relative overflow-hidden bg-[#0a2746] py-24 text-white sm:py-32 lg:py-40">
        <div className="absolute -right-24 top-0 size-[34rem] rounded-full bg-gold/10 blur-3xl" />
        <div className="site-shell relative z-10">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div><p className="eyebrow text-gold">Start planning</p><h2 className="mt-5 font-display text-[clamp(4.5rem,8vw,8.3rem)] leading-[.8]">Your New York<br /><span className="text-gold">adventure starts here</span></h2><p className="mt-7 max-w-lg text-base leading-relaxed text-white/60">Plan your trip, book the best experiences, and make memories that last a lifetime.</p><a href="mailto:hello@alwaysiconic.nyc" className="button-gold mt-8">Plan Your Trip <ArrowRight size={17} /></a></div>
            <div className="grid gap-4 sm:grid-cols-3">
              {resources.map((resource, index) => (
                <motion.a href={`mailto:hello@alwaysiconic.nyc?subject=${encodeURIComponent(resource.title)}`} key={resource.title} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .1 }} className="group relative min-h-[390px] overflow-hidden rounded-[1.3rem] border border-white/15">
                  <video src={resource.video} autoPlay loop muted playsInline preload="metadata" aria-hidden="true" className="h-full w-full object-cover transition duration-1000 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" /><div className="absolute inset-x-0 bottom-0 p-6"><Binoculars className="mb-4 text-gold" size={21} /><h3 className="font-display text-3xl">{resource.title}</h3><p className="mt-2 text-xs leading-relaxed text-white/60">{resource.copy}</p><span className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.17em] text-gold">Open guide <ArrowRight size={13} /></span></div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
