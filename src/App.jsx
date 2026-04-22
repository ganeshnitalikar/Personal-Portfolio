import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import Starfield from './components/Starfield'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import BackToTop from './components/BackToTop'
import SectionDivider from './components/SectionDivider'
import { portfolioConfig } from './config'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* ── Preloader ── */}
      <Preloader isLoading={isLoading} />

      {/* ── Custom cursor (desktop only) ── */}
      <CustomCursor />

      {/* ── Fixed background layers ── */}
      <Starfield count={70} />
      <div className="mesh-gradient" aria-hidden="true" />
      <div className="mesh-gradient-center" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />

      {/* ── Main site content ── */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            className="relative z-10 w-full overflow-hidden flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <Navbar />

            <main className="w-full flex flex-col">
              <Hero />
              <SectionDivider />
              <Skills />
              <SectionDivider />
              <Projects />
              <SectionDivider />
              <Contact />
            </main>

            {/* ── Footer ── */}
            <footer className="relative w-full py-10 border-t border-white/[0.04]">
              {/* Top glow line */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.2), rgba(123,47,255,0.2), transparent)' }}
              />

              <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Logo */}
                <motion.a
                  href="#hero"
                  onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                  className="text-sm font-bold font-mono gradient-text"
                  whileHover={{ scale: 1.05 }}
                  style={{ filter: 'drop-shadow(0 0 6px rgba(0,245,255,0.25))' }}
                >
                  {'<GN />'}
                </motion.a>

                {/* Copyright */}
                <p className="text-[11px] font-mono text-white/20 text-center">
                  © {new Date().getFullYear()} {portfolioConfig.personal.firstName} {portfolioConfig.personal.lastName} · Built with{' '}
                  <span className="text-neon-cyan/50">React</span> &{' '}
                  <span className="text-neon-violet/50">Framer Motion</span>
                </p>

                {/* Nav links */}
                <div className="flex items-center gap-4">
                  {['hero', 'skills', 'projects', 'contact'].map((id) => (
                    <motion.a
                      key={id}
                      href={`#${id}`}
                      onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }}
                      className="text-[11px] font-mono text-white/25 hover:text-neon-cyan/70 transition-colors capitalize"
                      whileHover={{ y: -1 }}
                    >
                      {id === 'hero' ? 'About' : id.charAt(0).toUpperCase() + id.slice(1)}
                    </motion.a>
                  ))}
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Back to top (always on top) ── */}
      {!isLoading && <BackToTop />}
    </>
  )
}
