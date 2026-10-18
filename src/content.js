// ─────────────────────────────────────────────────────────────
//  전주 심야 풍류록 — Content source of truth
//  (기획 대화 마지막 턴 기반: 19시 이후 심야 서점, 저녁 다이닝 격상, 한복 옵션)
// ─────────────────────────────────────────────────────────────

import { assetUrl } from './assetUrl.js'

export const brand = {
  nameKo: '전주 심야 풍류록',
  nameHanja: '全州 深夜 風流錄',
  nameEn: 'Jeonju Midnight Pungryu-rok',
  tagline: '해 질 녘의 풍류와 심야 책방의 기록',
  partners: ['삼양다방', '에이커북스토어', '완판본문화관'],
  capacity: '선착순 6~8명 소수 정예',
  when: '매주 토요일 15:30 — 20:30',
  duration: '총 5시간 코스',
}

export const nav = [
  { id: 'story', label: '이야기' },
  { id: 'course', label: '코스' },
  { id: 'zine', label: 'Zine' },
  { id: 'tickets', label: '티켓' },
  { id: 'info', label: '안내' },
]

export const hero = {
  eyebrow: 'Saturday · 7 PM · Private Salon',
  headline: ['토요일 밤 7시,', '문 닫은 전주의 독립서점이', '당신만을 위해 열립니다.'],
  sub:
    '동문길 삼양다방에서 즐기는 프라이빗 한식 다이닝과 전통주 페어링, 그리고 에이커북스토어의 심야 대관까지. 낮에는 개화기 문인처럼 원도심을 거닐며 스냅을 남기고, 밤에는 기분 좋은 취기 속에서 나만의 독립출판물(Zine) 한 권을 완성합니다.',
  cta: '자리 예약하기',
  secondary: '코스 둘러보기',
  meta: [
    { k: 'When', v: '토 15:30 — 20:30' },
    { k: 'Seats', v: '6 ~ 8명' },
    { k: 'From', v: '₩78,000' },
  ],
}

export const marquee = [
  '완판본', '골든아워', '동문길', '풍류', '한식 다이닝', '전통주 페어링',
  '심야 서점', '아코디언 북', 'Zine', '모던 문인', '필름 스냅', '취중진담',
]

// 질문으로 시작하는 이야기
export const story = {
  eyebrow: 'A Question For You',
  title: ['수백 년 전 출판의 도시 전주에서,', '오늘 당신은 어떤 문인이 되어볼까요?'],
  body:
    '수백 년 전 한글 대중문학을 목판에 새겼던 기록의 도시 전주. 오늘 하루, 당신만의 고유한 시선으로 원도심을 걷고, 맛보고, 기록해보면 어떨까요? 사진은 꾸며낸 모습 대신, 내 책의 첫 페이지를 여는 다정한 저자의 초상이 됩니다.',
  pillars: [
    {
      no: '01',
      hanja: '錄',
      title: '기록의 뿌리',
      place: '완판본문화관',
      desc: '최초의 한글 대중문학이 꽃피운 전주의 출판 정신. 목판의 시간 위에 오늘의 나를 한 문장으로 새깁니다.',
      tone: 'butter',
      image: assetUrl('images/woodblock.jpg'),
    },
    {
      no: '02',
      hanja: '風',
      title: '동문길의 풍류',
      place: '삼양다방 (1952~)',
      desc: '‘풍류’를 주제로 원도심을 깨우는 동문거리. 사장님의 한식 디너 다이닝과 전통주 3종 페어링으로 저녁을 엽니다.',
      tone: 'peach',
      image: assetUrl('images/dongmungil/IMG_7753.JPG'),
    },
    {
      no: '03',
      hanja: '夜',
      title: '심야의 서재',
      place: '에이커북스토어',
      desc: '영업이 끝난 19시, 불 켜진 서가를 우리만 독점합니다. 인화된 사진과 문장으로 나만의 아코디언 북을 엮습니다.',
      tone: 'lilac',
      image: assetUrl('images/bookstore/IMG_7791.JPG'),
    },
  ],
}

// 타임테이블 (15:30 ~ 20:30)
export const course = {
  eyebrow: 'The Course',
  title: '해 질 녘부터 심야까지, 다섯 개의 장면',
  note: '※ 에이커북스토어와 18:30 시작이 협의되면 전체 일정을 30분 앞당겨 15:00 ~ 20:00로 운영합니다.',
  stops: [
    {
      time: '15:00',
      end: '15:30',
      chapter: 'Prologue',
      place: '제휴 한복점 · 귀족의상실',
      title: '‘모던 문인’ 환복',
      desc: '먹색·생성색·옥색의 차분한 생활한복으로 갈아입습니다. (Tier 3 선택자 한정 · 미선택자는 15:30 완판본문화관 직행)',
      photo: '귀족의상실 아치 거울 스냅과 단아한 문인 착장',
      optional: true,
      image: assetUrl('images/dongmungil/IMG_7777.JPG'),
      tone: 'jade',
    },
    {
      time: '15:30',
      end: '16:40',
      chapter: 'Chapter 1',
      place: '완판본문화관 & 한옥마을 외곽',
      title: '기록의 뿌리를 걷다',
      desc: '완판본 관람과 오후 햇살 속 골목 산책. 오후 4~5시 골든아워에 야외 스냅을 남깁니다.',
      photo: '한옥 담장, 긴 그림자, 책을 든 모습',
      image: assetUrl('images/woodblock.jpg'),
      tone: 'butter',
    },
    {
      time: '16:40',
      end: '17:00',
      chapter: 'Interlude',
      place: '완판본 → 동문길 헌책방 거리',
      title: '노을 속 산책',
      desc: '동문거리 헌책방 골목으로 천천히 걸으며 해 질 녘 노을과 홍지서림 등 오래된 서점들을 마주합니다.',
      photo: '동문길의 돌길과 홍지서림, 알전구 거리 풍경',
      image: assetUrl('images/dongmungil/IMG_7731.JPG'),
      tone: 'apricot',
    },
    {
      time: '17:00',
      end: '18:45',
      chapter: 'Chapter 2',
      place: '삼양다방 (SINCE 1952) · 동문길',
      title: '풍류 다이닝',
      desc: '1952년 문을 연 대한민국 최고령 다방 삼양다방에서 즐기는 시그니처 한식 디너 코스와 로컬 전통주 3종 페어링.',
      photo: '삼양다방의 창가 전경과 따뜻한 펜던트 조명',
      image: assetUrl('images/dongmungil/IMG_7753.JPG'),
      tone: 'rose',
    },
    {
      time: '18:45',
      end: '19:00',
      chapter: 'Interlude',
      place: '동문길 → 에이커북스토어',
      title: '밤공기를 걷다',
      desc: '기분 좋은 취기를 안고 어스름한 골목을 지나 문 닫은 서점으로 향합니다. 나뭇잎 그림자가 드리운 벽면을 따라 3층 책방 문을 엽니다.',
      photo: '에이커 책방 삼층 계단 벽면과 밤골목',
      image: assetUrl('images/bookstore/IMG_7786.JPG'),
      tone: 'sky',
    },
    {
      time: '19:00',
      end: '20:30',
      chapter: 'Chapter 3',
      place: '에이커북스토어 · 영업 종료 후 전체 대관',
      title: '심야 책방 Zine 제작소',
      desc: '문 닫은 서점에서 원목 서가 사이 따뜻한 불빛 아래 아코디언 북을 집필합니다. 찍은 사진을 붙이고, 한 페이지씩 낭독하며 여운을 나눕니다.',
      photo: '따뜻한 전구 아래 원목 서가와 나만의 집필 공간',
      image: assetUrl('images/bookstore/IMG_7791.JPG'),
      tone: 'lilac',
    },
  ],
}

// 직접 촬영한 동문길 & 에이커북스토어 현장 아카이브
export const localGallery = [
  {
    id: 'g1',
    src: assetUrl('images/dongmungil/IMG_7777.JPG'),
    tag: '제휴 한복점 · 귀족의상실',
    title: '그대를 기다리고 있었소',
    desc: '아치형 거울 속 카메라와 작은 노트를 든 문인의 첫 순간',
    aspect: 'portrait',
  },
  {
    id: 'g2',
    src: assetUrl('images/dongmungil/IMG_7731.JPG'),
    tag: '동문길 헌책방 거리',
    title: '홍지서림과 돌길의 오후',
    desc: '전주 동문길 하늘 위로 이어진 알전구와 푸른 가을 하늘',
    aspect: 'portrait',
  },
  {
    id: 'g3',
    src: assetUrl('images/dongmungil/IMG_7753.JPG'),
    tag: '삼양다방 (SINCE 1952)',
    title: '창가 너머 동문길의 온기',
    desc: '대한민국 최고령 다방의 빈티지 창문과 따뜻한 펜던트 조명',
    aspect: 'landscape',
  },
  {
    id: 'g4',
    src: assetUrl('images/dongmungil/IMG_7734.JPG'),
    tag: '동문 예술거리 헌책방',
    title: '한가네 서점 — 헌책 사고 팝니다',
    desc: '수십 년 동안 책과 사람의 온기를 품어온 정겨운 서점 파사드',
    aspect: 'landscape',
  },
  {
    id: 'g5',
    src: assetUrl('images/dongmungil/IMG_7732.JPG'),
    tag: '동문길 골목 안',
    title: '일신서점의 고요한 시간',
    desc: '골목 깊숙이 자리한 오래된 서점의 책탑과 노란 간판',
    aspect: 'portrait',
  },
  {
    id: 'g6',
    src: assetUrl('images/bookstore/IMG_7786.JPG'),
    tag: '에이커북스토어 진입로',
    title: '에이커 책방 삼층',
    desc: '벽면에 흩뿌려진 나뭇잎 그림자와 3층 책방으로 향하는 계단',
    aspect: 'portrait',
  },
  {
    id: 'g7',
    src: assetUrl('images/bookstore/IMG_7791.JPG'),
    tag: '에이커북스토어 심야 서가',
    title: '불 꺼진 전라감영길, 우리만의 서재',
    desc: '원목 서가를 채운 독립출판물과 따뜻하게 빛나는 알전구 조명',
    aspect: 'portrait',
  },
]

// 아코디언 북 (물리적 8면: 1~7면 동일 규격 + 8면 단독 엽서 규격)
export const zine = {
  eyebrow: 'The Accordion Book',
  title: '《전주 풍류록》 초판 1쇄, 저자는 당신입니다',
  body:
    '백지의 공포는 없습니다. 질문 프롬프트, 체크리스트, 스탬프·영수증·사진 부착 공간이 미리 디자인된 8면 병풍형 아코디언 템플릿에 오늘의 여정을 채워 넣기만 하면 됩니다.',
  pages: [
    {
      no: '1',
      label: '1면 · 표지',
      title: '책의 얼굴과 저자',
      prompt: '《 [ 〇〇 ]을(를) 찾아 떠난 나의 전주 풍류록 》',
      detail: '완판본 능화문 프레임 · 낙관 찍기 · 발행일과 필명 기입',
      tone: 'butter',
    },
    {
      no: '2',
      label: '2면 · 프롤로그',
      title: '저자 소개',
      prompt: '“오늘 하루, [ 출발지 ]에서 온 나는 [ 직업 ]이라는 이름을 잠시 내려놓고, [ 어떤 상태의 나 ]로 이 거리를 걷는다.”',
      detail: '‘작가의 초상’ 스냅 부착 — 프로필 촬영의 이유가 완성되는 페이지',
      tone: 'peach',
    },
    {
      no: '3',
      label: '3면 · 제1장',
      title: '기록의 뿌리',
      prompt: '“만약 단 한 문장을 나무에 새겨 오래도록 남길 수 있다면, 어떤 문장을 남기고 싶나요?”',
      detail: '옛 글자체 따라 쓰기 · 입장권/스탬프 부착',
      tone: 'mint',
    },
    {
      no: '4',
      label: '4면 · 제2장 A',
      title: '동문길 만찬 주안상',
      prompt: '“오늘 나의 저녁을 채운 요리와 술 중, 가장 마음에 위로를 건넨 한 입과 한 모금은 무엇이었나요?”',
      detail: '삼양다방 사장님이 디자인한 ‘오늘의 주안상 메뉴판’ 부착',
      tone: 'rose',
    },
    {
      no: '5',
      label: '5면 · 제2장 B',
      title: '미식 시음 노트',
      prompt: '“전통주의 온기가 몸을 데울 때, 나에게 건네고 싶었던 다정한 말은?”',
      detail: '단맛·산미·바디·여운 4축 테이스팅 스타 레이팅 · 미각의 문장화',
      tone: 'rose',
    },
    {
      no: '6',
      label: '6면 · 제3장 A',
      title: '불 켜진 심야 서재',
      prompt: '“모두가 집으로 돌아간 오후 7시, 우리만을 위해 불을 밝힌 책방의 문을 열었을 때 어떤 기분이 들었나요?”',
      detail: '밤의 서가 스냅 · 책방지기의 ‘심야 처방 문장 스탬프’',
      tone: 'lilac',
    },
    {
      no: '7',
      label: '7면 · 제3장 B',
      title: '200자 원고지 집필',
      prompt: '“낮의 이성적인 나였다면 고르지 않았을지도 모를, 오늘 밤의 내가 이끌린 책 속의 한 문장.”',
      detail: '정통 한국식 원고지 프레임 · 타이핑 실시간 각인',
      tone: 'lilac',
    },
    {
      no: '8',
      label: '8면 · 엽서',
      title: 'Postcard to Future Me',
      prompt: '“계절이 바뀐 뒤 다시 전주를 찾을 나에게 보내는 짧은 편지.”',
      detail: '단독 엽서 규격 · 절취선 · 책방 우체통에 넣으면 한 달 뒤 발송',
      tone: 'sky',
      isPostcard: true,
    },
  ],
}

// 티켓 (3단계)
export const tickets = {
  eyebrow: 'Tickets',
  title: '어떤 속도와 시선으로 오늘 밤을 기록하고 싶으신가요?',
  body: '본격 한식 디너와 서점 심야 대관이 포함된 프리미엄 다이닝 & 프라이빗 살롱 패키지입니다.',
  tiers: [
    {
      id: 't1',
      tier: 'Tier 1',
      name: '심야 풍류객 패스',
      en: 'Night Wanderer',
      price: 78000,
      add: null,
      desc: '사진은 조금 쑥스럽지만, 저녁과 전통주, 심야 서점의 낭만을 온전히 즐기고 싶은 분.',
      includes: [
        '삼양다방 한식 디너 다이닝 & 전통주 페어링 (약 45,000원 상당)',
        '에이커북스토어 심야 프라이빗 대관 & 웰컴 티/다과 (약 15,000원 상당)',
        '아코디언 북(Zine) 키트 + 가이드 동행 투어',
        '현장 캔디드 사진 3매 즉석 인화',
      ],
      tone: 'peach',
    },
    {
      id: 't2',
      tier: 'Tier 2',
      name: '밤의 작가 패스',
      en: 'Author of the Night',
      price: 95000,
      add: 17000,
      featured: true,
      desc: '내 책의 앞날개에 들어갈 ‘작가 프로필’을 남기고 싶은 분.',
      includes: [
        'Tier 1 전체 포함',
        '‘집필하는 여행자’ 개인 프로필 스냅',
        '원본 15컷 + 감성 보정본 3컷 디지털 제공',
        'Zine 부착용 추가 인화',
      ],
      tone: 'rose',
    },
    {
      id: 't3',
      tier: 'Tier 3',
      name: '모던 선비 올인원',
      en: 'Modern Seonbi All-in-One',
      price: 115000,
      add: 37000,
      desc: '오늘 하루, 조선의 출판 수도 완산주의 문인이 되어보고 싶은 분.',
      includes: [
        'Tier 2 전체 포함',
        '전주 로컬 한복점 제휴 ‘모던 한복 / 개화기 의상’ 대여',
        '먹색·생성색·옥색·감색 큐레이션 생활한복',
        '반납 걱정 없는 컨시어지 — 워크숍 후 일괄 수거',
      ],
      tone: 'lilac',
    },
  ],
  perks: [
    { title: '벗님 패스', desc: '2인 동시 신청 시 1인당 5,000원 할인' },
    { title: '얼리버드', desc: '오픈 첫 주 신청자 한정 특별가' },
    { title: 'VIP 시크릿 초대장', desc: '삼양다방·에이커북스토어 단골 전용 1만 원 할인 코드' },
  ],
}

// 한복 큐레이션
export const hanbok = {
  eyebrow: 'The Fabric of Silence',
  title: '오늘 당신에게 어울리는 고요의 색은 무엇인가요?',
  body:
    '차분한 모시와 린넨 저고리, 도포 자켓까지. 전주의 오래된 결을 닮은 생활한복을 입고 거리를 거닐 때, 비로소 풍류의 세계관이 완성됩니다.',
  palette: [
    { name: '먹색', hex: '#3b3a42' },
    { name: '생성색', hex: '#f3ead8' },
    { name: '옥색', hex: '#bfe3d3' },
    { name: '감색', hex: '#3d4a72' },
  ],
}

// 교통 & 안내
export const info = {
  eyebrow: 'Getting There',
  title: '심야 귀가까지 설계했습니다',
  items: [
    {
      title: '자차 이용',
      desc: '전라감영길 주변은 심야 주차가 어렵습니다. 첫 집결지 인근 한옥마을 공영주차장 또는 완산동 공영주차장을 이용해 주세요. 에이커북스토어에서 도보 10~15분 거리입니다.',
    },
    {
      title: '대중교통 (익산·김제·완주)',
      desc: '20:30 종료 후에도 전주역·터미널 막차(보통 21:30~22:30)를 충분히 탈 수 있습니다.',
    },
    {
      title: '택시 동승 매칭',
      desc: '종료 후 전주역·터미널 방면 3~4인 택시 동승을 가이드가 현장에서 묶어드립니다.',
    },
  ],
  faq: [
    {
      q: '글쓰기를 잘 못해도 괜찮을까요?',
      a: '물론입니다. 모든 페이지에 문장 완성형 질문과 체크리스트가 준비되어 있어 빈칸을 채우기만 하면 한 권이 완성됩니다.',
    },
    {
      q: '사진 촬영이 부담스러워요.',
      a: 'Tier 1은 얼굴 클로즈업 없이 손, 뒷모습, 공간 위주의 캔디드 사진 3매만 제공됩니다. 프로필 스냅은 다른 참가자가 시음 노트를 쓰는 여유 시간에 1인 5분 내외로 조용히 진행됩니다.',
    },
    {
      q: '전통주를 못 마셔도 참여할 수 있나요?',
      a: '네. 사전 신청 시 말씀해 주시면 무알코올 페어링(전통 음청류)으로 준비해 드립니다.',
    },
    {
      q: '한복은 어디서 반납하나요?',
      a: '워크숍이 끝난 뒤 에이커북스토어에서 환복하시면 주최 측이 일괄 수거해 다음 날 한복점에 반납합니다.',
    },
    {
      q: '온라인으로도 진행하나요?',
      a: '아니요. 전주의 공기, 다방의 조명, 서점의 종이 냄새가 이 프로그램의 전부이기에 오프라인으로만 진행합니다.',
    },
  ],
}

export const closing = {
  title: ['오늘 밤,', '당신의 첫 책이 시작됩니다.'],
  sub: '선착순 6~8명 · 매주 토요일 15:30 — 20:30',
  cta: '자리 예약하기',
}

export const footer = {
  hosts: '삼양다방 × 에이커북스토어',
  address: '전북 전주시 완산구 · 동문길 & 전라감영길 일대',
  instagram: '@jeonju.pungryurok',
  copyright: '© 2026 전주 심야 풍류록. All rights reserved.',
}

export const formatKRW = (n) => '₩' + n.toLocaleString('ko-KR')
