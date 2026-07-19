import { motion } from 'framer-motion'
import { ArrowUpRight, Clock3, MapPin } from 'lucide-react'
import { moreDestinations } from '../data/destinations'

export default function MoreDestinations() {
  return (
    <section id="must-see" className="bg-paper py-24 text-ink sm:py-32 lg:py-40">
      <div className="site-shell">
        <div className="mb-14 flex flex-col justify-between gap-8 lg:mb-20 lg:flex-row lg:items-end">
          <div><p className="eyebrow text-[#ad791b]">Beyond the route</p><h2 className="mt-4 font-display text-[clamp(4.7rem,9vw,9rem)] leading-[.8]">Must-see<br />New York</h2></div>
          <p className="max-w-md text-base leading-relaxed text-ink/60">Iconic places, unexpected perspectives, and the kind of views that stay with you long after the trip ends.</p>
        </div>
        <div className="grid auto-rows-[360px] gap-4 lg:grid-cols-12 lg:auto-rows-[310px]">
          {moreDestinations.map((item, index) => (
            <motion.article key={item.name} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .16 }} transition={{ delay: (index % 3) * .08, duration: .7 }} className={`group relative isolate overflow-hidden ${item.className}`}>
              <video src={item.video} autoPlay muted loop playsInline preload="auto" aria-label={item.name} onLoadedData={event => { event.currentTarget.play().catch(() => {}) }} onCanPlay={event => { event.currentTarget.play().catch(() => {}) }} className="h-full w-full object-cover transition duration-1000 ease-out group-hover:scale-[1.055]" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/10 to-transparent" />
              <span className="absolute left-5 top-5 font-display text-2xl text-gold">{String(index + 6).padStart(2, '0')}</span>
              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                <div className="flex items-end justify-between gap-5">
                  <div><h3 className="font-display text-4xl leading-none sm:text-5xl">{item.name}</h3><div className="mt-3 flex flex-wrap gap-4 text-[10px] uppercase tracking-[.13em] text-white/60"><span className="flex items-center gap-1.5"><MapPin size={12} />{item.location}</span><span className="flex items-center gap-1.5"><Clock3 size={12} />{item.time}</span></div></div>
                  <a href="#plan" aria-label={`Explore ${item.name}`} className="grid size-12 shrink-0 place-items-center rounded-full border border-white/30 transition-colors hover:border-gold hover:bg-gold hover:text-ink"><ArrowUpRight size={19} /></a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
