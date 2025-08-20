import { createBrowserRouter } from 'react-router-dom';
import { LandingPage } from '../pages/landing';
import { Layout } from '@/shared/ui';
import { AuctionLayout } from './layouts';
import { AuctionRoomPage } from '@/pages/auction';

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
    ],
  },
]);

export default AppRouter;
