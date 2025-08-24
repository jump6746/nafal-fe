import { getLuckDrawListAPI } from '@/entities/luckDraw/api/luckDrawApi';
import { useTopNavigationStore } from '@/shared/stores';
import { LuckyDrawProductCarousel } from '@/widgets/luckydraw/ui';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const LuckyDrawPage = () => {
  const setText = useTopNavigationStore(state => state.setText);
  const { auctionId } = useParams();
  const [LuckyDrawInfo, setLuckyDrawInfo] = useState<number>(0);

  useEffect(() => {
    setText('럭키드로우');
  }, []);

  const setLuckyDrawindex = (index: number) => {
    setLuckyDrawInfo(index);
  };
  const { data: luckDrawList } = useSuspenseQuery({
    queryKey: ['luckDrawList', auctionId],
    queryFn: () => getLuckDrawListAPI(auctionId ?? ''),
  });

  return (
    <div
      className='flex h-full w-full flex-col pt-6'
      style={{
        backgroundImage: 'url(/images/BackGround/LuckyDrawBackground.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className='flex items-end justify-between px-5 pb-6'>
        <span className='text-2xl leading-1.5 font-extrabold'>
          입찰만 해도
          <br />
          증정품을 드려요!
        </span>
        <span className='font-semibold text-gray-400'>총 {10}개 중 추첨</span>
      </div>
      <LuckyDrawProductCarousel setLuckyDrawindex={setLuckyDrawindex} />
      <div className='flex flex-col gap-4.5 px-5 pt-7.5'>
        <span className='text-lg font-bold text-gray-900'>
          {LuckyDrawInfo < luckDrawList.data.length
            ? luckDrawList.data[LuckyDrawInfo].productName
            : '미공개 증정품'}
        </span>
        {LuckyDrawInfo < luckDrawList.data.length ? (
          <>
            <div className='flex flex-col'>
              <span className='text-sm font-medium text-gray-600'>총 증정 개수</span>
              <span className='font-semibold text-gray-900'>
                총{luckDrawList.data[LuckyDrawInfo].amount}개
              </span>
            </div>
            <div className='flex flex-col pt-1.5'>
              <span className='text-sm font-medium text-gray-600'>현황</span>
              <span className='font-semibold text-gray-900'>
                {luckDrawList.data[LuckyDrawInfo].progress}/{' '}
                {luckDrawList.data[LuckyDrawInfo].limit}
              </span>
            </div>
          </>
        ) : (
          <p className='text-base font-semibold text-gray-900'>이전 증정품 추첨 후 공개됩니다</p>
        )}
      </div>
    </div>
  );
};

export default LuckyDrawPage;
