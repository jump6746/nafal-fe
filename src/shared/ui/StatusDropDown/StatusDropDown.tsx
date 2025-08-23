import { useDebounce } from '@/shared/hooks';
import { useEffect, useState } from 'react';

interface Props {
  pos?: string;
  setPos: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const StatusDropDown = ({ pos, setPos }: Props) => {
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce(value, 800);

  useEffect(() => {
    setPos(debouncedValue);
  }, [debouncedValue, setPos]);

  if (pos) {
    return (
      <div className='relative flex w-fit items-center gap-0.5 rounded-full bg-gray-800 py-1.5 pr-2.5 pl-3.5'>
        <span className='text-point-100'>{pos}</span>
        <button
          className='cursor-pointer'
          onClick={() => {
            setPos(undefined);
            setValue('');
          }}
        >
          <img src='/images/Icons/close_xs.svg' alt='추가' className='' />
        </button>
      </div>
    );
  }

  return (
    <div className='relative flex w-fit items-center gap-2'>
      <img
        src='/images/Icons/add.svg'
        alt='추가'
        className='absolute top-1/2 left-1.5 -translate-y-1/2'
      />
      <input
        className='text-semibold focus:ring-point-500 w-20 rounded-full bg-gray-50 py-1.5 pr-3 pl-8 placeholder:text-gray-900 focus:ring-1 focus:outline-none'
        placeholder='태그'
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue(e.currentTarget.value);
        }}
      />
    </div>
  );
};

export default StatusDropDown;
