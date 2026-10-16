import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { zine } from '../content.js'
import { Reveal, SplitLines, Arrow, EASE } from './motion.jsx'
import { useBooking } from '../booking.jsx'
import './Zine.css'

// Default sample data for interactive fill-in-the-blanks
const DEFAULT_FIELDS = {
  bookTopic: '달빛과 취기',
  authorName: '밤의 방랑자',
  originCity: '익산',
  dayJob: '기획자',
  myState: '조금은 헐렁하고 다정한 사람',
  weatherTemp: '18℃ 선선함',
  bgmTrack: '빛과 소금 - 내 곁에서 떠나가지 말아요',
  sentence: '나무는 썩어도 그 위에 새겨진 문장은 시간을 건넌다.',
  sceneAt4pm: '동문길 모퉁이 헌책방 처마 밑으로 스며드는 주황빛 햇살',
  myPungryu: '좋은 사람과 기울이는 다정한 술 한잔',
  favoriteDish: '동문길 수제 맥적구이',
  favoriteDrink: '알싸한 배와 생강 향의 전주 이강주 25°',
  // 4-axis taste star ratings (1~5 stars)
  sweetness: 2,
  acidity: 3,
  body: 4,
  finish: 5,
  tastingNote: '차갑던 동문길 골목 끝에서 만난 온기. 낯선 이들과 잔을 부딪히며 웃음이 번졌다.',
  warmWords: '수고했어, 오늘 밤은 오롯이 너만의 시간이야.',
  bookTitle: '밤은 이야기하기에 좋은 시간',
  manuscriptText: '영업이 끝난 서가에서 우리는 저마다의 문장에 밑줄을 긋는다.',
  postcardTo: '계절이 바뀐 날의 나에게',
  postcardAddress: '전북 전주시 완산구 동문길 42',
  postcardMessage: '안녕, 그곳의 계절은 어떤가요? 전주 동문길에서 마셨던 술과 책방의 종이 냄새를 기억하나요. 바쁠 때마다 이 날의 밤공기를 꺼내어 보길 바랍니다.',
}

export default function Zine() {
  const { openBooking } = useBooking()
  const prefersReduced = useReducedMotion()

  // State
  const [activePageIndex, setActivePageIndex] = useState(0)
  const [viewMode, setViewMode] = useState('accordion') // 'accordion' | 'flat' | 'focus'
  const [foldAngle, setFoldAngle] = useState(14) // degrees in accordion mode
  const [fields, setFields] = useState(DEFAULT_FIELDS)
  const [isMobile, setIsMobile] = useState(false)

  const mobileScrollRef = useRef(null)

  // Detect mobile screen (<820px)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 820)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Mobile scroll listener to update active page index
  useEffect(() => {
    if (!isMobile) return
    const el = mobileScrollRef.current
    if (!el) return

    const handleScroll = () => {
      const scrollLeft = el.scrollLeft
      const cardWidth = el.querySelector('.zine__page-card')?.offsetWidth || 280
      const newIndex = Math.round(scrollLeft / (cardWidth + 14))
      if (newIndex >= 0 && newIndex < zine.pages.length && newIndex !== activePageIndex) {
        setActivePageIndex(newIndex)
      }
    }

    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [isMobile, activePageIndex])

  // Scroll to active index on mobile when changed via pill
  const scrollToMobilePage = (index) => {
    setActivePageIndex(index)
    if (mobileScrollRef.current) {
      const cards = mobileScrollRef.current.querySelectorAll('.zine__page-card')
      if (cards[index]) {
        cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      }
    }
  }

  // Handle field change
  const updateField = (key, value) => {
    setFields((prev) => ({ ...prev, [key]: value }))
  }

  // Reset fields to defaults
  const resetFields = () => {
    setFields(DEFAULT_FIELDS)
  }

  // Toggle fold animation
  const handleToggleFold = () => {
    if (viewMode !== 'accordion') {
      setViewMode('accordion')
      setFoldAngle(14)
      return
    }
    setFoldAngle((prev) => (prev > 4 ? 0 : 16))
  }

  // Title lines for SplitLines
  const titleLines = ['《전주 풍류록》 초판 1쇄,', '저자는 당신입니다']

  return (
    <section id="zine" className="section zine-section">
      <div className="container zine__container">
        {/* Header */}
        <header className="zine__header">
          <Reveal delay={0.05} y={20}>
            <div className="eyebrow zine__eyebrow">{zine.eyebrow}</div>
          </Reveal>

          <SplitLines
            lines={titleLines}
            as="h2"
            className="zine__title h1"
            lineClassName="zine__title-line"
            delay={0.15}
          />

          <Reveal delay={0.25} y={24}>
            <p className="zine__lead lead">{zine.body}</p>
          </Reveal>

          {/* Interactive Controller Bar (Desktop) - No Emoticons */}
          <Reveal delay={0.35} y={20} className="zine__control-bar-wrapper">
            <div className="zine__controls glass">
              <div className="zine__mode-toggles" role="tablist" aria-label="책 보기 모드">
                <button
                  type="button"
                  role="tab"
                  aria-selected={viewMode === 'accordion'}
                  className={`zine__mode-btn ${viewMode === 'accordion' ? 'is-active' : ''}`}
                  onClick={() => setViewMode('accordion')}
                >
                  병풍 입체 (3D)
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={viewMode === 'flat'}
                  className={`zine__mode-btn ${viewMode === 'flat' ? 'is-active' : ''}`}
                  onClick={() => setViewMode('flat')}
                >
                  전면 펼쳐보기 (Spread)
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={viewMode === 'focus'}
                  className={`zine__mode-btn ${viewMode === 'focus' ? 'is-active' : ''}`}
                  onClick={() => setViewMode('focus')}
                >
                  면별 자세히 보기 (Focus)
                </button>
              </div>

              {viewMode === 'accordion' && !isMobile && (
                <div className="zine__fold-slider-wrap">
                  <label htmlFor="zine-fold-range" className="zine__fold-label">
                    접힘 각도 <span className="zine__fold-value">{foldAngle}°</span>
                  </label>
                  <input
                    id="zine-fold-range"
                    type="range"
                    min="0"
                    max="22"
                    step="1"
                    value={foldAngle}
                    onChange={(e) => setFoldAngle(Number(e.target.value))}
                    className="zine__range-input"
                    aria-label="병풍 접힘 각도 조절"
                  />
                  <button
                    type="button"
                    className="zine__fold-toggle-btn"
                    onClick={handleToggleFold}
                    title="병풍 펴기/접기 토글"
                  >
                    {foldAngle > 4 ? '완전 펴기' : '입체로 접기'}
                  </button>
                </div>
              )}

              <button
                type="button"
                className="zine__reset-btn"
                onClick={resetFields}
                title="기본 샘플 문장으로 채우기"
              >
                예시 문장 초기화
              </button>
            </div>
          </Reveal>

          {/* Quick Page Nav Pills (8 Pages) */}
          <Reveal delay={0.4} y={16}>
            <nav className="zine__nav-pills" aria-label="책 페이지 빠른 이동">
              {zine.pages.map((p, idx) => (
                <button
                  key={p.no}
                  type="button"
                  className={`zine__nav-pill ${activePageIndex === idx ? 'is-active' : ''}`}
                  onClick={() => {
                    if (isMobile) {
                      scrollToMobilePage(idx)
                    } else {
                      setActivePageIndex(idx)
                    }
                  }}
                  data-tone={p.tone}
                >
                  <span className="zine__pill-no">0{p.no}</span>
                  <span className="zine__pill-label">{p.label}</span>
                </button>
              ))}
            </nav>
          </Reveal>
        </header>

        {/* ── Book Display Stage ── */}
        <div className="zine__stage-wrapper">
          {/* Floating decorative elements */}
          <div className="zine__decorations" aria-hidden="true">
            <motion.div
              className="zine__decor-polaroid zine__decor-polaroid--table"
              animate={prefersReduced ? {} : { y: [0, -8, 0], rotate: [-4, -3, -4] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="zine__washi-tape zine__washi-tape--top-center" />
              <div className="zine__polaroid-img-wrap">
                <img
                  src="/images/zine-table.jpg"
                  alt="에이커북스토어 집필 테이블"
                  loading="lazy"
                  width="180"
                  height="135"
                />
              </div>
              <p className="zine__polaroid-caption">에이커 심야 살롱 테이블 19:30</p>
            </motion.div>

            <motion.div
              className="zine__decor-polaroid zine__decor-polaroid--woodblock"
              animate={prefersReduced ? {} : { y: [0, 8, 0], rotate: [5, 6, 5] }}
              transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <div className="zine__washi-tape zine__washi-tape--mint" />
              <div className="zine__polaroid-img-wrap">
                <img
                  src="/images/woodblock.jpg"
                  alt="완판본 목판 인출"
                  loading="lazy"
                  width="150"
                  height="150"
                />
              </div>
              <p className="zine__polaroid-caption">완판본 목판의 결</p>
            </motion.div>

            <motion.div
              className="zine__decor-seal"
              animate={prefersReduced ? {} : { rotate: [-8, -6, -8], scale: [1, 1.03, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="zine__seal-box">
                <span className="zine__seal-char">全州</span>
                <span className="zine__seal-sub">風流</span>
              </div>
            </motion.div>
          </div>

          {/* Mobile View: Touch-Friendly Scroll Snap Gallery */}
          {isMobile ? (
            <div className="zine__mobile-stage">
              <div className="zine__mobile-gallery" ref={mobileScrollRef}>
                {zine.pages.map((page, idx) => (
                  <div
                    key={page.no}
                    className={`zine__page-card ${page.isPostcard ? 'zine__page-card--postcard' : 'zine__page-card--standard'} ${
                      activePageIndex === idx ? 'is-focused' : ''
                    }`}
                    data-tone={page.tone}
                    onClick={() => setActivePageIndex(idx)}
                  >
                    <div className="zine__card-crease-shadow zine__card-crease-shadow--left" />
                    <div className="zine__card-inner">
                      <PageRenderer
                        page={page}
                        index={idx}
                        fields={fields}
                        updateField={updateField}
                      />
                    </div>
                    <div className="zine__card-crease-shadow zine__card-crease-shadow--right" />
                  </div>
                ))}
              </div>

              {/* Mobile Indicator, Dots & Counter */}
              <div className="zine__mobile-counter-wrap">
                <div className="zine__mobile-dots">
                  {zine.pages.map((p, idx) => (
                    <button
                      key={p.no}
                      type="button"
                      className={`zine__mobile-dot ${activePageIndex === idx ? 'is-active' : ''}`}
                      onClick={() => scrollToMobilePage(idx)}
                      aria-label={`${p.label} 페이지로 이동`}
                    />
                  ))}
                </div>

                <div className="zine__mobile-counter">
                  <button
                    type="button"
                    className="zine__counter-arrow-btn"
                    disabled={activePageIndex === 0}
                    onClick={() => scrollToMobilePage(Math.max(0, activePageIndex - 1))}
                    aria-label="이전 페이지"
                  >
                    ‹
                  </button>
                  <span className="zine__counter-current">0{activePageIndex + 1}</span>
                  <span className="zine__counter-sep">/</span>
                  <span className="zine__counter-total">0{zine.pages.length}</span>
                  <span className="zine__counter-title">
                    {zine.pages[activePageIndex]?.label} · {zine.pages[activePageIndex]?.title}
                  </span>
                  <button
                    type="button"
                    className="zine__counter-arrow-btn"
                    disabled={activePageIndex === zine.pages.length - 1}
                    onClick={() => scrollToMobilePage(Math.min(zine.pages.length - 1, activePageIndex + 1))}
                    aria-label="다음 페이지"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Desktop Stage */
            <div className={`zine__desktop-stage zine__desktop-stage--${viewMode}`}>
              {viewMode === 'focus' ? (
                /* Focus Mode: Prominent detailed card view with pagination */
                <div className="zine__focus-view">
                  <div className="zine__focus-nav-bar">
                    <button
                      type="button"
                      className="zine__focus-nav-btn"
                      disabled={activePageIndex === 0}
                      onClick={() => setActivePageIndex((prev) => Math.max(0, prev - 1))}
                      aria-label="이전 페이지"
                    >
                      ← 이전 면
                    </button>
                    <div className="zine__focus-page-title">
                      <span className="zine__focus-badge" data-tone={zine.pages[activePageIndex].tone}>
                        {zine.pages[activePageIndex].no}면
                      </span>
                      <h3>
                        {zine.pages[activePageIndex].label} — {zine.pages[activePageIndex].title}
                      </h3>
                    </div>
                    <button
                      type="button"
                      className="zine__focus-nav-btn"
                      disabled={activePageIndex === zine.pages.length - 1}
                      onClick={() => setActivePageIndex((prev) => Math.min(zine.pages.length - 1, prev + 1))}
                      aria-label="다음 페이지"
                    >
                      다음 면 →
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activePageIndex}
                      className={`zine__page-card zine__page-card--focus ${
                        zine.pages[activePageIndex].isPostcard ? 'zine__page-card--postcard' : 'zine__page-card--standard'
                      }`}
                      data-tone={zine.pages[activePageIndex].tone}
                      initial={{ opacity: 0, scale: 0.96, y: 14 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: -14 }}
                      transition={{ duration: 0.45, ease: EASE }}
                    >
                      <div className="zine__card-inner">
                        <PageRenderer
                          page={zine.pages[activePageIndex]}
                          index={activePageIndex}
                          fields={fields}
                          updateField={updateField}
                          isFocusedView
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <p className="zine__focus-hint">
                    ※ 책의 빈칸(이름, 지역, 문장 등)을 직접 입력하면 표지와 각 장에 실시간으로 반영됩니다.
                  </p>
                </div>
              ) : (
                /* Accordion (3D) or Flat Spread Mode */
                <div
                  className={`zine__book-strip ${
                    viewMode === 'accordion' ? 'zine__book-strip--accordion' : 'zine__book-strip--flat'
                  }`}
                  style={{
                    '--fold-deg': `${foldAngle}deg`,
                  }}
                >
                  {zine.pages.map((page, idx) => {
                    // Alternate fold angles for 3D accordion effect
                    const isEven = idx % 2 === 0
                    const angle = isEven ? -foldAngle : foldAngle
                    const isSelected = activePageIndex === idx

                    return (
                      <div
                        key={page.no}
                        className={`zine__accordion-panel ${
                          page.isPostcard ? 'zine__accordion-panel--postcard' : 'zine__accordion-panel--standard'
                        } ${isSelected ? 'is-selected' : ''}`}
                        style={{
                          transform:
                            viewMode === 'accordion'
                              ? `rotateY(${angle}deg)`
                              : 'rotateY(0deg)',
                        }}
                        onClick={() => setActivePageIndex(idx)}
                        title={`${page.label} (${page.title}) — 클릭하여 선택`}
                      >
                        {/* Realistic Paper Lighting & Spine Shadows */}
                        {viewMode === 'accordion' && (
                          <div
                            className={`zine__panel-lighting ${
                              isEven ? 'zine__panel-lighting--even' : 'zine__panel-lighting--odd'
                            }`}
                            aria-hidden="true"
                          />
                        )}

                        <div
                          className={`zine__page-card ${
                            page.isPostcard ? 'zine__page-card--postcard' : 'zine__page-card--standard'
                          }`}
                          data-tone={page.tone}
                        >
                          <div className="zine__card-inner">
                            <PageRenderer
                              page={page}
                              index={idx}
                              fields={fields}
                              updateField={updateField}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Below the Book: Feature Pills (No Emoticons) & Secondary CTA ── */}
        <footer className="zine__footer">
          <Reveal delay={0.1} y={20}>
            <div className="zine__feature-pills">
              <div className="zine__feature-pill glass">
                <span className="zine__pill-num">01</span>
                <span className="zine__pill-text">질문 프롬프트로 백지의 공포 없이</span>
              </div>
              <div className="zine__feature-pill glass">
                <span className="zine__pill-num">02</span>
                <span className="zine__pill-text">현장 즉석 인화 사진 부착</span>
              </div>
              <div className="zine__feature-pill glass">
                <span className="zine__pill-num">03</span>
                <span className="zine__pill-text">엽서는 한 달 뒤 실제 발송</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2} y={20}>
            <div className="zine__cta-wrap">
              <button
                type="button"
                className="btn zine__cta-btn"
                onClick={() => openBooking('t2')}
              >
                <span>나만의 책 만들러 가기</span>
                <span className="btn-arrow">
                  <Arrow />
                </span>
              </button>
              <p className="zine__cta-sub">
                * 매주 토요일 저녁 에이커북스토어 19:00 살롱에서 직접 제본하고 완성합니다
              </p>
            </div>
          </Reveal>
        </footer>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   Individual Page Renderers (8 Physical Panels)
   1~7: Equal Standard Gauge (동일 규격)
   8: Detachable Postcard (단독 엽서 규격 허용)
   ───────────────────────────────────────────────────────────── */

/**
 * 4-Axis Interactive Taste Star Rating Component (단맛, 산미, 바디, 여운)
 */
function StarRating({ value, onChange, label }) {
  return (
    <div className="zine-taste-item">
      <span className="zine-taste-label zine-font-book">• {label} :</span>
      <div className="zine-star-group" role="radiogroup" aria-label={`${label} 5점 만점 평점`}>
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= value
          return (
            <button
              key={star}
              type="button"
              className={`zine-star-btn ${isFilled ? 'is-filled' : 'is-empty'}`}
              onClick={(e) => {
                e.stopPropagation()
                onChange(star)
              }}
              title={`${label} ${star}점 선택`}
              aria-label={`${label} ${star}점`}
            >
              {isFilled ? '★' : '☆'}
            </button>
          )
        })}
      </div>
      <span className="zine-taste-val display italic">{value}/5</span>
    </div>
  )
}

function PageRenderer({ index, fields, updateField }) {
  switch (index) {
    case 0:
      return <CoverPanel fields={fields} updateField={updateField} />
    case 1:
      return <ProloguePanel fields={fields} updateField={updateField} />
    case 2:
      return <Chapter1Panel fields={fields} updateField={updateField} />
    case 3:
      return <Chapter2MenuPanel fields={fields} updateField={updateField} />
    case 4:
      return <Chapter2TastingPanel fields={fields} updateField={updateField} />
    case 5:
      return <Chapter3NightPanel />
    case 6:
      return <Chapter3ManuscriptPanel fields={fields} updateField={updateField} />
    case 7:
      return <PostcardPanel fields={fields} updateField={updateField} />
    default:
      return null
  }
}

/**
 * 1면: Cover Panel (완판본 스타일 표지)
 * 동일 표준 규격
 */
function CoverPanel({ fields, updateField }) {
  return (
    <div className="zine-page zine-page--standard zine-page--cover">
      <div className="zine-wanpan-border">
        {/* Top Header */}
        <div className="zine-cover__top-header">
          <span className="zine-cover__woodblock-tag zine-font-book">完板本 現代新刊</span>
          <span className="zine-cover__hanja-eyebrow zine-font-book">全州 深夜 風流錄</span>
        </div>

        {/* Center Wanpan Title Box (Classic Woodblock Upright Block) */}
        <div className="zine-cover__center-area">
          <div className="zine-wanpan-title-box" title="전주 심야 풍류록 목판 표제">
            <span className="zine-wanpan-title-text zine-font-book">전주 심야 풍류록</span>
          </div>
          <div className="zine-cover__hanja-sub zine-font-book">
            全 州 深 夜 風 流 錄
          </div>

          <div className="zine-cover__prompt-box">
            <div className="zine-cover__prompt-inner zine-font-book">
              [ <input
                type="text"
                className="zine-input zine-input--cover-topic zine-font-book"
                value={fields.bookTopic}
                onChange={(e) => updateField('bookTopic', e.target.value)}
                placeholder="〇〇"
                aria-label="책의 소주제"
              /> ]을(를)<br />
              찾아 떠난 어느 밤의 기록
            </div>
          </div>
        </div>

        {/* Bottom Colophon and Red Seal Stamp */}
        <div className="zine-cover__bottom-colophon">
          <div className="zine-cover__meta-left zine-font-book">
            <div className="zine-cover__meta-line">발행일 : 2026. 10. ___</div>
            <div className="zine-cover__meta-line zine-cover__author-line">
              <span>지은이 : </span>
              <input
                type="text"
                className="zine-input zine-input--cover-author zine-font-book"
                value={fields.authorName}
                onChange={(e) => updateField('authorName', e.target.value)}
                placeholder="당신의 이름"
                aria-label="저자 이름 기입"
              />
              <span className="zine-cover__author-in">(인)</span>
            </div>
          </div>

          <div className="zine-cover__stamp-box" title="완판본 초판 1쇄 검인">
            <div className="zine-cover__stamp zine-font-book">
              <span>完板本</span>
              <span>初版一刷</span>
            </div>
          </div>
        </div>

        <div className="zine-cover__publisher-tag zine-font-book">
          완판본문화관 × 삼양다방 × 에이커북스토어 합본
        </div>
      </div>
    </div>
  )
}

/**
 * 2면: Prologue Panel (저자 소개)
 * 동일 표준 규격
 */
function ProloguePanel({ fields, updateField }) {
  return (
    <div className="zine-page zine-page--standard zine-page--prologue">
      <div className="zine-page__inner-rule">
        <div className="zine-page__top-meta">
          <span className="zine-page__chapter-num display italic">02 · PROLOGUE</span>
          <span className="zine-page__chapter-label zine-font-book">작가의 말</span>
        </div>

        <h4 className="zine-page__heading zine-font-book">프롤로그 : 밤을 걷는 지은이</h4>

        <div className="zine-prologue__photo-mount">
          <div className="zine-photo-corner zine-photo-corner--tl" />
          <div className="zine-photo-corner zine-photo-corner--tr" />
          <div className="zine-photo-corner zine-photo-corner--bl" />
          <div className="zine-photo-corner zine-photo-corner--br" />

          <div className="zine-prologue__photo-inner">
            <div className="zine-prologue__photo-preview">
              <img
                src="/images/hanbok-detail.jpg"
                alt="골든아워 집필하는 여행자 스냅"
                loading="lazy"
                width="140"
                height="160"
              />
              <div className="zine-prologue__photo-badge zine-font-book">작가의 초상 스냅</div>
            </div>
            <p className="zine-prologue__photo-desc zine-font-book">
              골든아워 동문길 또는 서가 스냅 즉석 인화본 1매 부착
            </p>
          </div>
        </div>

        <div className="zine-prologue__prompt-box zine-font-book">
          <p className="zine-prologue__q-title"><strong>Q1. 오늘의 지은이 소개</strong></p>
          <p className="zine-prologue__sentence">
            오늘 하루,{' '}
            <span className="zine-input-inline-wrap">
              <input
                type="text"
                className="zine-input zine-input--inline zine-font-book"
                value={fields.originCity}
                onChange={(e) => updateField('originCity', e.target.value)}
                placeholder="출발지"
                aria-label="출발 도시"
              />
            </span>
            에서 온 나는 일상의 역할을 잠시 내려놓고,{' '}
            <span className="zine-input-inline-wrap zine-input-inline-wrap--wide">
              <input
                type="text"
                className="zine-input zine-input--inline zine-font-book"
                value={fields.myState}
                onChange={(e) => updateField('myState', e.target.value)}
                placeholder="어떤 상태의 나"
                aria-label="오늘의 마음 상태"
              />
            </span>
            상태의 나로 전주 원도심을 걷는다.
          </p>
        </div>

        <div className="zine-prologue__ambient-box zine-font-book">
          <strong>오늘의 날씨와 BGM :</strong><br />
          <span>공기의 온도 [ </span>
          <input
            type="text"
            className="zine-input zine-input--inline zine-input--temp zine-font-book"
            value={fields.weatherTemp}
            onChange={(e) => updateField('weatherTemp', e.target.value)}
            placeholder="18℃ 선선함"
            aria-label="공기의 온도"
          />
          <span> ] / 음악 [ </span>
          <input
            type="text"
            className="zine-input zine-input--inline zine-input--bgm zine-font-book"
            value={fields.bgmTrack}
            onChange={(e) => updateField('bgmTrack', e.target.value)}
            placeholder="마음의 BGM"
            aria-label="음악 선곡"
          />
          <span> ]</span>
        </div>

        <div className="zine-prologue__signature-row zine-font-book">
          <span className="zine-prologue__sig-label">지은이 서명:</span>
          <span className="zine-prologue__sig-name">{fields.authorName || '무명 작가'}</span>
          <span className="zine-prologue__sig-date display italic">2026. Saturday Night</span>
        </div>
      </div>
    </div>
  )
}

/**
 * 3면: Chapter 1 Panel (기록의 뿌리)
 * 동일 표준 규격
 */
function Chapter1Panel({ fields, updateField }) {
  return (
    <div className="zine-page zine-page--standard zine-page--chapter1">
      <div className="zine-page__inner-rule">
        <div className="zine-page__top-meta">
          <span className="zine-page__chapter-num display italic">03 · CHAPTER 1</span>
          <span className="zine-page__chapter-label zine-font-book">15:30 완판본문화관</span>
        </div>

        <div className="zine-ch1__hanja-bg" aria-hidden="true">
          錄
        </div>

        <h4 className="zine-page__heading zine-font-book">제1장. 기록의 뿌리를 걷다</h4>

        <div className="zine-ch1__prompt-card zine-font-book">
          <p className="zine-ch1__prompt-lead">
            <strong>Q1. 목판에 새길 단 한 문장</strong><br />
            최초의 한글 대중문학이 꽃핀 전주의 옛 목판처럼, 내가 나무에 새겨 오래 남기고 싶은 문장은?
          </p>

          <div className="zine-ch1__woodplate-area">
            <span className="zine-ch1__wood-grain" aria-hidden="true" />
            <textarea
              className="zine-textarea zine-textarea--wood zine-font-book"
              value={fields.sentence}
              onChange={(e) => updateField('sentence', e.target.value)}
              rows={3}
              placeholder="나무에 새길 문장을 적어보세요..."
              aria-label="나무에 새길 문장"
            />
            <div className="zine-ch1__woodplate-footer zine-font-book">
              <span className="zine-ch1__wood-tag">완판본 서각 필경 란</span>
              <span className="zine-ch1__wood-seal">鐫 (새길 전)</span>
            </div>
          </div>
        </div>

        <div className="zine-ch1__stamp-mount">
          <div className="zine-ch1__stamp-box">
            <div className="zine-ch1__real-stamp">
              <div className="zine-ch1__stamp-inner zine-font-book">
                <span>完判本</span>
                <span>印記</span>
              </div>
            </div>
            <div className="zine-ch1__stamp-desc zine-font-book">
              <p className="zine-ch1__stamp-title">골목 캔디드 스케치 or 완판본 스탬프</p>
              <p className="zine-ch1__stamp-sub">전통 한지에 먹으로 직접 찍은 목판 낙관 날인란</p>
            </div>
          </div>
        </div>

        <div className="zine-ch1__scene-prompt zine-font-book">
          <strong>Q2. 오후 4시의 시선 : </strong>
          <span>동문길로 걸어오며 내 발걸음을 멈추게 한 장면은?</span>
          <input
            type="text"
            className="zine-input zine-input--scene zine-font-book"
            value={fields.sceneAt4pm}
            onChange={(e) => updateField('sceneAt4pm', e.target.value)}
            placeholder="발걸음을 멈추게 한 장면..."
            aria-label="오후 4시의 시선"
          />
        </div>
      </div>
    </div>
  )
}

/**
 * 4면: Chapter 2A (동문길 만찬 주안상 - 센터 스프레드 좌측)
 * 동일 표준 규격
 * 폰트 적용: var(--font-book) 고운바탕, 나눔명조, 노토세리프 전면 적용
 */
function Chapter2MenuPanel({ fields, updateField }) {
  return (
    <div className="zine-page zine-page--standard zine-page--chapter2-menu spread-left">
      <div className="zine-page__inner-rule">
        <div className="zine-page__top-meta">
          <span className="zine-page__chapter-num display italic">04 · CHAPTER 2 (LEFT)</span>
          <span className="zine-page__chapter-label zine-font-book">17:00 삼양다방(1952~)</span>
        </div>

        <h4 className="zine-page__heading zine-font-book">제2장. 동문길의 밤과 풍류 만찬</h4>

        {/* Mounted Menu Card with Washi Tape - Pure Serif Typography */}
        <div className="zine-ch2__menu-card">
          <div className="zine__washi-tape zine__washi-tape--top-left" />
          <div className="zine__washi-tape zine__washi-tape--top-right" />

          <div className="zine-ch2__menu-header">
            <span className="display italic zine-ch2__menu-en-title">SINCE 1952 · DONGMUN-GIL SALON</span>
            <span className="zine-ch2__menu-stamp zine-font-book">三陽茶房</span>
          </div>

          <h5 className="zine-ch2__menu-korean-title zine-font-book">三 陽 風 流 酒 案 床</h5>
          <p className="zine-ch2__menu-sub-desc zine-font-book">삼양다방 심야 풍류 주안상 & 로컬 전통주 페어링</p>

          <ul className="zine-ch2__menu-list zine-font-book">
            <li>
              <span className="zine-ch2__course-badge zine-font-book">제1미</span>
              <div className="zine-ch2__course-info">
                <strong className="zine-font-book">계절 나물 메밀전병과 한입 주전부리</strong>
                <span className="zine-font-book">× 로컬 약주 (청주)</span>
              </div>
            </li>
            <li>
              <span className="zine-ch2__course-badge zine-font-book">제2미</span>
              <div className="zine-ch2__course-info">
                <strong className="zine-font-book">동문길 수제 맥적(貊炙)구이와 반상</strong>
                <span className="zine-font-book">× 수제 순곡 탁주</span>
              </div>
            </li>
            <li>
              <span className="zine-ch2__course-badge zine-font-book">제3미</span>
              <div className="zine-ch2__course-info">
                <strong className="zine-font-book">수제 곶감 호두말이 & 다과</strong>
                <span className="zine-font-book">× 전주 이강주 (또는 증류주)</span>
              </div>
            </li>
          </ul>

          <div className="zine-ch2__menu-footer zine-font-book">
            <span>“술은 기호식품이 아닌 반주(飯酒) 문화입니다.”</span>
          </div>
        </div>

        {/* Q1. 나만의 풍류 정의 */}
        <div className="zine-ch2__pungryu-prompt zine-font-book">
          <p className="zine-ch2__pungryu-title"><strong>Q1. 나만의 풍류(風流) 정의</strong></p>
          <p className="zine-ch2__pungryu-sentence">
            옛 선비에게 풍류가 시와 술이었다면, 오늘 저녁 삼양다방에 앉아 있는 나에게 풍류란 [
            <input
              type="text"
              className="zine-input zine-input--inline zine-input--pungryu zine-font-book"
              value={fields.myPungryu}
              onChange={(e) => updateField('myPungryu', e.target.value)}
              placeholder="나만의 풍류"
              aria-label="풍류 정의"
            />
            ]이다.
          </p>
        </div>

        <div className="zine-ch2__footer-guide zine-font-book">
          <span>▶ 우측 페이지로 만찬 기록이 이어집니다</span>
          <span className="zine-ch2__mini-stamp zine-font-book">三陽</span>
        </div>
      </div>
    </div>
  )
}

/**
 * 5면: Chapter 2B (미식 시음 노트 - 센터 스프레드 우측)
 * 동일 표준 규격
 * 4축 테이스팅 스타 레이팅: 단맛, 산미, 바디, 여운
 */
function Chapter2TastingPanel({ fields, updateField }) {
  return (
    <div className="zine-page zine-page--standard zine-page--chapter2-tasting spread-right">
      <div className="zine-page__inner-rule">
        <div className="zine-page__top-meta">
          <span className="zine-page__chapter-num display italic">05 · CHAPTER 2 (RIGHT)</span>
          <span className="zine-page__chapter-label zine-font-book">풍류 주안상 노트</span>
        </div>

        <h4 className="zine-page__heading zine-font-book">반주(飯酒)와 미식 에세이</h4>

        {/* Q2. 오늘 나를 가장 위로한 한 입과 한 모금 */}
        <div className="zine-tasting__dish-drink-box zine-font-book">
          <p className="zine-tasting__box-title">
            <strong>Q2. 오늘 나를 가장 위로한 한 입과 한 모금</strong>
          </p>
          <div className="zine-tasting__input-row">
            <span className="zine-tasting__dot">• 요리 : </span>
            <input
              type="text"
              className="zine-input zine-input--inline zine-input--dish zine-font-book"
              value={fields.favoriteDish}
              onChange={(e) => updateField('favoriteDish', e.target.value)}
              placeholder="예: 동문길 수제 맥적구이"
              aria-label="위로가 된 요리"
            />
          </div>
          <div className="zine-tasting__input-row">
            <span className="zine-tasting__dot">• 전통주 : </span>
            <input
              type="text"
              className="zine-input zine-input--inline zine-input--drink zine-font-book"
              value={fields.favoriteDrink}
              onChange={(e) => updateField('favoriteDrink', e.target.value)}
              placeholder="예: 전주 이강주 25°"
              aria-label="기억에 남는 술"
            />
          </div>
        </div>

        {/* 4-Axis Taste Star Graph (단맛, 산미, 바디, 여운) */}
        <div className="zine-taste-graph" aria-label="전통주 4축 테이스팅 그래프">
          <div className="zine-taste-graph__header">
            <span className="zine-taste-graph__title zine-font-book">미식 테이스팅 4축 지수</span>
            <span className="zine-taste-graph__sub display italic">Taste Rating</span>
          </div>
          <div className="zine-taste-grid">
            <StarRating
              label="단맛"
              value={fields.sweetness}
              onChange={(v) => updateField('sweetness', v)}
            />
            <StarRating
              label="산미"
              value={fields.acidity}
              onChange={(v) => updateField('acidity', v)}
            />
            <StarRating
              label="바디"
              value={fields.body}
              onChange={(v) => updateField('body', v)}
            />
            <StarRating
              label="여운"
              value={fields.finish}
              onChange={(v) => updateField('finish', v)}
            />
          </div>
        </div>

        {/* Q3. 미각의 문장화 */}
        <div className="zine-tasting__flavor-box zine-font-book">
          <p className="zine-tasting__box-title">
            <strong>Q3. 미각의 문장화 : </strong>
            <span>술과 음식이 어우러진 맛을 계절이나 색깔로 묘사한다면?</span>
          </p>
          <textarea
            className="zine-textarea zine-textarea--lines zine-font-book"
            value={fields.tastingNote}
            onChange={(e) => updateField('tastingNote', e.target.value)}
            rows={2}
            placeholder="맛과 풍경을 자유롭게 기록하세요..."
            aria-label="미각의 문장화 에세이"
          />
        </div>

        {/* 취중진담 한 줄 */}
        <div className="zine-tasting__warm-words-box zine-font-book">
          <p className="zine-tasting__warm-title">
            <strong>취중진담(醉中眞談) 한 줄 :</strong>
          </p>
          <p className="zine-tasting__warm-sub">기분 좋은 온기가 오른 지금, 나에게 건네는 다정한 말 한마디.</p>
          <div className="zine-tasting__quote-line">
            “ <input
              type="text"
              className="zine-input zine-input--quote zine-font-book"
              value={fields.warmWords}
              onChange={(e) => updateField('warmWords', e.target.value)}
              placeholder="나에게 건네는 따뜻한 말"
              aria-label="취중진담 한 줄"
            /> ”
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * 6면: Chapter 3A (불 켜진 심야 서점 - 서재 스프레드 좌측)
 * 동일 표준 규격
 */
function Chapter3NightPanel() {
  return (
    <div className="zine-page zine-page--standard zine-page--chapter3-night">
      <div className="zine-page__inner-rule">
        <div className="zine-page__top-meta">
          <span className="zine-page__chapter-num display italic">Chapter 3 · Page 6</span>
          <span className="zine-page__chapter-label">에이커북스토어 · 19:00</span>
        </div>

        <h4 className="zine-page__heading serif">불 켜진 심야 서재의 문장</h4>

        <div className="zine-ch3__bookstore-photo">
          <div className="zine__washi-tape zine__washi-tape--top-center" />
          <img
            src="/images/bookstore-night.jpg"
            alt="영업 종료 후 심야 책방 풍경"
            loading="lazy"
            width="220"
            height="145"
          />
          <p className="zine-ch3__photo-caption serif">
            영업 종료 후, 우리에게만 열린 에이커북스토어 19:40
          </p>
        </div>

        <div className="zine-ch3__prompt-card">
          <p className="zine-ch3__prompt-text serif">
            “낮의 이성적인 나였다면 고르지 않았을지도 모를, 오늘 밤의 내가 이끌린 책 한 권과 그 속의 문장.”
          </p>
        </div>

        <div className="zine-ch3__rx-seal">
          <div className="zine-ch3__seal-ring">
            <span className="zine-ch3__seal-arc display italic">ACER BOOKSTORE</span>
            <span className="zine-ch3__seal-core serif">深夜處方</span>
            <span className="zine-ch3__seal-date display italic">2026 · 全州</span>
          </div>
          <p className="zine-ch3__seal-desc serif">
            책방지기의 심야 처방 문장 스탬프 날인란
          </p>
        </div>
      </div>
    </div>
  )
}

/**
 * 7면: Chapter 3B (200자 원고지 집필 란 - 서재 스프레드 우측)
 * 동일 표준 규격
 */
function Chapter3ManuscriptPanel({ fields, updateField }) {
  const sampleChars = (fields.manuscriptText || '').split('').slice(0, 36)

  return (
    <div className="zine-page zine-page--standard zine-page--chapter3-manuscript">
      <div className="zine-page__inner-rule">
        <div className="zine-page__top-meta">
          <span className="zine-page__chapter-num display italic">Manuscript · Page 7</span>
          <span className="zine-page__chapter-label">200자 원고지 집필</span>
        </div>

        <div className="zine-ch3__manuscript-wrap">
          <div className="zine-ch3__manuscript-header">
            <span className="zine-ch3__ms-title serif">全州 深夜 風流 原稿紙</span>
            <span className="zine-ch3__ms-counter display italic">20 × 10</span>
          </div>

          {/* Manuscript grid frame */}
          <div className="zine-ch3__wongoji-grid" aria-label="원고지 입력 그리드">
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} className="zine-ch3__wongoji-cell">
                <span className="zine-ch3__wongoji-char serif">
                  {sampleChars[i] || ''}
                </span>
              </div>
            ))}
          </div>

          {/* Interactive textarea updating manuscript */}
          <div className="zine-ch3__input-wrap">
            <label htmlFor="ch3-manuscript-input" className="zine-ch3__input-label serif">
              원고지 문장 입력하기:
            </label>
            <textarea
              id="ch3-manuscript-input"
              className="zine-textarea zine-textarea--manuscript serif"
              value={fields.manuscriptText}
              onChange={(e) => updateField('manuscriptText', e.target.value)}
              rows={3}
              placeholder="책방에서 발견한 문장을 적어주세요..."
            />
          </div>
        </div>

        <div className="zine-page__footer-note">
          전라감영길 독립서점 · 종이 냄새와 나만의 활자
        </div>
      </div>
    </div>
  )
}

/**
 * 8면: Epilogue & Detachable Postcard Panel (엽서)
 * 단독 엽서 규격 허용!
 */
function PostcardPanel({ fields, updateField }) {
  return (
    <div className="zine-page zine-page--postcard">
      {/* Detachable Perforation Line (미싱선) */}
      <div className="zine-postcard__perforation" aria-hidden="true">
        <span className="zine-postcard__perf-tag display italic">TEAR OFF · 절취선</span>
        <span className="zine-postcard__perf-line" />
      </div>

      <div className="zine-postcard__body">
        <div className="zine-page__top-meta">
          <span className="zine-page__chapter-num display italic">Epilogue · Page 8</span>
          <span className="zine-page__chapter-label">Postcard to Future Me</span>
        </div>

        {/* Postcard Layout */}
        <div className="zine-postcard__card-surface">
          <div className="zine-postcard__header-row">
            <div className="zine-postcard__title-block">
              <span className="zine-postcard__main-tag display italic">Post Card</span>
              <p className="zine-postcard__sub-prompt serif">
                “계절이 바뀐 뒤 다시 전주를 찾을 나에게 보내는 짧은 편지.”
              </p>
            </div>

            {/* Vintage Postage Stamp Box */}
            <div className="zine-postcard__stamp-box">
              <div className="zine-postcard__stamp-serration">
                <span className="zine-postcard__stamp-kr serif">全州 우표</span>
                <span className="zine-postcard__stamp-val display italic">₩430</span>
                <span className="zine-postcard__stamp-motif serif">風流</span>
              </div>
              <span className="zine-postcard__stamp-caption">우표 붙이는 곳</span>
            </div>
          </div>

          {/* Postcard Message & Address Grid */}
          <div className="zine-postcard__grid">
            <div className="zine-postcard__message-col">
              <textarea
                className="zine-textarea zine-textarea--postcard serif"
                value={fields.postcardMessage}
                onChange={(e) => updateField('postcardMessage', e.target.value)}
                rows={5}
                placeholder="미래의 나에게 부칠 편지를 써보세요..."
                aria-label="미래의 나에게 보내는 편지"
              />
            </div>

            <div className="zine-postcard__address-col">
              <div className="zine-postcard__field">
                <label className="zine-postcard__field-label serif">To (받는 사람):</label>
                <input
                  type="text"
                  className="zine-input zine-input--underline serif"
                  value={fields.postcardTo}
                  onChange={(e) => updateField('postcardTo', e.target.value)}
                  placeholder="미래의 나에게"
                />
              </div>

              <div className="zine-postcard__field">
                <label className="zine-postcard__field-label serif">Address (주소):</label>
                <input
                  type="text"
                  className="zine-input zine-input--underline serif"
                  value={fields.postcardAddress}
                  onChange={(e) => updateField('postcardAddress', e.target.value)}
                  placeholder="한 달 뒤 받을 나의 주소"
                />
              </div>

              {/* Real Postmark Seal */}
              <div className="zine-postcard__postmark">
                <div className="zine-postmark-circle">
                  <span className="display italic">JEONJU</span>
                  <strong>30 DAYS</strong>
                  <span className="display italic">LATER</span>
                </div>
                <p className="zine-postcard__fulfillment-note serif">
                  * 에이커북스토어 우체통에 넣으시면 30일 뒤 귀하의 자택으로 실제 발송됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
