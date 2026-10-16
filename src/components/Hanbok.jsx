import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { hanbok } from '../content.js'
import { Reveal, SplitLines, Arrow, EASE } from './motion.jsx'
import { useBooking } from '../booking.jsx'
import './Hanbok.css'

const SWATCH_DETAILS = {
  먹색: {
    fabric: '린넨 저고리 · 도포 자켓',
    desc: '수백 년 목판 인쇄의 역사를 담은 깊고 차분한 먹빛',
  },
  생성색: {
    fabric: '모시 셔츠 · 백저 두루마기',
    desc: '표백하지 않은 삼베와 무명 본연의 맑고 따뜻한 미색',
  },
  옥색: {
    fabric: '옥빛 치마 · 풍류 쾌자',
    desc: '선비의 맑은 지조와 전주천 물빛을 닮은 청아한 연옥색',
  },
  감색: {
    fabric: '감물 도포 · 전통 허리대',
    desc: '가을 감물과 쪽물로 여러 겹 덧들인 그윽한 남빛',
  },
}

export default function Hanbok() {
  const { openBooking } = useBooking()
  const [copiedHex, setCopiedHex] = useState(null)
  const [activeSwatch, setActiveSwatch] = useState('먹색')

  const copyToClipboard = useCallback((hex, name) => {
    setActiveSwatch(name)
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(hex)
      setCopiedHex(hex)
      setTimeout(() => setCopiedHex(null), 2000)
    }
  }, [])

  return (
    <section id="hanbok" className="section hanbok" aria-labelledby="hanbok-heading">
      <div className="container hanbok__container">
        <div className="hanbok__split">
          {/* Left Column: Framed Photo with Washi Tape Motif */}
          <div className="hanbok__photo-col">
            <Reveal y={36}>
              <div className="hanbok__frame">
                {/* Washi Tape Accent */}
                <div className="hanbok__washi-tape" aria-hidden="true" />

                {/* Main Photo */}
                <div className="hanbok__photo-wrap">
                  <img
                    src="/images/hanbok-detail.jpg"
                    alt="단아한 먹색과 옥색 톤의 전주 모던 문인 한복 디테일"
                    loading="lazy"
                  />
                </div>

                {/* Frame Footer with seal stamp and caption */}
                <div className="hanbok__frame-footer">
                  <div>
                    <span className="hanbok__frame-caption">전주 모던 문인 착장</span>
                    <span className="hanbok__frame-sub">100% 모시 & 린넨 · 사전 큐레이션 협약</span>
                  </div>
                  <span className="hanbok__seal-mark" aria-hidden="true">
                    文人
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Editorial & Curated Swatches */}
          <div className="hanbok__editorial-col">
            <header>
              <div className="hanbok__eyebrow-row">
                <span className="eyebrow">{hanbok.eyebrow}</span>
                <span className="hanbok__tier-pill">Tier 3 모던 선비 옵션</span>
              </div>

              {/* Title with elegant visual treatment */}
              <h2 id="hanbok-heading" className="hanbok__title" style={{ marginTop: '1rem' }}>
                <span>오늘 당신에게 어울리는 </span>
                <span className="hanbok__word-highlight hanbok__word-highlight--ink">고요의 색</span>
                <span>은 무엇인가요?</span>
              </h2>
            </header>

            {/* Editorial Description */}
            <Reveal delay={0.15} y={20}>
              <p className="hanbok__body lead">{hanbok.body}</p>
            </Reveal>

            {/* Sartorial Philosophy Pillars */}
            <Reveal delay={0.25} y={20}>
              <div className="hanbok__pillars">
                <div className="hanbok__pillar-item">
                  <div className="hanbok__pillar-title">
                    <span className="hanbok__pillar-dot" aria-hidden="true" />
                    <span>자연 섬유 질감</span>
                  </div>
                  <p className="hanbok__pillar-desc">
                    모시·린넨의 성근 직조감으로 은은한 빛 투과와 편안한 활동성 제공
                  </p>
                </div>

                <div className="hanbok__pillar-item">
                  <div className="hanbok__pillar-title">
                    <span className="hanbok__pillar-dot" aria-hidden="true" />
                    <span>모던 문인 실루엣</span>
                  </div>
                  <p className="hanbok__pillar-desc">
                    도포 자켓과 쾌자로 현대 일상복과 어색함 없이 어우러지는 기품
                  </p>
                </div>

                <div className="hanbok__pillar-item">
                  <div className="hanbok__pillar-title">
                    <span className="hanbok__pillar-dot" aria-hidden="true" />
                    <span>당일 일괄 수거</span>
                  </div>
                  <p className="hanbok__pillar-desc">
                    심야 서점 종료 후 책방에서 환복하면 주최 측이 익일 전담 반납
                  </p>
                </div>
              </div>
            </Reveal>

            {/* 4 Curated Swatches */}
            <div className="hanbok__swatches-section">
              <div className="hanbok__swatches-header">
                <span className="hanbok__swatches-title">Curated Fabric & Colors</span>
                <span className="hanbok__swatches-hint">클릭하여 색상 코드 복사</span>
              </div>

              <div className="hanbok__swatches-grid">
                {hanbok.palette.map((swatch) => {
                  const details = SWATCH_DETAILS[swatch.name] || {}
                  const isCopied = copiedHex === swatch.hex
                  const isActive = activeSwatch === swatch.name

                  return (
                    <button
                      key={swatch.name}
                      type="button"
                      onClick={() => copyToClipboard(swatch.hex, swatch.name)}
                      className={`hanbok__swatch-card ${
                        isActive ? 'hanbok__swatch-card--active' : ''
                      }`}
                      aria-label={`${swatch.name} ${swatch.hex} 색상 복사하기`}
                    >
                      <div className="hanbok__swatch-circle-wrap">
                        <div
                          className="hanbok__swatch-circle"
                          style={{ backgroundColor: swatch.hex }}
                        />
                      </div>

                      <div className="hanbok__swatch-meta">
                        <div className="hanbok__swatch-top">
                          <span className="hanbok__swatch-name">{swatch.name}</span>
                          <span className="hanbok__swatch-hex">{swatch.hex}</span>
                        </div>
                        <div className="hanbok__swatch-fabric">{details.fabric}</div>
                        <p className="hanbok__swatch-desc">{details.desc}</p>
                      </div>

                      {isCopied && <span className="hanbok__copied-tag">복사됨!</span>}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* CTA Action */}
            <Reveal delay={0.35} y={16}>
              <div className="hanbok__cta-wrap">
                <button
                  type="button"
                  onClick={() => openBooking('t3')}
                  className="btn hanbok__cta-btn"
                >
                  <span>Tier 3 모던 선비 패스 예약하기</span>
                  <span className="btn-arrow" aria-hidden="true">
                    <Arrow />
                  </span>
                </button>
                <span className="hanbok__cta-note">
                  ※ 의상 사이즈 및 선호 착장은 예약 확정 후 1:1 상담을 통해 맞춤 준비됩니다.
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
