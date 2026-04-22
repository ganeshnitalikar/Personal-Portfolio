import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Code2, Server, Database, Zap } from 'lucide-react'
import {
  SiReact, SiFlutter, SiTypescript, SiTailwindcss, SiNextdotjs,
  SiNodedotjs, SiExpress, SiSpringboot, SiDotnet,
  SiMongodb, SiPostgresql, SiMysql, SiDocker, SiRedis
} from 'react-icons/si'

const skillCategories = [
  {
    title: 'Frontend Development',
    icon: Code2,
    color: '#00f5ff',
    dimColor: 'rgba(0,245,255,0.08)',
    borderColor: 'rgba(0,245,255,0.15)',
    skills: [
      { name: 'React', Icon: SiReact },
      { name: 'Flutter', Icon: SiFlutter },
      { name: 'TypeScript', Icon: SiTypescript },
      { name: 'Tailwind CSS', Icon: SiTailwindcss },
      { name: 'Next.js', Icon: SiNextdotjs },
    ],
  },
  {
    title: 'Backend Engineering',
    icon: Server,
    color: '#7b2fff',
    dimColor: 'rgba(123,47,255,0.08)',
    borderColor: 'rgba(123,47,255,0.15)',
    skills: [
      { name: 'Node.js', Icon: SiNodedotjs },
      { name: 'Express.js', Icon: SiExpress },
      { name: 'Spring Boot', Icon: SiSpringboot },
      { name: 'ASP.NET Core', Icon: SiDotnet },
      { name: 'REST APIs', Icon: Server },
    ],
  },
  {
    title: 'Database & DevOps',
    icon: Database,
    color: '#ff2df7',
    dimColor: 'rgba(255,45,247,0.08)',
    borderColor: 'rgba(255,45,247,0.15)',
    skills: [
      { name: 'MongoDB', Icon: SiMongodb },
      { name: 'PostgreSQL', Icon: SiPostgresql },
      { name: 'MySQL', Icon: SiMysql },
      { name: 'Docker', Icon: SiDocker },
      { name: 'Redis', Icon: SiRedis },
    ],
  },
]

const extraSkills = [
  'Git & GitHub', 'CI/CD Pipelines', 'Microservices',
  'WebSockets', 'JWT Authentication', 'Agile/Scrum', 'Figma', 'Linux'
]

function TechPill({ name, Icon, color, delay }) {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <motion.div
      className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-white/[0.03] border border-white/[0.05] cursor-default transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderColor: isHovered ? color : 'rgba(255,255,255,0.05)',
        backgroundColor: isHovered ? `${color}15` : 'rgba(255,255,255,0.03)',
        boxShadow: isHovered ? `0 4px 20px ${color}20` : 'none',
      }}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -3 }}
    >
      <Icon 
        size={16} 
        style={{ color: isHovered ? color : 'rgba(255,255,255,0.5)', transition: 'color 0.3s' }} 
      />
      <span 
        className="text-[13px] font-mono transition-colors duration-300 whitespace-nowrap"
        style={{ color: isHovered ? '#fff' : 'rgba(255,255,255,0.65)' }}
      >
        {name}
      </span>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="relative py-24 md:py-32 px-6 w-full" aria-label="Skills section">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <span className="text-xs font-mono text-neon-violet/60 tracking-widest uppercase mb-3 block">
            My Arsenal
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading section-title gradient-text inline-block">
            Tech Stack & Tools
          </h2>
          <p className="mt-8 text-white/38 max-w-xl mx-auto text-sm md:text-base font-heading">
            A comprehensive toolkit for building modern, scalable, full-stack applications from scratch to production.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-10">
          {skillCategories.map((cat, catIndex) => {
            const IconComp = cat.icon
            return (
              <motion.div
                key={cat.title}
                className="glass neon-border-hover p-7 flex flex-col gap-6"
                style={{ borderColor: cat.borderColor }}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: catIndex * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
              >
                {/* Card header */}
                <div className="flex items-center gap-3.5 mb-2">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: cat.dimColor, border: `1px solid ${cat.borderColor}` }}
                  >
                    <IconComp size={20} style={{ color: cat.color }} />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold font-heading text-white/85 tracking-wide">
                      {cat.title}
                    </h3>
                  </div>
                </div>

                {/* Tech Pills Grid */}
                <div className="flex flex-wrap gap-3">
                  {cat.skills.map((skill, i) => (
                    <TechPill
                      key={skill.name}
                      name={skill.name}
                      Icon={skill.Icon}
                      color={cat.color}
                      delay={catIndex * 0.1 + i * 0.05}
                    />
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Extra skills row */}
        <motion.div
          className="glass p-6 md:p-8"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-5">
            <Zap size={16} className="text-neon-cyan/70" />
            <span className="text-xs font-mono text-white/40 tracking-widest uppercase">Other Technologies & Practices</span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {extraSkills.map((skill, i) => (
              <motion.span
                key={skill}
                className="tag-chip cursor-default"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.55 + i * 0.04 }}
                whileHover={{ scale: 1.06 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
