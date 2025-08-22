import { useCallback, useEffect, useRef, useState } from 'react';

interface WebSocketMessage {
  type:
    | 'ready'
    | 'status'
    | 'message'
    | 'sent'
    | 'error'
    | 'subscribed'
    | 'unsubscribed'
    | 'subscriptions'
    | 'channelMessage'
    | 'subscriptionUpdate';
  data: {
    message?: unknown;
    status?: string;
    url?: string;
    activeTabs?: number;
    code?: number;
    reason?: string;
    success?: boolean;
    timestamp?: string;

    // 채널 관련
    channel?: string;
    messageType?: string;
    originalMessage?: unknown;
    subscribedChannels?: string[];
    totalSubscriptions?: number;
    channelListeners?: number;
    action?: 'subscribed' | 'unsubscribed';
    channelDetails?: Record<string, { listenerCount: number; isListening: boolean }>;
  };
}

interface ChannelMessage {
  channel: string;
  messageType: string;
  message: unknown;
  timestamp: string;
  originalMessage: unknown;
}

interface UseSharedWebSocketReturn {
  status: string;
  activeTabs: number;
  isReady: boolean;
  error: string | null;
  lastMessage: unknown;
  subscribedChannels: string[];
  totalSubscriptions: number;

  // 기본 WebSocket 기능
  connect: (url: string) => void;
  disconnect: () => void;
  sendMessage: (message: string | object) => void;
  getStatus: () => void;

  // 채널 구독 기능
  subscribe: (channel: string) => void;
  unsubscribe: (channel: string) => void;
  getSubscriptions: () => void;
  isSubscribed: (channel: string) => boolean;

  // 채널 메시지 리스너
  onChannelMessage: (callback: (message: ChannelMessage) => void) => () => void;
}

const useWebSocket = (): UseSharedWebSocketReturn => {
  const workerRef = useRef<SharedWorker | null>(null);
  const portRef = useRef<MessagePort | null>(null);
  const channelMessageCallbacks = useRef<Set<(message: ChannelMessage) => void>>(new Set());

  const [status, setStatus] = useState<string>('disconnected');
  const [activeTabs, setActiveTabs] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastMessage, setLastMessage] = useState<unknown>(null);
  const [subscribedChannels, setSubscribedChannels] = useState<string[]>([]);
  const [totalSubscriptions, setTotalSubscriptions] = useState<number>(0);

  // Worker 메시지 처리
  const handleWorkerMessage = useCallback((event: MessageEvent) => {
    const { type, data }: WebSocketMessage = event.data;

    console.log('📨 Worker 메시지 수신:', type, data);

    switch (type) {
      case 'ready':
        console.log('✅ Worker 준비 완료');
        setIsReady(true);
        setStatus(data.status || 'disconnected');
        setActiveTabs(data.activeTabs || 0);
        setSubscribedChannels(data.subscribedChannels || []);
        setTotalSubscriptions(data.subscribedChannels?.length || 0);
        setError(null);
        console.log('📊 초기 상태:', {
          status: data.status,
          activeTabs: data.activeTabs,
          subscribedChannels: data.subscribedChannels,
        });
        break;

      case 'status':
        console.log('📊 상태 변경:', data.status);
        setStatus(data.status || 'disconnected');
        setActiveTabs(data.activeTabs || 0);

        if (data.subscribedChannels) {
          setSubscribedChannels(data.subscribedChannels);
          setTotalSubscriptions(data.subscribedChannels.length);
        }
        if (typeof data.totalSubscriptions === 'number') {
          setTotalSubscriptions(data.totalSubscriptions);
        }

        if (data.status === 'connected') {
          setError(null);
          console.log('🎉 WebSocket 연결 성공!');
        } else if (data.status === 'disconnected' && data.code) {
          console.log('🔌 WebSocket 연결 종료:', data.code, data.reason);
        }
        break;

      case 'message':
        console.log('📩 일반 메시지 수신:', data.message);
        setLastMessage(data.message);
        setError(null);
        break;

      case 'channelMessage':
        console.log(`📺 채널 메시지 수신 (${data.channel}):`, data.messageType);

        // 채널 메시지 콜백들 실행
        if (data.channel && data.timestamp) {
          const channelMessage: ChannelMessage = {
            channel: data.channel,
            messageType: data.messageType || 'message',
            message: data.message,
            timestamp: data.timestamp,
            originalMessage: data.originalMessage,
          };

          channelMessageCallbacks.current.forEach(callback => {
            try {
              callback(channelMessage);
            } catch (error) {
              console.error('❌ 채널 메시지 콜백 실행 실패:', error);
            }
          });
        } else {
          console.error('❌ 채널 메시지에 필수 필드가 없음:', data);
        }

        setError(null);
        break;

      case 'subscribed':
        console.log(`✅ 채널 구독 완료: ${data.channel}`);
        if (data.channel && !subscribedChannels.includes(data.channel)) {
          setSubscribedChannels(prev => [...prev, data.channel!]);
        }
        if (typeof data.totalSubscriptions === 'number') {
          setTotalSubscriptions(data.totalSubscriptions);
        }
        setError(null);
        break;

      case 'unsubscribed':
        console.log(`❌ 채널 구독 해제: ${data.channel}`);
        if (data.channel) {
          setSubscribedChannels(prev => prev.filter(ch => ch !== data.channel));
        }
        if (typeof data.totalSubscriptions === 'number') {
          setTotalSubscriptions(data.totalSubscriptions);
        }
        setError(null);
        break;

      case 'subscriptions':
        console.log('📋 구독 현황 업데이트:', data.subscribedChannels);
        setSubscribedChannels(data.subscribedChannels || []);
        setTotalSubscriptions(data.subscribedChannels?.length || 0);
        break;

      case 'subscriptionUpdate':
        console.log(`📺 다른 탭 구독 업데이트: ${data.action} - ${data.channel}`);

        if (data.action === 'subscribed' && data.channel) {
          setSubscribedChannels(prev =>
            prev.includes(data.channel!) ? prev : [...prev, data.channel!]
          );
        } else if (data.action === 'unsubscribed' && data.channel) {
          setSubscribedChannels(prev => prev.filter(ch => ch !== data.channel));
        }

        if (typeof data.totalSubscriptions === 'number') {
          setTotalSubscriptions(data.totalSubscriptions);
        }
        break;

      case 'sent':
        console.log('📤 메시지 전송 완료');
        setError(null);
        break;

      case 'error':
        console.error('❌ 에러 수신:', data.message);
        setError(typeof data.message === 'string' ? data.message : 'Unknown error');
        break;

      default:
        console.warn('⚠️ 알 수 없는 메시지 타입:', type);
    }
  }, []);

  // Worker 초기화
  useEffect(() => {
    console.log('🔄 채널 구독 기능이 포함된 useWebSocket Hook 초기화');

    try {
      console.log('🚀 Shared Worker 생성 시도');
      workerRef.current = new SharedWorker('/websocket-worker.js');
      portRef.current = workerRef.current.port;
      console.log('✅ Shared Worker 인스턴스 생성 완료');

      portRef.current.onmessage = handleWorkerMessage;
      portRef.current.onmessageerror = (error: MessageEvent) => {
        console.error('❌ 포트 메시지 에러:', error);
        setError('포트 통신 오류가 발생했습니다');
      };

      workerRef.current.onerror = (error: ErrorEvent) => {
        console.error('❌ Worker 에러:', error);
        setError(`Worker 오류: ${error.message}`);
      };

      portRef.current.start();
      console.log('✅ Worker 초기화 완료');
    } catch (error) {
      console.error('❌ Worker 초기화 실패:', error);
      setError(`Worker 초기화 실패: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    return () => {
      console.log('🧹 Hook 정리');
      if (portRef.current) {
        try {
          portRef.current.close();
        } catch (closeError) {
          console.error('❌ 포트 해제 실패:', closeError);
        }
      }
      workerRef.current = null;
      portRef.current = null;
      channelMessageCallbacks.current.clear();
      console.log('✅ Hook 정리 완료');
    };
  }, [handleWorkerMessage]);

  // 기본 WebSocket 기능들
  const connect = useCallback(
    (url: string) => {
      console.log('🔗 연결 요청:', url);

      if (!portRef.current) {
        console.error('❌ 포트가 없음');
        setError('Worker 포트가 초기화되지 않았습니다');
        return;
      }

      if (!isReady) {
        console.warn('⚠️ Worker가 아직 준비되지 않음');
        setError('Worker가 아직 준비되지 않았습니다');
        return;
      }

      if (!url?.trim()) {
        console.error('❌ 유효하지 않은 URL');
        setError('유효한 WebSocket URL을 입력해주세요');
        return;
      }

      try {
        portRef.current.postMessage({
          type: 'connect',
          data: { url: url.trim() },
        });
        console.log('✅ 연결 메시지 전송 완료');
        setError(null);
      } catch (error) {
        console.error('❌ 연결 메시지 전송 실패:', error);
        setError('연결 요청 전송에 실패했습니다');
      }
    },
    [isReady]
  );

  const disconnect = useCallback(() => {
    console.log('🔌 연결 해제 요청');

    if (!portRef.current) {
      console.warn('⚠️ 포트가 없어서 해제 요청 불가');
      return;
    }

    try {
      portRef.current.postMessage({
        type: 'disconnect',
        data: {},
      });
      console.log('✅ 해제 메시지 전송 완료');
      setError(null);
    } catch (error) {
      console.error('❌ 해제 메시지 전송 실패:', error);
      setError('연결 해제 요청에 실패했습니다');
    }
  }, []);

  const sendMessage = useCallback(
    (message: string | object) => {
      console.log('📤 메시지 전송 시도:', message);

      if (!portRef.current) {
        console.error('❌ 포트가 없음');
        setError('Worker 포트가 없습니다');
        return;
      }

      if (status !== 'connected') {
        console.warn('⚠️ WebSocket이 연결되지 않음, 현재 상태:', status);
        setError(`WebSocket이 연결되지 않았습니다 (현재: ${status})`);
        return;
      }

      if (!message || (typeof message === 'string' && !message.trim())) {
        console.warn('⚠️ 빈 메시지');
        setError('전송할 메시지를 입력해주세요');
        return;
      }

      try {
        portRef.current.postMessage({
          type: 'send',
          data: { message: typeof message === 'string' ? message.trim() : message },
        });
        console.log('✅ 메시지 전송 요청 완료');
        setError(null);
      } catch (error) {
        console.error('❌ 메시지 전송 실패:', error);
        setError('메시지 전송에 실패했습니다');
      }
    },
    [status]
  );

  const getStatus = useCallback(() => {
    console.log('📊 상태 확인 요청');

    if (!portRef.current) {
      console.warn('⚠️ 포트가 없어서 상태 확인 불가');
      return;
    }

    try {
      portRef.current.postMessage({
        type: 'status',
        data: {},
      });
      console.log('✅ 상태 확인 요청 완료');
    } catch (error) {
      console.error('❌ 상태 확인 요청 실패:', error);
      setError('상태 확인 요청에 실패했습니다');
    }
  }, []);

  // 채널 구독 기능들
  const subscribe = useCallback(
    (channel: string) => {
      console.log(`📺 채널 구독 요청: ${channel}`);

      if (!portRef.current) {
        console.error('❌ 포트가 없음');
        setError('Worker 포트가 없습니다');
        return;
      }

      if (!channel?.trim()) {
        console.error('❌ 유효하지 않은 채널명');
        setError('유효한 채널명을 입력해주세요');
        return;
      }

      if (subscribedChannels.includes(channel.trim())) {
        console.warn('⚠️ 이미 구독된 채널:', channel);
        setError('이미 구독된 채널입니다');
        return;
      }

      try {
        portRef.current.postMessage({
          type: 'subscribe',
          data: { channel: channel.trim() },
        });
        console.log('✅ 채널 구독 요청 완료');
        setError(null);
      } catch (error) {
        console.error('❌ 채널 구독 요청 실패:', error);
        setError('채널 구독 요청에 실패했습니다');
      }
    },
    [subscribedChannels]
  );

  const unsubscribe = useCallback(
    (channel: string) => {
      console.log(`📺 채널 구독 해제 요청: ${channel}`);

      if (!portRef.current) {
        console.error('❌ 포트가 없음');
        setError('Worker 포트가 없습니다');
        return;
      }

      if (!channel?.trim()) {
        console.error('❌ 유효하지 않은 채널명');
        setError('유효한 채널명을 입력해주세요');
        return;
      }

      if (!subscribedChannels.includes(channel.trim())) {
        console.warn('⚠️ 구독되지 않은 채널:', channel);
        setError('구독되지 않은 채널입니다');
        return;
      }

      try {
        portRef.current.postMessage({
          type: 'unsubscribe',
          data: { channel: channel.trim() },
        });
        console.log('✅ 채널 구독 해제 요청 완료');
        setError(null);
      } catch (error) {
        console.error('❌ 채널 구독 해제 요청 실패:', error);
        setError('채널 구독 해제 요청에 실패했습니다');
      }
    },
    [subscribedChannels]
  );

  const getSubscriptions = useCallback(() => {
    console.log('📋 구독 현황 조회 요청');

    if (!portRef.current) {
      console.warn('⚠️ 포트가 없어서 구독 현황 조회 불가');
      return;
    }

    try {
      portRef.current.postMessage({
        type: 'getSubscriptions',
        data: {},
      });
      console.log('✅ 구독 현황 조회 요청 완료');
    } catch (error) {
      console.error('❌ 구독 현황 조회 요청 실패:', error);
      setError('구독 현황 조회 요청에 실패했습니다');
    }
  }, []);

  const isSubscribed = useCallback(
    (channel: string) => {
      return subscribedChannels.includes(channel);
    },
    [subscribedChannels]
  );

  // 채널 메시지 리스너 등록/해제
  const onChannelMessage = useCallback((callback: (message: ChannelMessage) => void) => {
    console.log('🎧 채널 메시지 리스너 등록');
    channelMessageCallbacks.current.add(callback);

    // 리스너 해제 함수 반환
    return () => {
      console.log('🎧 채널 메시지 리스너 해제');
      channelMessageCallbacks.current.delete(callback);
    };
  }, []);

  // 디버그용 로그
  useEffect(() => {
    console.log('🔍 Hook 상태 변경:', {
      status,
      activeTabs,
      isReady,
      error: !!error,
      subscribedChannels: subscribedChannels.length,
      totalSubscriptions,
      hasLastMessage: !!lastMessage,
    });
  }, [status, activeTabs, isReady, error, subscribedChannels, totalSubscriptions, lastMessage]);

  return {
    // 상태
    status,
    activeTabs,
    isReady,
    error,
    lastMessage,
    subscribedChannels,
    totalSubscriptions,

    // 기본 WebSocket 기능
    connect,
    disconnect,
    sendMessage,
    getStatus,

    // 채널 구독 기능
    subscribe,
    unsubscribe,
    getSubscriptions,
    isSubscribed,

    // 채널 메시지 리스너
    onChannelMessage,
  };
};

export default useWebSocket;
