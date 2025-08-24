import { useTopNavigationStore } from '@/shared/stores';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderProduct from '@/widgets/pay/ui/OrderProduct';
import { Button } from '@/shared/ui/Button/Button';

interface OrderProductData {
  imageUrl: string;
  productName: string;
  sellerName: string;
  amount: number;
}

interface LocationState {
  orderProductData: OrderProductData;
}

const PaidSuccess = () => {
  const setText = useTopNavigationStore(state => state.setText);
  const location = useLocation();
  const locationState = location.state as LocationState;

  // 안전한 기본값 제공
  const orderData = locationState?.orderProductData || {
    imageUrl: '/images/mockup/image_kanu.png',
    productName: '카누 팝업스토어 원두 에디션 텀블러 세트',
    sellerName: 'KANU',
    amount: 10000,
  };

  const navigate = useNavigate();

  useEffect(() => {
    setText('결제 완료');
  }, [setText]);

  return (
    <div
      className='flex h-full w-full flex-col items-center justify-center'
      style={{
        backgroundImage: 'url(/images/BackGround/community_empty.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className='flex h-full flex-col items-center justify-between gap-6 rounded-lg pt-10 pb-9'>
        <h1 className='text-2xl font-extrabold text-gray-800'>결제 성공!</h1>
        <OrderProduct
          imageUrl={orderData.imageUrl}
          productName={orderData.productName}
          sellerName={orderData.sellerName}
          amount={orderData.amount}
        />
        <div>
          <p className='text-center text-gray-500'>
            주문이 성공적으로 처리되었습니다.
            <br />
            배송 정보는 이메일로 발송됩니다.
          </p>
        </div>
        <div className='flex w-full flex-row gap-2'>
          <Button variant='white' className='w-[120px]' onClick={() => navigate('/')}>
            나가기
          </Button>
          <Button variant='default' className='flex-1' onClick={() => navigate('/mypage')}>
            배송 조회하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaidSuccess;
