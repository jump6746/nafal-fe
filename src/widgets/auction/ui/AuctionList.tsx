import AuctionListCard from '@/features/auction/AuctionListCard';
import type { AuctionListItem } from '@/entities/auction/type/types';

export interface AuctionListProps {
  data: AuctionListItem[];
  isImminent: boolean;
}

const AuctionList = ({ data, isImminent }: AuctionListProps) => {
  return (
    <div className='grid grid-cols-2 gap-x-[16px] gap-y-[28px]'>
      {data.map(item => (
        <AuctionListCard
          key={item.productId}
          productId={item.productId}
          immediatelyPurchasePrice={item.immediatelyPurchasePrice}
          currentPrice={item.currentPrice}
          productName={item.productName}
          url={item.imgUrl}
          endAt={item.endAt}
          sellerName={item.sellerName}
          isImminent={isImminent}
          bidCnt={item.bidCnt}
        />
      ))}
    </div>
  );
};

export default AuctionList;
