import type { CreateAuctionStep } from '@/entities/auction/type';
import { Button, customToast, TextField } from '@/shared/ui';
import { useCallback, useState } from 'react';

interface Props {
  formData: CreateAuctionStep;
  updateDeliveryDetails: (updates: Partial<CreateAuctionStep['deliveryDetails']>) => void;
  onNext: () => void;
}

const CreateAuctionStep7 = ({ formData, onNext, updateDeliveryDetails }: Props) => {
  const { method, cost, note } = formData.deliveryDetails;

  // 배송비용 입력을 위한 로컬 상태 (숫자 포맷팅을 위해)
  const [costInput, setCostInput] = useState<string>(() => (cost > 0 ? cost.toString() : ''));

  // 배송방법 업데이트 핸들러
  const handleMethodChange = useCallback(
    (value: string) => {
      updateDeliveryDetails({ method: value });
    },
    [updateDeliveryDetails]
  );

  // 배송비용 업데이트 핸들러
  const handleCostChange = useCallback(
    (value: string) => {
      // 숫자만 허용
      const cleanValue = value.replace(/[^\d]/g, '');
      setCostInput(cleanValue);

      const numericValue = cleanValue ? parseInt(cleanValue, 10) : 0;
      updateDeliveryDetails({ cost: numericValue });
    },
    [updateDeliveryDetails]
  );

  // 배송 참고사항 업데이트 핸들러
  const handleNoteChange = useCallback(
    (value: string) => {
      updateDeliveryDetails({ note: value });
    },
    [updateDeliveryDetails]
  );

  const handleNext = () => {
    // 필수 필드 검증
    if (!method.trim()) {
      customToast.warning('배송방법을 입력해주세요.');
      return;
    }
    if (cost < 0) {
      customToast.warning('배송비용을 올바르게 입력해주세요.');
      return;
    }

    // 모든 단계 완료 - 경매 등록 처리
    console.log('경매 등록 데이터:', formData);

    onNext(); // 혹은 등록 완료 후 다른 페이지로 이동
  };

  return (
    <section className='flex h-full w-full flex-col gap-4.5 px-5 pt-12 pb-9'>
      <h2 className='text-[1.75rem] font-extrabold text-gray-900'>배송</h2>
      <div className='w-full'>
        <label htmlFor='deliveryMethod' className='font-semibold text-gray-900'>
          배송방법
        </label>
        <TextField
          id='deliveryMethod'
          placeholder='배송방법을 입력하세요.'
          value={method}
          onChange={e => handleMethodChange(e.target.value)}
          className='w-full'
        />
      </div>
      <div className='relative w-full'>
        <label htmlFor='deliveryCost' className='font-semibold text-gray-900'>
          배송비용
        </label>
        <TextField
          id='deliveryCost'
          className='w-full'
          suffix='원'
          placeholder='0'
          value={costInput}
          onChange={e => handleCostChange(e.target.value)}
        />
      </div>
      <div className='w-full'>
        <label htmlFor='deliveryNote' className='font-semibold text-gray-900'>
          배송 참고사항
        </label>
        <TextField
          id='deliveryNote'
          placeholder='배송 참고사항을 입력하세요.'
          value={note}
          onChange={e => handleNoteChange(e.target.value)}
          className='w-full'
        />
      </div>
      <Button className='mt-auto w-full' onClick={handleNext}>
        경매 등록 미리보기
      </Button>
    </section>
  );
};

export default CreateAuctionStep7;
