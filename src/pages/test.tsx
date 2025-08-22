import CardPayment from '@/widgets/pay/ui/CardPayment';
import { Button } from '@/shared/ui/Button/Button';

const Test = () => {
  return (
    <div className='flex w-full flex-col justify-center gap-4'>
      <CardPayment variant='CardNotYet' trigger={<Button>카드 등록하기</Button>} />
      <CardPayment variant='AccountCheck' trigger={<Button>가용 입찰 금액 점검</Button>} />
      <CardPayment variant='CardPayment' trigger={<Button>결제 진행중</Button>} />
      <CardPayment variant='CertificationNotYet' trigger={<Button>본인인증 하기</Button>} />
      <CardPayment
        variant='AccountCheck'
        shouldFail={true}
        trigger={<Button>가용 입찰 금액 점검 실패</Button>}
      />
    </div>
  );
};

export default Test;
