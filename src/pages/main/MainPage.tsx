import { Suspense, useRef, useState } from 'react';
import MainPageNav from '@/features/main/ui/MainPageNav';
import MainPageCategory from '@/widgets/main/ui/MainPageCategory';
import MainPageCarousel from '@/widgets/main/ui/MainPageCarousel';
import { Button, FilterTags } from '@/shared/ui';
import SortCategory from '@/features/main/ui/SortCategory';
import AuctionListSkeleton from '@/features/main/skleton/AuctionListSkeleton';
import AuctionList from '@/widgets/auction/ui/AuctionList';
import { useNavigate } from 'react-router-dom';
import useUserInfo from '@/entities/user/hooks/useUserInfo';

const MainPage = () => {
  const navigate = useNavigate();
  const { userInfo } = useUserInfo();
  const containerRef = useRef<HTMLDivElement>(null);
  const [section, setSection] = useState('진행중');
  const [category, setCategory] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [brand, setBrand] = useState<string[]>([]);
  const [event, setEvent] = useState<string[]>([]);
  const [sort, setSort] = useState<string>('신규');
  const currentSortOptions =
    section === '진행중' ? ['신규', '마감 임박', '인기순'] : ['신규', '오픈 임박'];

  const addCategory = (newCategory: string) => {
    setCategory(prev => [...prev, newCategory]);
  };
  const removeCategory = (categoryToRemove: string) => {
    setCategory(prev => prev.filter(cat => cat !== categoryToRemove));
  };

  const updateMinPrice = (price: number) => {
    setMinPrice(price);
  };

  const updateMaxPrice = (price: number) => {
    setMaxPrice(price);
  };

  const addBrand = (newBrand: string) => {
    setBrand(prev => [...prev, newBrand]);
  };

  const removeBrand = (brandToRemove: string) => {
    setBrand(prev => prev.filter(b => b !== brandToRemove));
  };

  const addEvent = (newEvent: string) => {
    setEvent(prev => [...prev, newEvent]);
  };

  const removeEvent = (eventToRemove: string) => {
    setEvent(prev => prev.filter(e => e !== eventToRemove));
  };

  const updateSort = (newSort: string) => {
    setSort(newSort);
  };

  return (
    <div className='relative'>
      <MainPageNav section={section} setSection={setSection} updateSort={updateSort} />
      <MainPageCarousel />
      <div className='flex flex-col gap-[18px] px-5' ref={containerRef}>
        <MainPageCategory
          container={containerRef}
          category={category}
          addCategory={addCategory}
          removeCategory={removeCategory}
          minPrice={minPrice}
          maxPrice={maxPrice}
          updateMinPrice={updateMinPrice}
          updateMaxPrice={updateMaxPrice}
          brand={brand}
          addBrand={addBrand}
          removeBrand={removeBrand}
          event={event}
          addEvent={addEvent}
          removeEvent={removeEvent}
        />
        <FilterTags
          category={category}
          removeCategory={removeCategory}
          brand={brand}
          removeBrand={removeBrand}
          event={event}
          removeEvent={removeEvent}
          minPrice={minPrice}
          maxPrice={maxPrice}
          updateMinPrice={updateMinPrice}
          updateMaxPrice={updateMaxPrice}
        />
      </div>
      {(section === '진행중' || section === '예정') && (
        <div className='flex justify-end px-5'>
          <SortCategory sort={sort} sortOptions={currentSortOptions} updateSort={updateSort} />
        </div>
      )}
      <section className='flex flex-col gap-2 px-5'>
        <h2 className='text-2xl font-extrabold text-gray-800'>
          {section === '종료'
            ? '지금은 종료된 경매에요'
            : sort === '신규'
              ? '따끈따끈한 이 제품 어때요?'
              : sort === '마감 임박'
                ? '빠른 자만이 얻는다'
                : sort === '오픈 임박'
                  ? '곧 만나요'
                  : '제일 인기 있는 것만 모았어요'}
        </h2>
        <Suspense fallback={<AuctionListSkeleton />}>
          <AuctionList
            section={section}
            sort={sort}
            category={category}
            minPrice={minPrice}
            maxPrice={maxPrice}
            brand={brand}
            event={event}
            isImminent={sort === '마감 임박'}
          />
        </Suspense>
      </section>
      {userInfo && (userInfo.role == 'ADMIN' || userInfo.role == 'SELLER') ? (
        <div className='sticky bottom-0 w-full bg-gradient-to-b from-transparent to-white px-5 py-9 pb-6'>
          <Button
            className='w-full'
            onClick={() => {
              navigate('/auction/create');
            }}
          >
            상품 등록하기
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default MainPage;
