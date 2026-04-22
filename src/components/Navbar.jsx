import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#hero' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 60)
      // active section detection
      const sections = ['hero', 'skills', 'projects', 'contact']
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          isScrolled ? 'glass-strong shadow-lg shadow-black/30' : 'bg-transparent'
        }`}
        style={isScrolled ? {} : {}}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => scrollTo(e, '#hero')}
            className="text-lg font-bold font-mono gradient-text"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Go to top"
            style={{ filter: 'drop-shadow(0 0 8px rgba(0,245,255,0.35))' }}
          >
            {'<GN />'}
          </motion.a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '')
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  className={`relative px-4 py-2 text-sm font-medium font-heading rounded-lg transition-colors duration-300 ${
                    isActive ? 'text-neon-cyan' : 'text-white/50 hover:text-white/85'
                  }`}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      className="absolute bottom-0.5 left-4 right-4 h-px rounded-full"
                      style={{ background: 'linear-gradient(90deg, #00f5ff, #7b2fff)' }}
                      layoutId="navIndicator"
                    />
                  )}
                </motion.a>
              )
            })}
            <motion.a
              href="#contact"
              onClick={(e) => scrollTo(e, '#contact')}
              className="ml-3 btn-neon btn-neon-cyan !py-2 !px-5 !text-xs"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Hire Me
            </motion.a>
          </div>

          {/* Mobile toggle */}
          <motion.button
            className="md:hidden p-2 rounded-lg text-white/60 hover:text-neon-cyan hover:bg-white/[0.04] transition-all"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mobileOpen ? 'x' : 'menu'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="md:hidden glass-strong mx-4 mb-4 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="p-4 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    className="px-4 py-3 text-sm font-medium font-heading text-white/60 hover:text-neon-cyan hover:bg-white/[0.03] rounded-xl transition-all flex items-center gap-3"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <span className="w-1 h-1 rounded-full bg-neon-cyan/40" />
                    {link.label}
                  </motion.a>
                ))}
                <motion.div className="glow-line-h mt-2 mb-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} />
                <motion.a
                  href="#contact"
                  onClick={(e) => scrollTo(e, '#contact')}
                  className="btn-neon btn-neon-cyan text-center text-sm !py-3 justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.28 }}
                >
                  Hire Me
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-overlay md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
