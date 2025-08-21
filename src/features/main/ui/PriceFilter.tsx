import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
  DrawerPortal,
} from '@/shared/ui/Drawer/Drawer';
import { Button, TextField } from '@/shared/ui';
import { useState } from 'react';

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  updateMinPrice: (price: number) => void;
  updateMaxPrice: (price: number) => void;
}

const PriceFilter = ({ minPrice, maxPrice, updateMinPrice, updateMaxPrice }: PriceFilterProps) => {
  const [tempMinPrice, setTempMinPrice] = useState<string>(minPrice ? String(minPrice) : '');
  const [tempMaxPrice, setTempMaxPrice] = useState<string>(maxPrice ? String(maxPrice) : '');
  const [minPriceError, setMinPriceError] = useState<string>('');
  const [maxPriceError, setMaxPriceError] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleReset = () => {
    setTempMinPrice('');
    setTempMaxPrice('');
    setMinPriceError('');
    setMaxPriceError('');
    updateMinPrice(0);
    updateMaxPrice(0);
  };

  const handleApply = () => {
    let hasError = false;

    const minNum = Number(tempMinPrice);
    const maxNum = Number(tempMaxPrice);

    // 최소 금액 검증
    if (tempMinPrice && minNum < 0) {
      setMinPriceError('최소 금액은 0원 이상이어야 합니다.');
      hasError = true;
    } else if (tempMinPrice && (isNaN(minNum) || tempMinPrice.includes('.'))) {
      setMinPriceError('올바른 정수를 입력해주세요.');
      hasError = true;
    } else {
      setMinPriceError('');
    }

    // 최대 금액 검증
    if (tempMaxPrice && maxNum < 0) {
      setMaxPriceError('최대 금액은 0원 이상이어야 합니다.');
      hasError = true;
    } else if (tempMaxPrice && (isNaN(maxNum) || tempMaxPrice.includes('.'))) {
      setMaxPriceError('올바른 정수를 입력해주세요.');
      hasError = true;
    } else {
      setMaxPriceError('');
    }

    // 최소 > 최대 검증
    if (tempMinPrice && tempMaxPrice && minNum > maxNum) {
      setMinPriceError('최소 금액이 최대 금액보다 클 수 없습니다.');
      hasError = true;
    }

    // 에러가 없으면 적용하고 drawer 닫기
    if (!hasError) {
      updateMinPrice(tempMinPrice ? Number(tempMinPrice) : 0);
      updateMaxPrice(tempMaxPrice ? Number(tempMaxPrice) : 0);
      setIsOpen(false);
    }
  };
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button className='flex w-fit shrink-0 items-center gap-[2px] rounded-full bg-gray-100 px-3 py-[6px] whitespace-nowrap'>
          가격 <img src='images/Icons/caret_down_sm.svg' alt='caret_down' className='h-6 w-6' />
        </button>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerContent className='!fixed !right-0 !bottom-0 !left-0 !mx-auto !w-full !max-w-[450px] !min-w-[320px] data-[vaul-drawer-direction=bottom]:!h-[40vh] [&>div:first-child]:!hidden'>
          <DrawerHeader>
            <span className='font-semibold text-gray-800'>가격 필터</span>
          </DrawerHeader>
          <div className='flex h-full max-h-[calc(40vh-60px)] flex-col gap-6 px-5'>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-medium text-gray-600'>최소 금액</label>
                <TextField
                  type='number'
                  value={tempMinPrice}
                  onChange={e => setTempMinPrice(e.target.value)}
                  placeholder='0원'
                  variant={minPriceError ? 'error' : 'default'}
                  errorMessage={minPriceError}
                  className='!h-auto !py-2'
                  min='0'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-medium text-gray-600'>최대 금액</label>
                <TextField
                  type='number'
                  value={tempMaxPrice}
                  onChange={e => setTempMaxPrice(e.target.value)}
                  placeholder='0원'
                  variant={maxPriceError ? 'error' : 'default'}
                  errorMessage={maxPriceError}
                  className='!h-auto !py-2'
                  min='0'
                />
              </div>
            </div>
            <div className='flex flex-row gap-2 pt-4'>
              <Button variant='white' className='w-full' onClick={handleReset}>
                초기화
              </Button>
              <Button variant='default' className='w-full' onClick={handleApply}>
                설정
              </Button>
            </div>
          </div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
};

export default PriceFilter;
