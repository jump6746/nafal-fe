import AddressSearch from '@/widgets/pay/ui/AddressSearch';
import { useTopNavigationStore } from '@/shared/stores';
import { useEffect, useState } from 'react';
import type { DeliveryAddress } from '@/features/pay/type/address';
import OrderProduct from '@/widgets/pay/ui/OrderProduct';
import PaymentMethod from '@/widgets/pay/ui/PaymentMethod';
import CardPayment from '@/widgets/pay/ui/CardPayment';
import { Button } from '@/shared/ui/Button/Button';

const PayPage = () => {
  const setText = useTopNavigationStore(state => state.setText);
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>({
    recipientName: '',
    recipientPhone: '',
    zipcode: '',
    address: '',
    detailAddress: '',
    shippingMethod: '일반 택배',
  });

  const [paymentMethod, setPaymentMethod] = useState<string>('카카오페이 (간편결제)');

  // OrderProduct 데이터
  const orderProductData = {
    imageUrl: '/images/mockup/image_kanu.png',
    productName: '카누 팝업스토어 원두 에디션 텀블러 세트',
    sellerName: 'KANU',
    amount: 10000,
  };

  useEffect(() => {
    setText('주문서');
  }, [setText]);

  const handleAddressChange = (newAddress: DeliveryAddress) => {
    setDeliveryAddress(newAddress);
  };

  const handlePaymentMethodChange = (newPaymentMethod: string) => {
    setPaymentMethod(newPaymentMethod);
  };

  return (
    <div className='flex h-fit w-full flex-col gap-5 px-5 pt-9 pb-12'>
      <OrderProduct
        imageUrl={orderProductData.imageUrl}
        productName={orderProductData.productName}
        sellerName={orderProductData.sellerName}
        amount={orderProductData.amount}
      />
      <AddressSearch initialAddress={deliveryAddress} onAddressChange={handleAddressChange} />
      <PaymentMethod
        paymentMethod={paymentMethod}
        onPaymentMethodChange={handlePaymentMethodChange}
        paymentAmount={10000}
      />
      <CardPayment
        variant='CardNotYet'
        trigger={
          <Button
            variant='default'
            className='text-point-900 mt-[100px] h-15 w-full text-xl font-semibold'
          >
            10,000원 결제하기
          </Button>
        }
        Loadertime={1000}
      />
    </div>
  );
};

export default PayPage;
