import type { CreateAuctionRequest } from '@/entities/auction/type';
import { Button } from '@/shared/ui';

interface Props {
  setFormData: React.Dispatch<React.SetStateAction<CreateAuctionRequest>>;
  onNext: () => void;
  onPrev: () => void;
}

const CreateAuctionStep2 = ({ setFormData, onNext, onPrev }: Props) => {
  return (
    <section className='flex h-full w-full flex-col gap-4 bg-red-50 px-5 pt-12 pb-9'>
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
        className='aspect-[335/130] w-full rounded-md bg-gray-50 px-6 py-3.5'
      ></textarea>
      {/* 사진 미리보기 공간 */}
      <div className='aspect-[335/180] w-full rounded-xl bg-gray-200'></div>
      <label htmlFor='file' className='mt-auto flex cursor-pointer gap-3'>
        <img src='/images/Icons/add_photo.svg' alt='사진 추가' />
        <span className=''>사진 올리기</span>
      </label>
      <input hidden id='file' type='file' className='' />
      <Button onClick={onNext}>다음</Button>
    </section>
  );
};

export default CreateAuctionStep2;
