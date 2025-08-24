import { AuctionNotice } from '@/shared/ui';
import AuctionOvertakingAlert from './AuctionOvertakingAlert';
import useUserInfo from '@/entities/user/hooks/useUserInfo';
import useGetInfinityBidHistory from '../queries/useGetInfinityBidHistory';
import { useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';

interface Props {
  messages: {
    username: string;
    message: string;
    placedAt: string;
  }[];
}

const AuctionChatWindow = ({ messages }: Props) => {
  const { userInfo } = useUserInfo();
  const { auctionId } = useParams();
  const observerRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const {
    data: messagesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfinityBidHistory(auctionId || '');

  // 모든 페이지의 메시지를 하나의 배열로 합치고 역순으로 정렬
  const allMessages = messagesData?.pages?.flatMap(page => page.content || []).reverse() || [];

  // IntersectionObserver for infinite scroll (상단)
  useEffect(() => {
    if (!observerRef.current) return;
    const el = observerRef.current;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          // 현재 스크롤 높이 저장
          const container = scrollContainerRef.current;
          const prevScrollHeight = container?.scrollHeight || 0;

          fetchNextPage().then(() => {
            // 새 데이터 로드 후 스크롤 위치 조정
            if (container) {
              const newScrollHeight = container.scrollHeight;
              const scrollDiff = newScrollHeight - prevScrollHeight;
              container.scrollTop = scrollDiff;
            }
          });
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // 초기 로드 시 스크롤을 맨 아래로
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container && allMessages.length > 0) {
      // 초기에는 맨 아래로 스크롤
      container.scrollTop = container.scrollHeight;
    }
  }, [allMessages.length > 0]); // 첫 메시지가 로드되었을 때만

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <div
      ref={scrollContainerRef}
      className='chat-scroll relative flex min-h-0 flex-1 flex-col items-center gap-[10px] overflow-y-auto px-4 pt-3'
    >
      <div ref={observerRef} className='h-2 w-full flex-shrink-0' />
      {/* 메시지 목록 (역순으로 표시) */}
      {allMessages.map((item, index) => (
        <AuctionNotice
          key={`${item.placedAt}-${index}`} // 고유한 키 생성
          notice={item.message}
          isMine={item.username === userInfo?.nickname}
        />
      ))}
      {messages.map(item => (
        <AuctionNotice
          key={`${item.message} - ${item.placedAt}`}
          notice={item.message}
          isMine={item.username === userInfo?.username}
        />
      ))}
      <AuctionOvertakingAlert />
    </div>
  );
};

export default AuctionChatWindow;
