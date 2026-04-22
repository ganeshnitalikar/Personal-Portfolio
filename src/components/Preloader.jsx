import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #050510 100%)' }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          aria-label="Loading portfolio"
          aria-live="polite"
        >
          {/* Background grid */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `linear-gradient(rgba(0,245,255,0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,245,255,0.5) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Outer ring */}
          <motion.div
            className="absolute rounded-full border"
            style={{
              width: 280, height: 280,
              borderColor: 'rgba(0,245,255,0.08)',
            }}
            animate={{ rotate: 360, scale: [1, 1.04, 1] }}
            transition={{ rotate: { duration: 12, repeat: Infinity, ease: 'linear' }, scale: { duration: 4, repeat: Infinity } }}
          />

          {/* Mid ring */}
          <motion.div
            className="absolute rounded-full border"
            style={{ width: 210, height: 210, borderColor: 'rgba(123,47,255,0.12)' }}
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />

          {/* Inner ring */}
          <motion.div
            className="absolute rounded-full border"
            style={{ width: 150, height: 150, borderColor: 'rgba(255,45,247,0.1)' }}
            animate={{ rotate: 360, scale: [0.95, 1.05, 0.95] }}
            transition={{ rotate: { duration: 5, repeat: Infinity, ease: 'linear' }, scale: { duration: 3, repeat: Infinity } }}
          />

          {/* Corner accents */}
          {[
            { top: 0, left: 0, rotate: 0 },
            { top: 0, right: 0, rotate: 90 },
            { bottom: 0, right: 0, rotate: 180 },
            { bottom: 0, left: 0, rotate: 270 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8"
              style={{
                ...pos,
                margin: 32,
                borderTop: '2px solid rgba(0,245,255,0.2)',
                borderLeft: '2px solid rgba(0,245,255,0.2)',
                transform: `rotate(${pos.rotate}deg)`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1] }}
              transition={{ delay: 0.3 + i * 0.1 }}
            />
          ))}

          {/* Center content */}
          <div className="relative flex flex-col items-center gap-5 z-10">
            {/* GN Initials */}
            <motion.div
              initial={{ opacity: 0, scale: 0.4, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="text-7xl md:text-8xl font-bold font-heading tracking-widest gradient-text block"
                style={{
                  filter: 'drop-shadow(0 0 25px rgba(0,245,255,0.5)) drop-shadow(0 0 50px rgba(123,47,255,0.35))',
                  letterSpacing: '0.12em',
                }}
              >
                GN
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="text-[10px] font-mono text-white/25 tracking-[0.45em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              Full Stack Developer
            </motion.p>

            {/* Progress bar */}
            <motion.div
              className="relative w-40 h-[2px] rounded-full overflow-hidden preloader-scan"
              style={{ background: 'rgba(255,255,255,0.05)' }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #00f5ff, #7b2fff, #ff2df7)' }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
              />
              {/* Glow */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: 'linear-gradient(90deg, #00f5ff, #7b2fff, #ff2df7)', filter: 'blur(4px)', opacity: 0.5 }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
              />
            </motion.div>

            {/* Dots */}
            <motion.div
              className="flex gap-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 rounded-full"
                  style={{ background: '#00f5ff' }}
                  animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
