import { useTopNavigationStore } from '@/shared/stores';
import { Button } from '@/shared/ui';
import TextField from '@/shared/ui/TextField/TextField';
import { useEffect, useState, type ChangeEvent } from 'react';

const BidPlace = () => {
  const [error, setError] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const setText = useTopNavigationStore(state => state.setText);

  useEffect(() => {
    setText('직접 입력');
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;

    if (!/^\d*$/.test(inputValue)) {
      return;
    }

    // eslint error 해결용
    console.log(setError);

    setValue(inputValue);
  };

  return (
    <div className='relative flex h-full w-full flex-col gap-7 overflow-hidden'>
      {/* 배경 장식 */}
      <div className='pointer-events-none absolute z-0 h-[912px] w-[912px]'>
        <img
          src='/images/background/present_bg.png'
          alt='배경'
          className='absolute bottom-0 -translate-x-1/12 translate-y-1/4 object-fill'
        />
      </div>
      {/* 실제 콘텐츠 */}
      <div className='relative flex flex-col gap-1 px-5 pt-7.5'>
        <label htmlFor='bid' className='font-semibold text-gray-900'>
          입찰금액
        </label>
        <TextField
          id='bid'
          errorMessage={error ? '' : undefined}
          variant='default'
          placeholder='얼마를 입찰하시겠어요?'
          value={value}
          onChange={handleChange}
        />
        <span className='bottom absolute right-10 bottom-6 translate-y-1/2 text-2xl font-semibold'>
          원
        </span>
      </div>
      <div className='text-point-600 flex flex-col gap-1.5 px-5 font-semibold'>
        <span>Tip. 입찰 단위는 {'1,000'}원입니다.</span>
        <span>
          현재가는 <strong className='font-semibold text-gray-800'>{'18,000'}</strong>원입니다.
        </span>
      </div>
      <div className='z-10 mt-auto px-5 pb-9'>
        <Button variant={'default'} className='w-full'>
          입찰하기
        </Button>
      </div>
    </div>
  );
};

export default BidPlace;
