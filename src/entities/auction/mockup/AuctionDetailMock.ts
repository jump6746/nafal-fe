import type { AuctionDetail } from '../type/types';

const kanuProductMock: AuctionDetail = {
  auctionId: 'auction_001',
  productId: 'product_001',
  userId: 'user_001',
  status: 'OPEN',
  sellerName: 'KANU 팝업스토어',
  categories: [
    { categoryId: 1, name: '커피용품' },
    { categoryId: 2, name: '한정판' },
    { categoryId: 3, name: '팝업스토어' },
  ],
  currentPrice: 150000,
  bidUnit: 5000,
  participantCount: 23,
  event: {
    eventName: "카누 팝업스토어 'KANU House'",
    eventDescription:
      '2025년 여름 서울 성수동에서 진행된 카누 팝업스토어로, 브랜드 아이덴티티를 담은 한정 소품과 가구를 전시했습니다.',
  },
  product: {
    productName: '카누 팝업 스토어 원두 에디션 텀블러',
    imageUrl: '/images/mockup/kanu_tumbler_special_edition.jpg',
    imageType: 'JPG',
    productDescription:
      "2025년 여름 성수동 'KANU House' 팝업스토어에서만 선보였던 한정판 원두 에디션 텀블러입니다. 실제 전시 공간에 사용되었으며, 세척 후 최상의 상태로 보관 중입니다.",
    tags: [
      { tagId: 101, name: '카누' },
      { tagId: 102, name: '텀블러' },
      { tagId: 103, name: '한정판' },
      { tagId: 104, name: '팝업스토어' },
    ],
    widthCm: 8.5,
    heightCm: 22,
    material: '스테인리스 스틸, BPA-Free 플라스틱',
    usageLocation: '주방 및 사무실',
    editionInfo: '2025 KANU House 팝업스토어 한정 에디션',
    condition: '최상',
  },
  delivery: '일반택배 / 방문 픽업 택 1',
  startAt: '2025-08-23T10:00:00Z',
  endAt: '2025-08-30T20:00:00Z',
  createdAt: '2025-07-14T00:00:00Z',
};

export default kanuProductMock;
