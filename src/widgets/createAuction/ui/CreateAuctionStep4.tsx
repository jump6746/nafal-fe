import type { CreateAuctionStep } from '@/entities/auction/type';
import { Button, customToast, TextField } from '@/shared/ui';
import { useCallback } from 'react';

interface Props {
  formData: CreateAuctionStep;
  updateEventDetails: (updates: Partial<CreateAuctionStep['eventDetails']>) => void;
  onNext: () => void;
}

const CreateAuctionStep4 = ({ formData, onNext, updateEventDetails }: Props) => {
  const { name, description } = formData.eventDetails;

  // 행사명 업데이트 핸들러
  const handleNameChange = useCallback(
    (value: string) => {
      updateEventDetails({ name: value });
    },
    [updateEventDetails]
  );

  // 행사소개 업데이트 핸들러
  const handleDescriptionChange = useCallback(
    (value: string) => {
      updateEventDetails({ description: value });
    },
    [updateEventDetails]
  );

  const handleNext = () => {
    // 필수 필드 검증
    if (!name.trim()) {
      customToast.warning('행사명을 입력해주세요.');
      return;
    }
    if (!description.trim()) {
      customToast.warning('행사소개를 입력해주세요.');
      return;
    }

    onNext();
  };

  return (
    <section className='flex h-full w-full flex-col gap-4.5 bg-red-50 px-5 pt-12 pb-9'>
      <h2 className='text-[1.75rem] font-extrabold text-gray-900'>행사</h2>
      <div className='w-full'>
        <label htmlFor='eventName' className='font-semibold text-gray-900'>
          행사명
        </label>
        <TextField
          id='eventName'
          className='w-full'
          placeholder='행사명을 입력하세요.'
          value={name}
          onChange={e => handleNameChange(e.target.value)}
        />
      </div>
      <label htmlFor='eventDescript' className='font-semibold text-gray-900'>
        행사소개
      </label>
      <textarea
        name='eventDescript'
        id='eventDescript'
        placeholder='내용을 입력하세요'
        className='focus:ring-point-500 aspect-[335/130] w-full resize-none rounded-md bg-gray-50 px-6 py-3.5 focus:ring-1 focus:outline-none'
        value={description}
        onChange={e => handleDescriptionChange(e.target.value)}
      />
      <Button className='mt-auto w-full' onClick={handleNext}>
        다음
      </Button>
    </section>
  );
};

export default CreateAuctionStep4;
