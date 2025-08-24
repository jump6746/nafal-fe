import { Outlet } from 'react-router-dom';

interface Props {
  headerSlot?: React.ReactNode;
  navbarSlot?: React.ReactNode;
  modalSlot?: React.ReactNode;
}

const Layout = (props: Props) => {
  // const { status, subscribe, onChannelMessage } = useSockJS();

  // // 연결 완료 후 알림 채널 구독
  // useEffect(() => {
  //   if (status === 'connected') {
  //     console.log('📺 알림 채널 구독...');
  //     subscribe('/user/queue/notifications');
  //   }
  // }, [status, subscribe]);

  // // 알림 메시지 처리
  // useEffect(() => {
  //   const unsubscribe = onChannelMessage(message => {
  //     if (message.channel === '/user/queue/notifications') {
  //       const notification = message.message as {
  //         id: number;
  //         content: string;
  //         notificationType:
  //           | 'TICKET_ACQUIRED'
  //           | 'DRAW_WIN'
  //           | 'DRAW_LOSE'
  //           | 'AUCTION_WIN'
  //           | 'AUCTION_LOSE';
  //         relatedUrl: string;
  //         createdAt: string;
  //       };

  //       // 알림 타입별 처리
  //       switch (notification.notificationType) {
  //         case 'TICKET_ACQUIRED':
  //           customToast.alarm(`${notification.content}`);
  //           break;
  //         case 'DRAW_WIN':
  //           customToast.alarm(`${notification.content}`);
  //           break;
  //         case 'DRAW_LOSE':
  //           customToast.alarm(`${notification.content}`);
  //           break;
  //         case 'AUCTION_WIN':
  //           customToast.alarm(`${notification.content}`);
  //           break;
  //         case 'AUCTION_LOSE':
  //           customToast.alarm(`${notification.content}`);
  //           break;
  //         default:
  //           customToast.alarm(notification.content);
  //       }
  //     }
  //   });

  //   return unsubscribe;
  // }, [onChannelMessage]);

  return (
    <div
      className='relative mx-auto flex h-full max-w-[450px] min-w-[320px] flex-col overflow-hidden shadow'
      id='topLayout'
    >
      {props.headerSlot}
      <main className='relative flex-grow overflow-auto'>
        <Outlet />
      </main>
      {props.navbarSlot}
      {props.modalSlot}
    </div>
  );
};

export default Layout;
