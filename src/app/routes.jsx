import AuthGuard from './auth/AuthGuard';

import dashboardRoutes from '@/app/views/dashboard/DashboardRoutes';
import NotFound from '@/app/views/sessions/NotFound';
import sessionRoutes from '@/app/views/sessions/SessionRoutes';
import { Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';

const routes = [
  {
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [...dashboardRoutes],
  },
  ...sessionRoutes,
  { path: '/', element: <Navigate to="dashboard/default" /> },
  { path: '*', element: <NotFound /> },
];

export default routes;
