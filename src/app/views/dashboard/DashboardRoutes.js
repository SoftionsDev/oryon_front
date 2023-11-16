import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const Analytics = Loadable(lazy(() => import('./Analytics')));
const Stores = Loadable(lazy(() => import('../stores/components/Stores')));
const CreateStore = Loadable(lazy(() => import('../stores/components/CreateStores')));
const ListUser = Loadable(lazy(() => import('../users/componentsUser/ListUser')));
const CreateUser = Loadable(lazy(() => import('../users/componentsUser/CreateUsers')));
const MenuSale  = Loadable(lazy(() => import('../menuSale/componentsSale/menusale')));
const Usercomercial  = Loadable(lazy(() => import('../comercial/comercialComponents/usersComercial')));
const Registercomercial  = Loadable(lazy(() => import('../comercial/comercialComponents/registerComercial')));



const dashboardRoutes = [
  { path: '/dashboard/default', element: <Analytics />, auth: authRoles.admin },
  { path: '/dashboard/stores', element: <Stores />, auth: authRoles.admin },
  { path: '/create-stores', element: <CreateStore />, auth: authRoles.admin },
  { path: '/dashboard/new-user', element: <CreateUser />, auth: authRoles.admin },
  { path: '/dashboard/list-user', element: <ListUser />, auth: authRoles.admin },
  { path: '/dashboard/menu-sale', element: <MenuSale />, auth: authRoles.admin },
  { path: '/dashboard/user-comercial', element: <Usercomercial />, auth: authRoles.admin },
  { path: '/dashboard/register-comercial', element: <Registercomercial />, auth: authRoles.admin }
];

export default dashboardRoutes;
