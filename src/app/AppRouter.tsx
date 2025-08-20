import { createBrowserRouter } from 'react-router-dom';
import { AuctionLayout, MainPageLayout } from './layouts';
import { AuctionRoomPage } from '@/pages/auction';
import { MainPage } from '@/pages/main';
import { AutoBidPlace, BidPlace, DirectBuyPlace } from '@/widgets/auction/ui';

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
    ],
  },
]);

export default AppRouter;
