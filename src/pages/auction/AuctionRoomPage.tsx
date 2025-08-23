import { getAuctionDetailAPI } from '@/entities/api/auction/auctionApi';
import CountdownTimer from '@/features/auction/CountdownTimer';
import { useTopNavigationStore } from '@/shared/stores';
import Tooltip from '@/shared/ui/Tooltip/Tooltip';
import { AuctionProductCarousel, AuctionRoom } from '@/widgets/auction/ui';
import SuccessConfetti from '@/widgets/auction/ui/SuccessConfetti';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatKoreanDate } from '@/shared/lib/formatKoreanDate';

const AuctionRoomPage = () => {
  const [showOverlay, setShowOverlay] = useState<boolean>(true);
  const setText = useTopNavigationStore(state => state.setText);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showConfetti) {
      return;
    }

    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [showConfetti]);

  useEffect(() => {
    setText('제품');
  }, []);

  // 3초 후 자동으로 사라지게
  useEffect(() => {
    if (!showOverlay) {
      return;
    }

    const timer = setTimeout(() => {
      setShowOverlay(false);
    }, 2000); // 3초

    return () => clearTimeout(timer);
  }, [showOverlay]);

  const { productId } = useParams();
  const { data: auctionDetail } = useSuspenseQuery({
    queryKey: ['auctionDetail', productId],
    queryFn: () => getAuctionDetailAPI(productId ?? '1'),
  });

  return (
    <div className='relative h-full w-full' ref={containerRef}>
      {showConfetti && <SuccessConfetti container={containerRef} />}
      {/* 사진 공간  */}
      <div className='relative'>
        <AuctionProductCarousel setShowOverlay={setShowOverlay} />
        <div
          className={`absolute top-0 aspect-[3/2] w-full transition-opacity duration-1000 ${
            showOverlay ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <img
            src='/images/mockup/storycard_bg.jpg'
            alt='스토리텔링 카드'
            className='h-full w-full object-cover'
          />
          <p className='absolute top-0 px-5 py-7.5 text-sm font-semibold text-gray-800'>
            현재는 공식 판매처에서도 구할 수 없고, 중고 시장에서도 <br />
            잘 나오지 않는 아이템이에요. <br />
            <br />
            KANU 팬들은 '잊을 수 없는 팝업의 상징'으로 여기며, <br />
            한정판 굿즈 수집가들에게는 놓칠 수 없는 보물이죠!!
          </p>
        </div>
      </div>
      {/* 경매 정보 공간 */}
      <div className='flex flex-col gap-3.5 px-5 pt-11 pb-4.5'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            {/* 브랜드 짧은 로고 */}
            <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 px-2'>
              <img src='/images/LOGO/LOGO_Signature.svg' alt='로고 시그니처' />
            </div>
            {/* 브랜드 긴 로고 */}
            <div className='aspect-[3/1] h-6'>
              <img src='/images/LOGO/LOGO_Monogram.svg' alt='브랜드 로고' />
            </div>
          </div>
          <div className='group relative'>
            <div className='absolute -top-3 -translate-x-6/10 -translate-y-full'>
              <Tooltip Tooltip='럭키드로우 현황을 확인해보세요!' />
            </div>
            <Link to='/luckydraw' className='flex cursor-pointer items-center gap-1.5'>
              <img src='/images/Icons/solar_ticket-bold.svg' alt='티켓' />
              <span className='text-sub-b-400 font-semibold'>{10}개</span>
            </Link>
          </div>
        </div>
        <div className='flex flex-col gap-1.5'>
          {/* 상품 이름 */}
          <div className='flex w-full justify-between'>
            <span className='text-lg font-bold text-gray-900'>
              {auctionDetail.data.product.productName}
            </span>
            <span className='bg-point-200 text-point-900 rounded-full px-4 py-0.5 font-semibold'>
              {auctionDetail.data.product.condition}
            </span>
          </div>
          <div className='flex gap-1.5'>
            {auctionDetail.data.categories.map(category => (
              <span
                key={category.categoryId}
                className='rounded-lg bg-gray-800 px-4.5 py-0.5 text-white'
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-2 pt-1'>
          {/* 현재가, 입찰 단위 */}
          <div className='flex gap-4.5'>
            <div className='flex flex-col gap-2'>
              <span className='text-sm font-medium text-gray-900'>현재가</span>
              <span className='text-2xl font-semibold text-gray-900'>
                {auctionDetail.data.currentPrice.toLocaleString()}원
              </span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-sm font-medium text-gray-900'>입찰단위</span>
              <span className='text-2xl font-semibold text-gray-900'>
                {auctionDetail.data.bidUnit.toLocaleString()}원
              </span>
            </div>
          </div>
          {/* 남은 시간, 00명 참여중 */}
          <div className='flex flex-col gap-0.5'>
            <span className='text-sub-a-500 font-semibold'>
              남은 시간 <CountdownTimer endDate={auctionDetail.data.endAt} />
            </span>
            <div className='flex items-center gap-1'>
              <div className='bg-sub-a-200 flex h-4.5 w-4.5 items-center justify-center rounded-full'>
                <div className='bg-sub-a-500 h-3 w-3 animate-pulse rounded-full'></div>
              </div>
              <span className='font-semibold text-gray-800'>
                {auctionDetail.data.participantCount}명 참여중
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* divide */}
      <div className='h-4 w-full bg-gray-200'></div>
      {/* 상품 상세 정보 */}
      <div className='mt-1.5 flex flex-col gap-4.5 bg-gray-50 px-5 pt-6'>
        {/* 등록일, 시작일, 종료일 */}
        <div className='flex flex-col text-sm font-medium text-gray-800'>
          <span>등록일 {formatKoreanDate(auctionDetail.data.createdAt)}</span>
          <span>시작일 {formatKoreanDate(auctionDetail.data.startAt)}</span>
          <span>종료일 {formatKoreanDate(auctionDetail.data.endAt)}</span>
        </div>
        {/* 행사 */}
        <div className='gradient-border flex flex-col gap-3 rounded-[12px] p-4'>
          <h3 className='text-lg font-bold text-gray-800'>행사</h3>
          <div className='flex flex-col'>
            <span className='text-sm font-medium text-gray-600'>행사명</span>
            <span className='font-semibold text-gray-900'>
              {auctionDetail.data.event.eventName}
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='text-sm font-medium text-gray-600'>행사소개</span>
            <p className='text-sm font-medium text-gray-900'>
              {auctionDetail.data.event.eventDescription}
            </p>
          </div>
        </div>
        {/* 상품 */}
        <div className='gradient-border flex flex-col gap-3 rounded-[12px] p-4'>
          <h3 className='text-lg font-bold text-gray-800'>상품</h3>
          <div className='flex flex-col'>
            <span className='text-sm font-medium text-gray-600'>소개</span>
            <p className='text-sm font-medium text-gray-900'>
              {auctionDetail.data.product.productDescription}
            </p>
          </div>
          <div className='flex gap-4.5'>
            {auctionDetail.data.product.tags.map(tag => (
              <span key={tag.tagId} className='text-sm font-semibold text-gray-900'>
                #{tag.name}
              </span>
            ))}
          </div>
          <div className='flex flex-col'>
            <span className='text-sm font-medium text-gray-600'>사이즈</span>
            <span className='text-sm font-medium text-gray-900'>
              {'가로 ' +
                auctionDetail.data.product.widthCm +
                'cm X 세로 ' +
                auctionDetail.data.product.heightCm +
                'cm'}
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='text-sm font-medium text-gray-600'>재질</span>
            <span className='text-sm font-medium text-gray-900'>
              {auctionDetail.data.product.material}
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='text-sm font-medium text-gray-600'>사용위치</span>
            <span className='text-sm font-medium text-gray-900'>
              {auctionDetail.data.product.usageLocation}
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='text-sm font-medium text-gray-600'>에디션정보</span>
            <span className='text-sm font-medium text-gray-900'>
              {auctionDetail.data.product.editionInfo}
            </span>
          </div>
        </div>
        {/* 배송 */}
        <div className='gradient-border flex flex-col gap-3 rounded-[12px] p-4'>
          <h3 className='text-lg font-bold text-gray-800'>배송</h3>
          <div className='flex flex-col'>
            <span className='text-sm font-medium text-gray-600'>배송방법</span>
            <span className='text-sm font-medium text-gray-900'>{auctionDetail.data.delivery}</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-sm font-medium text-gray-600'>배송비용</span>
            <span className='text-sm font-medium text-gray-900'>{'3,500원'}</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-sm font-medium text-gray-600'>배송 참고사항</span>
            <span className='text-sm font-medium text-gray-900'>{'없음'}</span>
          </div>
        </div>
        <div className='sticky right-0 bottom-0 left-0 w-full bg-gradient-to-b from-transparent to-white py-9'>
          <AuctionRoom />
        </div>
      </div>
    </div>
  );
};

export default AuctionRoomPage;
