import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import './Cursor.css'

export default function Cursor() {
  const [isEnabled, setIsEnabled] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [cursorText, setCursorText] = useState('')

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Spring physics for the trailing frosted ring
  const ringX = useSpring(mouseX, { stiffness: 420, damping: 28, mass: 0.5 })
  const ringY = useSpring(mouseY, { stiffness: 420, damping: 28, mass: 0.5 })

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isFinePointer = window.matchMedia('(pointer: fine) and (hover: hover)').matches
    if (!isFinePointer) return
    setIsEnabled(true)

    const onPointerMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const onMouseOver = (e) => {
      const target = e.target
      if (!(target instanceof Element)) return

      const cursorTarget = target.closest('[data-cursor]')
      if (cursorTarget) {
        const text = cursorTarget.getAttribute('data-cursor')
        setCursorText(text || '')
        setIsHovered(true)
        return
      }

      const interactive = target.closest('a, button, input, textarea, select, [role="button"]')
      if (interactive) {
        setCursorText('')
        setIsHovered(true)
      } else {
        setCursorText('')
        setIsHovered(false)
      }
    }

    const onMouseLeave = () => {
      setIsVisible(false)
      setIsHovered(false)
      setCursorText('')
    }

    const onMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('mouseover', onMouseOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', onMouseLeave)
    document.documentElement.addEventListener('mouseenter', onMouseEnter)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
      document.documentElement.removeEventListener('mouseenter', onMouseEnter)
    }
  }, [isVisible, mouseX, mouseY])

  if (!isEnabled) return null

  const hasBadgeText = Boolean(cursorText)

  return (
    <div
      className="cursor-container"
      style={{ opacity: isVisible ? 1 : 0 }}
      aria-hidden="true"
    >
      {/* Lagging frosted glass ring */}
      <motion.div
        className={`cursor-ring ${
          hasBadgeText
            ? 'cursor-ring--badge'
            : isHovered
            ? 'cursor-ring--hover'
            : ''
        }`}
        style={{
          x: ringX,
          y: ringY,
        }}
      >
        <AnimatePresence mode="wait">
          {hasBadgeText && (
            <motion.span
              key={cursorText}
              className={`cursor-badge-text ${
                cursorText === '예약' ? 'cursor-badge-text--seal' : ''
              }`}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Immediate center ink dot */}
      <motion.div
        className={`cursor-dot ${hasBadgeText ? 'cursor-dot--hidden' : ''}`}
        style={{
          x: mouseX,
          y: mouseY,
        }}
      />
    </div>
  )
}
