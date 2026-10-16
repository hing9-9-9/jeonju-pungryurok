import { motion } from 'framer-motion'
import { tickets, formatKRW } from '../content.js'
import { useBooking } from '../booking.jsx'
import { Reveal, Arrow, EASE } from './motion.jsx'
import './Tickets.css'

function BarcodeSVG() {
  return (
    <svg className="tickets__barcode" viewBox="0 0 180 32" fill="currentColor" aria-hidden="true">
      {/* Editorial barcode representation with varying bar widths */}
      <rect x="0" y="0" width="3" height="26" />
      <rect x="5" y="0" width="1.5" height="26" />
      <rect x="9" y="0" width="4" height="26" />
      <rect x="15" y="0" width="1.5" height="26" />
      <rect x="19" y="0" width="2" height="26" />
      <rect x="23" y="0" width="5" height="26" />
      <rect x="30" y="0" width="1.5" height="26" />
      <rect x="34" y="0" width="3" height="26" />
      <rect x="39" y="0" width="2" height="26" />
      <rect x="43" y="0" width="4" height="26" />
      <rect x="49" y="0" width="1.5" height="26" />
      <rect x="53" y="0" width="3" height="26" />
      <rect x="58" y="0" width="6" height="26" />
      <rect x="66" y="0" width="1.5" height="26" />
      <rect x="70" y="0" width="2.5" height="26" />
      <rect x="75" y="0" width="4" height="26" />
      <rect x="81" y="0" width="1.5" height="26" />
      <rect x="85" y="0" width="3" height="26" />
      <rect x="90" y="0" width="5" height="26" />
      <rect x="97" y="0" width="2" height="26" />
      <rect x="101" y="0" width="1.5" height="26" />
      <rect x="105" y="0" width="4" height="26" />
      <rect x="111" y="0" width="2" height="26" />
      <rect x="115" y="0" width="1.5" height="26" />
      <rect x="119" y="0" width="5" height="26" />
      <rect x="126" y="0" width="3" height="26" />
      <rect x="131" y="0" width="1.5" height="26" />
      <rect x="135" y="0" width="4" height="26" />
      <rect x="141" y="0" width="2" height="26" />
      <rect x="145" y="0" width="1.5" height="26" />
      <rect x="149" y="0" width="5" height="26" />
      <rect x="156" y="0" width="2" height="26" />
      <rect x="160" y="0" width="3.5" height="26" />
      <rect x="166" y="0" width="1.5" height="26" />
      <rect x="170" y="0" width="4" height="26" />
      <rect x="176" y="0" width="3" height="26" />
      <text x="90" y="32" textAnchor="middle" fontSize="6.5" letterSpacing="2.5" fill="currentColor">
        JJ·PNGR·SAT
      </text>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className="tickets__check-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.3" />
      <path d="M5 8.2l2.2 2.2 4-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PerkIcon({ index }) {
  if (index === 0) {
    // 벗님 (Two companions / friendship)
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  }
  if (index === 1) {
    // 얼리버드 (Early bird / dawn spark)
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 6 12 12 16 14" />
        <path d="M19 5l2-2" />
      </svg>
    )
  }
  // VIP 시크릿 초대장 (Wax seal / Letter)
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 7l9 6 9-6" />
      <circle cx="12" cy="14" r="2.5" fill="var(--seal)" stroke="none" />
    </svg>
  )
}

export default function Tickets() {
  const { openBooking } = useBooking()

  return (
    <section id="tickets" className="section tickets">
      <div className="tickets__container container">
        <div className="tickets__header">
          <Reveal>
            <span className="eyebrow">{tickets.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="tickets__title h2">{tickets.title}</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="tickets__lead lead">{tickets.body}</p>
          </Reveal>
        </div>

        {/* 3-Tier Luxury Ticket Stub Cards */}
        <div className="tickets__grid">
          {tickets.tiers.map((tier, index) => {
            const isFeatured = Boolean(tier.featured)
            return (
              <motion.article
                key={tier.id}
                className={`tickets__card glass ${isFeatured ? 'tickets__card--featured' : ''} tone--${tier.tone}`}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.9, delay: index * 0.12, ease: EASE }}
                whileHover={{ y: -8, transition: { duration: 0.35, ease: EASE } }}
              >
                {/* Featured Ribbon */}
                {isFeatured && (
                  <div className="tickets__badge-featured">
                    <span className="tickets__badge-dot" />
                    가장 사랑받는 선택 · Most Chosen
                  </div>
                )}

                {/* Upper Body (Main Pass) */}
                <div className="tickets__body">
                  <div className="tickets__meta-top">
                    <span className="tickets__serial">№ 00{index + 1} · 全州</span>
                    <span className="tickets__tier-en display italic">{tier.en}</span>
                  </div>

                  <div className="tickets__name-group">
                    <span className="tickets__tier-tag">{tier.tier}</span>
                    <h3 className="tickets__name">{tier.name}</h3>
                  </div>

                  <p className="tickets__desc">{tier.desc}</p>

                  <div className="tickets__price-block">
                    <div className="tickets__price-main">
                      <span className="tickets__price display">{formatKRW(tier.price)}</span>
                      <span className="tickets__unit">/ 1인</span>
                    </div>
                    {tier.add && (
                      <span className="tickets__add-chip">
                        +{formatKRW(tier.add)} (패키지 특가)
                      </span>
                    )}
                  </div>
                </div>

                {/* Perforation / Notched Cut Line */}
                <div className="tickets__perforation" aria-hidden="true">
                  <span className="tickets__notch tickets__notch--left" />
                  <div className="tickets__dash-line" />
                  <span className="tickets__tear-text">TEAR OFF HERE · 절취선</span>
                  <div className="tickets__dash-line" />
                  <span className="tickets__notch tickets__notch--right" />
                </div>

                {/* Lower Stub (Inclusions, Barcode & Action) */}
                <div className="tickets__stub">
                  <div className="tickets__inclusions">
                    <span className="tickets__inclusions-title">포함 혜택</span>
                    <ul className="tickets__inclusions-list">
                      {tier.includes.map((item, itemIdx) => (
                        <li key={itemIdx} className="tickets__inclusion-item">
                          <CheckIcon />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="tickets__stub-footer">
                    <div className="tickets__barcode-wrap">
                      <BarcodeSVG />
                    </div>

                    <button
                      type="button"
                      className={`tickets__cta btn ${isFeatured ? '' : 'btn--ghost'}`}
                      onClick={() => openBooking(tier.id)}
                      aria-label={`${tier.name} 예약하기`}
                    >
                      <span>이 티켓으로 신청하기</span>
                      <span className="btn-arrow">
                        <Arrow size={14} />
                      </span>
                    </button>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* Perk Chips */}
        <Reveal delay={0.25} y={30}>
          <div className="tickets__perks">
            <div className="tickets__perks-header">
              <span className="tickets__perks-subtitle">SPECIAL PERKS</span>
              <span className="tickets__perks-headline">함께하면 더 특별해지는 동행 혜택</span>
            </div>
            <div className="tickets__perks-grid">
              {tickets.perks.map((perk, idx) => (
                <div key={idx} className="tickets__perk-card glass">
                  <div className="tickets__perk-icon-box">
                    <PerkIcon index={idx} />
                  </div>
                  <div className="tickets__perk-content">
                    <div className="tickets__perk-title-wrap">
                      <h4 className="tickets__perk-title">{perk.title}</h4>
                      {idx === 0 && <span className="tickets__perk-badge">자동 할인</span>}
                      {idx === 1 && <span className="tickets__perk-badge">선착순</span>}
                      {idx === 2 && <span className="tickets__perk-badge">단골 전용</span>}
                    </div>
                    <p className="tickets__perk-desc">{perk.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
