interface FilterTagsProps {
  category: string[];
  removeCategory: (categoryToRemove: string) => void;
  brand: string[];
  removeBrand: (brandToRemove: string) => void;
  event: string[];
  removeEvent: (eventToRemove: string) => void;
  minPrice: number;
  maxPrice: number;
  updateMinPrice: (price: number) => void;
  updateMaxPrice: (price: number) => void;
}

const FilterTags = ({
  category,
  removeCategory,
  brand,
  removeBrand,
  event,
  removeEvent,
  minPrice,
  maxPrice,
  updateMinPrice,
  updateMaxPrice,
}: FilterTagsProps) => {
  const formatPriceText = () => {
    if (minPrice > 0 && maxPrice > 0) {
      return `${minPrice.toLocaleString()}원 - ${maxPrice.toLocaleString()}원`;
    } else if (minPrice > 0) {
      return `${minPrice.toLocaleString()}원 이상`;
    } else {
      return `${maxPrice.toLocaleString()}원 이하`;
    }
  };

  const resetPrice = () => {
    updateMinPrice(0);
    updateMaxPrice(0);
  };

  const hasTags =
    category.length > 0 || brand.length > 0 || event.length > 0 || minPrice > 0 || maxPrice > 0;

  return (
    <div className={`flex flex-row flex-wrap gap-2 ${hasTags ? 'pb-[18px]' : ''}`}>
      {/* 카테고리 태그 */}
      {category.map(cat => (
        <button
          key={`category-${cat}`}
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
      ))}

      {/* 브랜드 태그 */}
      {brand.map(b => (
        <button
          key={`brand-${b}`}
          className='flex w-fit items-center gap-1 rounded-xl bg-gray-800 px-3 py-[6px] font-semibold text-white'
          onClick={() => removeBrand(b)}
        >
          {b}
          <img
            src='images/Icons/close_md.svg'
            alt='close'
            className='h-[18px] w-[18px] brightness-0 invert'
          />
        </button>
      ))}

      {/* 이벤트 태그 */}
      {event.map(e => (
        <button
          key={`event-${e}`}
          className='flex w-fit items-center gap-1 rounded-xl bg-gray-800 px-3 py-[6px] font-semibold text-white'
          onClick={() => removeEvent(e)}
        >
          {e}
          <img
            src='images/Icons/close_md.svg'
            alt='close'
            className='h-[18px] w-[18px] brightness-0 invert'
          />
        </button>
      ))}

      {/* 가격 태그 */}
      {(minPrice > 0 || maxPrice > 0) && (
        <button
          className='flex w-fit items-center gap-1 rounded-xl bg-gray-800 px-3 py-[6px] font-semibold text-white'
          onClick={resetPrice}
        >
          {formatPriceText()}
          <img
            src='images/Icons/close_md.svg'
            alt='close'
            className='h-[18px] w-[18px] brightness-0 invert'
          />
        </button>
      )}
    </div>
  );
};

export default FilterTags;
