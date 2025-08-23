import type { CreateAuctionRequest } from '@/entities/auction/type';
import { CategoryFilter } from '@/features/main/ui';
import { Button, customToast, StatusDropDown, TextField } from '@/shared/ui';
import { useState } from 'react';

interface Props {
  formData: CreateAuctionRequest;
  updateProductCoreInfo: (updates: Partial<CreateAuctionRequest['productCoreInfo']>) => void;
  onNext: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const CreateAuctionStep1 = ({ formData, updateProductCoreInfo, onNext, containerRef }: Props) => {
  const { title, condition, categories, expectedEffect, imageKeys } = formData.productCoreInfo;

  // 각 필드 업데이트 핸들러들
  const handleTitleChange = (value: string) => {
    updateProductCoreInfo({ title: value });
  };

  const handleConditionChange = (value: string | undefined) => {
    updateProductCoreInfo({ condition: value });
  };

  const handleExpectedEffectChange = (value: string) => {
    updateProductCoreInfo({ expectedEffect: value });
  };

  const addCategory = (newCategory: string) => {
    const updatedCategories = [...categories, newCategory];
    updateProductCoreInfo({ categories: updatedCategories });
  };

  const removeCategory = (categoryToRemove: string) => {
    const updatedCategories = categories.filter(cat => cat !== categoryToRemove);
    updateProductCoreInfo({ categories: updatedCategories });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // 실제로는 파일을 업로드하고 key를 받아와야 하지만,
      // 예시로 파일명을 key로 사용
      const newImageKeys = Array.from(files).map(file => file.name);
      updateProductCoreInfo({
        imageKeys: [...imageKeys, ...newImageKeys],
      });
    }
  };

  const handleNext = () => {
    // 필수 필드 검증 (선택사항)
    if (!title.trim()) {
      customToast.warning('제목을 입력해주세요.');
      return;
    }
    if (!condition) {
      customToast.warning('상품 상태를 선택해주세요.');
      return;
    }
    if (categories.length === 0) {
      customToast.warning('카테고리를 선택해주세요.');
      return;
    }

    onNext();
  };

  return (
    <section className='flex h-full w-full flex-col gap-4 px-5 pt-12 pb-9'>
      <h2 className='text-xl font-extrabold text-gray-900'>제목</h2>
      <TextField
        placeholder='상품명을 입력하세요.'
        className='w-full'
        value={title}
        onChange={e => handleTitleChange(e.currentTarget.value)}
      />
      <StatusDropDown pos={condition} setPos={handleConditionChange} />
      <CategoryFilter
        container={containerRef}
        category={categories}
        addCategory={addCategory}
        removeCategory={removeCategory}
      />
      <label htmlFor='' className='font-semibold text-gray-900'>
        기대효과
      </label>
      <TextField
        placeholder='기대효과를 입력하세요.'
        className='w-full'
        value={expectedEffect}
        onChange={e => handleExpectedEffectChange(e.target.value)}
      />
      {/* 사진 미리보기 공간 */}
      <div className='aspect-[335/180] w-full rounded-xl bg-gray-200'>
        {imageKeys.length > 0 && (
          <div className='flex flex-wrap gap-2 p-4'>
            {imageKeys.map((key, index) => (
              <div key={index} className='rounded bg-gray-100 px-2 py-1 text-sm'>
                {key}
              </div>
            ))}
          </div>
        )}
      </div>
      <label htmlFor='file' className='mt-auto flex cursor-pointer gap-3'>
        <img src='/images/Icons/add_photo.svg' alt='사진 추가' />
        <span className='font-semibold text-gray-900'>
          사진 올리기 {imageKeys.length > 0 && `- 현재 ${imageKeys.length}개`}
        </span>
      </label>
      <input
        hidden
        id='file'
        type='file'
        className=''
        multiple
        accept='image/*'
        onChange={handleFileChange}
      />
      <Button onClick={handleNext}>다음</Button>
    </section>
  );
};

export default CreateAuctionStep1;
