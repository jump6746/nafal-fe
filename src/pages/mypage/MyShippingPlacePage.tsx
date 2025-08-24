import { useTopNavigationStore } from '@/shared/stores';
import { Button } from '@/shared/ui';
import { useEffect, useState } from 'react';

const MyShippingPlacePage = () => {
  const setText = useTopNavigationStore(state => state.setText);
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});
  const [shippingAddresses, setShippingAddresses] = useState([
    {
      id: '1',
      name: '집',
      recipient: '홍길동',
      phone: '010-1234-5678',
      zipcode: '06123',
      address: '서울특별시 강남구 테헤란로 123',
      detailAddress: '456동 789호',
      isDefault: true,
    },
    {
      id: '2',
      name: '회사',
      recipient: '홍길동',
      phone: '010-1234-5678',
      zipcode: '04523',
      address: '서울특별시 중구 을지로 100',
      detailAddress: '12층',
      isDefault: false,
    },
    {
      id: '3',
      name: '부모님 집',
      recipient: '홍부모',
      phone: '010-9876-5432',
      zipcode: '13579',
      address: '경기도 성남시 분당구 정자로 456',
      detailAddress: '101동 202호',
      isDefault: false,
    },
  ]);

  useEffect(() => {
    setText('내 배송지');
  }, [setText]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => {
      if (prev[itemId]) {
        return { ...prev, [itemId]: false };
      }
      return { [itemId]: true };
    });
  };

  const setDefaultAddress = (id: string) => {
    setShippingAddresses(prev =>
      prev.map(addr => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const deleteAddress = (id: string) => {
    if (shippingAddresses.find(addr => addr.id === id)?.isDefault) {
      alert('대표 배송지는 삭제할 수 없습니다.');
      return;
    }
    setShippingAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  return (
    <div className='h-full'>
      {/* 배송지 관리 */}
      <section className='flex h-full flex-col gap-4 p-5'>
        <div className='flex items-center justify-between'>
          <h3 className='text-xl font-semibold text-gray-800'>내 배송지</h3>
        </div>

        {/* 배송지 추가 폼 */}
        {expandedItems['add-new'] && (
          <div className='rounded-md border border-gray-300 bg-gray-50 p-4'>
            <h4 className='mb-3 text-lg font-semibold text-gray-800'>새 배송지 추가</h4>
            <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
              <input
                type='text'
                placeholder='배송지명 (예: 집, 회사)'
                className='rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none'
              />
              <input
                type='text'
                placeholder='받는 사람'
                className='rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none'
              />
              <input
                type='tel'
                placeholder='연락처'
                className='rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none'
              />
              <input
                type='text'
                placeholder='우편번호'
                className='rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none'
              />
              <input
                type='text'
                placeholder='기본주소'
                className='rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none md:col-span-2'
              />
              <input
                type='text'
                placeholder='상세주소'
                className='rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none md:col-span-2'
              />
            </div>
            <div className='mt-4 flex gap-2'>
              <Button variant='default' className='flex-1 rounded-md py-2 text-sm font-medium'>
                추가
              </Button>
              <Button
                variant='light'
                className='flex-1 rounded-md border border-gray-400 py-2 text-sm font-medium'
                onClick={() => toggleExpanded('add-new')}
              >
                취소
              </Button>
            </div>
          </div>
        )}

        {/* 배송지 목록 */}
        {shippingAddresses.map(address => (
          <div
            key={address.id}
            className='flex w-full flex-col gap-3 rounded-md border border-gray-400 px-4 py-4'
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                {address.isDefault && (
                  <span className='rounded-full bg-gray-800 px-2 py-1 text-xs font-medium text-white'>
                    대표
                  </span>
                )}
                <span className='text-sm font-semibold text-gray-900'>{address.name}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Button
                  variant='light'
                  className='rounded-md border border-gray-400 px-3 py-1 text-xs font-medium'
                  onClick={() => toggleExpanded(`edit-${address.id}`)}
                >
                  수정
                </Button>
                <Button
                  variant='light'
                  className='rounded-md border border-gray-400 px-3 py-1 text-xs font-medium'
                  onClick={() => deleteAddress(address.id)}
                >
                  삭제
                </Button>
              </div>
            </div>

            <div className='flex flex-col gap-1'>
              <span className='text-sm text-gray-800'>
                {address.recipient} ({address.phone})
              </span>
              <span className='text-sm text-gray-800'>
                [{address.zipcode}] {address.address}
              </span>
              <span className='text-sm text-gray-800'>{address.detailAddress}</span>
            </div>

            {!address.isDefault && (
              <Button
                variant='light'
                className='w-fit rounded-md border border-gray-400 px-3 py-1 text-xs font-medium'
                onClick={() => setDefaultAddress(address.id)}
              >
                대표 배송지로 설정
              </Button>
            )}

            {/* 수정 폼 */}
            {expandedItems[`edit-${address.id}`] && (
              <div className='mt-3 rounded-md border border-gray-300 bg-gray-50 p-3'>
                <h5 className='mb-2 text-sm font-medium text-gray-900'>배송지 수정</h5>
                <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
                  <input
                    type='text'
                    defaultValue={address.name}
                    className='rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-gray-500 focus:outline-none'
                  />
                  <input
                    type='text'
                    defaultValue={address.recipient}
                    className='rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-gray-500 focus:outline-none'
                  />
                  <input
                    type='tel'
                    defaultValue={address.phone}
                    className='rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-gray-500 focus:outline-none'
                  />
                  <input
                    type='text'
                    defaultValue={address.zipcode}
                    className='rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-gray-500 focus:outline-none'
                  />
                  <input
                    type='text'
                    defaultValue={address.address}
                    className='rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-gray-500 focus:outline-none md:col-span-2'
                  />
                  <input
                    type='text'
                    defaultValue={address.detailAddress}
                    className='rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-gray-500 focus:outline-none md:col-span-2'
                  />
                </div>
                <div className='mt-3 flex gap-2'>
                  <Button variant='default' className='flex-1 rounded-md py-1 text-xs font-medium'>
                    수정
                  </Button>
                  <Button
                    variant='light'
                    className='flex-1 rounded-md border border-gray-400 py-1 text-xs font-medium'
                    onClick={() => toggleExpanded(`edit-${address.id}`)}
                  >
                    취소
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}

        <Button
          variant='default'
          className='fixed right-5 bottom-5 left-5 z-10 w-auto'
          onClick={() => toggleExpanded('add-new')}
        >
          배송지 추가
        </Button>
      </section>
    </div>
  );
};

export default MyShippingPlacePage;
