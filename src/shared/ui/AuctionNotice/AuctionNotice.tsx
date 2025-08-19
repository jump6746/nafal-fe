import { cva } from 'class-variance-authority';
import { cn } from '@/shared/lib';

interface AuctionNoticeProps {
  notice: string;
  isMine: boolean;
}

const noticeVariants = cva(
  'flex items-center gap-2 text-base font-medium rounded-lg px-3 py-[10px]',
  {
    variants: {
      isMine: {
        true: 'bg-gray-900 text-white',
        false: 'bg-white text-gray-900',
      },
    },
  }
);

const AuctionNotice = ({ notice, isMine }: AuctionNoticeProps) => {
  return (
    <div
      className={cn(
        'inline-block rounded-lg p-[1px]',
        'bg-[conic-gradient(from_180deg_at_50%_50%,#FFF_0deg,rgba(145,196,188,0.3)_65deg,#91C4BC_131.5384590625763deg,rgba(145,196,188,0.3)_165deg,#FFF_192.11538791656494deg,rgba(145,196,188,0.3)_245deg,#91C4BC_295.96153020858765deg,rgba(145,196,188,0.3)_330deg,#FFF_360deg)]'
      )}
    >
      <div className={noticeVariants({ isMine })}>
        <span>{notice}</span>
      </div>
    </div>
  );
};

export default AuctionNotice;
