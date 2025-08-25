import type { CreateAuctionStep } from '@/entities/auction/type';
import type { ImageFile } from '@/entities/image/type';
import { convertToWebP } from '@/shared/lib';
import { Button, customToast } from '@/shared/ui';

interface Props {
  formData: CreateAuctionStep;
  updateStoryDetails: (updates: Partial<CreateAuctionStep['storyDetails']>) => void;
  onNext: () => void;
}

const CreateAuctionStep2 = ({ formData, updateStoryDetails, onNext }: Props) => {
  const { content, imageFile } = formData.storyDetails;

  // 스토리 내용 업데이트 핸들러
  const handleContentChange = (value: string) => {
    updateStoryDetails({ content: value });
  };

  // 이미지 처리 함수 (단일 파일)
  const processImage = async (file: File): Promise<void> => {
    if (!file.type.startsWith('image/')) {
      customToast.warning('이미지 파일만 선택 가능합니다.');
      return;
    }

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

      const newImageFile: ImageFile = {
        id: Date.now() + Math.random(),
        file: webpFile,
        preview,
        name: webpFile.name || 'story-image.webp',
      };

      updateStoryDetails({ imageFile: newImageFile });
    } catch (error) {
      console.error('이미지 변환 오류:', error);
      customToast.warning('이미지 변환에 실패했습니다.');
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await processImage(file);
      // input 초기화 (같은 파일 재선택 가능)
      event.target.value = '';
    }
  };

  const removeImage = () => {
    updateStoryDetails({ imageFile: {} as ImageFile });
  };

  const handleNext = () => {
    // 필수 필드 검증
    if (!content.trim()) {
      customToast.warning('스토리 내용을 입력해주세요.');
      return;
    }
    if (!imageFile.id) {
      customToast.warning('카드 배경 이미지를 첨부해주세요.');
      return;
    }

    onNext();
  };

  // 이미지가 있는지 확인
  const hasImage = imageFile && imageFile.id;

  return (
    <section className='flex h-full w-full flex-col gap-4 px-5 pt-12 pb-9'>
      <div className='flex flex-col'>
        <h2 className='text-[1.75rem] font-extrabold text-gray-900'>스토리카드</h2>
        <span className='text-sub-a-400 text-xs font-medium'>
          카드 배경 이미지를 꼭 첨부해주세요.
        </span>
      </div>
      <label htmlFor='story' className='font-semibold text-gray-900'>
        스토리 내용
      </label>
      <textarea
        name='story'
        id='story'
        placeholder='내용을 입력하세요'
        className='aspect-[335/130] w-full resize-none rounded-md bg-gray-50 px-6 py-3.5'
        value={content}
        onChange={e => handleContentChange(e.target.value)}
      />
      {/* 사진 미리보기 공간 */}
      {hasImage ? (
        <div className='flex flex-col gap-4'>
          <div key={imageFile.id} className='flex flex-col items-end gap-2'>
            <div className='w-full'>
              <img
                src={imageFile.preview}
                alt={`미리보기`}
                className='aspect-[335/180] w-full rounded-xl bg-gray-200 object-cover object-center'
              />
            </div>
            <button
              type='button'
              className='text-sub-a-400 cursor-pointer transition-colors hover:text-red-500'
              onClick={removeImage}
            >
              삭제
            </button>
          </div>
        </div>
      ) : null}
      <label htmlFor='file' className='mt-auto flex cursor-pointer gap-3'>
        <img src='/images/Icons/add_photo.svg' alt='사진 추가' />
        <span className='font-semibold text-gray-900'>
          {hasImage ? '다른 사진으로 변경' : '사진 올리기'}
        </span>
      </label>
      <input hidden id='file' type='file' accept='image/*' onChange={handleFileChange} />
      <Button onClick={handleNext}>다음</Button>
    </section>
  );
};

export default CreateAuctionStep2;
