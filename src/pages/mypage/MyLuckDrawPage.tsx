import { useTopNavigationStore } from '@/shared/stores';
import { Button } from '@/shared/ui';
import { useEffect, useState } from 'react';

const MyLuckDrawPage = () => {
  const setText = useTopNavigationStore(state => state.setText);
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    setText('내 럭키드로우');
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
      {/* 럭키드로우 내역 */}
      <section className='flex flex-col gap-4 p-5'>
        <h3 className='text-xl font-semibold text-gray-800'>내 럭키드로우</h3>

        {/* 상품 - 당첨 */}
        <div className='flex w-full flex-col gap-2 rounded-md border border-gray-400 px-4 py-4'>
          <div className='mb-1 flex flex-col'>
            <span className='text-sm text-gray-700'>2025.08.24 참여</span>
            <div className='flex flex-row items-center justify-between'>
              <div className='flex items-center gap-2'>
                <span className='text-sm font-semibold text-green-600'>당첨</span>
                <span className='text-point-900 text-sm font-light'>2025-08-24 발송 예정</span>
              </div>
              <span className='text-sm font-semibold text-black'>응모 횟수: 3회</span>
            </div>
          </div>
          <div className='flex flex-row gap-3'>
            <img
              src='/images/Dummy/Mypage/접시.webp'
              alt='사브르 수저세트'
              className='h-30 w-30 rounded-md object-cover object-center'
            />
            <div className='flex w-full flex-col justify-between'>
              <div className='flex flex-col'>
                <span className='text-sm font-semibold text-gray-900'>{'사브르'}</span>
                <span className='font-regular text-sm text-gray-800'>
                  {'사브르 비스트로 샤이니 유니 수저세트'}
                </span>
              </div>
              <Button
                variant='light'
                className='mb-1 rounded-md border border-gray-400 py-2 text-sm font-medium'
                onClick={() => toggleExpanded('prize-1')}
              >
                당첨 상품 정보
              </Button>
            </div>
          </div>

          {/* 당첨 상품 정보 확장 영역 */}
          {expandedItems['prize-1'] && (
            <div className='mt-4 rounded-md bg-gray-50 py-4'>
              <h4 className='mb-3 text-lg font-semibold text-gray-800'>당첨 상품 정보</h4>
              <div className='space-y-4'>
                <div className='rounded-md bg-white py-4'>
                  <h5 className='mb-2 text-sm font-medium text-gray-900'>상품 정보</h5>
                  <div className='flex flex-col gap-1'>
                    <span className='text-sm text-gray-800'>
                      상품명: 사브르 비스트로 샤이니 유니 수저세트
                    </span>
                    <span className='text-sm text-gray-800'>브랜드: 사브르</span>
                    <span className='text-sm text-gray-800'>응모수량: 3회</span>
                    <span className='text-sm text-gray-800'>수량: 1개</span>
                  </div>
                </div>

                <div className='rounded-md bg-white py-4'>
                  <h5 className='mb-2 text-sm font-medium text-gray-900'>당첨 정보</h5>
                  <div className='flex flex-col gap-1'>
                    <span className='text-sm text-gray-800'>참여일: 2025.08.24</span>
                    <span className='text-sm text-gray-800'>당첨일: 2025.08.24</span>
                    <span className='text-sm text-gray-800'>발송 예정일: 2025.08.24</span>
                  </div>
                </div>

                <div className='rounded-md bg-green-50 p-3'>
                  <p className='text-sm text-black'>
                    <strong>🎉 축하합니다!</strong> 럭키드로우에 당첨되었습니다.
                  </p>
                  <p className='text-sm text-black'>상품은 1-2일 내에 발송될 예정입니다.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 상품 - 미당첨 */}
        <div className='flex w-full flex-col gap-2 rounded-md border border-gray-400 px-4 py-4'>
          <div className='mb-1 flex flex-col'>
            <span className='text-sm text-gray-700'>2025.08.23 참여</span>
            <div className='flex flex-row items-center justify-between'>
              <div className='flex items-center gap-2'>
                <span className='text-sm font-semibold text-gray-700'>미당첨</span>
              </div>
              <span className='text-sm font-semibold text-black'>응모 횟수: 1회</span>
            </div>
          </div>
          <div className='flex flex-row gap-3'>
            <img
              src='/images/Dummy/Mypage/면기.webp'
              alt='면기기'
              className='h-30 w-30 rounded-md object-cover object-center'
            />
            <div className='flex w-full flex-col justify-between'>
              <div className='flex flex-col'>
                <span className='text-sm font-semibold text-gray-900'>{'이도'}</span>
                <span className='font-regular text-sm text-gray-800'>
                  {'[리퍼브] 윤슬 면기 1P'}
                </span>
              </div>
              <Button
                variant='light'
                className='mb-1 rounded-md border border-gray-400 py-2 text-sm font-medium'
                onClick={() => toggleExpanded('history-1')}
              >
                참여 내역
              </Button>
            </div>
          </div>

          {/* 참여 내역 확장 영역 */}
          {expandedItems['history-1'] && (
            <div className='mt-4 rounded-md bg-gray-50 py-4'>
              <h4 className='mb-3 text-lg font-semibold text-gray-800'>참여 내역</h4>
              <div className='space-y-4'>
                <div className='rounded-md bg-white py-4'>
                  <h5 className='mb-2 text-sm font-medium text-gray-900'>참여 정보</h5>
                  <div className='flex flex-col gap-1'>
                    <span className='text-sm text-gray-800'>참여일: 2025.08.23</span>
                    <span className='text-sm text-gray-800'>참여 시간: 14:30</span>
                    <span className='text-sm text-gray-800'>결과: 미당첨</span>
                  </div>
                </div>

                <div className='rounded-md bg-white py-4'>
                  <h5 className='mb-2 text-sm font-medium text-gray-900'>상품 정보</h5>
                  <div className='flex flex-col gap-1'>
                    <span className='text-sm text-gray-800'>상품명: [리퍼브] 윤슬 면기 1P</span>
                    <span className='text-sm text-gray-800'>브랜드: 이도</span>
                    <span className='text-sm text-gray-800'>응모수량: 1회</span>
                  </div>
                </div>

                <div className='rounded-md bg-blue-50 p-3'>
                  <p className='text-sm text-blue-800'>
                    <strong>💡 팁:</strong> 다음 럭키드로우에 다시 도전해보세요!
                  </p>
                  <p className='text-sm text-blue-800'>
                    매일 새로운 상품으로 럭키드로우가 진행됩니다.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 상품 - 진행중 */}
        <div className='flex w-full flex-col gap-2 rounded-md border border-gray-400 px-4 py-4'>
          <div className='mb-1 flex flex-col'>
            <span className='text-sm text-gray-700'>2025.08.25 참여</span>
            <div className='flex flex-row items-center justify-between'>
              <div className='flex items-center gap-2'>
                <span className='text-sm font-semibold text-orange-600'>진행중</span>
                <span className='text-point-900 text-sm font-light'>75/100 응모</span>
              </div>
              <span className='text-sm font-semibold text-black'>응모 횟수: 2회</span>
            </div>
          </div>
          <div className='flex flex-row gap-3'>
            <img
              src='/images/Dummy/Mypage/빗.webp'
              alt='까사미아 원목세트'
              className='h-30 w-30 rounded-md object-cover object-center'
            />
            <div className='flex w-full flex-col justify-between'>
              <div className='flex flex-col'>
                <span className='text-sm font-semibold text-gray-900'>{'까사미아'}</span>
                <span className='font-regular text-sm text-gray-800'>
                  {'까사미아 참나무 원목 세트'}
                </span>
              </div>
              <Button
                variant='light'
                className='rounded-md border border-gray-400 py-2 text-sm font-medium'
                onClick={() => toggleExpanded('ongoing-1')}
              >
                응모 현황
              </Button>
            </div>
          </div>

          {/* 응모 현황 확장 영역 */}
          {expandedItems['ongoing-1'] && (
            <div className='mt-4 rounded-md bg-gray-50 py-4'>
              <h4 className='mb-3 text-lg font-semibold text-gray-800'>응모 현황</h4>
              <div className='space-y-4'>
                <div className='rounded-md bg-white py-4'>
                  <h5 className='mb-2 text-sm font-medium text-gray-900'>참여 정보</h5>
                  <div className='flex flex-col gap-1'>
                    <span className='text-sm text-gray-800'>참여일: 2025.08.25</span>
                    <span className='text-sm text-gray-800'>참여 시간: 09:15</span>
                    <span className='text-sm text-gray-800'>상태: 진행중</span>
                  </div>
                </div>

                <div className='rounded-md bg-white py-4'>
                  <h5 className='mb-2 text-sm font-medium text-gray-900'>응모 현황</h5>
                  <div className='flex flex-col gap-3'>
                    <span className='text-sm text-gray-800'>전체 응모: 75회</span>
                    <span className='text-sm text-gray-800'>목표 응모: 100회</span>
                    <span className='text-sm text-gray-800'>남은 응모: 25회</span>
                  </div>
                </div>

                <div className='rounded-md bg-orange-50 p-3'>
                  <p className='text-sm text-black'>
                    <strong>📊 진행률:</strong> 75% 완료되었습니다.
                  </p>
                  <p className='text-sm text-black'>
                    100회 응모가 완료되면 즉시 결과가 발표됩니다.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MyLuckDrawPage;
