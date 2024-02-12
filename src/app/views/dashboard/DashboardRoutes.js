import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

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
const CreateRules = Loadable(lazy(() => import('../brmRules/percentages')));
const ListFormulas = Loadable(lazy(() => import('../brmRules/fomulations')));
const ListCommissions = Loadable(lazy(() => import('../commissions/listCommissions')));





const dashboardRoutes = [
  { path: '/dashboard/default', element: <Analytics /> },
  { path: '/dashboard/stores', element: <Stores /> },
  { path: '/dashboard/stores/regions', element: <Regions /> },
  { path: '/dashboard/stores/cities', element: <Cities /> },
  { path: '/dashboard/createUser', element: <CreateUser /> },
  { path: '/dashboard/listUser', element: <ListUser /> },
  { path: '/dashboard/comercial', element: <CreateComercial /> },
  { path: '/dashboard/userComercial', element: <UserComercial /> },
  { path: '/dashboard/menuSale', element: <MenuSale /> },
  { path: '/dashboard/listProducts', element: <ListProducts /> },
  { path: '/dashboard/indicatorSale', element: <SaleIndicator /> },
  { path: '/dashboard/rulesCreate', element: <CreateRules /> },
  { path: '/dashboard/rulesList', element: <ListFormulas /> },
  { path: '/dashboard/commissionsList', element: <ListCommissions /> },
  
  
  

];

export default dashboardRoutes;
