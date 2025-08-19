import { useCallback, useEffect, useRef, useState } from 'react';

interface WebSocketMessage {
  type: 'ready' | 'status' | 'message' | 'sent' | 'error';
  data: {
    message?: string;
    status?: string;
    url?: string;
    activeTabs?: number;
    code?: number;
    reason?: string;
    success?: boolean;
    timestamp?: string;
  };
}

interface UseSharedWebSocketReturn {
  status: string;
  activeTabs: number;
  isReady: boolean;
  connect: (url: string) => void;
  disconnect: () => void;
  sendMessage: (message: string) => void;
  getStatus: () => void;
}

const useWebSocket = (): UseSharedWebSocketReturn => {
  const workerRef = useRef<SharedWorker | null>(null);
  const portRef = useRef<MessagePort | null>(null);

  const [status, setStatus] = useState<string>('disconnected');
  const [activeTabs, setActiveTabs] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);

  // Worker 메시지 처리
  const handleWorkerMessage = useCallback((event: MessageEvent) => {
    const { type, data }: WebSocketMessage = event.data;

    console.log('Worker 메시지:', type, data);

    switch (type) {
      case 'ready':
        setIsReady(true);
        setStatus(data.status || 'disconnected');
        setActiveTabs(data.activeTabs || 0);
        console.log('✅ Worker 준비 완료:', data.message);
        break;

      case 'status':
        setStatus(data.status || 'disconnected');
        setActiveTabs(data.activeTabs || 0);
        console.log('📊 상태 변경:', data.status);
        break;

      case 'message':
        console.log('📩 받은 메시지:', data.message);
        break;

      case 'sent':
        console.log('📤 메시지 전송 완료');
        break;

      case 'error':
        console.error('❌ 에러:', data.message);
        break;
    }
  }, []);

  // Worker 초기화
  useEffect(() => {
    try {
      console.log('🔄 Shared Worker 초기화 중...');

      // 1. Shared Worker 인스턴스 생성 - public 폴더의 worker 파일 로드
      workerRef.current = new SharedWorker('/websocket-worker.js');

      // 2. 통신용 포트 가져오기 - 각 탭마다 고유한 포트로 Worker와 통신
      portRef.current = workerRef.current.port;

      // 3. 메시지 수신 핸들러 등록 - Worker에서 오는 모든 메시지 처리
      portRef.current.onmessage = handleWorkerMessage;

      // 4. 메시지 에러 핸들러 등록 - MessagePort는 onmessageerror만 지원
      portRef.current.onmessageerror = (error: MessageEvent) => {
        console.error('❌ Worker 메시지 에러:', error);
      };

      // 5. 포트 시작 - 필수! 이걸 안하면 메시지 송수신 안됨
      portRef.current.start();
    } catch (error) {
      console.error('❌ Worker 초기화 실패:', error);
    }

    // 6. 정리 함수 - 컴포넌트 언마운트시 포트 연결 해제
    return () => {
      if (portRef.current) {
        portRef.current.close();
      }
    };
  }, [handleWorkerMessage]);

  // WebSocket 연결
  const connect = useCallback(
    (url: string) => {
      if (!portRef.current || !isReady) {
        console.warn('⚠️ Worker가 준비되지 않았습니다');
        return;
      }

      console.log('🔗 연결 시도:', url);
      portRef.current.postMessage({
        type: 'connect',
        data: { url },
      });
    },
    [isReady]
  );

  // WebSocket 연결 해제
  const disconnect = useCallback(() => {
    if (!portRef.current) return;

    console.log('🔌 연결 해제');
    portRef.current.postMessage({
      type: 'disconnect',
      data: {},
    });
  }, []);

  // 메시지 전송
  const sendMessage = useCallback(
    (message: string) => {
      if (!portRef.current || status !== 'connected') {
        console.warn('⚠️ WebSocket이 연결되지 않았습니다');
        return;
      }

      console.log('📤 메시지 전송:', message);
      portRef.current.postMessage({
        type: 'send',
        data: { message },
      });
    },
    [status]
  );

  // 상태 확인
  const getStatus = useCallback(() => {
    if (!portRef.current) return;

    portRef.current.postMessage({
      type: 'status',
      data: {},
    });
  }, []);

  return {
    status,
    activeTabs,
    isReady,
    connect,
    disconnect,
    sendMessage,
    getStatus,
  };
};

export default useWebSocket;
