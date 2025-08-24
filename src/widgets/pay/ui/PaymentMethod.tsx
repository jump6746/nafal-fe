import { Button } from '@/shared/ui/Button/Button';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover/popover';
import { Command, CommandGroup, CommandItem, CommandList } from '@/shared/ui/command/command';
import { useState } from 'react';

interface PaymentMethodProps {
  paymentMethod: string;
  onPaymentMethodChange: (paymentMethod: string) => void;
  paymentAmount: number;
}

const paymentMethodOptions = [
  {
    label: '카카오페이 (간편결제)',
  },
  {
    label: '신용카드',
  },
  {
    label: '계좌이체',
  },
  {
    label: '간편결제 등록하기',
  },
];

const PaymentMethod = ({
  paymentMethod,
  onPaymentMethodChange,
  paymentAmount,
}: PaymentMethodProps) => {
  const [paymentMethodOpen, setPaymentMethodOpen] = useState(false);

  return (
    <div className='flex flex-col gap-2'>
      <h2 className='pt-[2px] text-2xl font-bold text-gray-800'>결제 수단</h2>
      <Popover open={paymentMethodOpen} onOpenChange={setPaymentMethodOpen}>
        <PopoverTrigger asChild className='p-0'>
          <Button
            variant='white'
            role='combobox'
            aria-expanded={paymentMethodOpen}
            className='w-full justify-between border border-gray-300 bg-white px-[18px] py-[10px] text-lg font-medium text-gray-800 hover:bg-gray-50'
          >
            {paymentMethod}
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
                {paymentMethodOptions.map(method => (
                  <CommandItem
                    key={method.label}
                    value={method.label}
                    onSelect={currentValue => {
                      onPaymentMethodChange(currentValue);
                      setPaymentMethodOpen(false);
                    }}
                    className={`py-3 text-left text-base font-normal data-[selected=true]:bg-transparent ${
                      method.label === paymentMethod
                        ? 'text-point-500 data-[selected=true]:text-point-500 font-medium'
                        : 'font-normal text-gray-900 data-[selected=true]:text-gray-900'
                    } `}
                  >
                    {method.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className='mt-[18px] flex justify-between text-2xl font-bold text-gray-900'>
        <span>총 결제 금액</span>
        <span>{paymentAmount.toLocaleString()}원</span>
      </div>
    </div>
  );
};

export default PaymentMethod;
