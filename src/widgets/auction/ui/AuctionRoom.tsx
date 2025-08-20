import { Button } from '@/shared/ui/Button/Button';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from '@/shared/ui/Drawer/Drawer';
import AuctionChatWindow from '@/entities/auction/ui/AuctionChatWindow';
import customToast from '@/shared/ui/CustomToast/customToast';

const handleBidClick = () => {
  customToast.confirm('10,000원 입찰이 완료되었습니다!');
};

const handleAutoBidClick = () => {
  customToast.warning('잔액이 부족합니다.');
};

const AuctionRoom = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='default'>ㄷㄷ</Button>
      </DrawerTrigger>
      <DrawerContent
        className='!fixed !right-0 !bottom-0 !left-0 !z-[9999] !mx-auto !w-full !max-w-[450px] !min-w-[320px] data-[vaul-drawer-direction=bottom]:!h-[72vh]'
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
            <AuctionChatWindow />
          </div>
          <DrawerFooter className='flex h-[21.6vh] w-full flex-col justify-end gap-2 bg-gradient-to-t from-[#E8FCF9] to-transparent px-5 pb-12'>
            <button className='flex w-full flex-row items-center gap-2'>
              <img src='/images/Icons/check.svg' alt='write' className='h-6 w-6' />
              <span className='text-xs font-medium text-gray-800'>직접 입력하기</span>
            </button>
            <div className='flex w-full flex-row items-center justify-between gap-2'>
              <Button className='h-[60px] flex-1' variant='white' onClick={handleAutoBidClick}>
                자동입찰
              </Button>
              <Button className='h-[60px] w-[200px]' onClick={handleBidClick}>
                10,000원 입찰하기
              </Button>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AuctionRoom;
