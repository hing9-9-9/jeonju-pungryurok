import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { hero, brand } from '../content.js'
import { useBooking } from '../booking.jsx'
import { SplitLines, Reveal, Arrow, EASE } from './motion.jsx'
import './Hero.css'

export default function Hero() {
  const { openBooking } = useBooking()
  const heroRef = useRef(null)

  // Scroll parallax for arch image and display watermark
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const archParallax = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const watermarkParallax = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])

  return (
    <section id="top" ref={heroRef} className="hero" aria-label={`${brand.nameKo} 소개`}>
      {/* Giant English Display Watermark */}
      <motion.div
        className="hero__watermark"
        style={{ y: watermarkParallax }}
        aria-hidden="true"
      >
        Midnight Salon
      </motion.div>

      <div className="container hero__grid">
        {/* Left Column: Editorial Information */}
        <div className="hero__content">
          {/* Eyebrow & Live Status Badge */}
          <Reveal delay={0.05} y={20}>
            <div className="hero__eyebrow-row">
              <div className="hero__status-badge">
                <span className="hero__pulse-dot" aria-hidden="true" />
                <span>이번 주 토요일 · 잔여 3석</span>
              </div>
              <span className="hero__eyebrow-divider" aria-hidden="true">
                /
              </span>
              <span className="hero__eyebrow-en">{hero.eyebrow}</span>
            </div>
          </Reveal>

          {/* Headline + Vertical Hanja Strip */}
          <div className="hero__title-wrap">
            <div className="hero__title-main">
              <SplitLines
                lines={hero.headline}
                as="h1"
                className="hero__headline"
                delay={0.15}
                stagger={0.1}
                lineClassName="hero__headline-line"
              />
            </div>

            {/* Vertical Hanja Accent */}
            <div className="hero__hanja-strip" aria-hidden="true">
              全州 · 深夜 · 風流錄
            </div>
          </div>

          {/* Subtitle Description */}
          <Reveal delay={0.35} y={24}>
            <p className="hero__sub">{hero.sub}</p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={0.45} y={24}>
            <div className="hero__ctas">
              <button
                className="btn hero__cta-primary"
                onClick={() => openBooking()}
                data-cursor="예약"
                type="button"
              >
                <span>{hero.cta}</span>
                <span className="btn-arrow" aria-hidden="true">
                  <Arrow size={14} />
                </span>
              </button>

              <a
                href="#course"
                className="btn btn--ghost hero__cta-ghost"
                data-cursor="둘러보기"
                onClick={(e) => {
                  const el = document.getElementById('course')
                  if (el) {
                    e.preventDefault()
                    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -24 })
                    else el.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                <span>{hero.secondary}</span>
              </a>
            </div>
          </Reveal>

          {/* Stats Bar */}
          <Reveal delay={0.55} y={24}>
            <div className="hero__stats">
              {hero.meta.map((stat, idx) => (
                <div key={idx} className="hero__stat-item">
                  <span className="hero__stat-label">{stat.k}</span>
                  <span className="hero__stat-value">{stat.v}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right Column: Arch-Top Window Frame */}
        <div className="hero__visual-col">
          <div className="hero__arch-wrapper">
            <Reveal delay={0.25} y={40} className="hero__arch-frame">
              <div className="hero__arch-inner" data-cursor="동문길">
                <motion.img
                  src="/images/hero-alley.jpg"
                  alt="해 질 녘 전주 동문길 골목 산책 풍경"
                  className="hero__arch-img"
                  style={{ y: archParallax }}
                  loading="eager"
                />
                <div className="hero__arch-overlay" />

                {/* Arch Photo Caption Chip */}
                <div className="hero__photo-chip" aria-hidden="true">
                  <span className="hero__photo-scene">Scene 00</span>
                  <span>골든아워 동문길 산책</span>
                </div>
              </div>
            </Reveal>

            {/* Rotated Seal Stamp Badge floating over the arch boundary */}
            <div className="hero__seal-badge" aria-hidden="true">
              <div className="hero__seal-inner">
                <span>全</span>
                <span>州</span>
                <span>風</span>
                <span>流</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Bottom Bar / Scroll Indicator */}
      <div className="container hero__footer">
        <div className="hero__footer-partners">
          {brand.partners.join(' × ')}
        </div>

        <a
          href="#story"
          className="hero__scroll-indicator"
          aria-label="이야기 섹션으로 스크롤"
          data-cursor="스크롤"
          onClick={(e) => {
            const el = document.getElementById('story')
            if (el) {
              e.preventDefault()
              if (window.__lenis) window.__lenis.scrollTo(el, { offset: -24 })
              else el.scrollIntoView({ behavior: 'smooth' })
            }
          }}
        >
          <span className="hero__scroll-text">Scroll</span>
          <div className="hero__scroll-track" aria-hidden="true">
            <div className="hero__scroll-line" />
          </div>
        </a>
      </div>
    </section>
  )
}
