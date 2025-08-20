import { useState } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
  DrawerPortal,
} from '@/shared/ui/Drawer/Drawer';

interface MainPageCategoryProps {
  category: string[];
  addCategory: (newCategory: string) => void;
  removeCategory: (categoryToRemove: string) => void;
}

const CATEGORIES = [
  { main: '가구', subs: ['소파', '테이블', '디자인'] },
  { main: '가전', subs: ['커피머신'] },
  { main: '도예', subs: ['공예'] },
  { main: '소품', subs: ['패브릭', '쿠션', '텀블러', '머그컵'] },
  { main: '소형', subs: ['오브제'] },
  { main: '패션', subs: ['의류'] },
  { main: '회화', subs: ['캔버스'] },
];

const MainPageCategory = ({ category, addCategory, removeCategory }: MainPageCategoryProps) => {
  const [selectedMainCategory, setSelectedMainCategory] = useState<string>('');

  const handleMainCategoryClick = (mainCategory: string) => {
    setSelectedMainCategory(mainCategory);
  };

  const handleSubCategoryClick = (subCategory: string) => {
    if (category.includes(subCategory)) {
      removeCategory(subCategory);
    } else {
      addCategory(subCategory);
    }
  };

  const preventDrawerDrag = (e: React.TouchEvent | React.MouseEvent) => {
    e.stopPropagation();
  };

  const getSubCategories = () => {
    if (!selectedMainCategory) return [];
    const selectedCategory = CATEGORIES.find(cat => cat.main === selectedMainCategory);
    return selectedCategory ? selectedCategory.subs : [];
  };

  return (
    <div>
      <div>
        <Drawer>
          <DrawerTrigger asChild>
            <button className='flex w-fit items-center gap-[2px] rounded-full bg-gray-100 px-3 py-[6px]'>
              카테고리
              <img src='images/Icons/caret_down_sm.svg' alt='caret_down' className='h-6 w-6' />
            </button>
          </DrawerTrigger>
          <DrawerPortal>
            <DrawerContent className='!fixed !right-0 !bottom-0 !left-0 !mx-auto !w-full !max-w-[450px] !min-w-[320px] data-[vaul-drawer-direction=bottom]:!h-[40vh] [&>div:first-child]:!hidden'>
              <DrawerHeader>
                <span className='font-semibold text-gray-800'>카테고리</span>
              </DrawerHeader>
              <div className='flex h-full max-h-[calc(40vh-60px)] flex-row gap-4 p-4'>
                {/* 대분류 */}
                <div className='flex w-[25vw] flex-col gap-4 px-1'>
                  <span className='text-sm font-medium text-gray-600'>대분류</span>
                  <div
                    className='flex max-h-full flex-1 flex-col gap-2 overflow-y-auto'
                    style={{ touchAction: 'pan-y' }}
                    onTouchStart={preventDrawerDrag}
                    onTouchMove={preventDrawerDrag}
                    onMouseDown={preventDrawerDrag}
                    data-vaul-no-drag
                  >
                    {CATEGORIES.map(categoryItem => (
                      <button
                        key={categoryItem.main}
                        onClick={() => handleMainCategoryClick(categoryItem.main)}
                        className={`h-fit rounded-md py-[10px] text-center font-medium transition-colors ${
                          selectedMainCategory === categoryItem.main
                            ? 'bg-point-400 text-[#026051]'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {categoryItem.main}
                      </button>
                    ))}
                  </div>
                </div>
                {/* 소분류 */}
                <div className='flex flex-1 flex-col gap-4'>
                  <span className='text-sm font-medium text-gray-600'>소분류</span>
                  <div
                    className='flex max-h-full flex-wrap gap-2 overflow-y-auto'
                    style={{ touchAction: 'pan-y' }}
                    onTouchStart={preventDrawerDrag}
                    onTouchMove={preventDrawerDrag}
                    onMouseDown={preventDrawerDrag}
                    data-vaul-no-drag
                  >
                    {selectedMainCategory ? (
                      getSubCategories().map(sub => (
                        <button
                          key={sub}
                          onClick={() => handleSubCategoryClick(sub)}
                          className={`h-fit rounded-md px-[18px] py-[10px] text-left transition-colors ${
                            category.includes(sub)
                              ? 'bg-gray-800 font-medium text-white'
                              : 'bg-gray-100 hover:bg-gray-300'
                          }`}
                        >
                          {sub}
                        </button>
                      ))
                    ) : (
                      <div className='p-2 text-sm text-gray-400'>대분류를 선택해주세요</div>
                    )}
                  </div>
                </div>
              </div>
            </DrawerContent>
          </DrawerPortal>
        </Drawer>
      </div>
    </div>
  );
};

export default MainPageCategory;
