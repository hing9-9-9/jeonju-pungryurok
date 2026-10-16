import { motion } from 'framer-motion'
import { closing } from '../content.js'
import { useBooking } from '../booking.jsx'
import { SplitLines, Reveal, Arrow, EASE } from './motion.jsx'
import './Closing.css'

function RotatingBadge() {
  return (
    <div className="closing__badge-wrap" aria-hidden="true">
      <motion.div
        className="closing__badge-spin"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
      >
        <svg viewBox="0 0 160 160" className="closing__badge-svg">
          <defs>
            <path
              id="closingBadgePath"
              d="M 80, 80 m -62, 0 a 62,62 0 1,1 124,0 a 62,62 0 1,1 -124,0"
            />
          </defs>
          <text className="closing__badge-text">
            <textPath href="#closingBadgePath" startOffset="0%">
              SATURDAY · 7PM · PRIVATE SALON · 全州 · 深夜風流 ·
            </textPath>
          </text>
        </svg>
      </motion.div>

      {/* Central Korean Seal Stamp */}
      <div className="closing__badge-center">
        <span className="seal closing__seal">風流</span>
      </div>
    </div>
  )
}

export default function Closing() {
  const { openBooking } = useBooking()

  return (
    <section id="closing" className="section closing">
      {/* Blurred Night Bookstore Ambient Glow Backdrop */}
      <div className="closing__atmosphere" aria-hidden="true">
        <div className="closing__glow closing__glow--warm" />
        <div className="closing__glow closing__glow--lavender" />
        <div className="closing__glow closing__glow--rose" />
        <div className="closing__pattern" />
      </div>

      <div className="closing__container container">
        <div className="closing__content glass">
          {/* Rotating Circular Badge Floating on Top */}
          <RotatingBadge />

          <div className="closing__header">
            <Reveal>
              <span className="eyebrow closing__eyebrow">The Invitation</span>
            </Reveal>

            {/* SplitLines Emotional Headline */}
            <SplitLines
              lines={closing.title}
              as="h2"
              className="closing__title h1"
              lineClassName="closing__title-line"
              delay={0.1}
            />

            <Reveal delay={0.22}>
              <p className="closing__prose">
                문 닫은 전주의 서가 사이, 기분 좋은 취기와 짙은 종이 냄새가 번져가는 시간.
                오늘 밤 완성될 8면의 아코디언 북에 오직 당신만의 문장을 새겨보세요.
              </p>
            </Reveal>

            {/* Seats Notice & Live Indicator */}
            <Reveal delay={0.3}>
              <div className="closing__meta-badge">
                <span className="closing__pulse-dot" />
                <span className="closing__sub">{closing.sub}</span>
              </div>
            </Reveal>

            {/* Prominent CTA */}
            <Reveal delay={0.38}>
              <div className="closing__cta-wrap">
                <button
                  type="button"
                  className="closing__cta btn"
                  onClick={() => openBooking()}
                  aria-label="전주 심야 풍류록 예약하기"
                >
                  <span className="closing__cta-text">{closing.cta}</span>
                  <span className="btn-arrow">
                    <Arrow size={16} />
                  </span>
                </button>
              </div>
            </Reveal>

            {/* Trust Assurances */}
            <Reveal delay={0.46}>
              <div className="closing__assurances">
                <span className="closing__assurance-item">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M5 8.2l2.2 2.2 4-4.5" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                  3일 전 100% 전액 환불
                </span>
                <span className="closing__assurance-sep">·</span>
                <span className="closing__assurance-item">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M5 8.2l2.2 2.2 4-4.5" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                  영업 종료 후 독립서점 단독 대관
                </span>
                <span className="closing__assurance-sep">·</span>
                <span className="closing__assurance-item">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M5 8.2l2.2 2.2 4-4.5" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                  6~8명 소수 정예 집중 케어
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
