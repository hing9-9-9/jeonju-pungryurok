import { useState, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { tickets, formatKRW, brand } from '../content.js'
import { useBooking } from '../booking.jsx'
import { EASE, Arrow } from './motion.jsx'
import './BookingModal.css'

const DATES = [
  { id: 'd1', label: '10월 24일 (토) 15:30', seats: '잔여 2석', urgent: true },
  { id: 'd2', label: '10월 31일 (토) 15:30', seats: '잔여 3석', urgent: false },
  { id: 'd3', label: '11월 07일 (토) 15:30', seats: '잔여 4석', urgent: false },
  { id: 'd4', label: '11월 14일 (토) 15:30', seats: '잔여 6석', urgent: false },
]

export default function BookingModal() {
  const { isOpen, tierId, setTierId, closeBooking } = useBooking()

  // Form states
  const [selectedDateId, setSelectedDateId] = useState('d1')
  const [count, setCount] = useState(1)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [departure, setDeparture] = useState('전주')
  const [departureDetail, setDepartureDetail] = useState('')
  const [alcoholFree, setAlcoholFree] = useState(false)
  const [privacyAgreed, setPrivacyAgreed] = useState(false)

  // Validation & UI states
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [receiptData, setReceiptData] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  const nameInputId = useId()
  const phoneInputId = useId()
  const departureSelectId = useId()
  const alcoholCheckId = useId()
  const privacyCheckId = useId()

  // Detect mobile viewport for slide direction
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeBooking()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, closeBooking])

  // Reset form when modal opens (if previously submitted)
  useEffect(() => {
    if (isOpen) {
      setErrors({})
    }
  }, [isOpen])

  // Scroll to top of sheet upon submission so receipt header & seal stamp are in full view
  useEffect(() => {
    if (isSubmitted) {
      const bodyEl = document.querySelector('.booking-modal__body')
      if (bodyEl) bodyEl.scrollTop = 0
    }
  }, [isSubmitted])

  // Current tier calculation
  const currentTier = tickets.tiers.find((t) => t.id === tierId) || tickets.tiers[1]
  const basePrice = currentTier.price * count
  const discountPerPerson = count >= 2 ? 5000 : 0
  const totalDiscount = discountPerPerson * count
  const finalPrice = basePrice - totalDiscount
  const selectedDate = DATES.find((d) => d.id === selectedDateId) || DATES[0]

  // Phone auto-formatting
  const handlePhoneChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    let formatted = raw
    if (raw.length > 3 && raw.length <= 7) {
      formatted = `${raw.slice(0, 3)}-${raw.slice(3)}`
    } else if (raw.length > 7) {
      formatted = `${raw.slice(0, 3)}-${raw.slice(3, 7)}-${raw.slice(7, 11)}`
    }
    setPhone(formatted)
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: null }))
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
    if (errors.name) setErrors((prev) => ({ ...prev, name: null }))
  }

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = '성함을 2자 이상 입력해 주세요.'
    }

    const cleanPhone = phone.replace(/[^0-9]/g, '')
    if (!cleanPhone || cleanPhone.length < 10 || cleanPhone.length > 11) {
      newErrors.phone = '올바른 연락처(10~11자리)를 입력해 주세요.'
    }

    if (departure === '타지역' && !departureDetail.trim()) {
      newErrors.departureDetail = '출발 지역명을 입력해 주세요.'
    }

    if (!privacyAgreed) {
      newErrors.privacy = '개인정보 수집 및 안내 알림톡 수신에 동의해 주세요.'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Generate unique booking number
    const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase()
    const bookingNumber = `JJ-2026-${randomHex}`

    const finalDeparture =
      departure === '타지역' ? `타지역 (${departureDetail.trim()})` : departure

    const newBooking = {
      bookingNo: bookingNumber,
      tierId: currentTier.id,
      tierName: currentTier.name,
      tierEn: currentTier.en,
      date: selectedDate.label,
      count,
      name: name.trim(),
      phone,
      departure: finalDeparture,
      alcoholFree,
      basePrice,
      discount: totalDiscount,
      finalPrice,
      createdAt: new Date().toISOString(),
    }

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('jeonju_pungryu_bookings') || '[]')
      localStorage.setItem('jeonju_pungryu_bookings', JSON.stringify([newBooking, ...existing]))
    } catch {
      // LocalStorage access fallback
    }

    setReceiptData(newBooking)
    setIsSubmitted(true)
  }

  const handleResetForNew = () => {
    setIsSubmitted(false)
    setReceiptData(null)
    setName('')
    setPhone('')
    setCount(1)
    setDeparture('전주')
    setDepartureDetail('')
    setAlcoholFree(false)
    setPrivacyAgreed(false)
    setErrors({})
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
          {/* Backdrop Blur Overlay */}
          <motion.div
            className="booking-modal__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={closeBooking}
            aria-hidden="true"
          />

          {/* Sliding Sheet Drawer */}
          <motion.div
            className="booking-modal__drawer glass"
            data-lenis-prevent="true"
            initial={isMobile ? { y: '100%' } : { x: '100%' }}
            animate={isMobile ? { y: 0 } : { x: 0 }}
            exit={isMobile ? { y: '100%' } : { x: '100%' }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {/* Sheet Header */}
            <div className="booking-modal__header">
              <div className="booking-modal__header-info">
                <span className="booking-modal__eyebrow">RESERVATION · PRIVATE SALON</span>
                <h2 id="booking-title" className="booking-modal__title">
                  {isSubmitted ? '예약 접수 영수증' : '풍류록 참가 신청서'}
                </h2>
              </div>
              <button
                type="button"
                className="booking-modal__close-btn"
                onClick={closeBooking}
                aria-label="예약창 닫기"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="booking-modal__body" data-lenis-prevent="true">
              {!isSubmitted ? (
                /* ── FORM VIEW ─────────────────────────────────────── */
                <form className="booking-modal__form" onSubmit={handleSubmit} noValidate>
                  {/* Step 1: Tier Selector */}
                  <div className="booking-modal__section">
                    <label className="booking-modal__label">
                      1. 코스 패스 선택 <span className="booking-modal__req">*</span>
                    </label>
                    <div className="booking-modal__tiers-grid">
                      {tickets.tiers.map((t) => {
                        const isSelected = tierId === t.id
                        return (
                          <div
                            key={t.id}
                            className={`booking-modal__tier-card ${
                              isSelected ? 'booking-modal__tier-card--selected' : ''
                            }`}
                            onClick={() => setTierId(t.id)}
                            role="radio"
                            aria-checked={isSelected}
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === ' ' || e.key === 'Enter') {
                                e.preventDefault()
                                setTierId(t.id)
                              }
                            }}
                          >
                            <div className="booking-modal__tier-radio">
                              <span
                                className={`booking-modal__radio-dot ${
                                  isSelected ? 'booking-modal__radio-dot--checked' : ''
                                }`}
                              />
                            </div>
                            <div className="booking-modal__tier-info">
                              <div className="booking-modal__tier-header">
                                <span className="booking-modal__tier-badge">{t.tier}</span>
                                {t.featured && (
                                  <span className="booking-modal__featured-pill">추천</span>
                                )}
                              </div>
                              <span className="booking-modal__tier-name">{t.name}</span>
                              <span className="booking-modal__tier-price">
                                {formatKRW(t.price)}
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Step 2: Date Selector */}
                  <div className="booking-modal__section">
                    <label className="booking-modal__label">
                      2. 토요일 일정 선택 <span className="booking-modal__req">*</span>
                    </label>
                    <div className="booking-modal__dates-grid">
                      {DATES.map((date) => {
                        const isSelected = selectedDateId === date.id
                        return (
                          <button
                            key={date.id}
                            type="button"
                            className={`booking-modal__date-btn ${
                              isSelected ? 'booking-modal__date-btn--selected' : ''
                            }`}
                            onClick={() => setSelectedDateId(date.id)}
                          >
                            <span className="booking-modal__date-text">{date.label}</span>
                            <span
                              className={`booking-modal__seat-badge ${
                                date.urgent ? 'booking-modal__seat-badge--urgent' : ''
                              }`}
                            >
                              {date.seats}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Step 3: Participant Stepper with Perk Discount */}
                  <div className="booking-modal__section">
                    <div className="booking-modal__label-row">
                      <label className="booking-modal__label">
                        3. 참가 인원 선택 <span className="booking-modal__req">*</span>
                      </label>
                      <span className="booking-modal__label-hint">선착순 최대 4인 동반</span>
                    </div>

                    <div className="booking-modal__stepper-row">
                      <div className="booking-modal__stepper">
                        <button
                          type="button"
                          className="booking-modal__stepper-btn"
                          onClick={() => setCount((c) => Math.max(1, c - 1))}
                          disabled={count <= 1}
                          aria-label="인원 줄이기"
                        >
                          −
                        </button>
                        <span className="booking-modal__stepper-val">{count}명</span>
                        <button
                          type="button"
                          className="booking-modal__stepper-btn"
                          onClick={() => setCount((c) => Math.min(4, c + 1))}
                          disabled={count >= 4}
                          aria-label="인원 늘리기"
                        >
                          +
                        </button>
                      </div>

                      {count >= 2 ? (
                        <div className="booking-modal__perk-active-chip">
                          <span className="booking-modal__perk-sparkle">✨</span>
                          <span>벗님 패스 적용: -{formatKRW(totalDiscount)} 할인 (인당 5,000원)</span>
                        </div>
                      ) : (
                        <span className="booking-modal__perk-hint">
                          💡 2인 이상 신청 시 ‘벗님 패스’ 인당 5,000원 자동 할인!
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Step 4: Contact Info Inputs */}
                  <div className="booking-modal__section">
                    <label className="booking-modal__label">
                      4. 예약자 기본 정보 <span className="booking-modal__req">*</span>
                    </label>

                    <div className="booking-modal__fields-grid">
                      {/* Name */}
                      <div className="booking-modal__field">
                        <label htmlFor={nameInputId} className="booking-modal__sublabel">
                          예약자 성함
                        </label>
                        <input
                          id={nameInputId}
                          type="text"
                          className={`booking-modal__input ${
                            errors.name ? 'booking-modal__input--error' : ''
                          }`}
                          placeholder="예: 김문인"
                          value={name}
                          onChange={handleNameChange}
                          autoComplete="name"
                        />
                        {errors.name && (
                          <span className="booking-modal__error-msg">{errors.name}</span>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="booking-modal__field">
                        <label htmlFor={phoneInputId} className="booking-modal__sublabel">
                          휴대전화 번호 (알림톡 수신)
                        </label>
                        <input
                          id={phoneInputId}
                          type="tel"
                          className={`booking-modal__input ${
                            errors.phone ? 'booking-modal__input--error' : ''
                          }`}
                          placeholder="010-0000-0000"
                          value={phone}
                          onChange={handlePhoneChange}
                          maxLength={13}
                          autoComplete="tel"
                        />
                        {errors.phone && (
                          <span className="booking-modal__error-msg">{errors.phone}</span>
                        )}
                      </div>

                      {/* Departure Region */}
                      <div className="booking-modal__field booking-modal__field--full">
                        <label htmlFor={departureSelectId} className="booking-modal__sublabel">
                          출발 지역 (막차 및 카풀 매칭용)
                        </label>
                        <div className="booking-modal__select-wrap">
                          <select
                            id={departureSelectId}
                            className="booking-modal__select"
                            value={departure}
                            onChange={(e) => setDeparture(e.target.value)}
                          >
                            <option value="전주">전주시 (원도심 / 덕진 / 완산 / 혁신)</option>
                            <option value="익산">익산시 방면</option>
                            <option value="김제">김제시 방면</option>
                            <option value="완주">완주군 (삼례 / 봉동 / 이서 등)</option>
                            <option value="타지역">기타 타지역 (서울/경기/충청 등)</option>
                          </select>
                          <span className="booking-modal__select-arrow">▼</span>
                        </div>
                        {departure === '타지역' && (
                          <div className="booking-modal__subfield">
                            <input
                              type="text"
                              className={`booking-modal__input ${
                                errors.departureDetail ? 'booking-modal__input--error' : ''
                              }`}
                              placeholder="출발 지역을 입력해 주세요 (예: 서울 용산)"
                              value={departureDetail}
                              onChange={(e) => setDepartureDetail(e.target.value)}
                            />
                            {errors.departureDetail && (
                              <span className="booking-modal__error-msg">
                                {errors.departureDetail}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Step 5: Special Options */}
                  <div className="booking-modal__section">
                    <label className="booking-modal__label">5. 맞춤 요청 및 동의</label>
                    <div className="booking-modal__checks-list">
                      {/* Alcohol Free */}
                      <label htmlFor={alcoholCheckId} className="booking-modal__checkbox-row">
                        <input
                          id={alcoholCheckId}
                          type="checkbox"
                          className="booking-modal__checkbox"
                          checked={alcoholFree}
                          onChange={(e) => setAlcoholFree(e.target.checked)}
                        />
                        <span className="booking-modal__checkbox-text">
                          <strong>무알코올 전통 음청류 희망:</strong> 술을 드시지 않는 분을 위해
                          오미자 화채·식혜 등 고급 전통 음청류로 대체 준비합니다.
                        </span>
                      </label>

                      {/* Privacy Agreement */}
                      <label htmlFor={privacyCheckId} className="booking-modal__checkbox-row">
                        <input
                          id={privacyCheckId}
                          type="checkbox"
                          className="booking-modal__checkbox"
                          checked={privacyAgreed}
                          onChange={(e) => {
                            setPrivacyAgreed(e.target.checked)
                            if (errors.privacy) setErrors((prev) => ({ ...prev, privacy: null }))
                          }}
                        />
                        <span className="booking-modal__checkbox-text">
                          <strong>[필수] 개인정보 수집 및 예약 안내 동의:</strong> 예약 확인 및
                          현장 진행 안내(카카오톡 알림톡/문자)를 위해 성함과 연락처를 수집합니다.
                        </span>
                      </label>
                      {errors.privacy && (
                        <span className="booking-modal__error-msg">{errors.privacy}</span>
                      )}
                    </div>
                  </div>

                  {/* Real-time Calculation Summary */}
                  <div className="booking-modal__summary-box">
                    <div className="booking-modal__summary-row">
                      <span className="booking-modal__summary-label">
                        {currentTier.name} × {count}인
                      </span>
                      <span className="booking-modal__summary-val">{formatKRW(basePrice)}</span>
                    </div>

                    {totalDiscount > 0 && (
                      <div className="booking-modal__summary-row booking-modal__summary-row--discount">
                        <span className="booking-modal__summary-label">
                          벗님 패스 동행 할인
                        </span>
                        <span className="booking-modal__summary-val">
                          -{formatKRW(totalDiscount)}
                        </span>
                      </div>
                    )}

                    <div className="booking-modal__summary-divider" />

                    <div className="booking-modal__summary-total">
                      <span className="booking-modal__total-label">최종 결제 예정 금액</span>
                      <span className="booking-modal__total-price display">
                        {formatKRW(finalPrice)}
                      </span>
                    </div>
                    <span className="booking-modal__total-note">
                      ※ 신청 즉시 가상계좌 / 알림톡 안내문이 발송되며, 24시간 내 입금 시 최종 확정됩니다.
                    </span>
                  </div>

                  {/* Submit CTA Button */}
                  <div className="booking-modal__submit-wrap">
                    <button type="submit" className="booking-modal__submit-btn btn">
                      <span>{formatKRW(finalPrice)} 예약 신청하기</span>
                      <span className="btn-arrow">
                        <Arrow size={14} />
                      </span>
                    </button>
                  </div>
                </form>
              ) : (
                /* ── RECEIPT VIEW (COMMEMORATIVE TICKET) ─────────────── */
                <motion.div
                  className="booking-modal__receipt"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  {/* Commemorative Paper Stub Container */}
                  <div className="booking-modal__ticket-stub">
                    {/* Animated Seal Stamp */}
                    <motion.div
                      className="booking-modal__seal-stamp"
                      initial={{ scale: 2.4, opacity: 0, rotate: -25 }}
                      animate={{ scale: 1, opacity: 1, rotate: -6 }}
                      transition={{ type: 'spring', damping: 14, stiffness: 220, delay: 0.2 }}
                      aria-label="예약 확정 낙관 도장"
                    >
                      <div className="booking-modal__seal-inner">
                        <span className="booking-modal__seal-text">風流</span>
                        <span className="booking-modal__seal-sub">完</span>
                      </div>
                    </motion.div>

                    {/* Ticket Header */}
                    <div className="booking-modal__receipt-header">
                      <span className="booking-modal__receipt-brand display">
                        {brand.nameHanja}
                      </span>
                      <span className="booking-modal__receipt-badge">예약 신청 완료 · CONFIRMED</span>
                      <h3 className="booking-modal__receipt-no">
                        접수 번호 : {receiptData?.bookingNo}
                      </h3>
                    </div>

                    <div className="booking-modal__receipt-divider" />

                    {/* Receipt Details Table */}
                    <div className="booking-modal__receipt-table">
                      <div className="booking-modal__receipt-row">
                        <span className="booking-modal__receipt-key">예약자명</span>
                        <span className="booking-modal__receipt-val">
                          {receiptData?.name} ({receiptData?.phone})
                        </span>
                      </div>
                      <div className="booking-modal__receipt-row">
                        <span className="booking-modal__receipt-key">선택 패스</span>
                        <span className="booking-modal__receipt-val">
                          {receiptData?.tierName} ({receiptData?.tierEn})
                        </span>
                      </div>
                      <div className="booking-modal__receipt-row">
                        <span className="booking-modal__receipt-key">진행 일시</span>
                        <span className="booking-modal__receipt-val">{receiptData?.date}</span>
                      </div>
                      <div className="booking-modal__receipt-row">
                        <span className="booking-modal__receipt-key">신청 인원</span>
                        <span className="booking-modal__receipt-val">
                          {receiptData?.count}명{' '}
                          {receiptData?.count >= 2 && '(벗님 패스 적용)'}
                        </span>
                      </div>
                      <div className="booking-modal__receipt-row">
                        <span className="booking-modal__receipt-key">출발 지역</span>
                        <span className="booking-modal__receipt-val">
                          {receiptData?.departure}
                        </span>
                      </div>
                      <div className="booking-modal__receipt-row">
                        <span className="booking-modal__receipt-key">페어링 옵션</span>
                        <span className="booking-modal__receipt-val">
                          {receiptData?.alcoholFree
                            ? '무알코올 전통 음청류 페어링'
                            : '전통주 3-페어링 (기본)'}
                        </span>
                      </div>
                      <div className="booking-modal__receipt-row booking-modal__receipt-row--total">
                        <span className="booking-modal__receipt-key">결제 예정액</span>
                        <span className="booking-modal__receipt-val display">
                          {formatKRW(receiptData?.finalPrice || 0)}
                        </span>
                      </div>
                    </div>

                    <div className="booking-modal__receipt-divider" />

                    {/* Instructions */}
                    <div className="booking-modal__receipt-notes">
                      <p className="booking-modal__receipt-notice-lead">
                        📍 첫 집결 장소 : 전주 완판본문화관 입구
                      </p>
                      <p className="booking-modal__receipt-notice-sub">
                        ※ Tier 3 (모던 선비 올인원) 신청자는 15:00에 사전 제휴 한복점에서 환복 후 집결지로 이동합니다.
                      </p>
                      <p className="booking-modal__receipt-notice-kakao">
                        안내 카카오톡 알림톡이 입력하신 번호로 3분 이내 발송됩니다.
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="booking-modal__receipt-actions">
                    <button
                      type="button"
                      className="booking-modal__done-btn btn"
                      onClick={closeBooking}
                    >
                      확인 및 닫기
                    </button>
                    <button
                      type="button"
                      className="booking-modal__again-btn"
                      onClick={handleResetForNew}
                    >
                      다른 일정 추가 신청하기
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
