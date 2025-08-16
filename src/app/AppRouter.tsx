import { createBrowserRouter } from 'react-router-dom';
import { LandingPage } from '../pages/landing';

const AppRouter = createBrowserRouter([
  {
    element: <LandingPage />,
    path: '/',
  },
]);

export default AppRouter;
