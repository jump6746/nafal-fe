import { useTopNavigationStore } from '@/shared/stores';
import { Button } from '@/shared/ui';
import { useEffect, useState } from 'react';

const ShippingPage = () => {
  const setText = useTopNavigationStore(state => state.setText);
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    setText('배송 조회');
  }, [setText]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => {
      // 이미 열려있는 항목을 클릭하면 닫기
      if (prev[itemId]) {
        return { ...prev, [itemId]: false };
      }
      // 다른 항목을 클릭하면 기존 항목은 모두 닫고 새 항목만 열기
      return { [itemId]: true };
    });
  };

  return (
    <div>
      {/* 배송 내역 */}
      <section className='flex flex-col gap-4 p-5'>
        <h3 className='text-xl font-semibold text-gray-800'>배송 내역</h3>
        {/* 상품 - 배송중 */}
        <div className='flex w-full flex-col gap-2 rounded-md border border-gray-400 px-4 py-4'>
          <div className='mb-1 flex flex-col'>
            <span className='text-sm text-gray-700'>2025.08.24 구매</span>
            <div className='flex flex-row items-center gap-1'>
              <span className='text-sm font-semibold text-black'>배송중</span>
              <span className='text-point-900 text-sm font-light'>2025-08-24 도착 예정</span>
            </div>
          </div>
          <div className='flex flex-row gap-3'>
            <img
              src='/images/mockup/image_kanu.png'
              alt='카누'
              className='h-30 w-30 rounded-md object-cover object-center'
            />
            <div className='flex flex-col justify-between'>
              <div className='flex flex-col'>
                <span className='text-sm font-semibold text-gray-900'>{'KANU'}</span>
                <span className='font-regular text-sm text-gray-800'>
                  {'카누 팝업스토어 원두 에디션 텀블러 세트'}
                </span>
              </div>
              <Button
                variant='light'
                className='mb-1 rounded-md border border-gray-400 py-2 text-sm font-medium'
                onClick={() => toggleExpanded('shipping-1')}
              >
                배송 조회
              </Button>
            </div>
          </div>

          {/* 배송 조회 확장 영역 */}
          {expandedItems['shipping-1'] && (
            <div className='mt-4 rounded-md bg-gray-50 py-4'>
              <h4 className='mb-3 text-lg font-semibold text-gray-800'>배송 조회</h4>
              <div className='space-y-3'>
                <div className='flex items-center justify-between rounded-md border border-gray-400 bg-white p-3'>
                  <div className='flex items-center gap-3'>
                    <div className='h-3 w-3 rounded-full bg-blue-500'></div>
                    <span className='text-sm font-medium text-gray-700'>배송 준비 완료</span>
                  </div>
                  <span className='text-xs text-gray-500'>2025.08.24 14:30</span>
                </div>
                <div className='flex items-center justify-between rounded-md border border-gray-400 bg-white p-3'>
                  <div className='flex items-center gap-3'>
                    <div className='h-3 w-3 rounded-full bg-blue-500'></div>
                    <span className='text-sm font-medium text-gray-700'>배송 시작</span>
                  </div>
                  <span className='text-xs text-gray-500'>2025.08.24 16:45</span>
                </div>
                <div className='flex items-center justify-between rounded-md border border-gray-400 bg-white p-3'>
                  <div className='flex items-center gap-3'>
                    <div className='h-3 w-3 rounded-full bg-green-500'></div>
                    <span className='text-sm font-medium text-gray-700'>배송중</span>
                  </div>
                  <span className='text-xs text-gray-500'>2025.08.24 18:20</span>
                </div>
              </div>
              <div className='mt-4 flex flex-col gap-3 rounded-md border border-gray-400 bg-white p-3'>
                <div className='flex flex-col'>
                  <div className='flex flex-row gap-2'>
                    <span className='text-sm'>택배사</span>
                    <span className='text-sm text-gray-800'>CJ대한통운</span>
                  </div>
                  <div className='flex flex-row gap-2'>
                    <span className='text-sm'>운송장번호</span>
                    <span className='text-sm text-gray-800'>1234-5678-9012</span>
                  </div>
                </div>
                <div className='flex flex-col'>
                  <span className='text-sm'>배송 출발지</span>
                  <span className='text-sm text-gray-800'>경기도 이천시 오목천읍 오목천로 45</span>
                </div>
                <div className='flex flex-col'>
                  <span className='text-sm'>배송 도착지</span>
                  <span className='text-sm text-gray-800'>서울특별시 강남구 탄천대로 123</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 상품 - 배송 준비중 */}
        <div className='flex w-full flex-col gap-2 rounded-md border border-gray-400 px-4 py-4'>
          <div className='mb-1 flex flex-col'>
            <span className='text-sm text-gray-700'>2025.08.24 구매</span>
            <div className='flex flex-row items-center gap-1'>
              <span className='text-sm font-semibold text-gray-700'>배송 준비중</span>
            </div>
          </div>
          <div className='flex flex-row gap-3'>
            <img
              src='/images/Dummy/MainPage/3.jpg'
              alt='루이비통'
              className='h-30 w-30 rounded-md object-cover object-center'
            />
            <div className='flex w-full flex-col justify-between'>
              <div className='flex flex-col'>
                <span className='text-sm font-semibold text-gray-900'>{'루이비통'}</span>
                <span className='font-regular text-sm text-gray-800'>{'루이비통 머그컵 세트'}</span>
              </div>
              <Button
                variant='light'
                className='mb-1 rounded-md border border-gray-400 py-2 text-sm font-medium'
                onClick={() => toggleExpanded('address-1')}
              >
                배송지 변경
              </Button>
            </div>
          </div>

          {/* 배송지 변경 확장 영역 */}
          {expandedItems['address-1'] && (
            <div className='mt-4 rounded-md bg-gray-50 py-4'>
              <h4 className='mb-3 text-lg font-semibold text-gray-800'>배송지 변경</h4>
              <div className='space-y-4'>
                <div className='rounded-md bg-white py-4'>
                  <h5 className='mb-2 text-sm font-medium text-gray-900'>현재 배송지</h5>
                  <div className='flex flex-col gap-1'>
                    <span className='text-sm text-gray-800'>서울특별시 강남구 테헤란로 123</span>
                    <span className='text-sm text-gray-800'>우편번호: 06123</span>
                    <span className='text-sm text-gray-800'>수령인: 박성문 (010-1234-5678)</span>
                  </div>
                </div>

                <div className='space-y-3'>
                  <h5 className='text-sm font-medium text-gray-700'>새로운 배송지 입력</h5>
                  <input
                    type='text'
                    placeholder='우편번호'
                    className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none'
                  />
                  <input
                    type='text'
                    placeholder='기본주소'
                    className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none'
                  />
                  <input
                    type='text'
                    placeholder='상세주소'
                    className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none'
                  />
                  <input
                    type='text'
                    placeholder='수령인'
                    className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none'
                  />
                  <input
                    type='tel'
                    placeholder='연락처'
                    className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none'
                  />
                </div>

                <div className='flex gap-2'>
                  <Button variant='default' className='flex-1 rounded-md py-2 text-sm font-medium'>
                    배송지 변경
                  </Button>
                  <Button
                    variant='light'
                    className='flex-1 rounded-md border border-gray-400 py-2 text-sm font-medium'
                  >
                    취소
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ShippingPage;
