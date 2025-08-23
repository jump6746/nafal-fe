import type { CreateAuctionRequest } from '@/entities/auction/type';
import { CategoryFilter } from '@/features/main/ui';
import { Button, StatusDropDown, TextField } from '@/shared/ui';
import { useState } from 'react';

interface Props {
  setFormData: React.Dispatch<React.SetStateAction<CreateAuctionRequest>>;
  onNext: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const CreateAuctionStep1 = ({ setFormData, onNext, containerRef }: Props) => {
  const [pos, setPos] = useState<string | undefined>(undefined);

  const [category, setCategory] = useState<string[]>([]);
  const addCategory = (newCategory: string) => {
    setCategory(prev => [...prev, newCategory]);
  };
  const removeCategory = (categoryToRemove: string) => {
    setCategory(prev => prev.filter(cat => cat !== categoryToRemove));
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <section className='flex h-full w-full flex-col gap-4 px-5 pt-12 pb-9'>
      <h2 className='text-xl font-extrabold text-gray-900'>제목</h2>
      <TextField placeholder='상품명을 입력하세요.' className='w-full' />
      <StatusDropDown pos={pos} setPos={setPos} />
      <CategoryFilter
        container={containerRef}
        category={category}
        addCategory={addCategory}
        removeCategory={removeCategory}
      />
      <label htmlFor='' className='font-semibold text-gray-900'>
        기대효과
      </label>
      <TextField placeholder='기대효과를 입력하세요.' className='w-full' />
      {/* 사진 미리보기 공간 */}
      <div className='aspect-[335/180] w-full rounded-xl bg-gray-200'></div>
      <label htmlFor='file' className='mt-auto flex cursor-pointer gap-3'>
        <img src='/images/Icons/add_photo.svg' alt='사진 추가' />
        <span className='font-semibold text-gray-900'>사진 올리기</span>
      </label>
      <input hidden id='file' type='file' className='' />
      <Button onClick={handleNext}>다음</Button>
    </section>
  );
};

export default CreateAuctionStep1;
