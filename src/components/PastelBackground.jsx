import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import './PastelBackground.css'

/**
 * PastelBackground — fixed, full-viewport colorful pastel mesh.
 * Blob colours drift with scroll progress to mirror the course timeline:
 *   day (butter/peach)  →  dusk (apricot/rose)  →  night (lilac/sky)
 * It always stays pastel — "night" is a soft lavender, never dark.
 */
const stops = [0, 0.35, 0.65, 1]

export default function PastelBackground() {
  const { scrollYProgress } = useScroll()
  const p = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.6 })

  const c1 = useTransform(p, stops, ['#fff0b3', '#ffd3bf', '#ffcbe1', '#d9c8ff'])
  const c2 = useTransform(p, stops, ['#ffd3bf', '#ffc29e', '#d9c8ff', '#c6e0ff'])
  const c3 = useTransform(p, stops, ['#c6f0dc', '#fff0b3', '#ffd3bf', '#ffcbe1'])
  const c4 = useTransform(p, stops, ['#ffcbe1', '#d9c8ff', '#c6e0ff', '#c6f0dc'])
  const c5 = useTransform(p, stops, ['#c6e0ff', '#c6f0dc', '#fff0b3', '#d9c8ff'])
  const base = useTransform(p, stops, ['#fff8ef', '#fff3ec', '#fbf1f6', '#f4f0ff'])

  return (
    <div className="pastel-bg" aria-hidden="true">
      <motion.div className="pastel-bg__base" style={{ backgroundColor: base }} />
      <motion.div className="blob blob--1" style={{ backgroundColor: c1 }} />
      <motion.div className="blob blob--2" style={{ backgroundColor: c2 }} />
      <motion.div className="blob blob--3" style={{ backgroundColor: c3 }} />
      <motion.div className="blob blob--4" style={{ backgroundColor: c4 }} />
      <motion.div className="blob blob--5" style={{ backgroundColor: c5 }} />
      <div className="pastel-bg__veil" />
      <div className="pastel-bg__grain" />
    </div>
  )
}
