import type { CreateAuctionRequest } from '@/entities/auction/type';
import { Button, TextField } from '@/shared/ui';

interface Props {
  setFormData: React.Dispatch<React.SetStateAction<CreateAuctionRequest>>;
  onNext: () => void;
  onPrev: () => void;
}

const CreateAuctionStep7 = ({ setFormData, onNext, onPrev }: Props) => {
  return (
    <section className='flex h-full w-full flex-col gap-4.5 px-5 pt-12 pb-9'>
      <h2 className='text-[1.75rem] font-extrabold text-gray-900'>배송</h2>
      <div className='w-full'>
        <label htmlFor='' className='font-semibold text-gray-900'>
          배송방법
        </label>
        <TextField placeholder='배송방법을 입력하세요.' />
      </div>
      <div className='relative w-full'>
        <label htmlFor='' className='font-semibold text-gray-900'>
          배송비용
        </label>
        <TextField className='w-full' suffix='원' />
      </div>
      <div className='w-full'>
        <label htmlFor='' className='font-semibold text-gray-900'>
          배송 참고사항
        </label>
        <TextField placeholder='배송 참고사항을 입력하세요.' />
      </div>
      <Button className='mt-auto w-full' onClick={onNext}>
        다음
      </Button>
    </section>
  );
};

export default CreateAuctionStep7;
