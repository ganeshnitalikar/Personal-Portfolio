import { motion } from 'framer-motion'

export default function SectionDivider() {
  return (
    <motion.div
      className="relative py-2"
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="neon-divider" />
    </motion.div>
  )
}
