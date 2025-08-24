// SockJS 라이브러리 import
importScripts('https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.6.1/sockjs.min.js');

let sockjs = null;
const connectedPorts = new Set();

// 채널 관련 변수들 추가
const subscribedChannels = new Set();
const channelListeners = new Map();
const subscriptionIds = new Map(); // STOMP 구독 ID 관리

// "disconnected", "connecting", "connected", "disconnected", "error"
let connectionStatus = 'disconnected';
let sockjsUrl = null;

console.log('STOMP over SockJS 관리하는 Shared Worker 실행');

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
        connectSockJS(data.url, port);
        break;

      case 'disconnect':
        disconnectSockJS(port);
        break;

      case 'send':
        sendMessage(data.message, port);
        break;

      case 'subscribe':
        subscribeToChannel(data.channel, port);
        break;

      case 'unsubscribe':
        unsubscribeFromChannel(data.channel, port);
        break;

      case 'getSubscriptions':
        getSubscriptions(port);
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
    console.log(`탭 연결 해제됨, 남은 연결 포트 개수 : ${connectedPorts.size}`);

    // 포트의 모든 채널 구독 해제
    unsubscribePortFromAllChannels(port);

    if (connectedPorts.size === 0) {
      console.log('모든 탭이 닫혔으므로 SockJS 정리');
      cleanup();
    }
  };

  // 포트 시작
  port.start();

  // 연결 완료 알림 - subscribedChannels 정보 포함
  port.postMessage({
    type: 'ready',
    data: {
      message: 'Shared Worker에 연결되었습니다.',
      status: connectionStatus,
      activeTabs: connectedPorts.size,
      subscribedChannels: Array.from(subscribedChannels),
      totalSubscriptions: subscribedChannels.size,
    },
  });
};

// STOMP 프레임 파싱 함수
function parseSTOMPFrame(data) {
  if (typeof data !== 'string') {
    return null;
  }

  const lines = data.split('\n');
  if (lines.length < 2) {
    return null;
  }

  const command = lines[0];
  const headers = {};
  let bodyStartIndex = 1;

  // 헤더 파싱
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line === '') {
      bodyStartIndex = i + 1;
      break;
    }

    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex);
      const value = line.substring(colonIndex + 1);
      headers[key] = value;
    }
  }

  // 바디 파싱
  const bodyLines = lines.slice(bodyStartIndex);
  let body = bodyLines.join('\n');

  // null 문자 제거
  if (body.endsWith('\0')) {
    body = body.slice(0, -1);
  }

  // JSON 파싱 시도
  let parsedBody = body;
  try {
    parsedBody = JSON.parse(body);
  } catch (error) {
    // JSON이 아니면 문자열 그대로 사용
  }

  return {
    command,
    headers,
    body: parsedBody,
  };
}

// STOMP 프레임 생성 함수
function createSTOMPFrame(command, headers = {}, body = '') {
  let frame = command + '\n';

  // 헤더 추가
  for (const [key, value] of Object.entries(headers)) {
    frame += `${key}:${value}\n`;
  }

  frame += '\n'; // 빈 줄로 헤더와 바디 구분
  frame += body;
  frame += '\0'; // null 문자로 프레임 종료

  return frame;
}

// SockJS 연결
function connectSockJS(url, requestingPort) {
  // URL이 없을 시 에러
  if (!url) {
    requestingPort.postMessage({
      type: 'error',
      data: { message: 'SockJS URL이 필요합니다.' },
    });
    return;
  }

  // 이미 같은 URL로 연결되어 있으면 상태만 전송
  if (sockjs && sockjsUrl === url && sockjs.readyState === SockJS.OPEN) {
    requestingPort.postMessage({
      type: 'status',
      data: {
        status: 'connected',
        url: url,
        activeTabs: connectedPorts.size,
        subscribedChannels: Array.from(subscribedChannels),
        totalSubscriptions: subscribedChannels.size,
      },
    });
    return;
  }

  // 기존 연결이 있으면 정리
  if (sockjs) {
    cleanup();
  }

  sockjsUrl = url;
  connectionStatus = 'connecting';

  // 모든 포트에 연결 시작 알림
  broadcastToAll({
    type: 'status',
    data: {
      status: 'connecting',
      url: url,
      activeTabs: connectedPorts.size,
      subscribedChannels: Array.from(subscribedChannels),
      totalSubscriptions: subscribedChannels.size,
    },
  });

  try {
    sockjs = new SockJS(url);

    sockjs.onopen = function (event) {
      console.log('🎉 SockJS 연결 성공: ', url);
      // 여기서는 상태를 'connecting'으로 유지 (STOMP CONNECTED를 기다림)

      // STOMP CONNECT 프레임 전송
      const connectFrame = createSTOMPFrame('CONNECT', {
        'accept-version': '1.0,1.1,2.0',
        'heart-beat': '10000,10000',
      });

      console.log('📤 STOMP CONNECT 프레임 전송');
      sockjs.send(connectFrame);
    };

    sockjs.onmessage = function (event) {
      console.log('📩 SockJS 원본 메시지 수신: ', event.data);

      // STOMP 프레임 파싱 시도
      const frame = parseSTOMPFrame(event.data);

      if (frame) {
        console.log('📋 STOMP 프레임 파싱 결과:', frame);

        switch (frame.command) {
          case 'CONNECTED':
            console.log('✅ STOMP 연결 확인됨');
            // 여기서만 연결 상태를 'connected'로 변경
            if (connectionStatus !== 'connected') {
              connectionStatus = 'connected';

              broadcastToAll({
                type: 'status',
                data: {
                  status: 'connected',
                  url: sockjsUrl,
                  activeTabs: connectedPorts.size,
                  subscribedChannels: Array.from(subscribedChannels),
                  totalSubscriptions: subscribedChannels.size,
                },
              });
            }
            break;

          case 'MESSAGE':
            console.log('📩 STOMP MESSAGE 수신:', frame.headers.destination);

            // 알림 메시지 처리
            if (frame.headers.destination === '/user/queue/notifications') {
              console.log('🔔 알림 메시지 감지:', frame.body);

              const channelMessage = {
                channel: '/user/queue/notifications',
                messageType: 'notification',
                message: frame.body, // 파싱된 알림 JSON
                timestamp: new Date().toISOString(),
                originalFrame: frame,
              };

              handleChannelMessage(channelMessage);
            } else {
              // 다른 채널 메시지 처리
              const channelMessage = {
                channel: frame.headers.destination,
                messageType: 'message',
                message: frame.body,
                timestamp: new Date().toISOString(),
                originalFrame: frame,
              };

              handleChannelMessage(channelMessage);
            }
            break;

          case 'ERROR':
            console.error('❌ STOMP 에러:', frame.body);
            broadcastToAll({
              type: 'error',
              data: { message: `STOMP 에러: ${frame.body}` },
            });
            break;

          case 'RECEIPT':
            console.log('📋 STOMP RECEIPT:', frame.headers['receipt-id']);
            break;

          default:
            console.log('📋 기타 STOMP 프레임:', frame.command);
        }
      } else {
        console.warn('⚠️ STOMP 프레임 파싱 실패, 원본 데이터 처리');

        // STOMP가 아닌 일반 메시지로 처리
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
      }
    };

    sockjs.onclose = function (event) {
      console.log('🔌 SockJS 연결 종료:', event.code, event.reason);
      connectionStatus = 'disconnected';

      broadcastToAll({
        type: 'status',
        data: {
          status: 'disconnected',
          code: event.code,
          reason: event.reason,
          activeTabs: connectedPorts.size,
          subscribedChannels: Array.from(subscribedChannels),
          totalSubscriptions: subscribedChannels.size,
        },
      });
    };

    sockjs.onerror = function (error) {
      console.error('❌ SockJS 에러:', error);
      connectionStatus = 'error';

      broadcastToAll({
        type: 'error',
        data: { message: 'SockJS 연결 오류가 발생했습니다' },
      });
    };
  } catch (error) {
    console.error('❌ SockJS 생성 실패:', error);
    connectionStatus = 'error';

    requestingPort.postMessage({
      type: 'error',
      data: { message: 'SockJS 생성에 실패했습니다' },
    });
  }
}

// 채널 메시지 처리 함수
function handleChannelMessage(messageData) {
  const channel = messageData.channel;
  const messageType = messageData.messageType || 'message';

  console.log(`📺 채널 메시지 처리: ${channel} (${messageType})`);
  console.log(`📊 해당 채널 리스너 존재 여부: ${channelListeners.has(channel)}`);

  // 해당 채널을 구독하는 포트들에게만 메시지 전송
  if (channelListeners.has(channel)) {
    const listeners = channelListeners.get(channel);
    console.log(`📊 ${channel} 채널 리스너 수: ${listeners.size}`);

    const channelMessage = {
      type: 'channelMessage',
      data: {
        channel: channel,
        messageType: messageType,
        message: messageData.message,
        timestamp: messageData.timestamp,
        originalMessage: messageData.originalFrame || messageData,
      },
    };

    listeners.forEach(port => {
      try {
        console.log(`📤 포트로 채널 메시지 전송: ${channel}`);
        port.postMessage(channelMessage);
      } catch (error) {
        console.error('❌ 채널 메시지 전송 실패:', error);
        listeners.delete(port);
        connectedPorts.delete(port);
      }
    });
  } else {
    console.warn(`⚠️ 채널 "${channel}"에 대한 리스너가 없음`);
    console.log('📊 현재 등록된 채널들:', Array.from(channelListeners.keys()));
  }
}

// SockJS 연결 해제
function disconnectSockJS(requestingPort) {
  if (sockjs && sockjs.readyState === SockJS.OPEN) {
    // STOMP DISCONNECT 프레임 전송
    const disconnectFrame = createSTOMPFrame('DISCONNECT', {
      receipt: `disconnect-${Date.now()}`,
    });

    console.log('📤 STOMP DISCONNECT 프레임 전송');
    sockjs.send(disconnectFrame);

    // 약간의 지연 후 연결 종료
    setTimeout(() => {
      sockjs.close(1000, 'User requested disconnect');
    }, 100);
  }

  cleanup();

  requestingPort.postMessage({
    type: 'status',
    data: {
      status: 'disconnected',
      activeTabs: connectedPorts.size,
      subscribedChannels: Array.from(subscribedChannels),
      totalSubscriptions: subscribedChannels.size,
    },
  });
}

// 채널 구독 (STOMP SUBSCRIBE)
function subscribeToChannel(channel, requestingPort) {
  console.log(`📺 채널 구독 요청: ${channel}`);

  if (!channel) {
    requestingPort.postMessage({
      type: 'error',
      data: { message: '채널명이 필요합니다.' },
    });
    return;
  }

  // 채널별 리스너 맵에 포트 추가
  if (!channelListeners.has(channel)) {
    channelListeners.set(channel, new Set());
  }
  channelListeners.get(channel).add(requestingPort);

  // 전역 구독 채널에 추가
  const wasSubscribed = subscribedChannels.has(channel);
  subscribedChannels.add(channel);

  console.log(`✅ 채널 "${channel}" 구독 완료`);
  console.log(`📊 해당 채널 리스너 수: ${channelListeners.get(channel).size}`);

  // SockJS가 연결되어 있으면 서버에 STOMP SUBSCRIBE 프레임 전송
  if (sockjs && sockjs.readyState === SockJS.OPEN && !wasSubscribed) {
    const subscriptionId = `sub-${channel.replace(/\//g, '-')}-${Date.now()}`;
    subscriptionIds.set(channel, subscriptionId);

    const subscribeFrame = createSTOMPFrame('SUBSCRIBE', {
      destination: channel,
      id: subscriptionId,
    });

    try {
      sockjs.send(subscribeFrame);
      console.log(`📤 STOMP SUBSCRIBE 프레임 전송: ${channel} (id: ${subscriptionId})`);
    } catch (error) {
      console.error('❌ 구독 메시지 전송 실패:', error);
    }
  }

  // 요청한 포트에 구독 완료 알림
  requestingPort.postMessage({
    type: 'subscribed',
    data: {
      channel: channel,
      totalSubscriptions: subscribedChannels.size,
      channelListeners: channelListeners.get(channel).size,
    },
  });

  // 다른 포트들에도 구독 상태 업데이트 알림
  broadcastToOthers(requestingPort, {
    type: 'subscriptionUpdate',
    data: {
      action: 'subscribed',
      channel: channel,
      totalSubscriptions: subscribedChannels.size,
    },
  });
}

// 채널 구독 해제 (STOMP UNSUBSCRIBE)
function unsubscribeFromChannel(channel, requestingPort) {
  console.log(`📺 채널 구독 해제 요청: ${channel}`);

  if (!channel) {
    requestingPort.postMessage({
      type: 'error',
      data: { message: '채널명이 필요합니다.' },
    });
    return;
  }

  // 해당 포트를 채널 리스너에서 제거
  if (channelListeners.has(channel)) {
    const listeners = channelListeners.get(channel);
    listeners.delete(requestingPort);

    // 해당 채널에 더 이상 리스너가 없으면 전역에서도 제거
    if (listeners.size === 0) {
      channelListeners.delete(channel);
      subscribedChannels.delete(channel);

      // SockJS가 연결되어 있으면 서버에 STOMP UNSUBSCRIBE 프레임 전송
      if (sockjs && sockjs.readyState === SockJS.OPEN) {
        const subscriptionId = subscriptionIds.get(channel);

        if (subscriptionId) {
          const unsubscribeFrame = createSTOMPFrame('UNSUBSCRIBE', {
            id: subscriptionId,
          });

          try {
            sockjs.send(unsubscribeFrame);
            console.log(`📤 STOMP UNSUBSCRIBE 프레임 전송: ${channel} (id: ${subscriptionId})`);
            subscriptionIds.delete(channel);
          } catch (error) {
            console.error('❌ 구독 해제 메시지 전송 실패:', error);
          }
        }
      }
    }
  }

  console.log(`✅ 채널 "${channel}" 구독 해제 완료`);

  requestingPort.postMessage({
    type: 'unsubscribed',
    data: {
      channel: channel,
      totalSubscriptions: subscribedChannels.size,
    },
  });

  // 다른 포트들에도 구독 해제 상태 업데이트 알림
  broadcastToOthers(requestingPort, {
    type: 'subscriptionUpdate',
    data: {
      action: 'unsubscribed',
      channel: channel,
      totalSubscriptions: subscribedChannels.size,
    },
  });
}

// 포트의 모든 채널 구독 해제 (포트 종료시)
function unsubscribePortFromAllChannels(port) {
  console.log('🧹 포트의 모든 채널 구독 해제');

  const channelsToCleanup = [];

  channelListeners.forEach((listeners, channel) => {
    if (listeners.has(port)) {
      listeners.delete(port);
      if (listeners.size === 0) {
        channelsToCleanup.push(channel);
      }
    }
  });

  // 리스너가 없는 채널들 정리
  channelsToCleanup.forEach(channel => {
    channelListeners.delete(channel);
    subscribedChannels.delete(channel);

    // 서버에 STOMP UNSUBSCRIBE 프레임 전송
    if (sockjs && sockjs.readyState === SockJS.OPEN) {
      const subscriptionId = subscriptionIds.get(channel);

      if (subscriptionId) {
        const unsubscribeFrame = createSTOMPFrame('UNSUBSCRIBE', {
          id: subscriptionId,
        });

        try {
          sockjs.send(unsubscribeFrame);
          console.log(`📤 자동 STOMP UNSUBSCRIBE: ${channel}`);
          subscriptionIds.delete(channel);
        } catch (error) {
          console.error('❌ 자동 구독 해제 실패:', error);
        }
      }
    }
  });

  console.log(`✅ ${channelsToCleanup.length}개 채널 정리 완료`);
}

// 구독 현황 조회
function getSubscriptions(requestingPort) {
  const subscriptionData = {
    subscribedChannels: Array.from(subscribedChannels),
    channelDetails: {},
    totalSubscriptions: subscribedChannels.size,
  };

  channelListeners.forEach((listeners, channel) => {
    subscriptionData.channelDetails[channel] = {
      listenerCount: listeners.size,
      isListening: listeners.has(requestingPort),
      subscriptionId: subscriptionIds.get(channel) || null,
    };
  });

  requestingPort.postMessage({
    type: 'subscriptions',
    data: subscriptionData,
  });
}

// 메시지 전송 (STOMP SEND)
function sendMessage(message, requestingPort) {
  if (!sockjs || sockjs.readyState !== SockJS.OPEN) {
    requestingPort.postMessage({
      type: 'error',
      data: { message: 'SockJS가 연결되지 않았습니다' },
    });
    return;
  }

  try {
    let messageToSend;
    let destination = '/app/message'; // 기본 destination

    if (typeof message === 'object' && message.destination) {
      destination = message.destination;
      messageToSend = message.body || message.message || JSON.stringify(message);
    } else {
      messageToSend = typeof message === 'string' ? message : JSON.stringify(message);
    }

    const sendFrame = createSTOMPFrame(
      'SEND',
      {
        destination: destination,
        'content-type': 'application/json',
      },
      messageToSend
    );

    sockjs.send(sendFrame);

    requestingPort.postMessage({
      type: 'sent',
      data: { success: true, timestamp: new Date().toISOString() },
    });

    console.log('📤 STOMP SEND 프레임 전송 완료:', destination);
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
      url: sockjsUrl,
      activeTabs: connectedPorts.size,
      subscribedChannels: Array.from(subscribedChannels),
      totalSubscriptions: subscribedChannels.size,
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

// 다른 포트들에게 메시지 전송
function broadcastToOthers(excludePort, message) {
  connectedPorts.forEach(port => {
    if (port !== excludePort) {
      try {
        port.postMessage(message);
      } catch (error) {
        console.error('포트 메시지 전송 실패:', error);
        connectedPorts.delete(port);
      }
    }
  });
}

// SockJS 정리
function cleanup() {
  if (sockjs) {
    sockjs.close();
    sockjs = null;
  }

  sockjsUrl = null;
  connectionStatus = 'disconnected';
  subscriptionIds.clear();

  // 채널 정리는 하지 않음 (재연결 시 유지하기 위해)
}

// Worker 전역 에러 처리
self.onerror = function (error) {
  console.error('💥 Worker 전역 에러:', error);

  broadcastToAll({
    type: 'error',
    data: { message: 'Worker에서 오류가 발생했습니다' },
  });
};
