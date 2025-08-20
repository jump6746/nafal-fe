<<<<<<< HEAD
import { testApi } from '@/entities/test/api';
import AuctionRoom from '@/features/auction/AuctionRoom';
import { Button, customToast, TimerButton } from '@/shared/ui';

const LandingPage = () => {
  const handleTest = async () => {
    try {
      customToast.confirm('테스트 시작');

      const response = await testApi();

      customToast.warning(response.message);
    } catch (error) {
      if (error instanceof Error && 'status' in error) {
        console.error(error);
      } else {
        console.error('API 에러');
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
      <AuctionRoom />
    </div>
  );
=======
const LandingPage = () => {
  return <div>랜딩페이지</div>;
>>>>>>> 9410425dd05e0b3065123de341b26f63cf629208
};

export default LandingPage;
