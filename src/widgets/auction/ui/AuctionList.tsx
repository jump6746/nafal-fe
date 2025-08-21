import AuctionListCard from '@/features/auction/AuctionListCard';

interface AuctionItem {
  productId: number;
  immediatelyPurchasePrice: number;
  currentPrice: number;
  productName: string;
  url: string;
  endAt: string;
  sellerName: string;
  isImminent: boolean;
  bidCnt: number;
}

interface AuctionListProps {
  data: AuctionItem[];
}

const AuctionList = ({ data }: AuctionListProps) => {
  return (
    <div className='grid grid-cols-2 gap-x-[16px] gap-y-[28px]'>
      {data.map(item => (
        <AuctionListCard
          key={item.productId}
          productId={item.productId}
          immediatelyPurchasePrice={item.immediatelyPurchasePrice}
          currentPrice={item.currentPrice}
          productName={item.productName}
          url={item.url}
          endAt={item.endAt}
          sellerName={item.sellerName}
          isImminent={item.isImminent}
          bidCnt={item.bidCnt}
        />
      ))}
    </div>
  );
};

export default AuctionList;
