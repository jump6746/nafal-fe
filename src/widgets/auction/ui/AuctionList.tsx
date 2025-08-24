import AuctionListCard from '@/features/auction/AuctionListCard';
import { getMockAuctionListAPI } from '@/entities/auction/mockup/AuctionListMock';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { AuctionListItem } from '@/entities/auction/type/types';

export interface AuctionListProps {
  section: string;
  sort: string;
  category: string[];
  minPrice: number;
  maxPrice: number;
  brand: string[];
  event: string[];
  isImminent: boolean;
}

const AuctionList = ({
  section,
  sort,
  category,
  minPrice,
  maxPrice,
  brand,
  event,
  isImminent,
}: AuctionListProps) => {
  const { data: AuctionListData } = useSuspenseQuery({
    queryKey: ['getAuctionList', section, sort, category, minPrice, maxPrice, brand, event],
    queryFn: () =>
      getMockAuctionListAPI({
        status: section === '진행중' ? 'OPEN' : section === '예정' ? 'SCHEDULED' : 'CLOSED',
        view:
          sort === '신규'
            ? 'NEW'
            : sort === '마감 임박'
              ? 'OPENING_SOON'
              : sort === '인기'
                ? 'POPULAR'
                : 'DEFAULT',
        keyword: '',
        page: 0,
        size: 10,
      }),
  });
  return (
    <div className='grid grid-cols-2 gap-x-[16px] gap-y-[28px]'>
      {AuctionListData.data?.map((item: AuctionListItem) => (
        <AuctionListCard
          key={item.productId}
          productId={item.productId}
          immediatelyPurchasePrice={item.immediatelyPurchasePrice}
          currentPrice={item.currentPrice}
          productName={item.productName}
          url={item.imgUrl}
          endAt={item.endAt}
          sellerName={item.sellerName}
          isImminent={isImminent}
          bidCnt={item.bidCnt}
        />
      ))}
    </div>
  );
};

export default AuctionList;
