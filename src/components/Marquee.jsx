import './Marquee.css'

const track1Items = [
  { kr: '완판본', en: 'Wanpanbon Woodblock', emblem: '✺' },
  { kr: '골든아워', en: 'Golden Hour Snaps', emblem: '〇' },
  { kr: '동문길', en: 'Dongmun Vintage Street', emblem: '風', isHanja: true },
  { kr: '풍류', en: 'Pungryu-rok', emblem: '✦' },
  { kr: '한식 다이닝', en: 'Samyang Dabang Dinner', emblem: '✺' },
  { kr: '전통주 페어링', en: 'Artisan Liquor Pairing', emblem: '〇' },
]

const track2Items = [
  { kr: '심야 서점', en: 'Midnight Bookstore', emblem: '✦' },
  { kr: '아코디언 북', en: 'Accordion Book', emblem: '✺' },
  { kr: '나만의 Zine', en: 'Private Salon', emblem: '夜', isHanja: true },
  { kr: '모던 문인', en: 'Modern Writer', emblem: '〇' },
  { kr: '필름 스냅', en: 'Film Profile Photography', emblem: '✦' },
  { kr: '취중진담', en: 'In Vino Veritas', emblem: '✺' },
]

function MarqueeGroup({ items }) {
  return (
    <>
      {items.map((item, idx) => (
        <span key={idx} className="marquee-item">
          <span className="marquee-text--kr">{item.kr}</span>
          <span
            className={`marquee-emblem ${item.isHanja ? 'marquee-emblem--hanja' : ''}`}
            aria-hidden="true"
          >
            {item.emblem}
          </span>
          <span className="marquee-text--en">{item.en}</span>
          <span className="marquee-emblem" aria-hidden="true">
            ·
          </span>
        </span>
      ))}
    </>
  )
}

export default function Marquee() {
  // Duplicate for seamless 50% loop
  const duplicatedTrack1 = [...track1Items, ...track1Items]
  const duplicatedTrack2 = [...track2Items, ...track2Items]

  return (
    <section className="marquee-section" aria-label="전주 심야 풍류록 키워드 티커">
      <div className="marquee-band">
        {/* Track 1: Scrolling Left */}
        <div className="marquee-row" aria-hidden="true">
          <div className="marquee-track marquee-track--left">
            <MarqueeGroup items={duplicatedTrack1} />
            <MarqueeGroup items={duplicatedTrack1} />
          </div>
        </div>

        {/* Track 2: Scrolling Right */}
        <div className="marquee-row" aria-hidden="true">
          <div className="marquee-track marquee-track--right">
            <MarqueeGroup items={duplicatedTrack2} />
            <MarqueeGroup items={duplicatedTrack2} />
          </div>
        </div>
      </div>
    </section>
  )
}
