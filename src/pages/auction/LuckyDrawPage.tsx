import { useTopNavigationStore } from '@/shared/stores';
import { LuckyDrawProductCarousel } from '@/widgets/luckydraw/ui';
import { useEffect } from 'react';

const LuckyDrawPage = () => {
  const setText = useTopNavigationStore(state => state.setText);

  useEffect(() => {
    setText('럭키드로우');
  }, []);

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
      <LuckyDrawProductCarousel />
      <div className='flex flex-col gap-4.5 px-5 pt-7.5'>
        <span className='text-lg font-bold text-gray-900'>
          {'카누 팝업스토어 원두 에디션 손수건'}
        </span>
        <div className='flex flex-col'>
          <span className='text-sm font-medium text-gray-600'>총 증정 개수</span>
          <span className='font-semibold text-gray-900'>{1}개</span>
        </div>
        <div className='flex flex-col pt-1.5'>
          <span className='text-sm font-medium text-gray-600'>현황</span>
          <span className='font-semibold text-gray-900'>
            {90}/{100}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LuckyDrawPage;
