import { Button } from '@/shared/ui/Button/Button';
import { useEffect, useMemo, useRef, useState } from 'react';
import Loader from './Loader';

interface CardRegistrationProps {
  onSuccess?: () => void;
  Loadertime?: number;
}

const formatCardNumber = (value: string) => {
  const digitsOnly = value.replace(/\D/g, '').slice(0, 16);
  return digitsOnly.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
};

const formatExpiry = (value: string) => {
  const digitsOnly = value.replace(/\D/g, '').slice(0, 4);
  if (digitsOnly.length <= 2) return digitsOnly;
  return `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2)}`;
};

const isValidExpiry = (mmYY: string) => {
  if (!/^\d{2}\/\d{2}$/.test(mmYY)) return false;
  const [mmStr] = mmYY.split('/');
  const mm = Number(mmStr);
  if (mm < 1 || mm > 12) return false;
  return true;
};

const CardRegistration = ({ onSuccess, Loadertime }: CardRegistrationProps) => {
  const [cardNumber, setCardNumber] = useState('1234 5678 9012 3456');
  const [expiry, setExpiry] = useState('12/25');
  const [cvc, setCvc] = useState('123');
  const [holder, setHolder] = useState('박성문');

  const [editing, setEditing] = useState<null | 'number' | 'expiry' | 'cvc' | 'holder'>(null);
  const [attempted, setAttempted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const { numberOk, expiryOk, cvcOk, holderOk, canConfirm } = useMemo(() => {
    const numberOk = cardNumber.replace(/\s/g, '').length === 16;
    const expiryOk = isValidExpiry(expiry);
    const cvcOk = /^\d{3,4}$/.test(cvc);
    const holderOk = holder.trim().length > 1;
    return {
      numberOk,
      expiryOk,
      cvcOk,
      holderOk,
      canConfirm: numberOk && expiryOk && cvcOk && holderOk,
    };
  }, [cardNumber, expiry, cvc, holder]);

  const handleCardConfirm = () => {
    if (!canConfirm) {
      setAttempted(true);
      // 첫 번째 오류 필드로 포커스 유도
      if (!numberOk) return startEdit('number');
      if (!expiryOk) return startEdit('expiry');
      if (!cvcOk) return startEdit('cvc');
      if (!holderOk) return startEdit('holder');
      return;
    }
    setSubmitting(true);
  };

  useEffect(() => {
    const handleFinish = () => {
      setSubmitting(false);
      if (onSuccess) onSuccess();
    };
    window.addEventListener('loader:finish', handleFinish);
    return () => window.removeEventListener('loader:finish', handleFinish);
  }, [onSuccess]);

  const startEdit = (field: 'number' | 'expiry' | 'cvc' | 'holder') => {
    setEditing(field);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const stopEdit = () => setEditing(null);

  return (
    <div className='flex h-full w-full flex-col justify-between bg-white'>
      <div className='mb-6'>
        <p className='mb-4 text-center text-xl font-semibold text-gray-900'>
          등록할 카드 정보를 확인해주세요.
        </p>
      </div>
      <div className='relative -mt-4 mb-6 w-full'>
        <div
          className={`relative mx-auto w-full max-w-md overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-gray-800 to-black p-6 text-white shadow-2xl ${attempted && !canConfirm ? 'ring-2 ring-red-400/70' : ''}`}
        >
          <Loader show={submitting} text='카드를 등록하고 있습니다...' durationMs={Loadertime} />
          {/* 배경 패턴 */}
          <div className='to-white-900/10 from-black-900/300 absolute inset-0 bg-gradient-to-r'></div>
          <div className='from-black-500/20 to-black-500/20 absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br blur-xl'></div>
          <div className='from-black-500/20 to-black-500/20 absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-gradient-to-br blur-xl'></div>

          {/* 상단 로고 영역 */}
          <div className='relative z-10 mb-4 flex items-center justify-between'>
            <div className='text-sm font-bold tracking-wide text-white/90'>HYUNDAI CARD</div>
            <div className='h-6 w-10 rounded bg-white'></div>
          </div>

          {/* 카드 번호 */}
          <div className='relative z-10 mb-4'>
            {editing === 'number' ? (
              <input
                ref={inputRef}
                value={cardNumber}
                onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                onBlur={stopEdit}
                inputMode='numeric'
                maxLength={19}
                className={`w-full rounded border bg-black/30 px-2 py-2 font-mono text-xl tracking-widest backdrop-blur-sm outline-none placeholder:text-neutral-400 ${attempted && !numberOk ? 'border-red-400 ring-2 ring-red-400/50' : 'border-white/10'}`}
                placeholder='0000 0000 0000 0000'
              />
            ) : (
              <button
                type='button'
                onClick={() => startEdit('number')}
                className={`w-full text-left font-mono text-2xl tracking-widest ${attempted && !numberOk ? 'text-red-300' : 'text-white/95'}`}
                title='카드번호 수정'
              >
                {cardNumber || '0000 0000 0000 0000'}
              </button>
            )}
          </div>
          {attempted && !numberOk && (
            <p className='mb-3 text-xs text-red-300'>카드 번호 16자리를 입력해주세요.</p>
          )}

          {/* MM/YY + CVC */}
          <div className='relative z-10 flex items-end justify-between'>
            <div className='flex flex-col'>
              <span className='mb-1 text-xs text-neutral-300'>VALID THRU</span>
              {editing === 'expiry' ? (
                <input
                  ref={inputRef}
                  value={expiry}
                  onChange={e => setExpiry(formatExpiry(e.target.value))}
                  onBlur={stopEdit}
                  inputMode='numeric'
                  maxLength={5}
                  className={`w-20 rounded border bg-black/30 px-1 py-1 text-lg backdrop-blur-sm outline-none placeholder:text-neutral-400 ${attempted && !expiryOk ? 'border-red-400 ring-2 ring-red-400/50' : 'border-white/10'}`}
                  placeholder='MM/YY'
                />
              ) : (
                <button
                  type='button'
                  onClick={() => startEdit('expiry')}
                  className={`text-left text-lg ${attempted && !expiryOk ? 'text-red-300' : 'text-white/95'}`}
                  title='유효기간 수정'
                >
                  {expiry || 'MM/YY'}
                </button>
              )}
            </div>
            <div className='flex flex-col'>
              <span className='mb-1 text-xs text-neutral-300'>CVC</span>
              {editing === 'cvc' ? (
                <input
                  ref={inputRef}
                  value={cvc}
                  onChange={e => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  onBlur={stopEdit}
                  inputMode='numeric'
                  maxLength={4}
                  className={`w-16 rounded border bg-black/30 px-1 py-1 text-lg backdrop-blur-sm outline-none placeholder:text-neutral-400 ${attempted && !cvcOk ? 'border-red-400 ring-2 ring-red-400/50' : 'border-white/10'}`}
                  placeholder='***'
                />
              ) : (
                <button
                  type='button'
                  onClick={() => startEdit('cvc')}
                  className={`text-left text-lg tracking-widest ${attempted && !cvcOk ? 'text-red-300' : 'text-white/95'}`}
                  title='CVC 수정'
                >
                  {cvc.replace(/\d/g, '•') || '***'}
                </button>
              )}
            </div>
          </div>
          {attempted && !expiryOk && (
            <p className='mt-1 text-xs text-red-300'>유효기간을 MM/YY 형식으로 입력해주세요.</p>
          )}
          {attempted && !cvcOk && (
            <p className='mt-1 text-xs text-red-300'>CVC 3~4자리를 입력해주세요.</p>
          )}

          {/* 소유자 */}
          <div className='relative z-10 mt-4'>
            <span className='mb-1 block text-xs text-neutral-300'>CARD HOLDER</span>
            {editing === 'holder' ? (
              <input
                ref={inputRef}
                value={holder}
                onChange={e => setHolder(e.target.value.slice(0, 30))}
                onBlur={stopEdit}
                className={`w-full rounded border bg-black/30 px-2 py-2 text-lg backdrop-blur-sm outline-none placeholder:text-neutral-400 ${attempted && !holderOk ? 'border-red-400 ring-2 ring-red-400/50' : 'border-white/10'}`}
                placeholder='이름 입력'
                autoCapitalize='characters'
              />
            ) : (
              <button
                type='button'
                onClick={() => startEdit('holder')}
                className={`w-full text-left text-lg tracking-wide ${attempted && !holderOk ? 'text-red-300' : 'text-white/95'}`}
                title='카드소유자명 수정'
              >
                {holder || '이름 입력'}
              </button>
            )}
          </div>
          {attempted && !holderOk && (
            <p className='mt-1 text-xs text-red-300'>소유자명을 두 글자 이상 입력해주세요.</p>
          )}
        </div>
      </div>
      {/* 안내 메시지 */}
      <div className='mb-6 text-center'>
        <div className='mb-2 text-4xl'>💳</div>
        <p className='text-sm text-gray-600'>
          위 카드 정보가 맞는지 확인 후 확인 버튼을 눌러주세요
        </p>
      </div>

      {/* 버튼 영역 */}
      <div className='space-y-2'>
        <Button
          type='button'
          id='btnCardConfirm'
          className={`w-full ${canConfirm ? '' : 'opacity-60'} `}
          onClick={handleCardConfirm}
          disabled={submitting}
        >
          카드 등록
        </Button>
      </div>
    </div>
  );
};

export default CardRegistration;
