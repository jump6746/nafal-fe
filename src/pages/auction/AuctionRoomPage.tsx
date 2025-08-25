import { getAuctionDetailAPI } from '@/entities/auction/api/auctionApi';
import CountdownTimer from '@/features/auction/CountdownTimer';
import { useTopNavigationStore } from '@/shared/stores';
import Tooltip from '@/shared/ui/Tooltip/Tooltip';
import { AuctionProductCarousel, AuctionRoom, BidPlace } from '@/widgets/auction/ui';
import SuccessConfetti from '@/widgets/auction/ui/SuccessConfetti';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatKoreanDate } from '@/shared/lib/formatKoreanDate';
import { renderTextWithLineBreaks } from '@/shared/lib';
import useUserInfo from '@/entities/user/hooks/useUserInfo';
import { useLoginModal } from '@/shared/hooks';

const AuctionRoomPage = () => {
  const [showOverlay, setShowOverlay] = useState<boolean>(true);
  const [openBid, setOpenBid] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const setText = useTopNavigationStore(state => state.setText);
  const setOnClick = useTopNavigationStore(state => state.setOnClick);

  const [shouldFail, setShouldFail] = useState<boolean>(false);
  // CardPayment 관련 상태
  const [paymentVariant, setPaymentVariant] = useState<
    'CardNotYet' | 'AccountCheck' | 'CardPayment' | 'CertificationNotYet' | 'NeedLogin'
  >('NeedLogin');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [shouldOpenModal, setShouldOpenModal] = useState(false);
  const { userInfo, isLoading } = useUserInfo();
  const { showLoginModal } = useLoginModal();

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
    if (openBid) {
      setOnClick(() => {
        setOpenBid(false);
      });
    } else {
      setOnClick(null);
    }
  }, [openBid]);

  useEffect(() => {
    setText('제품');
  }, [setText]);

  // shouldOpenModal이 true일 때만 모달 열기
  useEffect(() => {
    if (shouldOpenModal) {
      setIsPaymentModalOpen(true);
      setShouldOpenModal(false); // 플래그 리셋
    }
  }, [shouldOpenModal]);

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

  const { auctionId } = useParams();
  const { data: auctionDetail } = useSuspenseQuery({
    queryKey: ['auctionDetail', auctionId],
    queryFn: () => getAuctionDetailAPI(auctionId ?? '1'),
  });

  // 입찰 처리 함수
  const handlePay = () => {
    // 로딩 중인 경우 처리하지 않음
    if (isLoading) {
      console.log('사용자 정보 로딩 중...');
      return;
    }

    if (!userInfo) {
      console.log('설정할 paymentVariant: NeedLogin');
      setPaymentVariant('NeedLogin');
      showLoginModal();
      return;
    }

    let newVariant:
      | 'CardNotYet'
      | 'AccountCheck'
      | 'CardPayment'
      | 'CertificationNotYet'
      | 'NeedLogin';
    let newShouldFail = false;

    // 1. identityVerified가 없으면 CertificationNotYet
    if (!userInfo.identityVerified) {
      newVariant = 'CertificationNotYet';
    }
    // 2. cardRegistered가 없으면 CardNotYet
    else if (!userInfo.cardRegistered) {
      newVariant = 'CardNotYet';
    }
    // 3. balance가 null이거나 부족하면 AccountCheck 여기에 경매 가격 실시간 처리해야함함
    else if (userInfo.balance === null || userInfo.balance <= 0) {
      newVariant = 'AccountCheck';
      newShouldFail = true;
    } else if (userInfo.balance > 0) {
      newVariant = 'AccountCheck';
      newShouldFail = false;
    } else {
      newVariant = 'CardPayment';
    }

    console.log('설정할 paymentVariant:', newVariant);
    console.log('설정할 shouldFail:', newShouldFail);

    setPaymentVariant(newVariant);
    setShouldFail(newShouldFail);
    setShouldOpenModal(true);
  };

  const handleBidClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handlePay(); // 입찰하기 버튼 클릭 시 handlePay 호출

    if (paymentVariant !== 'AccountCheck') {
      return;
    }
  };

  const handleAutoBidClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handlePay(); // 자동입찰 버튼 클릭 시에도 handlePay 호출
  };

  // AccountCheck 성공 시 CardPayment로 변경
  const handleAccountCheckSuccess = useCallback(() => {
    console.log('AccountCheck 성공! CardPayment로 변경');
    setPaymentVariant('CardPayment');
  }, []);

  return (
    <div
      className={`relative h-full w-full ${openBid ? 'overflow-hidden' : 'overflow-auto'}`}
      ref={containerRef}
    >
      {showConfetti && <SuccessConfetti container={containerRef} />}
      {/* 사진 공간  */}
      <div className='relative'>
        <AuctionProductCarousel
          imageUrls={
            Array.isArray(auctionDetail.data.product.originalImageUrl)
              ? auctionDetail.data.product.originalImageUrl.map(img => img.presignedUrl)
              : []
          }
          setShowOverlay={setShowOverlay}
        />
        <div
          className={`absolute top-0 aspect-[3/2] w-full overflow-hidden transition-opacity duration-1000 ${
            showOverlay ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <img
            src={auctionDetail.data.storyImageUrl?.presignedUrl || '/images/Dummy/MainPage/2.jpg'}
            alt='스토리텔링 카드'
            className='h-full w-full object-cover'
          />
          <p className='absolute top-0 px-5 py-7.5 text-sm font-semibold whitespace-pre-wrap text-gray-800'>
            {auctionDetail.data.story}
          </p>
        </div>
      </div>
      {/* 경매 정보 공간 */}
      <div className='flex flex-col gap-3.5 px-5 pt-11 pb-4.5'>
        <div className='flex flex-col gap-3'>
          <div className='flex flex-col gap-1'>
            {/* 브랜드 로고, 판매자명, 이벤트명, 럭키드로우 현황을 같은 행에 배치 */}
            <div className='flex items-start justify-between'>
              <div className='flex items-center gap-3'>
                <img src={'/images/LOGO/LOGO_Signature.svg'} alt='로고 시그니처' />
                <span className='text-xl font-bold'>{auctionDetail.data.sellerName}</span>
              </div>
              <div className='group relative flex-shrink-0'>
                <div className='absolute -top-3 -translate-x-6/10 -translate-y-full'>
                  <Tooltip Tooltip='럭키드로우 현황을 확인해보세요!' />
                </div>
                <Link
                  to={`/luckydraw/${auctionDetail.data.event.eventId}`}
                  className='flex cursor-pointer items-center gap-1.5'
                >
                  <img src='/images/Icons/solar_ticket-bold.svg' alt='티켓' />
                  <span className='text-sub-b-400 font-semibold'>
                    {auctionDetail.data.ticketCount}개
                  </span>
                </Link>
              </div>
            </div>
            {/* 이벤트명 */}
            <div className='mt-3 flex min-w-0 flex-col gap-[1px]'>
              <span className='text-sm font-medium text-gray-700'>
                {auctionDetail.data.event.eventName}
              </span>
              <span className='text-lg leading-tight font-bold break-words'>
                {auctionDetail.data.product.title}
              </span>
            </div>
            <span className='text-point-900 mt-1 font-semibold'>
              {auctionDetail.data.product.condition}
            </span>
          </div>
        </div>
        <div className='flex flex-col gap-1.5'>
          <div className='flex gap-1.5'>
            {auctionDetail.data.categories.map(category => (
              <span key={category} className='rounded-lg bg-gray-800 px-4 py-0.5 text-white'>
                {category}
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
      <div className='h-3 w-full bg-gray-200'></div>
      {/* 상품 상세 정보 */}
      <div className='mt-1.5 flex flex-col gap-4.5 bg-gray-50 px-5 pt-6'>
        {/* 등록일, 시작일, 종료일 */}
        <div className='flex flex-col gap-[2px] rounded-lg bg-gray-100 px-4 py-4 text-sm font-medium'>
          <div className='flex items-center gap-2'>
            <span className='text-sm font-semibold text-gray-900'>등록일</span>
            <span className='text-gray-700'>{formatKoreanDate(auctionDetail.data.createdAt)}</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-sm font-semibold text-gray-900'>시작일</span>
            <span className='text-gray-700'>{formatKoreanDate(auctionDetail.data.startAt)}</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-sm font-semibold text-gray-900'>종료일</span>
            <span className='text-gray-700'>{formatKoreanDate(auctionDetail.data.endAt)}</span>
          </div>
        </div>
        {/* 탄소절감량 */}
        <div className='gradient-border flex flex-col gap-[2px] rounded-[12px] p-4'>
          <span className='text-sm leading-tight font-medium'>
            {renderTextWithLineBreaks(auctionDetail.data.expectedEffectDesc)}
          </span>
          <span className='text-point-900 text-sm font-medium'>
            탄소 절감{' '}
            {auctionDetail.data.expectedEffectCo2Kg === 0
              ? '1.5'
              : auctionDetail.data.expectedEffectCo2Kg}
            kg
          </span>
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
            <p className='text-sm font-medium whitespace-pre-wrap text-gray-900'>
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
              <span key={tag} className='text-sm font-semibold text-gray-900'>
                #{tag}
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
          {auctionDetail.data.delivery.deliveryMethod && (
            <div className='flex flex-col'>
              <>
                <span className='text-sm font-medium text-gray-600'>배송방법</span>
                <span className='text-sm font-medium text-gray-900'>
                  {auctionDetail.data.delivery.deliveryMethod}
                </span>
              </>
            </div>
          )}
          {auctionDetail.data.delivery.deliveryFee && (
            <div className='flex flex-col'>
              <span className='text-sm font-medium text-gray-600'>배송비용</span>
              <span className='text-sm font-medium text-gray-900'>
                {auctionDetail.data.delivery.deliveryFee.toLocaleString()}원
              </span>
            </div>
          )}
          {auctionDetail.data.delivery.deliveryNote && (
            <div className='flex flex-col'>
              <span className='text-sm font-medium text-gray-600'>배송 참고사항</span>
              <span className='text-sm font-medium text-gray-900'>
                {auctionDetail.data.delivery.deliveryNote}
              </span>
            </div>
          )}
        </div>
        <div className='sticky right-0 bottom-0 left-0 w-full bg-gradient-to-b from-transparent to-white py-9'>
          {auctionId && (
            <AuctionRoom
              eventId={auctionDetail.data.event.eventId.toString()}
              participantCount={auctionDetail.data.participantCount}
              timeLeft={auctionDetail.data.endAt}
              auctionId={auctionId}
              price={auctionDetail.data.currentPrice}
              bidUnit={auctionDetail.data.bidUnit}
              onBidClick={handleBidClick}
              onAutoBidClick={handleAutoBidClick}
              paymentVariant={paymentVariant}
              shouldFail={shouldFail}
              isPaymentModalOpen={isPaymentModalOpen}
              onPaymentModalOpenChange={setIsPaymentModalOpen}
              onAccountCheckSuccess={handleAccountCheckSuccess}
            />
          )}
        </div>
      </div>
      {openBid && <BidPlace />}
    </div>
  );
};

export default AuctionRoomPage;
