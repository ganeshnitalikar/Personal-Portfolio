import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const ringX = useSpring(mouseX, { stiffness: 850, damping: 35, mass: 0.15 })
  const ringY = useSpring(mouseY, { stiffness: 850, damping: 35, mass: 0.15 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseOver = (e) => {
      const target = e.target
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsPointer(true)
      } else {
        setIsPointer(false)
      }
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [mouseX, mouseY, isVisible])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

  const ringSize = isPointer ? 44 : isClicking ? 20 : 32
  const dotSize = isClicking ? 4 : 6

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none rounded-full"
        style={{
          x: ringX,
          y: ringY,
          border: `1.5px solid ${isPointer ? 'rgba(123,47,255,0.65)' : 'rgba(0,245,255,0.45)'}`,
          boxShadow: isPointer
            ? '0 0 14px rgba(123,47,255,0.25), inset 0 0 8px rgba(123,47,255,0.1)'
            : '0 0 14px rgba(0,245,255,0.2), inset 0 0 8px rgba(0,245,255,0.08)',
          zIndex: 99999,
          willChange: 'transform',
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: isVisible ? 1 : 0,
          marginTop: -ringSize / 2,
          marginLeft: -ringSize / 2,
        }}
        transition={{ type: 'tween', duration: 0.15 }}
      />

      <motion.div
        className="fixed top-0 left-0 pointer-events-none rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
          background: isPointer ? '#7b2fff' : '#00f5ff',
          boxShadow: isPointer
            ? '0 0 10px rgba(123,47,255,0.8)'
            : '0 0 10px rgba(0,245,255,0.8)',
          zIndex: 100000,
          willChange: 'transform',
        }}
        animate={{
          width: dotSize,
          height: dotSize,
          opacity: isVisible ? 1 : 0,
          marginTop: -dotSize / 2,
          marginLeft: -dotSize / 2,
        }}
        transition={{ type: 'tween', duration: 0.1 }}
      />
    </>
  )
}
