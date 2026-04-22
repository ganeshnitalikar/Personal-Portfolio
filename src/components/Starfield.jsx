import { useMemo } from 'react'

const COLORS = ['#ffffff', '#00f5ff', '#7b2fff', '#ff2df7']

export default function Starfield({ count = 140 }) {
  const stars = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const colorChance = Math.random()
      const color =
        colorChance > 0.96
          ? COLORS[1]
          : colorChance > 0.93
          ? COLORS[2]
          : colorChance > 0.91
          ? COLORS[3]
          : COLORS[0]

      return {
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 1.8 + 0.6,
        duration: `${Math.random() * 6 + 4}s`,
        delay: `${Math.random() * 6}s`,
        maxOpacity: Math.random() * 0.55 + 0.15,
        color,
      }
    })
  }, [count])

  return (
    <div className="starfield" aria-hidden="true">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            '--duration': star.duration,
            '--max-opacity': star.maxOpacity,
            animationDelay: star.delay,
            background: star.color,
            boxShadow: star.color !== '#ffffff' ? `0 0 ${star.size * 3}px ${star.color}` : 'none',
            willChange: 'opacity, transform',
          }}
        />
      ))}
    </div>
  )
}
