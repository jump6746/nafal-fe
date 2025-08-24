import AuctionListCard from '@/features/auction/AuctionListCard';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import type { AuctionListItem } from '@/entities/auction/type/types';
import { getAuctionListAPI } from '@/entities/auction/api/auctionApi';
import { useEffect, useRef } from 'react';

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
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
    queryKey: ['getAuctionList', section, sort, category, minPrice, maxPrice, brand, event],
    queryFn: ({ pageParam = 0 }) =>
      getAuctionListAPI({
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
        page: pageParam,
        size: 10,
        categorys: category,
        minCurrentPrice: minPrice,
        maxCurrentPrice: maxPrice,
        brand,
        eventName: event,
      }),
    getNextPageParam: lastPage => {
      const pageInfo = lastPage.data;
      return pageInfo.last ? undefined : pageInfo.number + 1;
    },
    initialPageParam: 0,
  });

  // IntersectionObserver for infinite scroll trigger
  const observerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!observerRef.current) return;
    const el = observerRef.current;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const auctions = data?.pages.flatMap(page => page.data.content) ?? [];

  if (auctions.length === 0) {
    return (
      <div className='mt-20 flex h-full w-full flex-col items-center justify-center bg-gray-50 text-center'>
        {/* 아이콘 (Heroicons의 magnifying-glass) */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='h-12 w-12 text-gray-400'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
          />
        </svg>

        {/* 메인 텍스트 */}
        <p className='mt-4 text-lg font-semibold text-gray-800'>검색 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      <div className='grid grid-cols-2 gap-x-[16px] gap-y-[28px]'>
        {auctions.map((item: AuctionListItem) => (
          <AuctionListCard
            auctionId={item.auctionId}
            eventId={item.eventId}
            key={item.auctionId}
            immediatelyPurchasePrice={item.immediatelyPurchasePrice}
            currentPrice={item.currentPrice}
            productName={item.productName}
            url={item.productImageUrl}
            endAt={item.endAt}
            sellerName={item.sellerName}
            isImminent={isImminent}
            bidCnt={item.bidCnt}
          />
        ))}
      </div>

      {/* 스크롤 감시용 div */}
      <div ref={observerRef} className='h-10' />
    </>
  );
};

export default AuctionList;
