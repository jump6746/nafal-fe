import type { BrandItem, EventItem } from '@/entities/auction/type/types';
import { CategoryFilter, PriceFilter, EventFilter, BrandFilter } from '../../../features/main/ui';

interface MainPageCategoryProps {
  container: React.RefObject<HTMLElement | null>;
  category: string[];
  addCategory: (newCategory: string) => void;
  removeCategory: (categoryToRemove: string) => void;
  minPrice: number;
  maxPrice: number;
  updateMinPrice: (price: number) => void;
  updateMaxPrice: (price: number) => void;
  brand: string[];
  addBrand: (newBrand: string) => void;
  removeBrand: (brandToRemove: string) => void;
  event: string[];
  addEvent: (newEvent: string) => void;
  removeEvent: (eventToRemove: string) => void;
  brandList: BrandItem[];
  eventList: EventItem[];
}

const MainPageCategory = ({
  brandList,
  eventList,
  container,
  category,
  addCategory,
  removeCategory,
  minPrice,
  maxPrice,
  updateMinPrice,
  updateMaxPrice,
  brand,
  addBrand,
  removeBrand,
  event,
  addEvent,
  removeEvent,
}: MainPageCategoryProps) => {
  return (
    <div className='scrollbar-hide flex flex-row items-center gap-[6px] overflow-x-auto'>
      <CategoryFilter
        container={container}
        category={category}
        addCategory={addCategory}
        removeCategory={removeCategory}
      />

      <PriceFilter
        minPrice={minPrice}
        maxPrice={maxPrice}
        updateMinPrice={updateMinPrice}
        updateMaxPrice={updateMaxPrice}
      />

      {/* <BrandFilter brand={brand} addBrand={addBrand} removeBrand={removeBrand} /> */}

      <EventFilter
        eventList={eventList}
        event={event}
        addEvent={addEvent}
        removeEvent={removeEvent}
      />
      <BrandFilter
        brandList={brandList}
        brand={brand}
        addBrand={addBrand}
        removeBrand={removeBrand}
      />
    </div>
  );
};

export default MainPageCategory;
