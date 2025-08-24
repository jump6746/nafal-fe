import { useEffect, useState } from 'react';
import { Button } from '../Button/Button';

interface Props {
  text: string;
  time?: number;
  onClick: () => void;
  handleTimerCallback: () => void;
}

const TimerButton = ({ text, time = 5, onClick, handleTimerCallback }: Props) => {
  const [currentTime, setCurrentTime] = useState<number>(time);

  useEffect(() => {
    // 0이 되면 타이머 중지
    if (currentTime <= 0) {
      handleTimerCallback();
      return;
    }

    // 1초마다 실행되는 타이머
    const timer = setInterval(() => {
      setCurrentTime(prev => prev - 1);
    }, 1000);

    // cleanup 함수: 컴포넌트 언마운트 또는 의존성 변경 시 타이머 정리
    return () => {
      clearInterval(timer);
    };
  }, [currentTime, handleTimerCallback]);

  // time prop이 변경되면 currentTime 초기화
  useEffect(() => {
    setCurrentTime(time);
  }, [time]);

  return (
    <Button
      variant={'default'}
      onClick={onClick}
      className='flex w-full items-center justify-center gap-2.5'
    >
      <span>{text}</span>
      <div className='bg-point-600 flex h-8 w-8 items-center justify-center rounded-full'>
        <span className='text-point-100 text-xl'>{currentTime}</span>
      </div>
    </Button>
  );
};

export default TimerButton;
