import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export const EASE = [0.22, 1, 0.36, 1]

/**
 * Reveal — fades + lifts children into view once.
 * <Reveal delay={0.1} y={40}>...</Reveal>
 */
export function Reveal({ children, delay = 0, y = 36, as = 'div', className, style, amount = 0.3 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount })
  const Comp = motion[as] || motion.div
  return (
    <Comp
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </Comp>
  )
}

/**
 * SplitLines — each line slides up from a mask (editorial headline reveal).
 * lines: string[]  (each entry is one visual line)
 */
export function SplitLines({ lines, text, as = 'h2', className, delay = 0, stagger = 0.09, lineClassName }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const Tag = as
  const resolvedLines = lines ? (Array.isArray(lines) ? lines : [lines]) : (text ? (Array.isArray(text) ? text : [text]) : [])
  return (
    <Tag ref={ref} className={className} aria-label={resolvedLines.join(' ')}>
      {resolvedLines.map((line, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.08em', marginBottom: '-0.08em' }}
        >
          <motion.span
            className={lineClassName}
            style={{ display: 'block', willChange: 'transform' }}
            initial={{ y: '110%', rotate: 2 }}
            animate={inView ? { y: '0%', rotate: 0 } : {}}
            transition={{ duration: 1.2, ease: EASE, delay: delay + i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/** Arrow icon used inside .btn .btn-arrow */
export function Arrow({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
