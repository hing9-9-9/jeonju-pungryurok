import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { info } from '../content.js'
import { Reveal, EASE } from './motion.jsx'
import './Info.css'

function TransportIcon({ index }) {
  if (index === 0) {
    // 자차 & 주차
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 11.2 2 11.8 2 12.3v3.7c0 .6.4 1 1 1h2" />
        <circle cx="7" cy="17" r="2" />
        <path d="M9 17h6" />
        <circle cx="17" cy="17" r="2" />
        <path d="M5 10.8l1.4-2.5c.2-.4.7-.8 1.2-.8h4.8" />
      </svg>
    )
  }
  if (index === 1) {
    // 대중교통 & 막차
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="3" width="16" height="15" rx="2" />
        <path d="M4 11h16" />
        <path d="M12 3v8" />
        <circle cx="8" cy="15" r="1" fill="currentColor" />
        <circle cx="16" cy="15" r="1" fill="currentColor" />
        <path d="M8 18l-2 3" />
        <path d="M16 18l2 3" />
      </svg>
    )
  }
  // 택시 동승 카풀
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 3h5v5" />
      <path d="M4 20L21 3" />
      <path d="M21 16v5h-5" />
      <path d="M15 15l6 6" />
      <circle cx="7" cy="7" r="3" />
    </svg>
  )
}

function PlusMinusIcon({ isOpen }) {
  return (
    <div className={`info__faq-icon ${isOpen ? 'info__faq-icon--open' : ''}`} aria-hidden="true">
      <span className="info__faq-icon-line info__faq-icon-line--h" />
      <span className="info__faq-icon-line info__faq-icon-line--v" />
    </div>
  )
}

export default function Info() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0)

  const toggleFaq = (idx) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx))
  }

  const transportTags = ['도보 10~15분 거리', '익산·김제·완주 방면', '현장 안심 매칭']

  return (
    <section id="info" className="section info">
      <div className="info__container container">
        {/* Section Header */}
        <div className="info__header">
          <Reveal>
            <span className="eyebrow">{info.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="info__title h2">{info.title}</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="info__lead lead">
              낯선 도시의 밤이라도 안심할 수 있도록, 첫 집결부터 늦은 밤 귀가와 이동까지 꼼꼼히 설계했습니다.
            </p>
          </Reveal>
        </div>

        {/* Two-Part Layout: Transport (Part A) & FAQ Accordion (Part B) */}
        <div className="info__layout">
          {/* Part A: Transport & Night Travel Guide */}
          <div className="info__transport-col">
            <Reveal y={24}>
              <div className="info__col-header">
                <span className="info__col-tag">PART A</span>
                <h3 className="info__col-title">교통 & 심야 안심 귀가</h3>
                <p className="info__col-desc">
                  프로그램 종료 시간인 20:30 이후에도 편안하게 귀가하실 수 있도록 3가지 이동 방안을 안내합니다.
                </p>
              </div>
            </Reveal>

            <div className="info__transport-list">
              {info.items.map((item, idx) => (
                <Reveal key={idx} delay={0.1 + idx * 0.1} y={24}>
                  <div className="info__transport-card glass">
                    <div className="info__transport-top">
                      <div className="info__transport-icon-box">
                        <TransportIcon index={idx} />
                      </div>
                      <div className="info__transport-meta">
                        <span className="info__transport-step">METHOD 0{idx + 1}</span>
                        <h4 className="info__transport-name">{item.title}</h4>
                      </div>
                      <span className="info__transport-badge">{transportTags[idx]}</span>
                    </div>

                    <p className="info__transport-text">{item.desc}</p>

                    {idx === 0 && (
                      <div className="info__transport-tip">
                        <span className="info__transport-tip-label">추천</span>
                        <span>한옥마을 제1·2 공영주차장 이용 시 일일 최대 12,000원</span>
                      </div>
                    )}
                    {idx === 1 && (
                      <div className="info__transport-tip">
                        <span className="info__transport-tip-label">안내</span>
                        <span>전주역 KTX 막차 23:12 / 고속버스터미널 막차 22:30</span>
                      </div>
                    )}
                    {idx === 2 && (
                      <div className="info__transport-tip">
                        <span className="info__transport-tip-label">현장</span>
                        <span>진행 가이드가 같은 방향 참가자 간 카풀·택시 즉시 연계</span>
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Part B: FAQ Accordion */}
          <div className="info__faq-col">
            <Reveal y={24} delay={0.15}>
              <div className="info__col-header">
                <span className="info__col-tag">PART B</span>
                <h3 className="info__col-title">자주 묻는 질문 (FAQ)</h3>
                <p className="info__col-desc">
                  출발 전 궁금하신 점을 모았습니다. 클릭하여 상세 안내를 확인해 보세요.
                </p>
              </div>
            </Reveal>

            <div className="info__faq-list" role="region" aria-label="자주 묻는 질문 아코디언">
              {info.faq.map((item, idx) => {
                const isOpen = openFaqIndex === idx
                const buttonId = `faq-btn-${idx}`
                const panelId = `faq-panel-${idx}`

                return (
                  <div
                    key={idx}
                    className={`info__faq-item glass ${isOpen ? 'info__faq-item--open' : ''}`}
                  >
                    <button
                      type="button"
                      id={buttonId}
                      className="info__faq-button"
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                    >
                      <div className="info__faq-q-wrap">
                        <span className="info__faq-q-mark">問</span>
                        <span className="info__faq-q-text">{item.q}</span>
                      </div>
                      <PlusMinusIcon isOpen={isOpen} />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          className="info__faq-panel"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                        >
                          <div className="info__faq-panel-inner">
                            <div className="info__faq-a-mark">答</div>
                            <p className="info__faq-a-text">{item.a}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
