import { createBrowserRouter } from 'react-router-dom';
import { LandingPage } from '../pages/landing';
import { Layout } from '@/shared/ui';

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
]);

export default AppRouter;
