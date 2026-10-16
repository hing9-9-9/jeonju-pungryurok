import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { zine } from '../content.js'
import { Reveal, SplitLines, Arrow } from './motion.jsx'
import { useBooking } from '../booking.jsx'
import './Zine.css'

// 4-axis Star Rating Component (1~5 stars)
function StarRating({ label, value = 3, onChange }) {
  return (
    <div className="zine-star-rating" role="group" aria-label={label}>
      <span className="zine-star-rating__label">• {label} :</span>
      <div className="zine-star-rating__stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`zine-star-btn ${star <= value ? 'zine-star-btn--filled' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              onChange(star)
            }}
            aria-label={`${label} ${star}점`}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Zine() {
  const { openBooking } = useBooking()

  // View Mode: 'accordion' (3D folded) | 'flat' (flat strip)
  const [viewMode, setViewMode] = useState('accordion')
  const [activePageIndex, setActivePageIndex] = useState(0)

  // 4-axis taste ratings
  const [ratings, setRatings] = useState({
    sweetness: 3,
    acidity: 4,
    body: 4,
    finish: 5,
  })

  const stripRef = useRef(null)

  const updateRating = (axis, score) => {
    setRatings((prev) => ({ ...prev, [axis]: score }))
  }

  // Smooth scroll strip horizontally on desktop/mobile
  const scrollToPage = (index) => {
    setActivePageIndex(index)
    if (stripRef.current) {
      const pageEl = stripRef.current.children[index]
      if (pageEl) {
        pageEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      }
    }
  }

  const handlePrev = () => {
    const nextIdx = Math.max(0, activePageIndex - 1)
    scrollToPage(nextIdx)
  }

  const handleNext = () => {
    const nextIdx = Math.min(7, activePageIndex + 1)
    scrollToPage(nextIdx)
  }

  // Track active page on mobile / horizontal scroll
  useEffect(() => {
    const el = stripRef.current
    if (!el) return

    const onScroll = () => {
      const scrollLeft = el.scrollLeft
      const pageWidth = 240
      const idx = Math.min(7, Math.max(0, Math.round(scrollLeft / pageWidth)))
      setActivePageIndex(idx)
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="zine" className="section zine-section" aria-labelledby="zine-title">
      <div className="container zine__container">
        {/* Section Header */}
        <header className="zine__header">
          <Reveal>
            <span className="eyebrow zine__eyebrow">{zine.eyebrow}</span>
          </Reveal>
          <h2 id="zine-title" className="zine__title">
            <SplitLines text={zine.title} />
          </h2>
          <Reveal delay={0.15}>
            <p className="zine__lead">{zine.body}</p>
          </Reveal>
        </header>

        {/* View Mode & Navigation Controls (No Emojis) */}
        <div className="zine__controls-bar">
          <div className="zine__mode-toggles" role="tablist" aria-label="병풍 관람 모드">
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'accordion'}
              className={`zine__mode-btn ${viewMode === 'accordion' ? 'zine__mode-btn--active' : ''}`}
              onClick={() => setViewMode('accordion')}
            >
              3D 병풍 접힘
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'flat'}
              className={`zine__mode-btn ${viewMode === 'flat' ? 'zine__mode-btn--active' : ''}`}
              onClick={() => setViewMode('flat')}
            >
              전체 펼쳐보기
            </button>
          </div>

          <div className="zine__page-nav">
            <button
              type="button"
              className="zine__nav-arrow-btn"
              onClick={handlePrev}
              disabled={activePageIndex === 0}
              aria-label="이전 면 보기"
            >
              ‹
            </button>
            <span className="zine__page-indicator">
              {activePageIndex + 1} / 8면
            </span>
            <button
              type="button"
              className="zine__nav-arrow-btn"
              onClick={handleNext}
              disabled={activePageIndex === 7}
              aria-label="다음 면 보기"
            >
              ›
            </button>
          </div>
        </div>

        {/* Accordion Book Stage: Strict 8-Panel Strip (240px × 360px per page) */}
        <div className={`zine__stage-wrapper zine__stage-wrapper--${viewMode}`}>
          <div
            ref={stripRef}
            className={`zine__accordion-strip zine__accordion-strip--${viewMode}`}
            style={{ '--active-idx': activePageIndex }}
          >
            {/* ── [1면] 표지 (Clear / 선명) ── */}
            <div
              className={`zine-page zine-page--1 ${activePageIndex === 0 ? 'zine-page--active' : ''}`}
              onClick={() => scrollToPage(0)}
            >
              <div className="inner-frame">
                <div className="page-head-row">
                  <span className="hanja-top-tag">完板本 現代新刊</span>
                  <div className="stamp stamp--red">全州<br />風流</div>
                </div>

                <div className="cover-title-box">
                  <div className="cover-sub-prompt">[ 달빛과 취기 ]을 찾아 떠난</div>
                  <div className="cover-main-title">전주 심야 풍류록</div>
                  <div className="cover-hanja-sub">全 州 深 夜 風 流 錄</div>
                </div>

                <div className="vertical-sub">어느 해 질 녘의 미식과 심야 서점의 기록</div>

                <div className="cover-footer">
                  <div>발행일 : 2026년 10월 24일</div>
                  <div style={{ marginTop: '3px' }}>지은이 : 밤의 방랑자 (인)</div>
                </div>
              </div>
              <div className="page-num">- 01 (표지) -</div>
            </div>

            {/* ── [2면] 프롤로그 : 작가의 초상 (Blurred for IP) ── */}
            <div
              className={`zine-page zine-page--2 zine-page--blurred ${activePageIndex === 1 ? 'zine-page--active' : ''}`}
              onClick={() => scrollToPage(1)}
            >
              <div className="inner-frame">
                <div>
                  <span className="chapter-tag">PROLOGUE · 저자 소개</span>
                  <h2 className="page-title">오늘 밤, 문인이 되어<br />원도심을 걷다</h2>

                  <div className="page-blur-container">
                    <div className="page-blur-content">
                      <div className="photo-slot" style={{ height: '110px', margin: '8px 0' }}>
                        <svg className="slot-cam-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                          <circle cx="12" cy="13" r="4" />
                        </svg>
                        <strong>[작가의 초상 스냅 사진]</strong>
                        <span>골든아워의 동문길 또는<br />나만의 시그니처 드로잉 부착</span>
                      </div>
                      <div className="prompt-box">
                        <strong>Q1.</strong> 오늘 하루, 익산에서 온 나는 일상의 역할을 잠시 내려놓고, 조금은 헐렁한 상태의 나로 이 거리를 걷는다.
                      </div>
                      <div className="prompt-box" style={{ marginBottom: 0 }}>
                        <strong>Q2.</strong> 전주의 저녁 공기가 건네는 첫인상과 지금 내 마음의 배경음악(BGM)은?
                        <div className="full-line"></div>
                      </div>
                    </div>

                    <div className="secret-seal-overlay">
                      <div className="secret-seal">
                        <span className="secret-seal__hanja">非公開</span>
                        <span className="secret-seal__text">현장 전용 시크릿 워크북</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="page-num">- 02 -</div>
            </div>

            {/* ── [3면] 제1장 : 완판본문화관 (Blurred for IP) ── */}
            <div
              className={`zine-page zine-page--3 zine-page--blurred ${activePageIndex === 2 ? 'zine-page--active' : ''}`}
              onClick={() => scrollToPage(2)}
            >
              <div className="inner-frame">
                <div>
                  <span className="chapter-tag">CHAPTER 1 · 기록의 뿌리</span>
                  <h2 className="page-title">완판본(完板本),<br />나무에 새긴 마음</h2>

                  <div className="page-blur-container">
                    <div className="page-blur-content">
                      <div className="prompt-box">
                        <strong>Q1. 오래된 문장 수집</strong><br />
                        수백 년 전 전주의 목판에 새겨졌던 한글 이야기처럼, 내가 단 한 문장을 나무에 새겨 오래 남길 수 있다면?
                        <div className="woodblock-quote-box">
                          “ 나무는 썩어도 새겨진 문장은 시간을 건넌다. ”
                        </div>
                      </div>
                      <div className="prompt-box">
                        <strong>Q2. 골목의 시선</strong><br />
                        동문길로 걸어오는 길, 내 발걸음을 멈추게 한 해 질 녘의 장면은?
                      </div>
                      <div className="photo-slot" style={{ height: '65px' }}>
                        <strong>[현장 캔디드 사진 1]</strong>
                        <span>완판본 스탬프 또는 골목 풍경</span>
                      </div>
                    </div>

                    <div className="secret-seal-overlay">
                      <div className="secret-seal">
                        <span className="secret-seal__hanja">非公開</span>
                        <span className="secret-seal__text">현장 전용 시크릿 워크북</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="page-num">- 03 -</div>
            </div>

            {/* ── [4면] 제2장 (좌) : 삼양다방 만찬 (Blurred for IP) ── */}
            <div
              className={`zine-page zine-page--4 zine-page--blurred ${activePageIndex === 3 ? 'zine-page--active' : ''}`}
              onClick={() => scrollToPage(3)}
            >
              <div className="inner-frame">
                <div>
                  <span className="chapter-tag">CHAPTER 2 · 동문길의 풍류 (1/2)</span>
                  <h2 className="page-title">1952년 삼양다방,<br />향음주례(鄕飮酒禮)의 밤</h2>

                  <div className="page-blur-container">
                    <div className="page-blur-content">
                      <div className="prompt-box">
                        <strong>Q1. 오늘의 풍류 정의</strong><br />
                        옛 선비에게 풍류가 시와 술이었다면, 오늘 밤 나에게 '풍류'란 [ 다정한 술 한잔 ]이다.
                      </div>
                      <div className="photo-slot" style={{ height: '85px', margin: '6px 0' }}>
                        <strong>[주안상 메뉴 카드 / 사진]</strong>
                        <span>삼양다방 한식 다이닝 &<br />전통주 라벨 콜라주 부착란</span>
                      </div>
                      <div className="prompt-box" style={{ marginBottom: 0 }}>
                        <strong>Q2. 위로가 된 한 입과 한 모금</strong><br />
                        • 오늘의 요리 : 동문길 수제 맥적구이<br />
                        • 오늘의 전통주 : 전주 이강주 25°
                      </div>
                    </div>

                    <div className="secret-seal-overlay">
                      <div className="secret-seal">
                        <span className="secret-seal__hanja">非公開</span>
                        <span className="secret-seal__text">현장 전용 시크릿 워크북</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="page-num">- 04 (센터 펼침 좌) -</div>
            </div>

            {/* ── [5면] 제2장 (우) : 테이스팅 노트 & 4축 별점 ── */}
            <div
              className={`zine-page zine-page--5 ${activePageIndex === 4 ? 'zine-page--active' : ''}`}
              onClick={() => scrollToPage(4)}
            >
              <div className="inner-frame">
                <div>
                  <span className="chapter-tag">CHAPTER 2 · 동문길의 풍류 (2/2)</span>
                  <h2 className="page-title">미훈(微醺)의 기록,<br />기분 좋은 취기 속에서</h2>

                  {/* 4축 별점 인터랙션 (호평받은 기능 실시간 활성화) */}
                  <div className="taste-grid">
                    <StarRating label="단맛" value={ratings.sweetness} onChange={(v) => updateRating('sweetness', v)} />
                    <StarRating label="산미" value={ratings.acidity} onChange={(v) => updateRating('acidity', v)} />
                    <StarRating label="바디감" value={ratings.body} onChange={(v) => updateRating('body', v)} />
                    <StarRating label="여운" value={ratings.finish} onChange={(v) => updateRating('finish', v)} />
                  </div>

                  {/* 비공개 심층 미식 질문 영역 블러 처리 */}
                  <div className="page-blur-container" style={{ marginTop: '8px' }}>
                    <div className="page-blur-content">
                      <div className="prompt-box">
                        <strong>Q3. 미각의 언어화</strong><br />
                        첫 잔을 마셨을 때 입안에 퍼진 맛을 계절이나 풍경으로 묘사한다면?
                        <div className="full-line"></div>
                        <div className="full-line"></div>
                      </div>

                      <div className="prompt-box" style={{ marginBottom: 0 }}>
                        <strong>Q4. 취중진담(醉中眞談)</strong><br />
                        기분 좋은 온기가 올라오는 지금, 평소 나에게 건네지 못했던 다정한 말 한마디는?
                        <div className="full-line"></div>
                      </div>
                    </div>

                    <div className="secret-seal-overlay">
                      <div className="secret-seal">
                        <span className="secret-seal__hanja">非公開</span>
                        <span className="secret-seal__text">투어 전용 미식 질문</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="page-num">- 05 (센터 펼침 우) -</div>
            </div>

            {/* ── [6면] 제3장 : 심야 책방 (Blurred for IP) ── */}
            <div
              className={`zine-page zine-page--6 zine-page--blurred ${activePageIndex === 5 ? 'zine-page--active' : ''}`}
              onClick={() => scrollToPage(5)}
            >
              <div className="inner-frame">
                <div>
                  <span className="chapter-tag">CHAPTER 3 · 19:00 심야 서점</span>
                  <h2 className="page-title">불 꺼진 전라감영길,<br />에이커북스토어를 열다</h2>

                  <div className="page-blur-container">
                    <div className="page-blur-content">
                      <div className="prompt-box">
                        <strong>Q1. 우연한 문장과의 조우</strong><br />
                        낮의 이성적인 나였다면 고르지 않았을지도 모를, 오늘 밤의 내가 이끌린 책과 문장.
                        <div className="book-quote-row">
                          📖 책 제목 : 《 밤은 이야기하기에 좋은 시간 》
                        </div>
                        <div className="full-line"></div>
                      </div>
                      <div className="prompt-box">
                        <strong>Q2. 심야의 단상</strong><br />
                        전통주의 온기와 책방의 종이 냄새가 섞인 지금, 이 문장이 내 마음을 두드린 이유.
                        <div className="full-line"></div>
                      </div>
                      <div style={{ textAlign: 'right', fontSize: '9px', color: 'var(--stamp-red)', marginTop: '4px' }}>
                        [에이커 심야 처방 스탬프 날인란]
                      </div>
                    </div>

                    <div className="secret-seal-overlay">
                      <div className="secret-seal">
                        <span className="secret-seal__hanja">非公開</span>
                        <span className="secret-seal__text">현장 전용 시크릿 워크북</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="page-num">- 06 -</div>
            </div>

            {/* ── [7면] 에필로그 : 롤링페이퍼 (Blurred for IP) ── */}
            <div
              className={`zine-page zine-page--7 zine-page--blurred ${activePageIndex === 6 ? 'zine-page--active' : ''}`}
              onClick={() => scrollToPage(6)}
            >
              <div className="inner-frame">
                <div>
                  <span className="chapter-tag">EPILOGUE · 여운을 나누며</span>
                  <h2 className="page-title">오늘 밤의 전주를<br />세 단어로 기억하다</h2>

                  <div className="page-blur-container">
                    <div className="page-blur-content">
                      <div className="hashtag-row">
                        <span className="hashtag-pill">#완판본</span>
                        <span className="hashtag-pill">#동문길</span>
                        <span className="hashtag-pill">#심야서점</span>
                      </div>
                      <div className="prompt-box">
                        <strong>동행자의 시선 (Comment)</strong><br />
                        함께 밤을 걸은 여행자 또는 책방지기님이 내 기록을 읽고 남겨주는 다정한 한 줄.
                        <div className="rolling-paper-slot">
                          (서로의 Zine을 바꿔 읽고 코멘트와 사인을 남겨주세요)
                        </div>
                      </div>
                    </div>

                    <div className="secret-seal-overlay">
                      <div className="secret-seal">
                        <span className="secret-seal__hanja">非公開</span>
                        <span className="secret-seal__text">현장 전용 롤링페이퍼</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="page-num">- 07 -</div>
            </div>

            {/* ── [8면] 절취형 엽서 (Clear / 선명) ── */}
            <div
              className={`zine-page zine-page--8 perforated-left ${activePageIndex === 7 ? 'zine-page--active' : ''}`}
              onClick={() => scrollToPage(7)}
            >
              <span className="cut-icon" aria-hidden="true">✂ 절취선</span>
              <div className="inner-frame" style={{ borderStyle: 'dashed' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span className="chapter-tag" style={{ color: 'var(--stamp-red)', borderColor: 'var(--stamp-red)' }}>
                      POSTCARD · 한 달 뒤 우체통
                    </span>
                    <div className="stamp-box">우표</div>
                  </div>
                  <h2 className="page-title" style={{ fontSize: '13px' }}>
                    계절이 바뀐 뒤,<br />다시 만날 나에게
                  </h2>

                  <div className="photo-slot" style={{ height: '85px', margin: '6px 0' }}>
                    <strong>[베스트 포토 1매 부착]</strong>
                    <span>오늘 가장 마음에 들었던 순간</span>
                  </div>

                  <div className="prompt-box" style={{ fontSize: '9.5px' }}>
                    한 달 뒤 이 엽서를 우편으로 받아볼 나에게 보내는 편지
                    <div className="full-line"></div>
                    <div className="full-line"></div>
                    <div className="postcard-address-info">
                      받을 주소 : 전북 전주시 완산구 동문길 42<br />
                      받는 사람 : 미래의 나에게
                    </div>
                  </div>
                </div>
              </div>
              <div className="page-num">- 08 (절취형 엽서) -</div>
            </div>
          </div>
        </div>

        {/* Bottom Feature Badges & CTA (No Emojis) */}
        <div className="zine__features-row">
          <div className="zine__feature-pill">
            <span className="zine__feature-bullet">✦</span>
            <span>질문 프롬프트로 백지의 공포 해소</span>
          </div>
          <div className="zine__feature-pill">
            <span className="zine__feature-bullet">✦</span>
            <span>현장 즉석 인화 사진 3매 부착</span>
          </div>
          <div className="zine__feature-pill">
            <span className="zine__feature-bullet">✦</span>
            <span>엽서는 한 달 뒤 실제 우편 발송</span>
          </div>
        </div>

        <div className="zine__cta-wrap">
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => openBooking('t2')}
          >
            나만의 책 만들러 가기
            <span className="btn-arrow" aria-hidden="true">
              <Arrow size={14} />
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
