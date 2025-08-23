import type { CreateAuctionRequest } from '@/entities/auction/type';
import { Button, TextField } from '@/shared/ui';

interface Props {
  setFormData: React.Dispatch<React.SetStateAction<CreateAuctionRequest>>;
  onNext: () => void;
  onPrev: () => void;
}

const CreateAuctionStep6 = ({ setFormData, onNext, onPrev }: Props) => {
  return (
    <section className='flex h-full w-full flex-col gap-4.5 bg-green-50 px-5 pt-12 pb-9'>
      <h2 className='text-[1.75rem] font-extrabold text-gray-900'>상품</h2>
      <div className='w-full'>
        <label htmlFor='' className='font-semibold text-gray-900'>
          재질
        </label>
        <TextField placeholder='재질을 입력하세요.' />
      </div>
      <div className='w-full'>
        <label htmlFor='' className='font-semibold text-gray-900'>
          사용위치
        </label>
        <TextField placeholder='사용위치를 입력하세요.' />
      </div>
      <div className='w-full'>
        <label htmlFor='' className='font-semibold text-gray-900'>
          에디션정보
        </label>
        <TextField placeholder='에디션정보를 입력하세요.' />
      </div>
      <Button className='mt-auto w-full' onClick={onNext}>
        다음
      </Button>
    </section>
  );
};

export default CreateAuctionStep6;
