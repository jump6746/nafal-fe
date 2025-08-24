import type { CreateAuctionStep } from '@/entities/auction/type';
import { Button, customToast, TextField } from '@/shared/ui';
import { useCallback } from 'react';

interface Props {
  formData: CreateAuctionStep;
  updateProductAdditionalInfo: (
    updates: Partial<CreateAuctionStep['productAdditionalInfo']>
  ) => void;
  onNext: () => void;
}

const CreateAuctionStep6 = ({ formData, onNext, updateProductAdditionalInfo }: Props) => {
  const { material, usageLocation, editionInfo } = formData.productAdditionalInfo;

  // 재질 업데이트 핸들러
  const handleMaterialChange = useCallback(
    (value: string) => {
      updateProductAdditionalInfo({ material: value });
    },
    [updateProductAdditionalInfo]
  );

  // 사용위치 업데이트 핸들러
  const handleUsageLocationChange = useCallback(
    (value: string) => {
      updateProductAdditionalInfo({ usageLocation: value });
    },
    [updateProductAdditionalInfo]
  );

  // 에디션정보 업데이트 핸들러
  const handleEditionInfoChange = useCallback(
    (value: string) => {
      updateProductAdditionalInfo({ editionInfo: value });
    },
    [updateProductAdditionalInfo]
  );

  const handleNext = () => {
    // 필수 필드 검증 (모든 필드가 선택사항일 수 있지만, 필요하다면 검증 추가)
    if (!material.trim()) {
      customToast.warning('재질을 입력해주세요.');
      return;
    }
    if (!usageLocation.trim()) {
      customToast.warning('사용위치를 입력해주세요.');
      return;
    }
    if (!editionInfo.trim()) {
      customToast.warning('에디션정보를 입력해주세요.');
      return;
    }

    onNext();
  };

  return (
    <section className='flex h-full w-full flex-col gap-4.5 bg-green-50 px-5 pt-12 pb-9'>
      <h2 className='text-[1.75rem] font-extrabold text-gray-900'>상품</h2>
      <div className='w-full'>
        <label htmlFor='material' className='font-semibold text-gray-900'>
          재질
        </label>
        <TextField
          id='material'
          placeholder='재질을 입력하세요.'
          value={material}
          onChange={e => handleMaterialChange(e.currentTarget.value)}
          className='w-full'
        />
      </div>
      <div className='w-full'>
        <label htmlFor='usageLocation' className='font-semibold text-gray-900'>
          사용위치
        </label>
        <TextField
          id='usageLocation'
          placeholder='사용위치를 입력하세요.'
          value={usageLocation}
          onChange={e => handleUsageLocationChange(e.currentTarget.value)}
          className='w-full'
        />
      </div>
      <div className='w-full'>
        <label htmlFor='editionInfo' className='font-semibold text-gray-900'>
          에디션정보
        </label>
        <TextField
          id='editionInfo'
          placeholder='에디션정보를 입력하세요.'
          value={editionInfo}
          onChange={e => handleEditionInfoChange(e.currentTarget.value)}
          className='w-full'
        />
      </div>
      <Button className='mt-auto w-full' onClick={handleNext}>
        다음
      </Button>
    </section>
  );
};

export default CreateAuctionStep6;
