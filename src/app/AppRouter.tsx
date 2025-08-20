import { createBrowserRouter } from 'react-router-dom';
import { LandingPage } from '../pages/landing';
import { Layout } from '@/shared/ui';
import { AuctionLayout } from './layouts';
import { AuctionRoomPage } from '@/pages/auction';
import { AutoBidPlace, BidPlace, DirectBuyPlace } from '@/widgets/auction/ui';

const AppRouter = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <LandingPage />,
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
