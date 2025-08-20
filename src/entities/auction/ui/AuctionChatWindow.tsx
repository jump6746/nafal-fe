import { AuctionNotice } from '@/shared/ui';
import AuctionOvertakingAlert from './AuctionOvertakingAlert';

const messages = [
  {
    id: 1,
    content: '김쫑명님이 12,000원 입찰했어요',
    isMine: false,
  },
  {
    id: 2,
    content: '한째서님이 13,000원 입찰했어요',
    isMine: false,
  },
  {
    id: 3,
    content: '배썽훈님이 14,000원 입찰했어요',
    isMine: false,
  },
  {
    id: 4,
    content: '윤호빈님이 15,000원 입찰했어요',
    isMine: false,
  },
  {
    id: 5,
    content: '박다영님이 16,000원 입찰했어요',
    isMine: false,
  },
  {
    id: 6,
    content: '최승준님이 17,000원 입찰했어요',
    isMine: false,
  },
  {
    id: 7,
    content: '오현민님이 18,000원 입찰했어요',
    isMine: false,
  },
  {
    id: 8,
    content: '정유진님이 19,000원 입찰했어요',
    isMine: false,
  },
  {
    id: 9,
    content: '이상혁님이 20,000원 입찰했어요',
    isMine: false,
  },
  {
    id: 10,
    content: '나는박성문이아닙니다다진짜에요님이 12,121,000원 입찰했어요',
    isMine: true,
  },
];

const AuctionChatWindow = () => {
  return (
    <div className='chat-scroll relative flex min-h-0 flex-1 flex-col items-center gap-[10px] overflow-y-auto px-4 pt-3'>
      {messages.map(message => (
        <AuctionNotice key={message.id} notice={message.content} isMine={message.isMine} />
      ))}
      <AuctionOvertakingAlert />
    </div>
  );
};

export default AuctionChatWindow;
