import { createBrowserRouter } from 'react-router-dom';
import { AuctionLayout, DefaultLayout, MainPageLayout } from './layouts';
import { AuctionRoomPage, CreateAuctionPage, LuckDrawPage } from '@/pages/auction';
import { MainPage } from '@/pages/main';
import { AutoBidPlace, BidPlace, DirectBuyPlace } from '@/widgets/auction/ui';
import { MyPage, PaymentManagePage, MyPageAdmin } from '@/pages/mypage';
import { PayPage } from '@/pages/pay';
import { LoginPage } from '@/pages/user';
import PaidSuccess from '@/pages/pay/PaidSuccess';
import Test from '@/pages/test';

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
      {
        element: <CreateAuctionPage />,
        path: '/auction/create',
        element: <PayPage />,
        path: '/pay',
      },
      {
        element: <PaidSuccess />,
        path: '/pay/success',
      },
      {
        element: <PaymentManagePage />,
        path: '/mypage/payment',
      },
      {
        element: <Test />,
        path: '/test',
      },
    ],
  },
]);

export default AppRouter;
