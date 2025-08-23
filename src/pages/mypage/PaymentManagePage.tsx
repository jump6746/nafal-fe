import { useTopNavigationStore } from '@/shared/stores';
import { Button } from '@/shared/ui';
import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import CardRegistration from '@/features/auth/CardRegistration';

interface PaymentCard {
  id: string;
  type: 'bank' | 'card' | 'pay';
  name: string;
  displayName: string;
  cardNumber?: string;
  balance?: number;
  isDefault: boolean;
  color: 'blue' | 'light-blue' | 'yellow' | 'black';
  points?: number;
  cardNumberEnd?: string;
}

const PaymentManagePage = () => {
  const setText = useTopNavigationStore(state => state.setText);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [showCardRegistration, setShowCardRegistration] = useState(false);
  const initialCards: PaymentCard[] = [
    {
      id: '1',
      type: 'bank',
      name: 'Kbank',
      displayName: '케이뱅크 삼성iD카드',
      cardNumber: '5594-1008-****-5434',
      cardNumberEnd: '5434',
      isDefault: true,
      color: 'blue',
    },
    {
      id: '2',
      type: 'card',
      name: 'ShinhanCard',
      displayName: '신한카드 Deep Oil',
      cardNumber: '1231-4623-****-3213',
      cardNumberEnd: '3213',
      points: 4,
      isDefault: false,
      color: 'light-blue',
    },
    {
      id: '3',
      type: 'pay',
      name: 'pay',
      displayName: '카카오페이 간편결제',
      balance: 548934,
      isDefault: false,
      color: 'yellow',
    },
  ];

  // 대표카드를 맨 위로 정렬하는 함수
  const sortCardsByDefault = (cards: PaymentCard[]): PaymentCard[] => {
    return [...cards].sort((a, b) => {
      if (a.isDefault && !b.isDefault) return -1;
      if (!a.isDefault && b.isDefault) return 1;
      return 0;
    });
  };

  const [cards, setCards] = useState<PaymentCard[]>(sortCardsByDefault(initialCards));

  useEffect(() => {
    setText('결제수단 관리');
  }, [setText]);

  const handleCardClick = (cardId: string) => {
    setExpandedCard(prev => (prev === cardId ? null : cardId));
  };

  const handleSetDefault = (cardId: string) => {
    setCards(prev => {
      const updated = prev.map(card => ({
        ...card,
        isDefault: card.id === cardId,
      }));
      // 대표카드를 맨 위로 정렬
      return sortCardsByDefault(updated);
    });
    setExpandedCard(null);
  };

  const handleDeleteCard = (cardId: string) => {
    setCards(prev => prev.filter(card => card.id !== cardId));
    setExpandedCard(null);
  };

  // 카드 등록 완료 처리 함수
  const handleCardSuccess = () => {
    setShowCardRegistration(false);

    // 새 카드를 목록에 추가 (예시 데이터)
    const newCard: PaymentCard = {
      id: Date.now().toString(),
      type: 'card',
      name: 'HyundaiCard',
      displayName: '현대카드 SUMMIT',
      cardNumber: '4552-3213-****-9012',
      cardNumberEnd: '9012',
      isDefault: false,
      color: 'black',
    };

    setCards(prev => [...prev, newCard]);
  };

  const getCardStyle = (card: PaymentCard) => {
    const baseStyle = 'w-full rounded-lg transition-all duration-300 cursor-pointer';

    switch (card.color) {
      case 'blue':
        return `${baseStyle} bg-[#0114a7] text-white`;
      case 'light-blue':
        return `${baseStyle} bg-blue-600 text-white`;
      case 'yellow':
        return `${baseStyle} bg-yellow-300 text-black`;
      case 'black':
        return `${baseStyle} bg-black text-white`;
      default:
        return `${baseStyle} bg-gray-200 text-gray-800`;
    }
  };

  return (
    <div className='flex h-full w-full flex-col justify-between px-5 pt-[52px]'>
      <div className='mb-5'>
        <h3 className='mb-4 text-2xl font-semibold text-gray-900'>카드 목록</h3>
        <div className='space-y-3'>
          {cards.map(card => (
            <div
              key={card.id}
              className={getCardStyle(card)}
              onClick={() => handleCardClick(card.id)}
            >
              <div className='p-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <span className='text-lg font-semibold'>{card.name}</span>
                    <span className='text-sm opacity-90'>{card.displayName}</span>
                  </div>
                  {expandedCard === card.id ? (
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        handleSetDefault(card.id);
                      }}
                      className='flex items-center gap-1 rounded-sm bg-white px-2 py-1 text-sm font-semibold text-black transition-colors'
                    >
                      <CheckCircle size={14} />
                      대표카드 변경
                    </button>
                  ) : (
                    card.isDefault && (
                      <span className='rounded-sm bg-white px-2 py-1 text-sm font-semibold text-black'>
                        대표카드
                      </span>
                    )
                  )}
                </div>

                {card.cardNumber && (
                  <div className='mt-1 text-sm'>
                    {expandedCard === card.id ? card.cardNumber : card.cardNumberEnd}
                  </div>
                )}

                {card.balance && (
                  <div className='mt-1 text-lg font-semibold'>
                    {card.balance.toLocaleString()}원
                  </div>
                )}
              </div>

              {expandedCard === card.id && (
                <div className='border-opacity-20 space-y-3 p-4'>
                  <div className='flex gap-2'>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        handleDeleteCard(card.id);
                      }}
                      className='bg-sub-b-400 rounded-sm px-4 py-2 text-sm text-white transition-colors'
                    >
                      삭제
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className='mb-9 flex gap-4'>
        <Button
          className='flex-1 rounded-lg border border-gray-300 px-4 py-3 font-medium'
          onClick={() => setShowCardRegistration(true)}
        >
          등록하기
        </Button>
      </div>

      {/* 카드 등록 모달 */}
      {showCardRegistration && (
        <div className='fixed inset-0 z-[9999] bg-black/50'>
          <div className='absolute right-0 bottom-0 left-0 mx-auto w-full max-w-[450px] min-w-[320px]'>
            <div className='h-[80vh] w-full translate-y-0 transform overflow-hidden rounded-t-2xl bg-white transition-transform duration-300 ease-out'>
              <div className='relative mx-auto flex h-full w-full flex-col'>
                {/* Header */}
                <div className='flex items-center justify-between border-b border-gray-200 p-4'>
                  <div className='flex flex-col'>
                    <h2 className='text-xl font-semibold text-gray-800'>카드 등록</h2>
                    <h3 className='text-sm text-gray-600'>카드 정보를 확인하고 등록해주세요</h3>
                  </div>
                  <button
                    onClick={() => setShowCardRegistration(false)}
                    className='rounded-full p-2 hover:bg-gray-100'
                    title='카드 등록 취소'
                  >
                    <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                  </button>
                </div>
                {/* CardRegistration 컴포넌트 */}
                <div className='h-full w-full max-w-md px-5 pt-9 pb-9'>
                  <CardRegistration onSuccess={handleCardSuccess} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentManagePage;
