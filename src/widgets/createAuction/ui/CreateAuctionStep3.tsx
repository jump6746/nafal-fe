import type { CreateAuctionStep } from '@/entities/auction/type';
import { Button, customToast, TextField } from '@/shared/ui';
import { useCallback, useState } from 'react';

interface Props {
  formData: CreateAuctionStep;
  updateAuctionSettings: (updates: Partial<CreateAuctionStep['auctionSettings']>) => void;
  onNext: () => void;
}

const CreateAuctionStep3 = ({ formData, onNext, updateAuctionSettings }: Props) => {
  const { startPrice, bidIncrement, immediatelyPurchasePrice } = formData.auctionSettings;

  // 입력값을 위한 로컬 상태 추가
  const [startPriceInput, setStartPriceInput] = useState<string>(() =>
    startPrice > 0 ? startPrice.toString() : ''
  );
  const [bidIncrementInput, setBidIncrementInput] = useState<string>(() =>
    bidIncrement > 0 ? bidIncrement.toString() : ''
  );
  const [immediatelyPurchasePriceInput, setImmediatelyPurchasePriceInput] = useState<string>(() =>
    immediatelyPurchasePrice > 0 ? immediatelyPurchasePrice.toString() : ''
  );

  // 현재가 업데이트 핸들러
  const handleStartPriceChange = useCallback(
    (value: string) => {
      // 숫자만 허용
      const cleanValue = value.replace(/[^\d]/g, '');
      setStartPriceInput(cleanValue);

      const numericValue = cleanValue ? parseInt(cleanValue, 10) : 0;
      console.log(numericValue);
      updateAuctionSettings({ startPrice: numericValue });
    },
    [updateAuctionSettings]
  );

  // 입찰단위 업데이트 핸들러
  const handleBidIncrementChange = useCallback(
    (value: string) => {
      // 숫자만 허용
      const cleanValue = value.replace(/[^\d]/g, '');
      setBidIncrementInput(cleanValue);

      const numericValue = cleanValue ? parseInt(cleanValue, 10) : 0;
      updateAuctionSettings({ bidIncrement: numericValue });
    },
    [updateAuctionSettings]
  );

  // 즉시구매가 업데이트 핸들러
  const handleImmediatelyPurchasePriceChange = useCallback(
    (value: string) => {
      // 숫자만 허용
      const cleanValue = value.replace(/[^\d]/g, '');
      setImmediatelyPurchasePriceInput(cleanValue);

      const numericValue = cleanValue ? parseInt(cleanValue, 10) : 0;
      console.log('즉시구매가:', numericValue);
      updateAuctionSettings({ immediatelyPurchasePrice: numericValue });
    },
    [updateAuctionSettings]
  );

  const handleNext = () => {
    // 필수 필드 검증
    if (startPrice <= 0) {
      customToast.warning('현재가를 입력해주세요.');
      return;
    }
    if (bidIncrement <= 0) {
      customToast.warning('입찰단위를 입력해주세요.');
      return;
    }

    // 즉시구매가가 입력된 경우 시작가보다 높은지 확인
    if (immediatelyPurchasePrice > 0 && immediatelyPurchasePrice <= startPrice) {
      customToast.warning('즉시구매가는 시작가보다 높아야 합니다.');
      return;
    }

    onNext();
  };

  return (
    <section className='flex h-full w-full flex-col gap-4.5 bg-green-50 pt-12 pb-9'>
      <div className='flex w-full flex-col gap-4.5 px-5'>
        <div className='relative flex flex-col gap-1'>
          <label htmlFor='startPrice' className='font-semibold text-gray-900'>
            시작가
          </label>
          <TextField
            id='startPrice'
            variant='default'
            className='w-full'
            suffix='원'
            placeholder='0'
            value={startPriceInput}
            onChange={e => handleStartPriceChange(e.target.value)}
          />
        </div>
        <div className='relative flex flex-col gap-1'>
          <label htmlFor='bidGap' className='font-semibold text-gray-900'>
            입찰단위
          </label>
          <TextField
            id='bidGap'
            variant='default'
            className='w-full'
            suffix='원'
            placeholder='0'
            value={bidIncrementInput}
            onChange={e => handleBidIncrementChange(e.target.value)}
          />
        </div>
        <div className='relative flex flex-col gap-1'>
          <div className='flex flex-col gap-1'>
            <span className='text-base font-semibold text-gray-800'>재고가 1개일 경우</span>
            <span className='text-sm text-gray-600'>
              즉시구매가를 설정하면 입찰 없이 바로 구매할 수 있습니다.
            </span>
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='immediatelyPurchasePrice' className='font-semibold text-gray-900'>
              즉시구매가 <span className='text-sm font-normal text-gray-500'>(선택사항)</span>
            </label>
            <TextField
              id='immediatelyPurchasePrice'
              variant='default'
              className='w-full'
              suffix='원'
              placeholder='시작가보다 높은 금액을 입력하세요'
              value={immediatelyPurchasePriceInput}
              onChange={e => handleImmediatelyPurchasePriceChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className='mt-auto w-full px-5'>
        <Button className='w-full' onClick={handleNext}>
          다음
        </Button>
      </div>
    </section>
  );
};

export default CreateAuctionStep3;
