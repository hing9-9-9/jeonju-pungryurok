import { useRef, useState, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { story } from '../content.js'
import { Reveal, SplitLines, Arrow, EASE } from './motion.jsx'
import './Story.css'

/**
 * PillarCard — Frosted glass card with pastel wash, 3D tilt interaction,
 * giant decorative Hanja glyph, and literary metadata.
 */
function PillarCard({ pillar, index }) {
  const cardRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback(
    (e) => {
      if (shouldReduceMotion || !cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      // Gentle, refined tilt angles (-7 to +7 deg)
      const rotateX = ((y - centerY) / centerY) * -6.5
      const rotateY = ((x - centerX) / centerX) * 6.5

      setRotate({ x: rotateX, y: rotateY })
      setGlare({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.35,
      })
    },
    [shouldReduceMotion]
  )

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setRotate({ x: 0, y: 0 })
    setGlare((prev) => ({ ...prev, opacity: 0 }))
  }, [])

  return (
    <motion.article
      ref={cardRef}
      className={`story-card story-card--${pillar.tone}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.05, ease: EASE, delay: index * 0.16 }}
      style={{
        transform:
          !shouldReduceMotion && isHovered
            ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateY(-8px)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: isHovered
          ? 'transform 0.12s ease-out, box-shadow 0.4s ease-out'
          : 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s ease-out',
      }}
      aria-label={`${pillar.no} ${pillar.title} - ${pillar.place}`}
    >
      {/* Glare sheen */}
      <div
        className="story-card__glare"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.8) 0%, transparent 60%)`,
          opacity: glare.opacity,
        }}
        aria-hidden="true"
      />

      {/* Giant decorative background Hanja glyph */}
      <div className="story-card__hanja" aria-hidden="true">
        {pillar.hanja}
      </div>

      {/* Top row: Number and place pill */}
      <div className="story-card__top">
        <span className="story-card__num">{pillar.no}</span>
        <div className="story-card__place-pill">
          <span className="story-card__place-dot" aria-hidden="true" />
          <span>{pillar.place}</span>
        </div>
      </div>

      {/* Middle: Title & description */}
      <div className="story-card__body">
        <div className="story-card__title-row">
          <h3 className="story-card__title">{pillar.title}</h3>
          <span className="story-card__hanja-tag" aria-hidden="true">
            {pillar.hanja}
          </span>
        </div>
        <p className="story-card__desc">{pillar.desc}</p>
      </div>

      {/* Footer: subtle directional hint */}
      <div className="story-card__footer">
        <span className="story-card__action-hint">Explore Experience</span>
        <div className="story-card__arrow-btn" aria-hidden="true">
          <Arrow size={13} />
        </div>
      </div>
    </motion.article>
  )
}

export default function Story() {
  const firstTitleLine = story.title[0] || '화려한 분장이 아니라,'
  const secondTitleLine = story.title[1] || '기록하는 사람이 되는 하루'

  return (
    <section id="story" className="section story" aria-labelledby="story-heading">
      {/* Background literary watermark */}
      <div className="story__bg-accent" aria-hidden="true">
        全州風流錄
      </div>

      <div className="container story__container">
        {/* Manifesto Header */}
        <header className="story__header">
          <div className="story__title-wrap">
            <div className="story__eyebrow-row">
              <span className="eyebrow">{story.eyebrow}</span>
              <span className="story__meta-tag" aria-hidden="true">
                全州 記錄 紀行
              </span>
            </div>

            <h2 id="story-heading" className="story__title">
              <span className="story__title-line">
                <SplitLines lines={[firstTitleLine]} as="span" delay={0.05} />
              </span>
              <br />
              <span className="story__title-line story__title-line--highlight">
                <SplitLines lines={[secondTitleLine]} as="span" delay={0.18} />
                <svg
                  className="story__brush-svg"
                  viewBox="0 0 420 18"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    className="story__brush-path"
                    d="M4 13.5C70 6.5 150 4 230 6.8C290 8.8 350 12.2 414 7.5"
                    stroke="var(--seal)"
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.88"
                  />
                </svg>
              </span>
            </h2>
          </div>

          <div className="story__manifesto-col">
            <Reveal delay={0.25} y={24}>
              <div className="story__manifesto-badge">
                <span className="story__seal-mini" aria-hidden="true">
                  錄
                </span>
                <span>기록과 풍류의 도시 · 전주 로컬 살롱</span>
              </div>
            </Reveal>

            <Reveal delay={0.35} y={24}>
              <p className="lead story__lead">{story.body}</p>
            </Reveal>

            <Reveal delay={0.45} y={20}>
              <blockquote className="story__lead-quote">
                “사진은 꾸며낸 모습 대신, 오늘 완성될 내 책의 앞날개에 남을 다정한 작가의 초상이 됩니다.”
              </blockquote>
            </Reveal>
          </div>
        </header>

        {/* 3 Pillars Grid */}
        <div className="story__pillars">
          {story.pillars.map((pillar, idx) => (
            <PillarCard key={pillar.no} pillar={pillar} index={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}
