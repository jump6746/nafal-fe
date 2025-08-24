import type { CreateAuctionStep } from '@/entities/auction/type';
import { Button, customToast, StatusDropDown, TextField } from '@/shared/ui';
import { useCallback, useState } from 'react';

interface Props {
  formData: CreateAuctionStep;
  updateProductAttributes: (updates: Partial<CreateAuctionStep['productAttributes']>) => void;
  onNext: () => void;
}

const CreateAuctionStep5 = ({ formData, onNext, updateProductAttributes }: Props) => {
  const { detailInfo, tags, width, height } = formData.productAttributes;

  // 태그 입력을 위한 로컬 상태 (StatusDropDown과의 호환성을 위해)
  const [currentTag, setCurrentTag] = useState<string>('');

  // 상품 소개 업데이트 핸들러
  const handleDetailInfoChange = useCallback(
    (value: string) => {
      updateProductAttributes({ detailInfo: value });
    },
    [updateProductAttributes]
  );

  // 가로 사이즈 업데이트 핸들러
  const handleWidthChange = useCallback(
    (value: string) => {
      const numericValue = parseFloat(value.replace(/[^\d.]/g, '')) || 0;
      updateProductAttributes({ width: numericValue });
    },
    [updateProductAttributes]
  );

  // 세로 사이즈 업데이트 핸들러
  const handleHeightChange = useCallback(
    (value: string) => {
      const numericValue = parseFloat(value.replace(/[^\d.]/g, '')) || 0;
      updateProductAttributes({ height: numericValue });
    },
    [updateProductAttributes]
  );

  // 태그 추가 핸들러
  const handleTagAdd = useCallback(
    (tag: string) => {
      if (tag && tag.trim() && !tags.includes(tag.trim())) {
        const updatedTags = [...tags, tag.trim()];
        updateProductAttributes({ tags: updatedTags });
        setCurrentTag(''); // StatusDropDown 초기화
      }
    },
    [tags, updateProductAttributes]
  );

  // 태그 제거 핸들러
  const handleTagRemove = useCallback(
    (tagToRemove: string) => {
      const updatedTags = tags.filter(tag => tag !== tagToRemove);
      updateProductAttributes({ tags: updatedTags });
    },
    [tags, updateProductAttributes]
  );

  const handleNext = () => {
    // 필수 필드 검증
    if (!detailInfo.trim()) {
      customToast.warning('상품 소개를 입력해주세요.');
      return;
    }
    if (detailInfo.trim().length > 25) {
      customToast.warning('상품 소개는 25자 이내로 입력해주세요.');
      return;
    }
    if (width <= 0) {
      customToast.warning('가로 사이즈를 입력해주세요.');
      return;
    }
    if (height <= 0) {
      customToast.warning('세로 사이즈를 입력해주세요.');
      return;
    }

    onNext();
  };

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
        value={detailInfo}
        onChange={e => handleDetailInfoChange(e.target.value)}
        maxLength={25}
      />
      <div className='text-right text-sm text-gray-500'>{detailInfo.length}/25</div>
      {/* 기존 태그들 표시 */}
      {tags.length > 0 && (
        <div className='flex flex-wrap gap-2'>
          {tags.map((tag, index) => (
            <div
              key={index}
              className='flex items-center gap-1 rounded-full bg-gray-800 py-1.5 pr-2.5 pl-3.5'
            >
              <span className='text-point-100'>{tag}</span>
              <button className='cursor-pointer' onClick={() => handleTagRemove(tag)}>
                <img src='/images/Icons/close_xs.svg' alt='삭제' />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 새 태그 추가 */}
      <StatusDropDown
        pos={currentTag}
        setPos={tag => {
          if (tag) {
            setCurrentTag('');
            handleTagAdd(tag);
          }
        }}
      />
      <div className='flex gap-5.5'>
        <div className='relative flex w-30 flex-col gap-1.5'>
          <label htmlFor='width' className='font-semibold text-gray-900'>
            가로 사이즈
          </label>
          <TextField
            id='width'
            className='w-full'
            suffix='cm'
            placeholder='0'
            value={width > 0 ? width.toString() : ''}
            onChange={e => handleWidthChange(e.target.value)}
          />
        </div>
        <div className='relative flex w-30 flex-col gap-1.5'>
          <label htmlFor='height' className='font-semibold text-gray-900'>
            세로 사이즈
          </label>
          <TextField
            id='height'
            className='w-full'
            suffix='cm'
            placeholder='0'
            value={height > 0 ? height.toString() : ''}
            onChange={e => handleHeightChange(e.target.value)}
          />
        </div>
      </div>

      <Button className='mt-auto w-full' onClick={handleNext}>
        다음
      </Button>
    </section>
  );
};

export default CreateAuctionStep5;
