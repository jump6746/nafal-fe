import { useTopNavigationStore } from '@/shared/stores';
import { LuckyDrawProductCarousel } from '@/widgets/luckydraw/ui';
import { useEffect, useState } from 'react';

const LuckyDrawPage = () => {
  const setText = useTopNavigationStore(state => state.setText);
  const [LuckyDrawInfo, setLuckyDrawInfo] = useState<number>(0);

  // 하드코딩된 럭키드로우 데이터
  const luckDrawList = {
    data: [
      {
        productName: '카누 팝업스토어 원두 에디션 텀블러 세트',
        amount: 2,
        progress: 5,
        limit: 100,
      },
      {
        productName: 'iPad Air 11인치',
        amount: 1,
        progress: 8,
        limit: 15,
      },
      {
        productName: '스타벅스 아메리카노',
        amount: 10,
        progress: 3,
        limit: 20,
      },
    ],
  };

  useEffect(() => {
    setText('럭키드로우');
  }, [setText]);

  const setLuckyDrawindex = (index: number) => {
    setLuckyDrawInfo(index);
  };

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
        <span className='font-semibold text-gray-400'>총 {luckDrawList.data.length}개 중 추첨</span>
      </div>
      <LuckyDrawProductCarousel setLuckyDrawindex={setLuckyDrawindex} />
      <div className='flex flex-col gap-4.5 px-5 pt-7.5'>
        <span className='text-lg font-bold text-gray-900'>
          {LuckyDrawInfo === 0 ? luckDrawList.data[LuckyDrawInfo].productName : '미공개 증정품'}
        </span>
        {LuckyDrawInfo === 0 ? (
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
                {luckDrawList.data[LuckyDrawInfo].progress} /{' '}
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
