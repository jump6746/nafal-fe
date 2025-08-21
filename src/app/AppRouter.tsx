import { createBrowserRouter } from 'react-router-dom';
import { AuctionLayout, MainPageLayout } from './layouts';
import { AuctionRoomPage, LuckDrawPage } from '@/pages/auction';
import { MainPage } from '@/pages/main';
import { AutoBidPlace, BidPlace, DirectBuyPlace } from '@/widgets/auction/ui';
import { MyPage } from '@/pages/mypage';
import { PayPage } from '@/pages/pay';

const AppRouter = createBrowserRouter([
  {
    element: <MainPageLayout />,
    children: [
      {
        element: <MainPage />,
        path: '/',
      },
    ],
  },
  {
    element: <AuctionLayout />,
    children: [
      {
        element: <AuctionRoomPage />,
        path: '/auction',
      },
      {
        element: <BidPlace />,
        path: '/bid',
      },
      {
        element: <AutoBidPlace />,
        path: '/autobid',
      },
      {
        element: <DirectBuyPlace />,
        path: '/directbuy',
      },
      {
        element: <LuckDrawPage />,
        path: '/luckydraw',
      },
      {
        element: <MyPage />,
        path: '/mypage',
      },
      {
        element: <PayPage />,
        path: '/pay',
      },
    ],
  },
]);

export default AppRouter;
