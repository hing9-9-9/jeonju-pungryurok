import { footer, brand, nav } from '../content.js'
import './Footer.css'

export default function Footer() {
  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.4 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer" role="contentinfo">
      {/* Decorative Hanji Double Line */}
      <div className="footer__divider" aria-hidden="true">
        <span className="footer__divider-line" />
        <span className="seal footer__divider-seal">錄</span>
        <span className="footer__divider-line" />
      </div>

      <div className="footer__container container">
        {/* Main Footer Info Grid */}
        <div className="footer__grid">
          {/* Column 1: Brand & Hosts */}
          <div className="footer__col footer__col--brand">
            <div className="footer__brand-title-wrap">
              <span className="footer__brand-hanja display">{brand.nameHanja}</span>
              <h3 className="footer__brand-name">{brand.nameKo}</h3>
              <span className="footer__brand-en display italic">{brand.nameEn}</span>
            </div>
            <p className="footer__tagline">{brand.tagline}</p>
            <div className="footer__hosts-box">
              <span className="footer__label">호스트 & 기획</span>
              <span className="footer__value">{footer.hosts}</span>
            </div>
          </div>

          {/* Column 2: Navigation & Social */}
          <div className="footer__col footer__col--nav">
            <span className="footer__label">섹션 바로가기</span>
            <ul className="footer__nav-list">
              {nav.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="footer__nav-link">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="footer__social-box">
              <span className="footer__label">공식 인스타그램</span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span>{footer.instagram}</span>
              </a>
            </div>
          </div>

          {/* Column 3: Location & Back to Top */}
          <div className="footer__col footer__col--location">
            <div className="footer__location-box">
              <span className="footer__label">공간 및 동선 안내</span>
              <p className="footer__address">{footer.address}</p>
              <p className="footer__subnote">
                삼양다방 (동문길) → 완판본문화관 → 에이커북스토어 (전라감영길)
              </p>
            </div>

            <button
              type="button"
              className="footer__back-to-top"
              onClick={scrollToTop}
              aria-label="페이지 맨 위로 이동"
            >
              <span className="footer__back-arrow" aria-hidden="true">↑</span>
              <span className="footer__back-text">맨 위로 가기</span>
            </button>
          </div>
        </div>

        {/* Huge Display Wordmark Spanning Bottom */}
        <div className="footer__wordmark-wrap" aria-hidden="true">
          <span className="footer__wordmark display">{brand.nameHanja}</span>
        </div>

        {/* Bottom Colophon & Copyright */}
        <div className="footer__bottom">
          <p className="footer__copyright">{footer.copyright}</p>
          <div className="footer__bottom-links">
            <span>소수 정예 로컬 살롱 프로젝트</span>
            <span className="footer__dot">·</span>
            <span>전주 원도심 독립출판 워크숍</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
