import type { CreateAuctionStep } from '@/entities/auction/type';
import type { ImageFile } from '@/entities/image/type';
import { CategoryFilter } from '@/features/main/ui';
import { convertToWebP } from '@/shared/lib';
import { Button, customToast, StatusDropDown, TextField } from '@/shared/ui';
import { useRef, useState } from 'react';

interface Props {
  formData: CreateAuctionStep;
  updateProductCoreInfo: (updates: Partial<CreateAuctionStep['productCoreInfo']>) => void;
  onNext: () => void;
  container: React.RefObject<HTMLDivElement | null>;
}

const CreateAuctionStep1 = ({ formData, updateProductCoreInfo, onNext, container }: Props) => {
  const { title, condition, categories, expectedEffect, imageFiles } = formData.productCoreInfo;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDown(true);
    setHasDragged(false);
    containerRef.current.style.cursor = 'grabbing';
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseUp = () => {
    setIsDown(false);
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !containerRef.current) return;
    e.preventDefault();
    setHasDragged(true);
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  // 개선된 processImages 함수 활용
  const processImages = async (files: File[]): Promise<void> => {
    const selectedImageFiles = files.filter(file => file.type.startsWith('image/'));

    if (selectedImageFiles.length === 0) return;

    try {
      // 순차 처리로 드래그 순서 보장
      const newProcessedImages: ImageFile[] = [];

      for (let i = 0; i < selectedImageFiles.length; i++) {
        const file = selectedImageFiles[i];
        try {
          const webpFile = await convertToWebP(file, 1.0);

          const preview = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = e => {
              const result = e.target?.result;
              if (typeof result === 'string') {
                resolve(result);
              } else {
                reject(new Error('파일 읽기 실패'));
              }
            };
            reader.onerror = reject;
            reader.readAsDataURL(webpFile);
          });

          const newImage: ImageFile = {
            id: Date.now() + Math.random() + i,
            file: webpFile,
            preview,
            name: webpFile.name || `image-${i + 1}.webp`,
          };

          newProcessedImages.push(newImage);
        } catch (error) {
          console.error(`이미지 ${i + 1} 변환 오류:`, error);
          customToast.warning(`${file.name} 파일 변환에 실패했습니다.`);
        }
      }

      if (newProcessedImages.length > 0) {
        // imageFiles 배열에 새로운 이미지들 추가
        const updatedImageFiles = [...imageFiles, ...newProcessedImages];
        updateProductCoreInfo({ imageFiles: updatedImageFiles });
      }
    } catch (error) {
      console.error('이미지 처리 오류:', error);
      customToast.warning('이미지 처리 중 오류가 발생했습니다.');
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      await processImages(Array.from(files));
      // input 초기화 (같은 파일 재선택 가능)
      event.target.value = '';
    }
  };

  const removeImage = (indexToRemove: number) => {
    const updatedImageFiles = imageFiles.filter((_, index) => index !== indexToRemove);
    updateProductCoreInfo({ imageFiles: updatedImageFiles });
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

  const hasTags = categories.length > 0;

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
      <div
        ref={containerRef}
        className={`flex cursor-grab flex-row gap-2 overflow-x-scroll select-none ${hasTags ? 'pb-[18px]' : ''}`}
        style={{ scrollbarWidth: 'none' }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {categories.map(cat => (
          <button
            key={`category-${cat}`}
            className='flex w-fit flex-shrink-0 cursor-pointer items-center gap-1 rounded-full bg-gray-800 px-3.5 py-[6px] font-semibold whitespace-nowrap text-white'
            onClick={() => {
              if (!hasDragged) {
                removeCategory(cat);
              }
            }}
          >
            {cat}
            <img
              src='/images/Icons/close_md.svg'
              alt='close'
              className='h-[18px] w-[18px] brightness-0 invert'
            />
          </button>
        ))}
        <CategoryFilter
          container={container}
          category={categories}
          addCategory={addCategory}
          removeCategory={removeCategory}
        />
      </div>
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
      <div className='flex flex-col gap-4'>
        {imageFiles.length > 0 &&
          imageFiles.map((imageFile, index) => (
            <div key={imageFile.id} className='flex flex-col items-end gap-2'>
              <div className='w-full'>
                <img
                  src={imageFile.preview}
                  alt={`미리보기 ${index + 1}`}
                  className='aspect-[335/180] w-full rounded-xl bg-gray-200 object-contain object-center'
                />
              </div>
              <button
                type='button'
                className='text-sub-a-400 cursor-pointer transition-colors hover:text-red-500'
                onClick={() => removeImage(index)}
              >
                삭제
              </button>
            </div>
          ))}
      </div>
      <label htmlFor='file' className='mt-auto flex cursor-pointer gap-3'>
        <img src='/images/Icons/add_photo.svg' alt='사진 추가' />
        <span className='font-semibold text-gray-900'>
          사진 올리기 {imageFiles.length > 0 && `- 현재 ${imageFiles.length}개`}
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
