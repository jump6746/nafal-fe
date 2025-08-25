import { AuctionNotice } from '@/shared/ui';
import AuctionOvertakingAlert from './AuctionOvertakingAlert';
import useUserInfo from '@/entities/user/hooks/useUserInfo';
import useGetInfinityBidHistory from '../queries/useGetInfinityBidHistory';
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState, type JSX } from 'react';

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
  const [myHighestBid, setMyHighestBid] = useState<number>(0);
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
    const container = scrollContainerRef.current;
    if (container && allMessages.length > 0) {
      // 초기에는 맨 아래로 스크롤
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]); // 첫 메시지가 로드되었을 때만

  // 내 최고 입찰가 계산
  useEffect(() => {
    let maxBid = 0;
    [...allMessages, ...messages].forEach(item => {
      if (item.username && item.username === userInfo?.username) {
        const text = item.message;
        const itemPrice = parseInt((text.match(/[\d,]+/) || ['0'])[0].replace(/,/g, ''));
        if (itemPrice > maxBid) {
          maxBid = itemPrice;
        }
      }
    });
    setMyHighestBid(maxBid);
  }, [allMessages, messages, userInfo?.username]);

  // 메시지를 렌더링하는 함수
  const renderMessages = (messageList: typeof allMessages, keyPrefix: string) => {
    const elements: JSX.Element[] = [];

    messageList.forEach((item, index) => {
      const text = item.message;
      // 메시지가 문자열이고 숫자 패턴이 있는 경우만 가격 추출
      const itemPrice =
        typeof text === 'string' && text.match(/[\d,]+/)
          ? parseInt((text.match(/[\d,]+/) || ['0'])[0].replace(/,/g, ''))
          : 0;
      // username이 있는 경우만 내 메시지 여부 확인
      const isMyMessage = !!item.username && item.username === userInfo?.username;

      // 메시지 렌더링
      elements.push(
        <AuctionNotice
          key={`${keyPrefix}-${item.placedAt}-${index}`}
          notice={item.message}
          isMine={isMyMessage}
        />
      );

      // 입찰 메시지인 경우만 추가 로직 처리
      if (isMyMessage && itemPrice > 0 && itemPrice < myHighestBid) {
        // 내 이후 메시지들 중에서 더 높은 입찰이 있는지 확인
        const laterMessages = messageList.slice(index + 1);
        const hasHigherBid = laterMessages.some(laterItem => {
          // username이 없거나 내 메시지면 제외
          if (!laterItem.username || laterItem.username === userInfo?.username) return false;

          // 메시지가 문자열이고 숫자 패턴이 있는 경우만 처리
          if (typeof laterItem.message === 'string' && laterItem.message.match(/[\d,]+/)) {
            const laterPrice = parseInt(
              (laterItem.message.match(/[\d,]+/) || ['0'])[0].replace(/,/g, '')
            );
            return laterPrice > itemPrice;
          }
          return false;
        });

        if (hasHigherBid) {
          elements.push(
            <AuctionOvertakingAlert key={`alert-${keyPrefix}-${item.placedAt}-${index}`} />
          );
        }
      }
    });

    return elements;
  };

  return (
    <div
      ref={scrollContainerRef}
      className='chat-scroll relative flex min-h-0 flex-1 flex-col items-center gap-[10px] overflow-y-auto px-4 pt-3'
    >
      <div ref={observerRef} className='h-2 w-full flex-shrink-0' />
      {/* 기존 메시지들 */}
      {renderMessages(allMessages, 'history')}

      {/* 실시간 메시지들 */}
      {renderMessages(messages, 'realtime')}
    </div>
  );
};

export default AuctionChatWindow;
