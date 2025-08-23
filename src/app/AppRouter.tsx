import { createBrowserRouter } from 'react-router-dom';
import { AuctionLayout, DefaultLayout, MainPageLayout } from './layouts';
import { AuctionRoomPage, CreateAuctionPage, LuckDrawPage } from '@/pages/auction';
import { MainPage } from '@/pages/main';
import { AutoBidPlace, BidPlace, DirectBuyPlace } from '@/widgets/auction/ui';
import { MyPage, PaymentManagePage, MyPageAdmin } from '@/pages/mypage';
import { PayPage } from '@/pages/pay';
import { LoginPage, SignupPage } from '@/pages/user';
import PaidSuccess from '@/pages/pay/PaidSuccess';
import Test from '@/pages/test';
import { Suspense } from 'react';
import AuctionDetailSkeleton from '@/features/auction/skeleton/AuctionDetailSkeleton';

const AppRouter = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        element: <LoginPage />,
        path: '/login',
      },
      {
        element: <SignupPage />,
        path: '/signup',
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
        element: (
          <Suspense fallback={<AuctionDetailSkeleton />}>
            <AuctionRoomPage />
          </Suspense>
        ),
        path: '/auction/:productId',
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
      },
      {
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
