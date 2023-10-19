import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const Analytics = Loadable(lazy(() => import('./Analytics')));
const Stores = Loadable(lazy(() => import('../stores/components/Stores')));
const CreateStore = Loadable(lazy(() => import('../stores/components/CreateStores')));

const dashboardRoutes = [
  { path: '/dashboard/default', element: <Analytics />, auth: authRoles.admin },
  { path: '/dashboard/stores', element: <Stores />, auth: authRoles.admin },
  { path: '/create-stores', element: <CreateStore />, auth: authRoles.admin}
];

export default dashboardRoutes;
