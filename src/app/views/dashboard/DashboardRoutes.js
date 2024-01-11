import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const Analytics = Loadable(lazy(() => import('./Analytics')));
const Stores = Loadable(lazy(() => import('../stores/components/Stores')));
const Regions = Loadable(lazy(() => import('../stores/components/Regions')));
const Cities = Loadable(lazy(() => import('../stores/components/Cities')));
const CreateComercial = Loadable(lazy(() => import('../comercial/comercialComponents/registerComercial')));
const UserComercial = Loadable(lazy(() => import('../comercial/comercialComponents/userComercial')));
const CreateUser = Loadable(lazy(() => import('../users/componentsUser/CreateUsers')));
const ListUser = Loadable(lazy(() => import('../users/componentsUser/ListUser')));
const MenuSale = Loadable(lazy(() => import('../menuSale/componentsSale/menusale')));
const ListProducts = Loadable(lazy(() => import('../poducts/components/ListProducts')));
const SaleIndicator = Loadable(lazy(() => import('../indicators/SaleIndicator')));
const CreateRules = Loadable(lazy(() => import('../brmRules/createRules')));
const ListRules = Loadable(lazy(() => import('../brmRules/listRules')));
const ListCommissions = Loadable(lazy(() => import('../commissions/listCommissions')));





const dashboardRoutes = [
  { path: '/dashboard/default', element: <Analytics />, auth: authRoles.admin },
  { path: '/dashboard/stores', element: <Stores />, auth: authRoles.admin },
  { path: '/dashboard/stores/regions', element: <Regions />, auth: authRoles.admin },
  { path: '/dashboard/stores/cities', element: <Cities />, auth: authRoles.admin },
  { path: '/dashboard/createUser', element: <CreateUser />, auth: authRoles.admin },
  { path: '/dashboard/listUser', element: <ListUser />, auth: authRoles.admin },
  { path: '/dashboard/comercial', element: <CreateComercial />, auth: authRoles.admin },
  { path: '/dashboard/userComercial', element: <UserComercial />, auth: authRoles.admin },
  { path: '/dashboard/menuSale', element: <MenuSale />, auth: authRoles.admin },
  { path: '/dashboard/listProducts', element: <ListProducts />, auth: authRoles.admin },
  { path: '/dashboard/indicatorSale', element: <SaleIndicator />, auth: authRoles.admin },
  { path: '/dashboard/rulesCreate', element: <CreateRules />, auth: authRoles.admin },
  { path: '/dashboard/rulesList', element: <ListRules />, auth: authRoles.admin },
  { path: '/dashboard/commissionsList', element: <ListCommissions />, auth: authRoles.admin },
  
  
  

];

export default dashboardRoutes;
