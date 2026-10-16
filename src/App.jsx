import { useEffect } from 'react'
import Lenis from 'lenis'
import { BookingProvider, useBooking } from './booking.jsx'
import PastelBackground from './components/PastelBackground.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Story from './components/Story.jsx'
import Course from './components/Course.jsx'
import Zine from './components/Zine.jsx'
import Hanbok from './components/Hanbok.jsx'
import Tickets from './components/Tickets.jsx'
import Info from './components/Info.jsx'
import Closing from './components/Closing.jsx'
import Footer from './components/Footer.jsx'
import BookingModal from './components/BookingModal.jsx'
import Cursor from './components/Cursor.jsx'

function SmoothScroll() {
  const { isOpen } = useBooking()
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true })
    window.__lenis = lenis
    let raf
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // in-page anchor links → smooth scroll
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      if (id.length < 2) return
      const el = document.querySelector(id)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el, { offset: -20 })
    }
    document.addEventListener('click', onClick)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('click', onClick)
      lenis.destroy()
      window.__lenis = undefined
    }
  }, [])

  // freeze page scroll while the booking sheet is open
  useEffect(() => {
    const l = window.__lenis
    if (isOpen) {
      l?.stop()
      document.documentElement.style.overflow = 'hidden'
    } else {
      l?.start()
      document.documentElement.style.overflow = ''
    }
  }, [isOpen])
  return null
}

export default function App() {
  return (
    <BookingProvider>
      <SmoothScroll />
      <PastelBackground />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Story />
        <Course />
        <Zine />
        <Hanbok />
        <Tickets />
        <Info />
        <Closing />
      </main>
      <Footer />
      <BookingModal />
    </BookingProvider>
  )
}
