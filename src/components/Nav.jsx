import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { nav, brand } from '../content.js'
import { useBooking } from '../booking.jsx'
import { Arrow, EASE } from './motion.jsx'
import './Nav.css'

export default function Nav() {
  const { openBooking } = useBooking()
  const { scrollY } = useScroll()

  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [hoveredLink, setHoveredLink] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Scroll direction detection: hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    const diff = latest - previous

    setScrolled(latest > 24)

    // Keep nav visible when mobile menu is open or near top
    if (mobileMenuOpen) {
      setHidden(false)
      return
    }

    if (latest > 120 && diff > 6) {
      setHidden(true)
    } else if (diff < -4 || latest <= 60) {
      setHidden(false)
    }
  })

  // Detect active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = nav.map((item) => item.id)
    const observers = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { rootMargin: '-20% 0px -60% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
  }, [])

  // Keyboard accessibility: Close mobile menu on Escape key
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileMenuOpen])

  // Freeze scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      window.__lenis?.stop()
      document.documentElement.style.overflow = 'hidden'
    } else {
      window.__lenis?.start()
      document.documentElement.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const handleLinkClick = (id) => {
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -24 })
      } else {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const navItemSubtitles = {
    story: '문인이 되는 하루',
    course: '다섯 개의 장면',
    zine: '8면 아코디언 북',
    tickets: '코스 및 티켓',
    info: '교통 및 FAQ',
  }

  return (
    <>
      <motion.header
        className="nav-wrapper"
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: hidden ? -90 : 0,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <div className={`nav-bar ${scrolled ? 'nav-bar--scrolled' : ''}`}>
          {/* Left: Brand Wordmark */}
          <a
            href="#top"
            className="nav__brand"
            aria-label={`${brand.nameKo} 홈으로 이동`}
            data-cursor="전주"
            onClick={(e) => {
              e.preventDefault()
              if (window.__lenis) window.__lenis.scrollTo(0)
              else window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <span className="nav__seal" aria-hidden="true">
              風
            </span>
            <div className="nav__brand-text">
              <span className="nav__brand-hanja">全州 風流錄</span>
              <span className="nav__brand-ko">{brand.nameKo}</span>
            </div>
          </a>

          {/* Center: Anchor Links */}
          <nav className="nav__links" aria-label="메인 내비게이션">
            {nav.map((item) => {
              const isActive = activeSection === item.id
              const isHovered = hoveredLink === item.id

              return (
                <div
                  key={item.id}
                  className="nav__item"
                  onMouseEnter={() => setHoveredLink(item.id)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <a
                    href={`#${item.id}`}
                    className={`nav__link ${isActive ? 'nav__link--active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault()
                      handleLinkClick(item.id)
                    }}
                    data-cursor="이동"
                  >
                    {item.label}
                    {isActive && <span className="nav__active-dot" aria-hidden="true" />}
                  </a>

                  {/* Animated pill background on hover */}
                  {isHovered && (
                    <motion.div
                      layoutId="nav-pill"
                      className="nav__pill-bg"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </div>
              )
            })}
          </nav>

          {/* Right: Actions */}
          <div className="nav__actions">
            <button
              className="btn nav__cta-btn"
              onClick={() => openBooking()}
              data-cursor="예약"
              type="button"
            >
              <span>자리 예약하기</span>
              <span className="btn-arrow" aria-hidden="true">
                <Arrow size={12} />
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              className={`nav__hamburger ${mobileMenuOpen ? 'nav__hamburger--open' : ''}`}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
              aria-expanded={mobileMenuOpen}
              type="button"
            >
              <span className="nav__hamburger-line" />
              <span className="nav__hamburger-line" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Fullscreen Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="nav__mobile-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-label="전체 메뉴"
          >
            <div className="nav__mobile-content">
              <div className="nav__mobile-header">
                <div className="nav__brand">
                  <span className="nav__seal">風</span>
                  <div className="nav__brand-text">
                    <span className="nav__brand-hanja">{brand.nameHanja}</span>
                    <span className="nav__brand-ko">{brand.nameKo}</span>
                  </div>
                </div>
                <p className="nav__mobile-tagline">{brand.tagline}</p>
              </div>

              <ul className="nav__mobile-links">
                {nav.map((item, idx) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * (idx + 1), duration: 0.4, ease: EASE }}
                  >
                    <a
                      href={`#${item.id}`}
                      className="nav__mobile-link"
                      onClick={(e) => {
                        e.preventDefault()
                        handleLinkClick(item.id)
                      }}
                    >
                      <span className="nav__mobile-num">0{idx + 1}</span>
                      <span className="nav__mobile-text">{item.label}</span>
                      <span className="nav__mobile-sub">{navItemSubtitles[item.id]}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="nav__mobile-footer">
              <button
                className="btn nav__mobile-cta"
                onClick={() => {
                  setMobileMenuOpen(false)
                  openBooking()
                }}
                type="button"
              >
                <span>자리 예약하기</span>
                <span className="btn-arrow" aria-hidden="true">
                  <Arrow size={14} />
                </span>
              </button>
              <p className="nav__mobile-meta">
                {brand.when} · {brand.capacity}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
