import { Button } from '@/shared/ui/Button/Button';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from '@/shared/ui/Drawer/Drawer';
import AuctionChatWindow from '@/entities/auction/ui/AuctionChatWindow';
import CardPayment from '@/widgets/pay/ui/CardPayment';
import { useSockJS } from '@/shared/hooks';
import { useEffect, useState } from 'react';

interface AuctionRoomProps {
  auctionId: string;
  price: number;
  bidUnit: number;
  onBidClick: (e: React.MouseEvent) => void;
  onAutoBidClick: (e: React.MouseEvent) => void;
  paymentVariant:
    | 'CardNotYet'
    | 'AccountCheck'
    | 'CardPayment'
    | 'CertificationNotYet'
    | 'NeedLogin';
  shouldFail: boolean;
  isPaymentModalOpen?: boolean;
  onPaymentModalOpenChange?: (open: boolean) => void;
}

const AuctionRoom = ({
  auctionId,
  price,
  bidUnit,
  onBidClick,
  onAutoBidClick,
  paymentVariant,
  shouldFail,
  isPaymentModalOpen,
  onPaymentModalOpenChange,
}: AuctionRoomProps) => {
  const { status, subscribe, onChannelMessage, sendMessage } = useSockJS();
  const [messages, setMessages] = useState<
    {
      username: string;
      message: string;
      placedAt: string;
    }[]
  >([]);
  const [currentPrice, setCurrentPrice] = useState<number>(price);

  const handleConnectAuctionRoom = () => {
    console.log('클릭!');
    if (status === 'connected') {
      console.log('📺 알림 채널 구독...');
      subscribe(`/sub/auctions/${auctionId}`);
      subscribe(`/sub/auctions/${auctionId}/price`);
    }
  };

  const handleBidDirect = () => {
    const bidData = {
      destination: `/pub/bid`, // 서버의 입찰 처리 엔드포인트
      body: JSON.stringify({
        auctionId: auctionId,
        amount: currentPrice + bidUnit,
      }),
    };

    sendMessage(bidData);
  };

  // 알림 메시지 처리
  useEffect(() => {
    const unsubscribe = onChannelMessage(message => {
      if (message.channel === `/sub/auctions/${auctionId}`) {
        const item = message.message as {
          username: string;
          message: string;
          placedAt: string;
        };

        setMessages(prevMessages => {
          console.log('이전 메시지 수:', prevMessages.length);
          const newMessages = [...prevMessages, item];
          console.log('새 메시지 수:', newMessages.length);
          return newMessages;
        });
      } else if (message.channel === `/sub/auctions/${auctionId}/price`) {
        const item = message.message as {
          currentPrice: number;
        };

        setCurrentPrice(item.currentPrice);
      }
    });

    return unsubscribe;
  }, [onChannelMessage]);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='default' className='w-full' onClick={handleConnectAuctionRoom}>
          입찰하기
        </Button>
      </DrawerTrigger>
      <DrawerContent
        className='!fixed !right-0 !bottom-0 !left-0 !z-[60] !mx-auto !w-full !max-w-[450px] !min-w-[320px] data-[vaul-drawer-direction=bottom]:!h-[72vh]'
        style={{
          position: 'fixed',
          backgroundImage: 'url(/images/BackGround/ChatBackground.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className='relative mx-auto flex h-full w-full flex-col'>
          <DrawerHeader>
            {/* 남은 시간, 00명 참여중 */}
            <div className='flex flex-row items-center justify-between gap-0.5 px-1'>
              <span className='text-sub-a-500 font-semibold'>남은 시간 {'00:00:00'}</span>
              <div className='flex items-center gap-1'>
                <div className='bg-sub-a-200 flex h-4.5 w-4.5 items-center justify-center rounded-full'>
                  <div className='bg-sub-a-500 h-3 w-3 animate-pulse rounded-full'></div>
                </div>
                <span className='font-semibold text-gray-800'>{12}명 참여중</span>
              </div>
            </div>
          </DrawerHeader>
          <div className='flex min-h-0 flex-1 flex-col'>
            <AuctionChatWindow messages={messages} />
          </div>
          <DrawerFooter className='flex h-[21.6vh] w-full flex-col justify-end gap-2 bg-gradient-to-t from-[#E8FCF9] to-transparent px-5 pb-12'>
            <button className='flex w-full flex-row items-center gap-2'>
              <img src='/images/Icons/check.svg' alt='write' className='h-6 w-6' />
              <span className='text-xs font-medium text-gray-800'>직접 입력하기</span>
            </button>
            <div className='flex w-full flex-row items-center justify-between gap-2'>
              <Button className='h-[60px] flex-1' variant='white' onClick={onAutoBidClick}>
                자동입찰
              </Button>
              {paymentVariant === 'CardPayment' ? (
                <Button className='flex h-[60px] w-[200px] flex-col' onClick={handleBidDirect}>
                  <span>{(currentPrice + bidUnit).toLocaleString()}원</span>
                  <span> 입찰하기</span>
                </Button>
              ) : (
                <CardPayment
                  variant={paymentVariant}
                  trigger={
                    <Button className='flex h-[60px] w-[200px] flex-col' onClick={onBidClick}>
                      {/* <span>{(currentPrice + bidUnit).toLocaleString()}원</span> */}
                      <span> 입찰하기</span>
                    </Button>
                  }
                  shouldFail={shouldFail}
                  isOpen={isPaymentModalOpen}
                  onOpenChange={onPaymentModalOpenChange}
                />
              )}
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AuctionRoom;
