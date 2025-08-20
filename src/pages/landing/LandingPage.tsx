import { testApi } from '@/entities/test/api';
import { Button, customToast, TimerButton } from '@/shared/ui';
import AuctionNotice from '@/shared/ui/AuctionNotice/AuctionNotice';

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
      <AuctionNotice notice='부끄러운 나팔님이 12,000원 입찰했어요' isMine={false} />
    </div>
  );
};

export default LandingPage;
