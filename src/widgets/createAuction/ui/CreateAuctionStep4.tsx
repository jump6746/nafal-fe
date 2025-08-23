import type { CreateAuctionRequest } from '@/entities/auction/type';
import { Button, TextField } from '@/shared/ui';

interface Props {
  setFormData: React.Dispatch<React.SetStateAction<CreateAuctionRequest>>;
  onNext: () => void;
  onPrev: () => void;
}

const CreateAuctionStep4 = ({ setFormData, onNext, onPrev }: Props) => {
  return (
    <section className='flex h-full w-full flex-col gap-4.5 bg-red-50 px-5 pt-12 pb-9'>
      <h2 className='text-[1.75rem] font-extrabold text-gray-900'>행사</h2>
      <div className='w-full'>
        <label htmlFor='' className='font-semibold text-gray-900'>
          행사명
        </label>
        <TextField placeholder='행사명을 입력하세요.' />
      </div>
      <label htmlFor='eventDescript' className='font-semibold text-gray-900'>
        행사소개
      </label>
      <textarea
        name='eventDescript'
        id='eventDescript'
        placeholder='내용을 입력하세요'
        className='aspect-[335/130] w-full rounded-md bg-gray-50 px-6 py-3.5'
      ></textarea>
      <Button className='mt-auto w-full' onClick={onNext}>
        다음
      </Button>
    </section>
  );
};

export default CreateAuctionStep4;
