let websocket = null;

const connectedPorts = new Set();

// "disconnected", "connectiong", "connected", "disconnected", "error"
let connectionStatus = 'disconnected';

let websocketUrl = null;

console.log('Websocket 관리하는 Shared Worker 실행');

// 새로운 탭 연결 처리
self.onconnect = function (event) {
  const port = event.ports[0];

  // 포트를 연결 목록에 추가
  connectedPorts.add(port);
  console.log(`새 탭 연결, 총 연결된 포트 개수 : ${connectedPorts.size}`);

  // 포트에서 메시지 수신 처리
  port.onmessage = function (e) {
    const { type, data } = e.data;

    switch (type) {
      case 'connect':
        connectWebSocket(data.url, port);
        break;

      case 'disconnect':
        disconnectWebSocket(port);
        break;

      case 'send':
        sendMessage(data.message, port);
        break;

      case 'status':
        sendStatus(port);
        break;

      default:
        console.warn('알 수 없는 메시지 타입: ', type);
    }
  };

  // 포트 종료 처리
  port.onclose = function () {
    connectedPorts.delete(port);
    console.log(`탭 연결 해재 됨, 남은 연결 포트 개수 : ${connectedPorts.size}`);

    if (connectedPorts.size === 0) {
      console.log('모든 탭이 닫혔으므로 Websocket 정리');
      cleanup();
    }
  };

  // 포트 시작
  port.start();

  // 연결 완료 알림
  port.postMessage({
    type: 'ready',
    data: {
      message: 'Shared Worker에 연결되었습니다.',
      status: connectionStatus,
      activeTabs: connectedPorts.size,
    },
  });
};

// Websocket 연결
function connectWebSocket(url, requestingPort) {
  // URL이 없을 시 에러
  if (!url) {
    requestingPort.postMessage({
      type: 'error',
      data: { message: 'WebSocket URL이 필요합니다.' },
    });

    return;
  }

  // 이미 같은 URL로 연결되어 있으면 상태만 전송
  if (websocket && websocketUrl === url && websocket.readyState === WebSocket.OPEN) {
    requestingPort.postMessage({
      type: 'status',
      data: { status: 'connected', url: url },
    });

    return;
  }

  // 기존 연결이 있으면 정리
  if (websocket) {
    cleanup();
  }

  websocketUrl = url;
  connectionStatus = 'connecting';

  // 모든 포트에 연결 시작 알림
  broadcastToAll({
    type: 'status',
    data: { status: 'connecting', url: url },
  });

  try {
    websocket = new WebSocket(url);

    websocket.onopen = function (event) {
      console.log('🎉 WebSocket 연결 성공: ', url);
      connectionStatus = 'connected';

      broadcastToAll({
        type: 'status',
        data: { status: 'connected', url: url },
      });
    };

    websocket.onmessage = function (event) {
      console.log('📩 WebSocket 메세지 수신: ', event.data);

      let messageData;

      try {
        messageData = JSON.parse(event.data);
      } catch (error) {
        messageData = event.data;
      }

      broadcastToAll({
        type: 'message',
        data: { message: messageData, timestamp: new Date().toISOString() },
      });
    };

    websocket.onclose = function (event) {
      console.log('🔌 WebSocket 연결 종료:', event.code, event.reason);
      connectionStatus = 'disconnected';

      broadcastToAll({
        type: 'status',
        data: {
          status: 'disconnected',
          code: event.code,
          reason: event.reason,
        },
      });
    };

    websocket.onerror = function (error) {
      console.error('❌ WebSocket 에러:', error);
      connectionStatus = 'error';

      broadcastToAll({
        type: 'error',
        data: { message: 'WebSocket 연결 오류가 발생했습니다' },
      });
    };
  } catch (error) {
    console.error('❌ WebSocket 생성 실패:', error);
    connectionStatus = 'error';

    requestingPort.postMessage({
      type: 'error',
      data: { message: 'WebSocket 생성에 실패했습니다' },
    });
  }
}

// WebSocket 연결 해제
function disconnectWebSocket(requestingPort) {
  if (websocket) {
    websocket.close(1000, 'User requested disconnect');
  }

  cleanup();

  requestingPort.postMessage({
    type: 'status',
    data: { status: 'disconnected' },
  });
}

// 메시지 전송
function sendMessage(message, requestingPort) {
  if (!websocket || websocket.readyState !== WebSocket.OPEN) {
    requestingPort.postMessage({
      type: 'error',
      data: { message: 'WebSocket이 연결되지 않았습니다' },
    });
    return;
  }

  try {
    const messageToSend = typeof message === 'string' ? message : JSON.stringify(message);
    websocket.send(messageToSend);

    requestingPort.postMessage({
      type: 'sent',
      data: { success: true, timestamp: new Date().toISOString() },
    });

    console.log('📤 메시지 전송 완료:', messageToSend);
  } catch (error) {
    console.error('❌ 메시지 전송 실패:', error);
    requestingPort.postMessage({
      type: 'error',
      data: { message: '메시지 전송에 실패했습니다' },
    });
  }
}

// 현재 상태 전송
function sendStatus(requestingPort) {
  requestingPort.postMessage({
    type: 'status',
    data: {
      status: connectionStatus,
      url: websocketUrl,
      activeTabs: connectedPorts.size,
    },
  });
}

// 모든 포트에 메시지 전송
function broadcastToAll(message) {
  connectedPorts.forEach(port => {
    try {
      port.postMessage(message);
    } catch (error) {
      console.error('포트 메시지 전송 실패:', error);
      // 실패한 포트는 제거
      connectedPorts.delete(port);
    }
  });
}

// WebSocket 정리
function cleanup() {
  if (websocket) {
    websocket.close();
    websocket = null;
  }

  websocketUrl = null;
  connectionStatus = 'disconnected';
}

// Worker 전역 에러 처리
self.onerror = function (error) {
  console.error('💥 Worker 전역 에러:', error);

  broadcastToAll({
    type: 'error',
    data: { message: 'Worker에서 오류가 발생했습니다' },
  });
};
