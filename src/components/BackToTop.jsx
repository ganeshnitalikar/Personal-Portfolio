import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useScrollProgress } from '../hooks/useScrollProgress'

export default function BackToTop() {
  const { progress, isVisible } = useScrollProgress()
  const circumference = 2 * Math.PI * 18
  const offset = circumference - (progress / 100) * circumference

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-[500] w-12 h-12 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 16 }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
        >
          {/* Background fill */}
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: 'rgba(8,8,25,0.8)', backdropFilter: 'blur(12px)' }}
          />

          {/* Progress ring SVG */}
          <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 44 44">
            {/* Track */}
            <circle cx="22" cy="22" r="18" fill="none"
              stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
            {/* Progress */}
            <motion.circle
              cx="22" cy="22" r="18" fill="none"
              stroke="url(#progressGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ filter: 'drop-shadow(0 0 4px rgba(0,245,255,0.6))' }}
            />
            <defs>
              <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00f5ff" />
                <stop offset="50%" stopColor="#7b2fff" />
                <stop offset="100%" stopColor="#ff2df7" />
              </linearGradient>
            </defs>
          </svg>

          {/* Arrow icon */}
          <ArrowUp size={15} className="relative z-10 text-neon-cyan" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
