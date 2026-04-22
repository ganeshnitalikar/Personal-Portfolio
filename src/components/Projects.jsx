import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Layers } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'

const projects = [
  {
    title: 'E-Commerce Platform',
    description:
      'A full-stack e-commerce solution with cart, Stripe payments, real-time inventory, admin dashboard, and order tracking.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
    github: 'https://github.com/ganesh',
    live: '#',
    span: 'md:col-span-2',
    accentColor: '#00f5ff',
    glowColor: 'rgba(0,245,255,0.12)',
    number: '01',
  },
  {
    title: 'Task Manager',
    description:
      'Cross-platform mobile task manager with real-time sync, offline support, and push notifications.',
    tags: ['Flutter', 'Firebase', 'Dart'],
    github: 'https://github.com/ganesh',
    live: '#',
    span: '',
    accentColor: '#7b2fff',
    glowColor: 'rgba(123,47,255,0.12)',
    number: '02',
  },
  {
    title: 'Portfolio CMS',
    description:
      'Headless CMS for managing portfolio content with a REST API, rich-text editor, and media uploads.',
    tags: ['Spring Boot', 'PostgreSQL', 'React'],
    github: 'https://github.com/ganesh',
    live: '#',
    span: '',
    accentColor: '#ff2df7',
    glowColor: 'rgba(255,45,247,0.12)',
    number: '03',
  },
  {
    title: 'Real-Time Chat App',
    description:
      'WebSocket-powered chat with typing indicators, read receipts, rooms, file sharing, and end-to-end encryption.',
    tags: ['React', 'Node.js', 'Socket.IO', 'Redis'],
    github: 'https://github.com/ganesh',
    live: '#',
    span: 'md:col-span-2',
    accentColor: '#00f5ff',
    glowColor: 'rgba(0,245,255,0.1)',
    number: '04',
  },
  {
    title: 'Health Tracker API',
    description:
      'RESTful microservices for health metrics, appointments, and fitness tracking with JWT auth.',
    tags: ['ASP.NET Core', 'SQL Server', 'Docker', 'JWT'],
    github: 'https://github.com/ganesh',
    live: '#',
    span: 'md:col-span-2',
    accentColor: '#7b2fff',
    glowColor: 'rgba(123,47,255,0.1)',
    number: '05',
  },
  {
    title: 'AI Code Assistant',
    description:
      'VS Code extension with AI-powered code completion, refactoring suggestions, and bug detection.',
    tags: ['TypeScript', 'Node.js', 'OpenAI'],
    github: 'https://github.com/ganesh',
    live: '#',
    span: '',
    accentColor: '#ff2df7',
    glowColor: 'rgba(255,45,247,0.1)',
    number: '06',
  },
]

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.article
      ref={ref}
      className={`glass neon-border-hover group relative overflow-hidden ${project.span}`}
      style={{ borderColor: 'rgba(255,255,255,0.05)' }}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } }}
    >
      {/* Shimmer on hover */}
      <div className="project-card-shimmer" />

      {/* Hover background glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at top left, ${project.glowColor} 0%, transparent 70%)` }}
      />

      {/* Neon top border on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${project.accentColor}50, transparent)` }}
      />

      <div className="relative p-6 md:p-7 flex flex-col h-full min-h-[200px]">
        {/* Number */}
        <span
          className="absolute top-5 right-6 text-4xl font-bold font-mono opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-300 select-none"
          style={{ color: project.accentColor }}
        >
          {project.number}
        </span>

        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${project.accentColor}12`, border: `1px solid ${project.accentColor}25` }}
            >
              <Layers size={14} style={{ color: project.accentColor }} />
            </div>
            <h3 className="text-base font-bold font-heading text-white/80 group-hover:text-white transition-colors duration-300 leading-tight">
              {project.title}
            </h3>
          </div>
          <div className="flex gap-1.5 flex-shrink-0">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-lg text-white/25 hover:text-white/80 hover:bg-white/[0.05] transition-all"
              whileHover={{ scale: 1.12, y: -1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`${project.title} on GitHub`}
            >
              <FaGithub size={14} />
            </motion.a>
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-lg text-white/25 hover:text-white/80 hover:bg-white/[0.05] transition-all"
              whileHover={{ scale: 1.12, y: -1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`${project.title} live demo`}
            >
              <ExternalLink size={14} />
            </motion.a>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/38 text-sm leading-relaxed mb-5 flex-grow font-heading">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="tag-chip">{tag}</span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="relative py-24 md:py-32 px-6 w-full" aria-label="Projects section">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <span className="text-xs font-mono text-neon-cyan/60 tracking-widest uppercase mb-3 block">
            What I've Built
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading section-title gradient-text inline-block">
            Featured Projects
          </h2>
          <p className="mt-8 text-white/38 max-w-xl mx-auto text-sm md:text-base font-heading">
            A curated selection of projects that demonstrate my full-stack capabilities and passion for great software.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <motion.a
            href="https://github.com/ganesh"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon btn-ghost inline-flex"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <FaGithub size={16} />
            View All on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
