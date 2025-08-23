import type { CreateAuctionRequest } from '@/entities/auction/type';
import { Button, StatusDropDown, TextField } from '@/shared/ui';
import { useState } from 'react';

interface Props {
  setFormData: React.Dispatch<React.SetStateAction<CreateAuctionRequest>>;
  onNext: () => void;
  onPrev: () => void;
}

const CreateAuctionStep5 = ({ setFormData, onNext, onPrev }: Props) => {
  const [tag, setTag] = useState<string | undefined>(undefined);

  return (
    <section className='flex h-full w-full flex-col gap-4.5 bg-blue-50 px-5 pt-12 pb-9'>
      <h2 className='text-[1.75rem] font-extrabold text-gray-900'>상품</h2>
      <label htmlFor='descript' className='font-semibold text-gray-900'>
        소개
      </label>
      <textarea
        name='descript'
        id='descript'
        placeholder='내용을 입력하세요 (25자 이내)'
        className='aspect-[335/130] w-full rounded-md bg-gray-50 px-6 py-3.5'
      ></textarea>
      <StatusDropDown pos={tag} setPos={setTag} />
      <div className='flex gap-5.5'>
        <div className='relative flex w-30 flex-col gap-1.5'>
          <label htmlFor='' className='font-semibold text-gray-900'>
            가로 사이즈
          </label>
          <TextField className='w-full' suffix='cm' />
        </div>
        <div className='relative flex w-30 flex-col gap-1.5'>
          <label htmlFor='' className='font-semibold text-gray-900'>
            세로 사이즈
          </label>
          <TextField className='w-full' suffix='cm' />
        </div>
      </div>
      <Button className='mt-auto w-full' onClick={onNext}>
        다음
      </Button>
    </section>
  );
};

export default CreateAuctionStep5;
