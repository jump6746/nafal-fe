import type { AuctionListItem } from '../type/types';

// 인기
export const popularDummy = [
  {
    productId: 1,
    immediatelyPurchasePrice: 120000,
    currentPrice: 100000,
    productName: 'KANU 원두 에디션 텀블러',
    url: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&h=400&fit=crop',
    endAt: '2025-12-31T23:59:59Z',
    sellerName: 'KANU',
    isImminent: false,
    bidCnt: 5,
  },
  {
    productId: 2,
    immediatelyPurchasePrice: 150000,
    currentPrice: 80000,
    productName: '스타벅스 리유저블 컵 세트',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    endAt: '2025-11-30T23:59:59Z',
    sellerName: 'STARBUCKS',
    isImminent: false,
    bidCnt: 12,
  },
  {
    productId: 3,
    immediatelyPurchasePrice: 90000,
    currentPrice: 40000,
    productName: '스누피 한정판 머그컵',
    url: 'https://images.unsplash.com/photo-1615799998603-7c6270a45196?w=400&h=400&fit=crop',
    endAt: '2025-10-25T23:59:59Z',
    sellerName: 'SNOOPY',
    isImminent: false,
    bidCnt: 8,
  },
  {
    productId: 4,
    immediatelyPurchasePrice: 180000,
    currentPrice: 160000,
    productName: '네스프레소 머신',
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop',
    endAt: '2025-09-15T23:59:59Z',
    sellerName: 'NESPRESSO',
    isImminent: false,
    bidCnt: 20,
  },
  {
    productId: 5,
    immediatelyPurchasePrice: 110000,
    currentPrice: 70000,
    productName: '프리미엄 원두 세트',
    url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop',
    endAt: '2025-08-31T23:59:59Z',
    sellerName: 'BLUE BOTTLE',
    isImminent: false,
    bidCnt: 6,
  },
  {
    productId: 6,
    immediatelyPurchasePrice: 220000,
    currentPrice: 180000,
    productName: '딤채 김치냉장고 미니',
    url: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop',
    endAt: '2025-12-01T23:59:59Z',
    sellerName: 'DIMCHAE',
    isImminent: false,
    bidCnt: 15,
  },
  {
    productId: 7,
    immediatelyPurchasePrice: 70000,
    currentPrice: 50000,
    productName: '커피 드리퍼 풀세트',
    url: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=400&h=400&fit=crop',
    endAt: '2025-10-10T23:59:59Z',
    sellerName: 'KALITA',
    isImminent: false,
    bidCnt: 9,
  },
  {
    productId: 8,
    immediatelyPurchasePrice: 300000,
    currentPrice: 250000,
    productName: '다이슨 청소기 V15',
    url: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=400&fit=crop',
    endAt: '2025-11-20T23:59:59Z',
    sellerName: 'DYSON',
    isImminent: false,
    bidCnt: 18,
  },
];

// 신규
export const newDummy = [
  {
    productId: 9,
    immediatelyPurchasePrice: 60000,
    currentPrice: 30000,
    productName: '이케아 무드등',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    endAt: '2025-12-31T23:59:59Z',
    sellerName: 'IKEA',
    isImminent: false,
    bidCnt: 2,
  },
  {
    productId: 10,
    immediatelyPurchasePrice: 85000,
    currentPrice: 40000,
    productName: '브리츠 블루투스 스피커',
    url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    endAt: '2025-12-25T23:59:59Z',
    sellerName: 'BRITZ',
    isImminent: false,
    bidCnt: 4,
  },
  {
    productId: 11,
    immediatelyPurchasePrice: 140000,
    currentPrice: 100000,
    productName: '로지텍 무선 키보드',
    url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
    endAt: '2025-12-15T23:59:59Z',
    sellerName: 'LOGITECH',
    isImminent: false,
    bidCnt: 3,
  },
  {
    productId: 12,
    immediatelyPurchasePrice: 50000,
    currentPrice: 25000,
    productName: '무민 캐릭터 인형',
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    endAt: '2025-12-20T23:59:59Z',
    sellerName: 'MOOMIN',
    isImminent: false,
    bidCnt: 1,
  },
  {
    productId: 13,
    immediatelyPurchasePrice: 200000,
    currentPrice: 150000,
    productName: '삼성 갤럭시 버즈',
    url: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop',
    endAt: '2025-12-28T23:59:59Z',
    sellerName: 'SAMSUNG',
    isImminent: false,
    bidCnt: 6,
  },
  {
    productId: 14,
    immediatelyPurchasePrice: 100000,
    currentPrice: 60000,
    productName: '나이키 에어포스 1',
    url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    endAt: '2025-12-22T23:59:59Z',
    sellerName: 'NIKE',
    isImminent: false,
    bidCnt: 8,
  },
  {
    productId: 15,
    immediatelyPurchasePrice: 75000,
    currentPrice: 40000,
    productName: '무선 게이밍 마우스',
    url: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop',
    endAt: '2025-12-29T23:59:59Z',
    sellerName: 'RAZER',
    isImminent: false,
    bidCnt: 2,
  },
  {
    productId: 16,
    immediatelyPurchasePrice: 300000,
    currentPrice: 210000,
    productName: 'LG 울트라 와이드 모니터',
    url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop',
    endAt: '2025-12-27T23:59:59Z',
    sellerName: 'LG',
    isImminent: false,
    bidCnt: 7,
  },
];

// 마감
export const closingDummy = [
  {
    productId: 17,
    immediatelyPurchasePrice: 130000,
    currentPrice: 120000,
    productName: '애플 매직 키보드',
    url: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop',
    endAt: '2025-08-22T23:59:59Z',
    sellerName: 'APPLE',
    isImminent: true,
    bidCnt: 11,
  },
  {
    productId: 18,
    immediatelyPurchasePrice: 70000,
    currentPrice: 50000,
    productName: '리락쿠마 쿠션',
    url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    endAt: '2025-08-23T23:59:59Z',
    sellerName: 'SAN-X',
    isImminent: true,
    bidCnt: 4,
  },
  {
    productId: 19,
    immediatelyPurchasePrice: 160000,
    currentPrice: 140000,
    productName: '캔들 워머 무드등',
    url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
    endAt: '2025-08-25T23:59:59Z',
    sellerName: 'YANKEE',
    isImminent: true,
    bidCnt: 3,
  },
  {
    productId: 20,
    immediatelyPurchasePrice: 90000,
    currentPrice: 60000,
    productName: '캐릭터 피규어 세트',
    url: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=400&fit=crop',
    endAt: '2025-08-24T23:59:59Z',
    sellerName: 'BANDAI',
    isImminent: true,
    bidCnt: 6,
  },
  {
    productId: 21,
    immediatelyPurchasePrice: 280000,
    currentPrice: 200000,
    productName: '닌텐도 스위치 OLED',
    url: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop',
    endAt: '2025-08-26T23:59:59Z',
    sellerName: 'NINTENDO',
    isImminent: true,
    bidCnt: 20,
  },
  {
    productId: 22,
    immediatelyPurchasePrice: 60000,
    currentPrice: 35000,
    productName: '북유럽 감성 벽시계',
    url: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400&h=400&fit=crop',
    endAt: '2025-08-28T23:59:59Z',
    sellerName: 'NORDIC',
    isImminent: true,
    bidCnt: 2,
  },
  {
    productId: 23,
    immediatelyPurchasePrice: 100000,
    currentPrice: 75000,
    productName: '캠핑용 버너',
    url: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400&h=400&fit=crop',
    endAt: '2025-08-29T23:59:59Z',
    sellerName: 'SNOWPEAK',
    isImminent: true,
    bidCnt: 5,
  },
  {
    productId: 24,
    immediatelyPurchasePrice: 400000,
    currentPrice: 350000,
    productName: '소니 플레이스테이션 5',
    url: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&h=400&fit=crop',
    endAt: '2025-08-30T23:59:59Z',
    sellerName: 'SONY',
    isImminent: true,
    bidCnt: 14,
  },
];

// Mock API 함수
export const getMockAuctionListAPI = async (param: {
  status: 'OPEN' | 'CLOSED' | 'SCHEDULED';
  view?: 'DEFAULT' | 'NEW' | 'POPULAR' | 'OPENING_SOON';
  keyword?: string;
  page?: number;
  size?: number;
}): Promise<{ data: AuctionListItem[]; success: boolean; message: string }> => {
  // 로딩 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 1500));

  let mockData: typeof popularDummy = [];

  // status와 view에 따라 데이터 선택
  if (param.status === 'OPEN') {
    if (param.view === 'NEW') {
      mockData = newDummy;
    } else if (param.view === 'POPULAR') {
      mockData = popularDummy;
    } else if (param.view === 'OPENING_SOON') {
      mockData = closingDummy;
    } else {
      mockData = [...popularDummy, ...newDummy];
    }
  } else if (param.status === 'SCHEDULED') {
    mockData = newDummy.slice(0, 4); // 예정 상품은 일부만
  } else if (param.status === 'CLOSED') {
    mockData = closingDummy;
  }

  // AuctionListItem 형태로 변환
  const transformedData = mockData.map(item => ({
    auctionId: item.productId + 1000,
    productId: item.productId,
    userId: 1,
    sellerName: item.sellerName,
    productName: item.productName,
    currentPrice: item.currentPrice,
    currencyCode: 'KRW',
    bidCnt: item.bidCnt,
    eventId: 1,
    startPrice: item.currentPrice - 10000,
    bidIncrement: 5000,
    immediatelyPurchasePrice: item.immediatelyPurchasePrice,
    startAt: '2025-01-01T00:00:00Z',
    endAt: item.endAt,
    imgUrl: item.url,
  }));

  return {
    data: transformedData,
    success: true,
    message: 'Success',
  };
};
