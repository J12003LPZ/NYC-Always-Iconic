import { Facebook, Github, Instagram, Youtube } from 'lucide-react'

const columns = [
  { title: 'Explore', links: ['Top Attractions', 'Tours & Activities', 'Neighborhoods'] },
  { title: 'Plan', links: ['Trip Planner', 'Where to Stay', 'Travel Tips'] },
  { title: 'Visitor info', links: ['Visitor Guide', 'Maps', 'Accessibility'] },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#041526] py-14 text-white">
      <div className="site-shell grid gap-12 lg:grid-cols-[1.2fr_1.8fr_.7fr]">
        <div><div className="font-serif text-4xl font-semibold tracking-[-.13em]">N<span className="text-gold">Y</span>C</div><p className="mt-5 max-w-xs text-xs leading-relaxed text-white/40">Officially unofficial inspiration for exploring the five boroughs.</p><p className="mt-8 text-[10px] text-white/30">© 2026 NYC Tourism Concept. All rights reserved.</p><p className="mt-2 text-xs text-white/50">Created by Leonardo Lopez</p></div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">{columns.map(column => <div key={column.title}><h3 className="text-[10px] font-semibold uppercase tracking-[.2em] text-gold">{column.title}</h3><ul className="mt-5 space-y-3">{column.links.map(link => <li key={link}><a href="#top" className="text-sm text-white/50 transition-colors hover:text-white">{link}</a></li>)}</ul></div>)}</div>
        <div><h3 className="text-[10px] font-semibold uppercase tracking-[.2em] text-gold">Follow us</h3><div className="mt-5 flex gap-2"><a className="social" href="https://instagram.com" aria-label="Instagram"><Instagram size={17} /></a><a className="social" href="https://facebook.com" aria-label="Facebook"><Facebook size={17} /></a><a className="social" href="https://youtube.com" aria-label="YouTube"><Youtube size={17} /></a><a className="social" href="https://github.com/J12003LPZ" target="_blank" rel="noreferrer" aria-label="Leonardo Lopez on GitHub"><Github size={17} /></a></div></div>
      </div>
    </footer>
  )
}
