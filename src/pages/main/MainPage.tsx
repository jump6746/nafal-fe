import MainPageCategory from '@/features/main/ui/MainPageCategory';
import MainPageCarousel from '@/widgets/main/ui/MainPageCarousel';
import { useState } from 'react';

const MainPage = () => {
  const [section, setSection] = useState('진행중');
  const [category, setCategory] = useState<string[]>([]);

  const addCategory = (newCategory: string) => {
    setCategory(prev => [...prev, newCategory]);
  };
  const removeCategory = (categoryToRemove: string) => {
    setCategory(prev => prev.filter(cat => cat !== categoryToRemove));
  };

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
      <div className='flex flex-col gap-[18px] px-5'>
        <MainPageCategory
          category={category}
          addCategory={addCategory}
          removeCategory={removeCategory}
        />
        <div className='flex flex-row gap-2'>
          {category.map(cat => (
            <button
              key={cat}
              className='flex w-fit items-center gap-1 rounded-xl bg-gray-800 px-3 py-[6px] font-semibold text-white'
              onClick={() => removeCategory(cat)}
            >
              {cat}
              <img
                src='images/Icons/close_md.svg'
                alt='close'
                className='h-[18px] w-[18px] brightness-0 invert'
              />
            </button>
          ))}{' '}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
