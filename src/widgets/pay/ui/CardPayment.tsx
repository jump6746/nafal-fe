import { Button } from '@/shared/ui/Button/Button';
import { useEffect, useRef, useState } from 'react';
import PASS from '@/features/auth/PASS';
import CardRegistration from '@/features/auth/CardRegistration';

interface CardPaymentProps {
  variant: 'CardNotYet' | 'AccountCheck' | 'CardPayment' | 'CertificationNotYet';
  trigger?: React.ReactNode;
  Loadertime?: number;
}

const CardPaymentHeader = (variant: CardPaymentProps['variant']) => {
  if (variant === 'CardNotYet') {
    return {
      Maintitle: '아직 등록한 카드가 없어요',
      Subtitle: '카드 등록 후 참여할 수 있어요',
      Buttontext: '카드 등록하기',
    };
  }
  if (variant === 'AccountCheck') {
    return {
      Maintitle: '안심하고 참여하실 수 있도록',
      Subtitle: '가용 입찰 금액을 점검해드릴게요',
      Buttontext: '',
    };
  }
  if (variant === 'CardPayment') {
    return {
      Maintitle: '결제가 진행중입니다.',
      Subtitle: '',
      Buttontext: '',
    };
  }
  if (variant === 'CertificationNotYet') {
    return {
      Maintitle: '아직 본인 인증이 되지 않았어요',
      Subtitle: '',
      Buttontext: '본인인증 하기',
    };
  }
};

const CardPayment = ({ variant, trigger, Loadertime }: CardPaymentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCardNotYetModal, setShowCardNotYetModal] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);
  const [showCancelMessage, setShowCancelMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showCardSuccessMessage, setShowCardSuccessMessage] = useState(false);
  const [accountCheckPercent, setAccountCheckPercent] = useState(0);
  const [showAccountCheckSuccess, setShowAccountCheckSuccess] = useState(false);
  const progressTimerRef = useRef<number | null>(null);
  const percentRef = useRef(0);
  const header = CardPaymentHeader(variant);

  // PASS 모달 닫기 함수
  const handleClosePassModal = () => {
    setShowPassModal(false);
    setShowCancelMessage(true);

    // 3초 후에 취소 메시지와 메인 모달을 모두 닫기
    setTimeout(() => {
      setShowCancelMessage(false);
      setIsOpen(false);
    }, 3000);
  };

  // PASS 인증 완료 처리 함수
  const handlePassSuccess = () => {
    setShowPassModal(false);
    setShowSuccessMessage(true);

    // 3초 후에 성공 메시지와 메인 모달을 모두 닫기
    setTimeout(() => {
      setShowSuccessMessage(false);
      setIsOpen(false);
    }, 3000);
  };

  // 카드 등록 완료 처리 함수
  const handleCardSuccess = () => {
    setShowCardNotYetModal(false);
    setShowCardSuccessMessage(true);

    // 3초 후에 성공 메시지와 메인 모달을 모두 닫기
    setTimeout(() => {
      setShowCardSuccessMessage(false);
      setIsOpen(false);
    }, 3000);
  };

  // AccountCheck 진행률 시뮬레이션 (자연스러운 증가)
  useEffect(() => {
    if (!isOpen || variant !== 'AccountCheck') return;

    // 초기화
    setAccountCheckPercent(0);
    percentRef.current = 0;
    setShowAccountCheckSuccess(false);

    const totalDuration = typeof Loadertime === 'number' ? Math.max(1200, Loadertime) : 3200;
    const startTs = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTs;
      const elapsedRatio = Math.min(1, elapsed / totalDuration);

      // 구간별 가속/감속 + 약간의 랜덤성
      // 0~60% 빠르게, 60~90% 천천히, 90~99% 매우 천천히, 마지막은 잠깐 멈췄다가 100%
      let targetBase = 0;
      if (elapsedRatio < 0.4) {
        targetBase = 60 * (elapsedRatio / 0.4); // 빠르게 0->60
      } else if (elapsedRatio < 0.8) {
        targetBase = 60 + 30 * ((elapsedRatio - 0.4) / 0.4); // 60->90
      } else if (elapsedRatio < 0.95) {
        targetBase = 90 + 9 * ((elapsedRatio - 0.8) / 0.15); // 90->99
      } else {
        targetBase = 99; // 잠깐 머무름
      }

      // 0.0~1.5 사이의 작은 노이즈로 흔들림
      const noise = Math.random() * 1.5;
      const current = percentRef.current;
      const next = Math.min(99, Math.max(current + 0.2, targetBase - 1 + noise));

      setAccountCheckPercent(prev => {
        const clamped = Math.max(prev, Math.floor(next));
        const bounded = Math.min(99, clamped);
        percentRef.current = bounded;
        return bounded;
      });

      // 최종 완료 처리: 총 시간의 100%를 지난 후 약간의 지연을 두고 100%로 마무리
      if (elapsed >= totalDuration) {
        // 마지막 연출: 300~800ms 랜덤 지연 후 100%
        const delay = 300 + Math.floor(Math.random() * 500);
        progressTimerRef.current = window.setTimeout(() => {
          setAccountCheckPercent(100);
          percentRef.current = 100;
          setShowAccountCheckSuccess(true);
          // 성공 모달 2.2초 후 닫힘
          window.setTimeout(() => {
            setShowAccountCheckSuccess(false);
            setIsOpen(false);
          }, 2200);
        }, delay);
        return;
      }

      // 다음 틱까지 80~220ms 랜덤 인터벌로 자연스러운 업데이트
      const interval = 80 + Math.floor(Math.random() * 140);
      progressTimerRef.current = window.setTimeout(tick, interval);
    };

    // 처음 살짝 딜레이 후 시작
    progressTimerRef.current = window.setTimeout(tick, 180);

    return () => {
      if (progressTimerRef.current) {
        clearTimeout(progressTimerRef.current);
        progressTimerRef.current = null;
      }
    };
  }, [isOpen, variant, Loadertime]);

  if (!isOpen) {
    return <div onClick={() => setIsOpen(true)}>{trigger}</div>;
  }

  if (!header) {
    return <div>에러입니다 수고하세요.</div>;
  }

  // 본인인증 성공 메시지
  if (showSuccessMessage) {
    return (
      <div className='fixed inset-0 z-[9999] bg-black/50'>
        <div className='absolute right-0 bottom-0 left-0 mx-auto w-full max-w-[450px] min-w-[320px]'>
          <div className='h-[46vh] w-full translate-y-0 transform rounded-t-2xl bg-white px-5 py-9 transition-transform duration-300 ease-out'>
            <div className='relative mx-auto flex h-full w-full flex-col'>
              <button
                onClick={() => {
                  setShowSuccessMessage(false);
                  setIsOpen(false);
                }}
                className='absolute top-2 right-4 rounded-full p-2 hover:bg-gray-100'
                title='닫기'
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
              <div className='py-[10px]'></div>
              {/* Content */}
              <div className='z-[-1px] flex min-h-0 flex-1 flex-col items-center justify-center px-7'>
                <div className='text-center'>
                  <div className='mb-4 text-6xl'>✅</div>
                  <p className='mb-2 text-2xl font-bold text-gray-900'>본인인증이 완료되었습니다</p>
                  <p className='text-lg text-gray-500'>잠시 후 자동으로 닫힙니다</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 본인인증 취소 메시지
  if (showCancelMessage) {
    return (
      <div className='fixed inset-0 z-[9999] bg-black/50'>
        <div className='absolute right-0 bottom-0 left-0 mx-auto w-full max-w-[450px] min-w-[320px]'>
          <div className='h-[46vh] w-full translate-y-0 transform rounded-t-2xl bg-white px-5 py-9 transition-transform duration-300 ease-out'>
            <div className='relative mx-auto flex h-full w-full flex-col'>
              <button
                onClick={() => {
                  setShowCancelMessage(false);
                  setIsOpen(false);
                }}
                className='absolute top-4 right-4 rounded-full p-2 hover:bg-gray-100'
                title='닫기'
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
              <div className='py-[10px]'></div>
              {/* Content */}
              <div className='z-[-1px] flex min-h-0 flex-1 flex-col items-center justify-center px-7'>
                <div className='text-center'>
                  <div className='mb-4 text-6xl'>❌</div>
                  <p className='mb-2 text-2xl font-bold text-gray-900'>본인인증이 취소되었습니다</p>
                  <p className='text-lg text-gray-500'>잠시 후 자동으로 닫힙니다</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 가용 입찰 금액 점검(계정 점검) 성공 메시지
  if (showAccountCheckSuccess) {
    return (
      <div className='fixed inset-0 z-[9999] bg-black/50'>
        <div className='absolute right-0 bottom-0 left-0 mx-auto w-full max-w-[450px] min-w-[320px]'>
          <div className='h-[46vh] w-full translate-y-0 transform rounded-t-2xl bg-white px-5 py-9 transition-transform duration-300 ease-out'>
            <div className='relative mx-auto flex h-full w-full flex-col'>
              <button
                onClick={() => {
                  setShowAccountCheckSuccess(false);
                  setIsOpen(false);
                }}
                className='absolute top-4 right-4 rounded-full p-2 hover:bg-gray-100'
                title='닫기'
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
              {/* Header */}
              <div className='flex flex-col text-xl font-semibold text-gray-800'>
                <h2>조회에 성공했어요!</h2>
              </div>
              <div className='py-[10px]'></div>
              {/* Content */}
              <div className='z-[-1px] flex min-h-0 flex-1 flex-col items-center justify-center px-7'>
                <img src='/images/BackGround/card.webp' alt='card' className='mt-6 w-full px-8' />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 카드 등록 성공 메시지
  if (showCardSuccessMessage) {
    return (
      <div className='fixed inset-0 z-[9999] bg-black/50'>
        <div className='absolute right-0 bottom-0 left-0 mx-auto w-full max-w-[450px] min-w-[320px]'>
          <div className='h-[46vh] w-full translate-y-0 transform rounded-t-2xl bg-white px-5 py-9 transition-transform duration-300 ease-out'>
            <div className='relative mx-auto flex h-full w-full flex-col'>
              <button
                onClick={() => {
                  setShowCardSuccessMessage(false);
                  setIsOpen(false);
                }}
                className='absolute top-4 right-4 rounded-full p-2 hover:bg-gray-100'
                title='닫기'
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
              <div className='py-[10px]'></div>
              {/* Content */}
              <div className='z-[-1px] flex min-h-0 flex-1 flex-col items-center justify-center px-7'>
                <div className='text-center'>
                  <div className='mb-4 text-6xl'>✅</div>
                  <p className='mb-2 text-2xl font-bold text-gray-900'>
                    카드 등록이 완료되었습니다
                  </p>
                  <p className='text-lg text-gray-500'>잠시 후 자동으로 닫힙니다</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // CardNotYet 모달
  if (showCardNotYetModal) {
    return (
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
                  onClick={() => {
                    setShowCardNotYetModal(false);
                    setIsOpen(false);
                  }}
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
                <CardRegistration onSuccess={handleCardSuccess} Loadertime={Loadertime} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // PASS 모달
  if (showPassModal) {
    return (
      <div className='fixed inset-0 z-[9999] bg-black/50'>
        <div className='absolute right-0 bottom-0 left-0 mx-auto w-full max-w-[450px] min-w-[320px]'>
          <div className='h-[95vh] w-full translate-y-0 transform overflow-hidden rounded-t-2xl bg-white transition-transform duration-300 ease-out'>
            <div className='relative mx-auto flex h-full w-full flex-col'>
              {/* Header */}
              <div className='flex items-center justify-between border-b border-gray-200 p-4'>
                <div className='flex flex-col'>
                  <h2 className='text-xl font-semibold text-gray-800'>본인인증</h2>
                  <h3 className='text-sm text-gray-600'>PASS로 본인인증을 진행해주세요</h3>
                </div>
                <button
                  onClick={handleClosePassModal}
                  className='rounded-full p-2 hover:bg-gray-100'
                  title='본인인증 취소'
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
              {/* PASS 컴포넌트 */}
              <div className='flex flex-1 items-center justify-center overflow-y-auto p-4'>
                <div className='w-full max-w-md'>
                  <PASS onSuccess={handlePassSuccess} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 메인 모달
  return (
    <div className='fixed inset-0 z-[9999] bg-black/50'>
      <div className='absolute right-0 bottom-0 left-0 mx-auto w-full max-w-[450px] min-w-[320px]'>
        <div className='h-[46vh] w-full translate-y-0 transform rounded-t-2xl bg-white px-5 py-9 transition-transform duration-300 ease-out'>
          <div className='relative mx-auto flex h-full w-full flex-col'>
            <button
              onClick={() => setIsOpen(false)}
              className='absolute right-0 rounded-full p-2 hover:bg-gray-100'
              title='닫기'
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
            {/* Header */}
            <div className='flex flex-col text-xl font-semibold text-gray-800'>
              <h2>{header.Maintitle}</h2>
              <div className='flex flex-row gap-2'>
                <h3>{header.Subtitle}</h3>
                {variant === 'AccountCheck' && (
                  <span className='text-sub-a-500 font-extrabold'>{accountCheckPercent}%</span>
                )}
              </div>
              {variant === 'AccountCheck' && (
                <div className='mt mt-[10px] flex flex-row items-center gap-2'>
                  <div className='rounded-lg bg-gray-800 px-2 py-1 text-sm font-semibold text-white'>
                    대표카드
                  </div>
                  <p className='text-xs font-medium text-gray-800'>현대카드 4056</p>
                </div>
              )}
            </div>
            <div className='py-[10px]'></div>
            {/* Content */}
            <div className='z-[-1px] flex min-h-0 flex-1 flex-col items-center justify-center px-7'>
              {variant === 'CardNotYet' && (
                <img
                  src='/images/BackGround/UnknownLuckydraw.jpg'
                  alt='card'
                  className='mt-12 w-full'
                />
              )}
              {variant === 'AccountCheck' && (
                <img src='/images/BackGround/card.webp' alt='card' className='mt-4 w-full px-14' />
              )}
              {variant === 'CardPayment' && (
                <img src='/images/BackGround/card.webp' alt='card' className='mt-6 w-full px-8' />
              )}
              {variant === 'CertificationNotYet' && (
                <div className='mb-12 w-[200px]'>
                  <svg
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    className='text-point-600 mt-12 w-full'
                    role='img'
                    aria-label='user'
                  >
                    <path
                      d='M9 8C9 9.65685 10.3431 11 12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8Z'
                      fill='currentColor'
                    />
                    <path
                      d='M12 14C14.7614 14 17 16.2386 17 19H7C7 16.2386 9.23858 14 12 14Z'
                      fill='currentColor'
                    />
                    <path
                      d='M9 8C9 9.65685 10.3431 11 12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8Z'
                      stroke='currentColor'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M12 14C14.7614 14 17 16.2386 17 19H7C7 16.2386 9.23858 14 12 14Z'
                      stroke='currentColor'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                  </svg>
                </div>
              )}
            </div>
            {(variant === 'CardNotYet' || variant === 'CertificationNotYet') && (
              <>
                <Button
                  variant='default'
                  className='w-full'
                  onClick={() => {
                    if (variant === 'CardNotYet') {
                      setShowCardNotYetModal(true);
                    } else {
                      setShowPassModal(true);
                    }
                  }}
                >
                  {header.Buttontext}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPayment;
