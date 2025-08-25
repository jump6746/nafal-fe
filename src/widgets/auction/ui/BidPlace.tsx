import { useSockJS } from '@/shared/hooks';
import { useTopNavigationStore } from '@/shared/stores';
import { Button, customToast } from '@/shared/ui';
import TextField from '@/shared/ui/TextField/TextField';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState, type ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';

const BidPlace = () => {
  const { sendMessage, status } = useSockJS();
  const { auctionId } = useParams();

  const [error, setError] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const setText = useTopNavigationStore(state => state.setText);

  const queryClient = useQueryClient();

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

  const handleBid = () => {
    customToast.warning('준비중입니다.');
    // 유효성 검사
    if (!value.trim()) {
      setError(true);
      console.log('유효성 검사 불통');
      return;
    }

    const bidAmount = parseInt(value);

    // 최소 입찰 금액 확인 (예: 1,000원 단위)
    if (bidAmount < 1000 || bidAmount % 1000 !== 0) {
      setError(true);
      return;
    }

    // 현재가보다 높은지 확인 (예시)
    const currentPrice = 2000; // 실제로는 props나 상태에서 받아와야 함
    if (bidAmount <= currentPrice) {
      setError(true);
      return;
    }

    // SockJS 연결 확인
    if (status !== 'connected') {
      console.error('SockJS가 연결되지 않았습니다');
      alert('서버 연결이 끊어졌습니다. 다시 시도해주세요.');
      return;
    }

    if (!auctionId) {
      console.error('경매 ID가 없습니다');
      alert('경매 정보를 찾을 수 없습니다.');
      return;
    }

    try {
      // 입찰 메시지 전송
      const bidData = {
        destination: `/pub/bid`, // 서버의 입찰 처리 엔드포인트
        body: JSON.stringify({
          auctionId: auctionId,
          amount: bidAmount,
        }),
      };

      console.log('📤 입찰 메시지 전송:', bidData);
      sendMessage(bidData);

      // 성공 처리
      console.log('✅ 입찰 완료:', bidAmount);
      setValue(''); // 입력값 초기화

      // 페이지 이동 (선택사항)
      // navigate(-1); // 이전 페이지로 이동
      queryClient.invalidateQueries({ queryKey: ['auctionDetail', auctionId] });
    } catch (error) {
      console.error('❌ 입찰 전송 실패:', error);
      alert('입찰 전송에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className='absolute top-0 z-[70] flex h-full w-full flex-col gap-7 overflow-hidden bg-white'>
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
          className='w-full'
          suffix='원'
          value={value}
          onChange={handleChange}
        />
      </div>
      <div className='text-point-600 flex flex-col gap-1.5 px-5 font-semibold'>
        <span>Tip. 입찰 단위는 {'1,000'}원입니다.</span>
        <span>
          현재가는 <strong className='font-semibold text-gray-800'>{'18,000'}</strong>원입니다.
        </span>
      </div>
      <div className='z-10 mt-auto px-5 pb-9'>
        <Button variant={'default'} className='w-full' onClick={handleBid}>
          입찰하기
        </Button>
      </div>
    </div>
  );
};

export default BidPlace;
