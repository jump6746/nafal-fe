import { useTopNavigationStore } from '@/shared/stores';
import { Button } from '@/shared/ui';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyPage = () => {
  const setText = useTopNavigationStore(state => state.setText);

  useEffect(() => {
    setText('마이페이지');
  }, []);

  return (
    <div className='w-full'>
      <div className='gradient-bg relative flex aspect-[75/34] w-full flex-col justify-end overflow-hidden px-5 py-5.5'>
        <span className='text-xl font-semibold'>어서오세요</span>
        <div className='flex items-center gap-2 text-xl font-semibold'>
          <span>{'김유저'}님</span>
          <button>
            <img src='/images/Icons/pencil.svg' alt='수정' />
          </button>
        </div>
        {/* 해당 부분 프로필 사진 img 태그로 변경 */}
        <div className='gradient-border absolute -top-4 right-4 h-35 w-35 rounded-full' />
      </div>
      {/* 낙찰 내역 */}
      <section className='flex flex-col gap-1.5 py-5'>
        <div className='flex items-center gap-3 px-5'>
          <h3 className='text-xl font-semibold text-gray-800'>낙찰 내역</h3>
          <span className='text-sub-a-400'>미결제 내역 {1}건이 있어요</span>
        </div>
        {/* 상품 */}
        <div className='flex flex-col gap-3 px-5 py-3'>
          <img
            src='/images/mockup/image_kanu.png'
            alt='카누'
            className='aspect-[7/4] w-full rounded-xl object-cover object-center'
          />
          <div className='flex flex-col pt-1'>
            <h4 className='font-semibold'>{'KANU'}</h4>
            <span className='font-medium'>{'카누 팝업스토어 원두 에디션 텀블러 세트'}</span>
          </div>
          <div className='flex items-center gap-2.5'>
            <span className='text-xs font-medium text-gray-600'>낙찰가</span>
            <span className='font-semibold'>{'10,000'}원</span>
          </div>
          <Button type='button' variant={'light'} className='mb-1'>
            결제하기 ({'25.09.10'}까지)
          </Button>
        </div>
        {/* divide */}
        <div className='h-3 w-full bg-gray-200'></div>
        {/* 상품 */}
        <div className='flex flex-col gap-3 px-5 py-3'>
          <img
            src='/images/mockup/image_kanu.png'
            alt='카누'
            className='aspect-[7/4] w-full rounded-xl object-cover object-center'
          />
          <div className='flex flex-col pt-1'>
            <h4 className='font-semibold'>{'KANU'}</h4>
            <span className='font-medium'>{'카누 팝업스토어 원두 에디션 텀블러 세트'}</span>
          </div>
          <div className='flex items-center gap-2.5'>
            <span className='text-xs font-medium text-gray-600'>낙찰가</span>
            <span className='font-semibold'>{'10,000'}원</span>
          </div>
        </div>
        {/* divide */}
        <div className='h-3 w-full bg-gray-200'></div>
        {/* 상품 */}
        <div className='flex flex-col gap-3 px-5 py-3'>
          <img
            src='/images/mockup/image_kanu.png'
            alt='카누'
            className='aspect-[7/4] w-full rounded-xl object-cover object-center'
          />
          <div className='flex flex-col pt-1'>
            <h4 className='font-semibold'>{'KANU'}</h4>
            <span className='font-medium'>{'카누 팝업스토어 원두 에디션 텀블러 세트'}</span>
          </div>
          <div className='flex items-center gap-2.5'>
            <span className='text-xs font-medium text-gray-600'>낙찰가</span>
            <span className='font-semibold'>{'10,000'}원</span>
          </div>
        </div>
      </section>
      {/* 하단 메뉴 */}
      <section className='flex flex-col gap-6 px-5 pt-10 pb-8 text-xl font-semibold text-gray-800'>
        <Link to='/mypage/payment'>
          <div className='flex cursor-pointer items-center justify-between'>
            <span>결제수단 관리</span>
            <img src='/images/Icons/caret_right_lg.svg' alt='더 보기' />
          </div>
        </Link>
        <div className='flex cursor-pointer items-center justify-between'>
          <span>럭키드로우 당첨 내역</span>
          <img src='/images/Icons/caret_right_lg.svg' alt='더 보기' />
        </div>
        <div className='flex cursor-pointer items-center justify-between'>
          <span>배송 내역</span>
          <img src='/images/Icons/caret_right_lg.svg' alt='더 보기' />
        </div>
        <div className='flex cursor-pointer items-center justify-between'>
          <span>배송지 관리</span>
          <img src='/images/Icons/caret_right_lg.svg' alt='더 보기' />
        </div>
      </section>
    </div>
  );
};

export default MyPage;
