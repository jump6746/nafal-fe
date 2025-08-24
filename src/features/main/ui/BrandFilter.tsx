import type { BrandItem } from '@/entities/auction/type/types';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
  DrawerPortal,
} from '@/shared/ui/Drawer/Drawer';

interface BrandFilterProps {
  brandList: BrandItem[];
  brand: string[];
  addBrand: (newBrand: string) => void;
  removeBrand: (brandToRemove: string) => void;
}

const BrandFilter = ({
  brandList,
  brand: selectedBrands,
  addBrand,
  removeBrand,
}: BrandFilterProps) => {
  const handleBrandClick = (brandName: string) => {
    if (selectedBrands.includes(brandName)) {
      removeBrand(brandName);
    } else {
      addBrand(brandName);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className='flex w-fit shrink-0 items-center gap-[2px] rounded-full bg-gray-100 px-3 py-[6px] whitespace-nowrap'>
          브랜드 <img src='images/Icons/caret_down_sm.svg' alt='caret_down' className='h-6 w-6' />
        </button>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerContent className='!fixed !right-0 !bottom-0 !left-0 !mx-auto !w-full !max-w-[450px] !min-w-[320px] data-[vaul-drawer-direction=bottom]:!h-[40vh] [&>div:first-child]:!hidden'>
          <DrawerHeader>
            <span className='font-semibold text-gray-800'>브랜드 필터</span>
          </DrawerHeader>
          <div className='flex h-full max-h-[calc(40vh-60px)] flex-col gap-4 p-4'>
            <div className='flex flex-wrap gap-2'>
              {brandList.map(brand => (
                <button
                  key={brand.id}
                  onClick={() => handleBrandClick(brand.name)}
                  className={`rounded-md px-3 py-2 text-sm transition-colors ${
                    selectedBrands.includes(brand.name)
                      ? 'bg-gray-800 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {brand.name}
                </button>
              ))}
            </div>
          </div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
};

export default BrandFilter;
