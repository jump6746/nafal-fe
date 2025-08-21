import { createBrowserRouter } from 'react-router-dom';
import { AuctionLayout, DefaultLayout, MainPageLayout } from './layouts';
import { AuctionRoomPage, LuckDrawPage } from '@/pages/auction';
import { MainPage } from '@/pages/main';
import { AutoBidPlace, BidPlace, DirectBuyPlace } from '@/widgets/auction/ui';
import { MyPage, MyPageAdmin } from '@/pages/mypage';
import { LoginPage } from '@/pages/user';

const AppRouter = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        element: <LoginPage />,
        path: '/login',
      },
    ],
  },
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
        element: <MyPageAdmin />,
        path: '/admin/mypage',
      },
    ],
  },
]);

export default AppRouter;
