import { createBrowserRouter } from 'react-router-dom';
import { AuctionLayout, MainPageLayout } from './layouts';
import { AuctionRoomPage } from '@/pages/auction';
import { MainPage } from '@/pages/main';

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
    ],
  },
]);

export default AppRouter;
