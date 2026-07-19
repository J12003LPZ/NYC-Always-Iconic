import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  ['Explore', '#journey'],
  ['Things to Do', '#must-see'],
  ['Plan Your Trip', '#plan'],
  ['Where to Stay', '#plan'],
  ['Events', '#must-see'],
  ['About NYC', '#quote'],
]

function Logo() {
  return (
    <a href="#top" className="group relative z-50 flex flex-col text-white" aria-label="NYC Tourism home">
      <span className="font-serif text-[2rem] font-semibold leading-[.75] tracking-[-.13em]">N<span className="text-gold">Y</span>C</span>
      <span className="mt-1 text-[.44rem] tracking-[.38em] text-white/75">ALWAYS ICONIC</span>
    </a>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', value => setScrolled(value > 40))

  useEffect(() => {
    const onKey = event => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.header
        className={`absolute inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${scrolled ? 'border-white/10 bg-ink/90 backdrop-blur-xl' : 'border-transparent bg-gradient-to-b from-ink/70 to-transparent'}`}
        initial={{ y: -90 }} animate={{ y: 0 }} transition={{ duration: .8, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav className="site-shell flex h-[82px] items-center justify-between" aria-label="Primary navigation">
          <Logo />
          <div className="hidden items-center gap-6 xl:flex">
            {links.map(([label, href]) => (
              <a key={label} href={href} className="nav-link">{label}</a>
            ))}
          </div>
          <div className="flex items-center gap-1.5 sm:gap-3">
            <a href="#plan" className="button-gold hidden lg:flex">Book Your Trip <span>↗</span></a>
            <button onClick={() => setOpen(true)} className="icon-button xl:hidden" aria-label="Open navigation menu" aria-expanded={open}>
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[80] bg-ink px-6 pb-8 pt-7 text-white" initial={{ clipPath: 'circle(0% at 92% 5%)' }} animate={{ clipPath: 'circle(150% at 92% 5%)' }} exit={{ clipPath: 'circle(0% at 92% 5%)' }} transition={{ duration: .65, ease: [0.76, 0, 0.24, 1] }}>
            <div className="mx-auto flex max-w-xl items-center justify-between"><Logo /><button onClick={() => setOpen(false)} className="icon-button" aria-label="Close menu"><X /></button></div>
            <div className="mx-auto flex h-[calc(100%-70px)] max-w-xl flex-col justify-center gap-1">
              {links.map(([label, href], index) => (
                <motion.a key={label} href={href} onClick={() => setOpen(false)} initial={{ x: 35, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: .14 + index * .06 }} className="border-b border-white/10 py-4 font-display text-4xl tracking-wide">
                  <span className="mr-4 font-body text-xs text-gold">0{index + 1}</span>{label}
                </motion.a>
              ))}
              <a href="#plan" onClick={() => setOpen(false)} className="button-gold mt-8 justify-center">Book Your Trip <span>↗</span></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
