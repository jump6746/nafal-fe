import type { CreateAuctionRequest } from '@/entities/auction/type';
import { Button, TextField } from '@/shared/ui';

interface Props {
  setFormData: React.Dispatch<React.SetStateAction<CreateAuctionRequest>>;
  onNext: () => void;
  onPrev: () => void;
}

const CreateAuctionStep3 = ({ setFormData, onNext, onPrev }: Props) => {
  return (
    <section className='flex h-full w-full flex-col gap-4.5 bg-green-50 pt-12 pb-9'>
      <div className='flex w-full flex-col gap-4.5 px-5'>
        <div className='relative flex flex-col gap-1'>
          <label htmlFor='currentPrice' className='font-semibold text-gray-900'>
            현재가
          </label>
          <TextField id='currentPrice' variant='default' className='w-full' suffix='원' />
        </div>
        <div className='relative flex flex-col gap-1'>
          <label htmlFor='bidGap' className='font-semibold text-gray-900'>
            입찰단위
          </label>
          <TextField id='bidGap' variant='default' className='w-full' suffix='원' />
        </div>
      </div>
      <div className='h-3 w-full bg-gray-200'></div>
      <div className='flex w-full flex-col gap-4.5 px-5'>
        <div className='flex flex-col gap-1'>
          <label htmlFor='' className='font-semibold text-gray-900'>
            종료 일자
          </label>
          <TextField placeholder='YYYY.MM.DD' />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='' className='font-semibold text-gray-900'>
            종료 시간
          </label>
          <div className='flex gap-5.5'>
            <TextField className='w-20' placeholder='몇 시' />
            <TextField className='w-20' placeholder='몇 분' />
          </div>
        </div>
      </div>
      <div className='mt-auto w-full px-5'>
        <Button className='w-full' onClick={onNext}>
          다음
        </Button>
      </div>
    </section>
  );
};

export default CreateAuctionStep3;
