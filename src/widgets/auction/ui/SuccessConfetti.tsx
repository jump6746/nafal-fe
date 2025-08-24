import { useContainerSize } from '@/shared/hooks';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

interface Props {
  container: React.RefObject<HTMLElement | null>;
}

const SuccessConfetti = ({ container }: Props) => {
  const size = useContainerSize(container);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`absolute z-20 flex h-full w-full flex-col items-center justify-center bg-black/75 transition-opacity duration-1000 ${
        fadeOut ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <Confetti width={size.width} height={size.height} numberOfPieces={400} />
      <img src='/images/background/present_big.png' alt='낙찰' />
      <span className='text-[1.75rem] font-extrabold text-white'>낙찰을 축하드려요!</span>
    </div>
  );
};

export default SuccessConfetti;
