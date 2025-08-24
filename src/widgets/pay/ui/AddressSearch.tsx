import { Button, TextField } from '@/shared/ui';
import { useState, useCallback } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover/popover';
import { Command, CommandGroup, CommandItem, CommandList } from '@/shared/ui/command/command';
import type { KakaoAddressData, DeliveryAddress } from '@/features/pay/type/address';

const shippingMethodOptions = ['일반 택배', '방문 픽업', '로켓 배송'];

interface AddressSearchProps {
  initialAddress?: DeliveryAddress;
  onAddressChange: (address: DeliveryAddress) => void;
}

const AddressSearch = ({ initialAddress, onAddressChange }: AddressSearchProps) => {
  const [address, setAddress] = useState<DeliveryAddress>(
    initialAddress || {
      recipientName: '',
      recipientPhone: '',
      zipcode: '',
      address: '',
      detailAddress: '',
      shippingMethod: '일반 택배',
    }
  );
  const [shippingMethodOpen, setShippingMethodOpen] = useState(false);

  // 카카오 주소검색 API 호출
  const handleAddressSearch = useCallback(() => {
    if (typeof window.daum === 'undefined') {
      alert('주소검색 서비스를 불러올 수 없습니다. 페이지를 새로고침해주세요.');
      return;
    }

    new window.daum.Postcode({
      oncomplete: (data: KakaoAddressData) => {
        const newAddress = {
          ...address,
          zipcode: data.zonecode,
          address: data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress,
        };
        setAddress(newAddress);
        onAddressChange(newAddress);
      },

      width: '100%',
      height: '100%',
      animation: true,
      focusInput: true,
      autoMapping: true,
    }).open();
  }, [address, onAddressChange]);

  // 전화번호 포맷팅 함수
  const formatPhoneNumber = (value: string) => {
    // 숫자만 추출
    const numbers = value.replace(/[^\d]/g, '');

    // 11자리 제한
    const limited = numbers.slice(0, 11);

    // 포맷팅 적용
    if (limited.length <= 3) {
      return limited;
    } else if (limited.length <= 7) {
      return `${limited.slice(0, 3)}-${limited.slice(3)}`;
    } else {
      return `${limited.slice(0, 3)}-${limited.slice(3, 7)}-${limited.slice(7)}`;
    }
  };

  // 전화번호 변경 핸들러
  const handlePhoneChange = useCallback(
    (value: string) => {
      const formattedPhone = formatPhoneNumber(value);
      const newAddress = { ...address, recipientPhone: formattedPhone };
      setAddress(newAddress);
      onAddressChange(newAddress);
    },
    [address, onAddressChange]
  );

  // 입력값 변경 핸들러
  const handleInputChange = useCallback(
    (field: keyof DeliveryAddress, value: string) => {
      const newAddress = { ...address, [field]: value };
      setAddress(newAddress);
      onAddressChange(newAddress);
    },
    [address, onAddressChange]
  );

  // 배송방법 변경 핸들러
  const handleShippingMethodChange = useCallback(
    (method: string) => {
      const newAddress = {
        ...address,
        shippingMethod: method as DeliveryAddress['shippingMethod'],
      };
      setAddress(newAddress);
      onAddressChange(newAddress);
    },
    [address, onAddressChange]
  );

  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-2xl font-bold text-gray-800'>배송지</h2>
      {/* 받는 사람 정보 */}
      <div className='flex flex-col gap-2'>
        <label className='px-1 text-sm font-medium text-gray-900'>받는 사람</label>
        <TextField
          value={address.recipientName}
          onChange={e => handleInputChange('recipientName', e.target.value)}
          placeholder='이름을 입력하세요'
          className='h-12 w-full border-gray-300 text-base'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label className='px-1 text-sm font-medium text-gray-900'>연락처</label>
        <TextField
          value={address.recipientPhone}
          onChange={e => handlePhoneChange(e.target.value)}
          placeholder='010-1234-5678'
          className='h-12 w-full border-gray-300 text-base'
          type='tel'
          maxLength={13}
        />
      </div>
      {/* 주소 정보 */}
      <div className='flex flex-col gap-3'>
        <div className='flex flex-col gap-2'>
          <label className='px-1 text-sm font-medium text-gray-900'>우편번호</label>
          <div className='flex gap-2'>
            <div className='flex-1'>
              <TextField
                value={address.zipcode}
                readOnly
                placeholder='우편번호'
                className='h-12 w-full border-gray-300 bg-gray-50 text-base'
              />
            </div>
            <Button
              variant='default'
              onClick={handleAddressSearch}
              className='h-12 px-[10px] text-xl font-semibold text-[#026051]'
            >
              주소검색
            </Button>
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <label className='px-1 text-sm font-medium text-gray-900'>주소</label>
          <TextField
            value={address.address}
            readOnly
            placeholder='주소검색 버튼을 클릭하여 주소를 선택하세요'
            className='h-12 w-full border-gray-300 bg-gray-50 text-base'
            onClick={handleAddressSearch}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='px-1 text-sm font-medium text-gray-900'>상세주소</label>
          <TextField
            value={address.detailAddress}
            onChange={e => handleInputChange('detailAddress', e.target.value)}
            placeholder='상세주소를 입력하세요 (동, 호수 등)'
            className='h-12 w-full border-gray-300 text-base'
          />
        </div>
      </div>

      {/* 배송방법 */}
      <div className='flex flex-col gap-2'>
        <label className='px-1 text-sm font-medium text-gray-900'>배송방법</label>
        <Popover open={shippingMethodOpen} onOpenChange={setShippingMethodOpen}>
          <PopoverTrigger asChild className='p-0'>
            <Button
              variant='white'
              role='combobox'
              aria-expanded={shippingMethodOpen}
              className='w-full justify-between border border-gray-300 bg-white px-[18px] py-[10px] text-lg font-medium text-gray-800 hover:bg-gray-50'
            >
              {address.shippingMethod}
              <img src='images/Icons/caret_down_sm.svg' alt='caret_down' className='h-6 w-6' />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className='border-gray-300 p-0 shadow-none'
            style={{ width: 'calc(100vw - 2.5rem)', margin: '0 1.25rem' }}
          >
            <Command>
              <CommandList>
                <CommandGroup>
                  {shippingMethodOptions.map(method => (
                    <CommandItem
                      key={method}
                      value={method}
                      onSelect={currentValue => {
                        handleShippingMethodChange(currentValue);
                        setShippingMethodOpen(false);
                      }}
                      className={`py-3 text-left text-base font-normal data-[selected=true]:bg-transparent ${
                        method === address.shippingMethod
                          ? 'text-point-500 data-[selected=true]:text-point-500 font-medium'
                          : 'font-normal text-gray-900 data-[selected=true]:text-gray-900'
                      } `}
                    >
                      {method}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default AddressSearch;
