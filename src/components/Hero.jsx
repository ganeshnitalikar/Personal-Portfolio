import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowDown, Download, ChevronDown } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { portfolioConfig } from '../config'

const roles = portfolioConfig.roles

const techStack = [
  { label: 'React', color: '#61dafb', bg: 'rgba(97,218,251,0.08)', border: 'rgba(97,218,251,0.2)' },
  { label: 'Node.js', color: '#68a063', bg: 'rgba(104,160,99,0.08)', border: 'rgba(104,160,99,0.2)' },
  { label: 'Flutter', color: '#54c5f8', bg: 'rgba(84,197,248,0.08)', border: 'rgba(84,197,248,0.2)' },
  { label: 'Spring Boot', color: '#6db33f', bg: 'rgba(109,179,63,0.08)', border: 'rgba(109,179,63,0.2)' },
  { label: 'Express', color: '#f0db4f', bg: 'rgba(240,219,79,0.06)', border: 'rgba(240,219,79,0.18)' },
  { label: 'ASP.NET', color: '#a78bfa', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.22)' },
]

const badgePositions = [
  { x: -280, y: -90 },
  { x: 280, y: -120 },
  { x: -320, y: 20 },
  { x: 320, y: 40 },
  { x: -220, y: 160 },
  { x: 220, y: 170 },
]

function TypewriterText() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout
    if (!isDeleting) {
      if (displayText.length < current.length) {
        timeout = setTimeout(() => setDisplayText(current.slice(0, displayText.length + 1)), 55)
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2200)
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 28)
      } else {
        setIsDeleting(false)
        setRoleIndex((p) => (p + 1) % roles.length)
      }
    }
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, roleIndex])

  return (
    <span className="text-xl sm:text-2xl md:text-3xl font-mono" style={{ color: '#00f5ff' }}>
      {displayText}
      <motion.span
        className="inline-block w-[2px] h-7 ml-0.5 align-middle"
        style={{ background: '#00f5ff', boxShadow: '0 0 8px rgba(0,245,255,0.8)' }}
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.75, repeat: Infinity }}
      />
    </span>
  )
}

function FloatingBadge({ label, color, bg, border, position, delay }) {
  return (
    <motion.div
      className="absolute z-0 pointer-events-none opacity-40 md:opacity-60 hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-mono whitespace-nowrap"
      style={{
        left: `calc(50% + ${position.x}px)`,
        top: `calc(50% + ${position.y}px)`,
        background: bg,
        border: `1px solid ${border}`,
        color,
        boxShadow: `0 0 14px ${color}10`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0.3, 0.6, 0.3],
        scale: 1,
        y: [0, -10, 0],
      }}
      transition={{
        opacity: { duration: 4, repeat: Infinity, delay, ease: 'easeInOut' },
        scale: { duration: 0.6, delay: 0.5 + delay * 0.25 },
        y: { duration: 5 + delay, repeat: Infinity, ease: 'easeInOut', delay },
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
      {label}
    </motion.div>
  )
}

export default function Hero() {
  const ref = useRef(null)
  useInView(ref, { once: true })

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 pt-16 overflow-hidden"
      aria-label="Hero – About Ganesh Nitalikar"
      ref={ref}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.018] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,245,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Status */}
        <motion.div
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass mb-10 text-xs font-mono text-white/45"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <motion.span
            className="w-2 h-2 rounded-full bg-emerald-400"
            animate={{ opacity: [1, 0.4, 1], scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          Available for opportunities
          <span className="text-white/20">·</span>
          <span className="text-neon-cyan/60">Open to Work</span>
        </motion.div>

        {/* Name heading */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold font-heading leading-[1.08] mb-4 tracking-tight"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-white/85">Hi, I'm{' '}</span>
          <span
            className="gradient-text"
            style={{ filter: 'drop-shadow(0 0 35px rgba(0,245,255,0.25))' }}
          >
            {portfolioConfig.personal.firstName}
          </span>
          <br />
          <span
            className="gradient-text-reverse"
            style={{ filter: 'drop-shadow(0 0 35px rgba(255,45,247,0.2))' }}
          >
            {portfolioConfig.personal.lastName}
          </span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          className="h-12 flex items-center justify-center mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <TypewriterText />
        </motion.div>

        {/* Bio card */}
        <motion.div
          className="relative glass p-7 md:p-9 max-w-2xl mx-auto mb-11"
          initial={{ opacity: 0, y: 22, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ boxShadow: '0 0 40px rgba(0,245,255,0.04), 0 20px 60px rgba(0,0,0,0.4)' }}
        >
          {/* Corner accents */}
          <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-neon-cyan/20 rounded-tl-sm" />
          <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-neon-violet/20 rounded-tr-sm" />
          <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-neon-violet/20 rounded-bl-sm" />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-neon-cyan/20 rounded-br-sm" />

          <p className="text-white/55 text-sm md:text-base leading-relaxed font-heading">
            I craft{' '}
            <span className="text-neon-cyan/80 font-medium">high-performance, scalable</span>{' '}
            web & mobile applications with modern technologies. Passionate about{' '}
            <span className="text-neon-violet/80 font-medium">clean architecture</span>,{' '}
            beautiful UIs, and turning complex problems into elegant solutions. From
            frontend finesse to backend robustness —{' '}
            <span className="text-neon-magenta/80 font-medium">I build it all.</span>
          </p>

          {/* Floating badges */}
          {techStack.map((tech, i) => (
            <FloatingBadge key={tech.label} {...tech} position={badgePositions[i]} delay={i * 0.4} />
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <motion.button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-neon btn-neon-cyan w-full sm:w-auto justify-center"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <ArrowDown size={16} />
            View My Work
          </motion.button>
          <motion.a
            href={portfolioConfig.personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon btn-ghost w-full sm:w-auto justify-center"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Download size={16} />
            Download Resume
          </motion.a>
        </motion.div>

        {/* Socials */}
        <motion.div
          className="flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {[
            { icon: FaGithub, href: portfolioConfig.socials.github, label: 'GitHub', color: '#00f5ff' },
            { icon: FaLinkedin, href: portfolioConfig.socials.linkedin, label: 'LinkedIn', color: '#7b2fff' },
          ].map(({ icon: Icon, href, label, color }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 flex items-center justify-center rounded-xl glass text-white/40"
              whileHover={{ scale: 1.12, color, boxShadow: `0 0 16px ${color}30` }}
              whileTap={{ scale: 0.93 }}
            >
              <Icon size={17} />
            </motion.a>
          ))}
          <div className="w-px h-5 glow-line-v mx-1" />
          <span className="text-[11px] font-mono text-white/20">{portfolioConfig.personal.domain}</span>
        </motion.div>
      </div>

      {/* Sleek Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-neon-cyan"
          style={{ filter: 'drop-shadow(0 0 10px rgba(0,245,255,0.6))' }}
        >
          <ChevronDown size={32} strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  )
}
