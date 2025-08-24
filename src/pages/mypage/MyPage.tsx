import useUserInfo from '@/entities/user/hooks/useUserInfo';
import { useTopNavigationStore } from '@/shared/stores';
import { Button } from '@/shared/ui';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MyPage = () => {
  const setText = useTopNavigationStore(state => state.setText);
  const { userInfo, isLoading } = useUserInfo();
  const navigate = useNavigate();
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [hasUnsuccessfulBids, setHasUnsuccessfulBids] = useState(true);

  useEffect(() => {
    if (!isLoading && !userInfo) {
      navigate('/login');
    }
  }, [userInfo, isLoading, navigate]);

  useEffect(() => {
    setText('마이페이지');
  }, [setText]);

  const handleDonationClick = () => {
    setIsDonationModalOpen(true);
  };

  const handleDonationConfirm = () => {
    setHasUnsuccessfulBids(false);
    setIsDonationModalOpen(false);
  };

  const handleDonationCancel = () => {
    setIsDonationModalOpen(false);
  };

  return (
    <div className='w-full'>
      <div className='gradient-bg relative flex aspect-[75/34] w-full flex-col justify-end overflow-hidden px-5 py-5.5'>
        <span className='text-xl font-semibold'>어서오세요</span>
        <div className='flex items-center gap-2 text-xl font-semibold'>
          <span>{userInfo?.nickname}님</span>
          <button>
            <img src='/images/Icons/pencil.svg' alt='수정' />
          </button>
        </div>
        {/* 해당 부분 프로필 사진 img 태그로 변경 */}
        <div className='gradient-border absolute -top-4 right-4 h-35 w-35 rounded-full' />
      </div>
      {hasUnsuccessfulBids && (
        <section className='flex flex-col gap-1.5 py-5'>
          <div className='flex flex-col px-5'>
            <div className='flex flex-row items-center gap-1.5'>
              <h3 className='text-xl font-semibold text-gray-800'>유찰 내역</h3>
              <span className='text-sub-a-400'>유찰 내역 {1}건이 있어요</span>
            </div>
            <div className='mt-1 flex flex-col text-gray-800'>
              <span className='text-sm'>유찰 내역이 존재하면 경매를 진행하실 수 없습니다.</span>
              <span className='text-sm'>
                낙찰가의 일정 퍼센트를 기부하면 경매를 진행하실 수 있습니다.
              </span>
            </div>
          </div>
          {/* 상품 */}
          <div className='flex flex-col gap-3 px-5 py-3'>
            <img
              src='/images/Dummy/MainPage/1.webp'
              alt='인센스'
              className='aspect-[7/4] w-full rounded-xl object-cover object-center'
            />
            <div className='flex flex-col pt-1'>
              <h4 className='text-sm font-semibold'>{'콜린스 인센스 팝업스토어'}</h4>
              <span className='text-lg font-medium'>{'핸드 오브제 월 인센스 버너'}</span>
            </div>
            <div className='flex items-center gap-2.5'>
              <span className='text-xs font-medium text-gray-600'>낙찰가</span>
              <span className='font-semibold'>{'100,000'}원</span>
            </div>
            <Button type='button' variant={'light'} className='mb-1' onClick={handleDonationClick}>
              기부하기
            </Button>
          </div>
        </section>
      )}
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
          <Link to='/pay' state={{ amount: 10000 }}>
            <Button type='button' variant={'light'} className='mb-1 w-full'>
              결제하기 ({'25.09.10'}까지)
            </Button>
          </Link>
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
        <Link to='/mypage/luckydraw'>
          <div className='flex cursor-pointer items-center justify-between'>
            <span>럭키드로우 당첨 내역</span>
            <img src='/images/Icons/caret_right_lg.svg' alt='더 보기' />
          </div>
        </Link>
        <Link to='/mypage/shipping'>
          <div className='flex cursor-pointer items-center justify-between'>
            <span>배송 내역</span>
            <img src='/images/Icons/caret_right_lg.svg' alt='더 보기' />
          </div>
        </Link>
        <Link to='/mypage/shippingPlace'>
          <div className='flex cursor-pointer items-center justify-between'>
            <span>배송지 관리</span>
            <img src='/images/Icons/caret_right_lg.svg' alt='더 보기' />
          </div>
        </Link>
        <div
          className='flex cursor-pointer items-center justify-between'
          onClick={() => {
            sessionStorage.clear();
            window.location.href = '/';
          }}
        >
          <span className='text-sub-a-400'>로그아웃</span>
        </div>
      </section>

      {/* 기부하기 모달 */}
      {isDonationModalOpen && (
        <div className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
          <div className='mx-4 w-full max-w-sm rounded-2xl bg-white p-6'>
            <div className='mb-6 text-center'>
              <h3 className='mb-3 text-lg font-semibold text-gray-800'>기부 안내</h3>
              <div className='text-sm leading-relaxed text-gray-600'>
                <p>유찰 발생 시 상품 경매 참여를 위해서</p>
                <p className='mb-2'>낙찰가의 일정 퍼센트를 기부해야 합니다.</p>
                <div className='mt-3 rounded-lg bg-gray-50 p-3'>
                  <p className='mb-1 font-medium text-gray-700'>기부 비율 안내:</p>
                  <p>
                    • 1회차 유찰: 낙찰가의 <span className='font-semibold text-blue-600'>3%</span>
                  </p>
                  <p>
                    • 2회차 유찰: 낙찰가의 <span className='font-semibold text-blue-600'>5%</span>
                  </p>
                  <p>
                    • 3회차 유찰: 낙찰가의 <span className='font-semibold text-blue-600'>7%</span>
                  </p>
                </div>
                <p className='mt-3 text-xs text-gray-500'>
                  기부금은 환경 및 사회 공헌을 위한 목적으로 사용됩니다.
                </p>
              </div>
            </div>
            <div className='flex gap-3'>
              <Button
                type='button'
                variant='light'
                className='flex-1'
                onClick={handleDonationCancel}
              >
                취소
              </Button>
              <Button
                type='button'
                variant='default'
                className='flex-1'
                onClick={handleDonationConfirm}
              >
                확인
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;
