import { useRef, useState } from 'react';
import MainPageNav from '@/features/main/ui/MainPageNav';
import MainPageCategory from '@/widgets/main/ui/MainPageCategory';
import MainPageCarousel from '@/widgets/main/ui/MainPageCarousel';
import { FilterTags } from '@/shared/ui';
import SortCategory from '@/shared/ui/Category/SortCategory';

const MainPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [section, setSection] = useState('진행중');
  const [category, setCategory] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [brand, setBrand] = useState<string[]>([]);
  const [event, setEvent] = useState<string[]>([]);
  const [sort, setSort] = useState<string>('신규');

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
    <div>
      <MainPageNav section={section} setSection={setSection} />
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
      <div className='flex justify-end px-5 pb-[18px]'>
        <SortCategory sort={sort} updateSort={updateSort} />
      </div>
    </div>
  );
};

export default MainPage;
