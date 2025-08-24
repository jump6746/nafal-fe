import { useNavigate } from 'react-router-dom';
import { AlarmClock } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

interface AuctionListCardProps {
  auctionId: string;
  eventId: string;
  immediatelyPurchasePrice?: number;
  currentPrice: number;
  productName: string;
  url: string;
  endAt: string;
  sellerName: string;
  isImminent: boolean;
  bidCnt: number;
}

const AuctionListCard = ({
  auctionId,
  eventId,
  immediatelyPurchasePrice,
  currentPrice,
  productName,
  url,
  endAt,
  sellerName,
  isImminent,
  bidCnt,
}: AuctionListCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className='flex h-fit w-full cursor-pointer flex-col gap-[6px] bg-white'
      onClick={() => {
        navigate(`/auction/${eventId}/${auctionId}`);
      }}
    >
      {isImminent && (
        <div className='flex flex-row items-center gap-[2px]'>
          <AlarmClock size={16} className='text-sub-b-400' />
          <span className='text-sub-b-400 text-xs font-medium'>
            <CountdownTimer endDate={endAt} /> 남았어요
          </span>
        </div>
      )}
      <div className='relative aspect-square w-full'>
        <img
          src={url}
          alt={productName}
          className='aspect-square w-full rounded-2xl object-cover'
        />
        <div className='text-point-100 absolute top-[10px] left-2 h-fit w-fit rounded-full bg-gray-900 px-[6px] py-1 text-xs font-medium sm:px-[10px] sm:text-sm'>
          {bidCnt}건 입찰
        </div>
      </div>
      <div className='flex flex-col gap-1 pl-[2px]'>
        <div className='flex flex-col'>
          <span className='truncate text-sm font-semibold text-gray-900 sm:text-base'>
            {sellerName}
          </span>
          <span className='truncate text-xs font-medium text-gray-900 sm:text-sm'>
            {productName}
          </span>
        </div>
        <div className='flex flex-col'>
          <div className='flex flex-row items-center gap-[6px]'>
            <span className='text-xs text-gray-600'>현재가</span>
            <span className='text-sm font-semibold text-gray-900 sm:text-base'>
              {currentPrice.toLocaleString()}원
            </span>
          </div>
          <div className='mt-[-3px] flex flex-row items-center gap-[6px]'>
            <span className='text-xs text-gray-600'>즉시구매가</span>
            <span className='text-sm font-semibold text-gray-900 sm:text-base'>
              {immediatelyPurchasePrice ? immediatelyPurchasePrice.toLocaleString() + '원' : '-'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionListCard;
