import { testApi } from '@/entities/test/api';
import { Button, TimerButton } from '@/shared/ui';
import { toast } from 'sonner';

const LandingPage = () => {
  const handleTest = async () => {
    try {
      toast('테스트 시작');

      const response = await testApi();

      toast.success(response.message);
    } catch (error) {
      if (error instanceof Error && 'status' in error) {
        toast.error(error.message);
      } else {
        toast.error('API 에러');
      }
    }
  };

  return (
    <div className='flex h-full flex-col items-center justify-center gap-5'>
      <h1>랜딩페이지</h1>
      <Button variant='default' className='w-full' onClick={handleTest}>
        테스트
      </Button>
      <TimerButton
        text='입찰하기'
        time={5}
        onClick={() => {}}
        handleTimerCallback={() => {
          console.log('끝!');
        }}
      />
    </div>
  );
};

export default LandingPage;
