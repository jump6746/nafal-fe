import { useSockJS } from '@/shared/hooks';
import { customToast, Toaster } from '@/shared/ui';
import { useEffect, useRef } from 'react';
import { RouterProvider } from 'react-router-dom';
import AppRouter from '../AppRouter';
import useAuthStore from '@/shared/stores/useAuthStore';

const SocketWrapper = () => {
  const { isReady, connect, status, subscribe, onChannelMessage } = useSockJS();
  const { token } = useAuthStore();

  // 연결 시도 여부를 추적하는 ref
  const connectionAttempted = useRef(false);
  const subscriptionAttempted = useRef(false);

  // 1. SockJS 연결 (한 번만 실행)
  useEffect(() => {
    // 이미 연결을 시도했거나, 토큰이 없거나, Worker가 준비되지 않았으면 리턴
    if (!token || connectionAttempted.current || !isReady) {
      return;
    }

    // 연결되지 않은 상태에서만 연결 시도
    if (status === 'disconnected') {
      console.log('🔗 SockJS 연결 시도...');
      connectionAttempted.current = true; // 연결 시도 기록
      connect(`https://api.nafal.site/ws?token=${token}`);
    }
  }, [token, isReady, status, connect]);

  // 2. 연결 완료 후 알림 채널 구독 (한 번만 실행)
  useEffect(() => {
    // 이미 구독을 시도했거나, 연결되지 않았으면 리턴
    if (subscriptionAttempted.current || status !== 'connected') {
      return;
    }

    console.log('📺 알림 채널 구독...');
    subscriptionAttempted.current = true; // 구독 시도 기록
    subscribe('/user/queue/notifications');
  }, [status, subscribe]);

  // 알림 메시지 처리
  useEffect(() => {
    const unsubscribe = onChannelMessage(message => {
      if (message.channel === '/user/queue/notifications') {
        const notification = message.message as {
          id: number;
          content: string;
          notificationType:
            | 'TICKET_ACQUIRED'
            | 'DRAW_WIN'
            | 'DRAW_LOSE'
            | 'AUCTION_WIN'
            | 'AUCTION_LOSE';
          relatedUrl: string;
          createdAt: string;
        };

        // 알림 타입별 처리
        switch (notification.notificationType) {
          case 'TICKET_ACQUIRED':
            customToast.alarm(`${notification.content}`);
            break;
          case 'DRAW_WIN':
            customToast.alarm(`${notification.content}`);
            break;
          case 'DRAW_LOSE':
            customToast.alarm(`${notification.content}`);
            break;
          case 'AUCTION_WIN':
            customToast.alarm(`${notification.content}`);
            break;
          case 'AUCTION_LOSE':
            customToast.alarm(`${notification.content}`);
            break;
          default:
            customToast.alarm(notification.content);
        }
      }
    });

    return unsubscribe;
  }, [onChannelMessage]);

  return (
    <>
      <RouterProvider router={AppRouter} />
      <Toaster />
    </>
  );
};

export default SocketWrapper;
