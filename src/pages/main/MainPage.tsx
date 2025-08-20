import MainPageCarousel from '@/features/auction/MainPageCarousel';
import { useState } from 'react';

const MainPage = () => {
  const [section, setSection] = useState('진행중');

  return (
    <div>
      <nav
        className='bg-point-300 flex h-[62px] items-end gap-2 px-4 text-lg font-semibold'
        role='tablist'
        aria-label='경매 상태'
      >
        <button
          role='tab'
          aria-selected={section === '진행중'}
          className={`h-10 flex-1 border-b-2 ${
            section === '진행중'
              ? 'border-b-gray-900 text-gray-900'
              : 'border-b-transparent text-gray-400'
          }`}
          onClick={() => setSection('진행중')}
        >
          진행중
        </button>
        <button
          role='tab'
          aria-selected={section === '예정'}
          className={`h-10 flex-1 border-b-2 ${
            section === '예정'
              ? 'border-b-gray-900 text-gray-900'
              : 'border-b-transparent text-gray-400'
          }`}
          onClick={() => setSection('예정')}
        >
          예정
        </button>
        <button
          role='tab'
          aria-selected={section === '종료'}
          className={`h-10 flex-1 border-b-2 ${
            section === '종료'
              ? 'border-b-gray-900 text-gray-900'
              : 'border-b-transparent text-gray-400'
          }`}
          onClick={() => setSection('종료')}
        >
          종료
        </button>
      </nav>
      <MainPageCarousel />
    </div>
  );
};

export default MainPage;
