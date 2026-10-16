import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { course } from '../content.js'
import { Reveal, SplitLines, Arrow, EASE } from './motion.jsx'
import { useBooking } from '../booking.jsx'
import './Course.css'

function CameraIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  )
}

const PHASE_LABELS = {
  jade: '사전 준비 · 단장',
  butter: '골든아워 산책',
  apricot: '해 질 녘 노을',
  rose: '풍류 디너 만찬',
  sky: '어스름 밤공기',
  lilac: '심야 서재 살롱',
}

export default function Course() {
  const { openBooking } = useBooking()
  const [activeIndex, setActiveIndex] = useState(0)
  const stopRefs = useRef([])
  const containerRef = useRef(null)

  // Scroll spy to detect active stop card
  const handleScroll = useCallback(() => {
    if (!stopRefs.current.length) return
    const targetY = window.innerHeight * 0.38
    let closestIndex = 0
    let minDistance = Infinity

    stopRefs.current.forEach((el, idx) => {
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cardCenter = rect.top + rect.height * 0.35
      const distance = Math.abs(cardCenter - targetY)
      if (distance < minDistance) {
        minDistance = distance
        closestIndex = idx
      }
    })

    setActiveIndex(closestIndex)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollToStop = (idx) => {
    setActiveIndex(idx)
    const el = stopRefs.current[idx]
    if (!el) return
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -110 })
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const currentStop = course.stops[activeIndex] || course.stops[0]

  return (
    <section id="course" ref={containerRef} className="section course" aria-labelledby="course-heading">
      <div className="container course__container">
        {/* Section Header */}
        <header className="course__header">
          <div className="course__eyebrow-wrap">
            <span className="eyebrow">{course.eyebrow}</span>
            <span className="course__badge-time">15:00 — 20:30 · 총 5시간</span>
          </div>

          <h2 id="course-heading" className="course__title">
            <SplitLines lines={[course.title]} as="span" />
          </h2>

          <Reveal delay={0.2} y={18}>
            <div className="course__note-box">
              <span className="course__note-icon" aria-hidden="true">
                ※
              </span>
              <p className="course__note-text">{course.note}</p>
            </div>
          </Reveal>
        </header>

        {/* Scrollytelling 2-Column Layout */}
        <div className="course__scrolly-layout">
          {/* Left Column: Sticky Visualizer (Desktop) */}
          <aside className="course__sticky-col" aria-label="현재 코스 장면 비주얼">
            {/* Ambient day-to-night lighting halo */}
            <div
              className={`course-hero__lighting-halo course-hero__lighting-halo--${currentStop.tone}`}
              aria-hidden="true"
            />

            {/* Giant time numeral display */}
            <div className="course-hero__time-wrap">
              <div className="course-hero__time-digits">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentStop.time}
                    className="course-hero__time-val"
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -16, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    {currentStop.time}
                  </motion.span>
                </AnimatePresence>
                <span className="course-hero__time-end">~ {currentStop.end}</span>
              </div>

              <div className="course-hero__phase-tag">
                <span className="course-hero__phase-dot" aria-hidden="true" />
                <span>{PHASE_LABELS[currentStop.tone] || currentStop.chapter}</span>
              </div>
            </div>

            {/* Main Photographic Frame with stacked crossfading images */}
            <div className="course-hero__frame">
              {course.stops.map((stop, idx) => (
                <img
                  key={stop.time}
                  src={stop.image}
                  alt={stop.title}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  className={`course-hero__img ${
                    idx === activeIndex ? 'course-hero__img--active' : 'course-hero__img--inactive'
                  }`}
                />
              ))}

              {/* Floating Top Info Overlay */}
              <div className="course-hero__overlay-top">
                <span className="course-hero__meta-pill">
                  {currentStop.chapter} · {currentStop.place.split('·')[0].trim()}
                </span>
                {currentStop.optional && (
                  <span className="course-stop__opt-tag">Tier 3 사전 옵션</span>
                )}
              </div>

              {/* Bottom Photo Point Overlay */}
              <div className="course-hero__overlay-bottom">
                <div className="course-hero__cam-icon" aria-hidden="true">
                  <CameraIcon />
                </div>
                <div className="course-hero__photo-body">
                  <span className="course-hero__photo-label">PHOTO POINT</span>
                  <span className="course-hero__photo-text">{currentStop.photo}</span>
                </div>
              </div>
            </div>

            {/* Navigation Milestone Dots */}
            <nav className="course-hero__nav-dots" aria-label="코스 단계별 바로가기">
              {course.stops.map((stop, idx) => {
                const isActive = idx === activeIndex
                return (
                  <button
                    key={stop.time}
                    type="button"
                    onClick={() => scrollToStop(idx)}
                    className={`course-hero__nav-btn ${isActive ? 'course-hero__nav-btn--active' : ''}`}
                    aria-label={`${stop.time} ${stop.title}`}
                    aria-current={isActive ? 'step' : undefined}
                  >
                    <span className="course-hero__dot" />
                    <span className="course-hero__nav-time">{stop.time}</span>
                  </button>
                )
              })}
            </nav>
          </aside>

          {/* Right Column: The Sequence of Stop Cards */}
          <div className="course__stops-col" role="feed" aria-label="코스 상세 타임라인">
            {course.stops.map((stop, idx) => {
              const isActive = idx === activeIndex

              return (
                <article
                  key={stop.time}
                  ref={(el) => (stopRefs.current[idx] = el)}
                  onClick={() => scrollToStop(idx)}
                  className={`course-stop ${
                    isActive ? 'course-stop--active' : 'course-stop--inactive'
                  } ${stop.optional ? 'course-stop--optional' : ''}`}
                  aria-label={`${stop.chapter}: ${stop.title}`}
                >
                  {/* Card Header: Time, Chapter, Optional Badge */}
                  <div className="course-stop__header">
                    <div className="course-stop__time-group">
                      <span className="course-stop__time">
                        {stop.time} <span style={{ fontSize: '0.65em', opacity: 0.6 }}>— {stop.end}</span>
                      </span>
                      <span className="course-stop__chapter">{stop.chapter}</span>
                    </div>

                    {stop.optional && (
                      <span className="course-stop__opt-tag">Tier 3 사전 옵션</span>
                    )}
                  </div>

                  {/* Place tag */}
                  <div className="course-stop__place-wrap">
                    <span className="course-stop__place-icon" aria-hidden="true" />
                    <span className="course-stop__place">{stop.place}</span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="course-stop__title">{stop.title}</h3>
                  <p className="course-stop__desc">{stop.desc}</p>

                  {/* Mobile-only inline imagery */}
                  <div className="course-stop__mobile-img">
                    <img src={stop.image} alt={stop.title} loading="lazy" />
                  </div>

                  {/* Photo Point Indicator */}
                  <div className="course-stop__photo-point">
                    <div className="course-stop__photo-icon" aria-hidden="true">
                      <CameraIcon />
                    </div>
                    <div className="course-stop__photo-body">
                      <span className="course-stop__photo-label">PHOTO POINT · 저자의 시선</span>
                      <span>{stop.photo}</span>
                    </div>
                  </div>

                  {/* Optional stop special callout */}
                  {stop.optional && (
                    <div className="course-stop__opt-action">
                      <span className="course-stop__opt-hint">
                        ※ 미선택 참가자는 15:30 완판본문화관에서 첫 합류합니다.
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          openBooking('t3')
                        }}
                        className="course-stop__opt-btn"
                      >
                        <span>모던 한복 포함 패스 보기</span>
                        <Arrow size={12} />
                      </button>
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
