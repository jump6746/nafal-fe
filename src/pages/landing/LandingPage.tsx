import { testApi } from '@/entities/test/api';
import { useWebSocket } from '@/shared/hooks';
import { Button } from '@/shared/ui';
import { toast } from 'sonner';

const LandingPage = () => {
  const { isReady, connect } = useWebSocket();

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

  // WebSocket 연결 테스트
  const handleWebSocketConnect = () => {
    if (!isReady) {
      toast.error('Worker가 준비되지 않았습니다');
      return;
    }

    toast('WebSocket 연결 시도...');
    connect('https://api.nafal.site/ws'); // 테스트용 WebSocket 서버
  };

  return (
    <div className='flex h-full flex-col items-center justify-center gap-5'>
      <h1>랜딩페이지</h1>
      <Button variant='default' className='cursor-pointer' onClick={handleTest}>
        테스트
      </Button>
      <Button variant='default' className='cursor-pointer' onClick={handleWebSocketConnect}>
        소켓 테스트
      </Button>
    </div>
  );
};

export default LandingPage;
