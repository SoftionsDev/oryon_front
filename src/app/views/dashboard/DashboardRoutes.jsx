import Loadable from '@/app/components/Loadable';
import { lazy } from 'react';

const Analytics = Loadable(lazy(() => import('./Analytics')));
const Stores = Loadable(lazy(() => import('../stores/components/Stores')));
const Regions = Loadable(lazy(() => import('../stores/components/Regions')));
const Cities = Loadable(lazy(() => import('../stores/components/Cities')));
const UserCommercial = Loadable(lazy(() => import('../commercials/commercials')));
const ListUser = Loadable(lazy(() => import('../users/ListUser')));
const MenuSale = Loadable(lazy(() => import('../sales/menusale')));
const ListProducts = Loadable(lazy(() => import('../products/ListProducts')));
const SaleIndicator = Loadable(lazy(() => import('../indicators/SaleIndicator')));
const CreateRules = Loadable(lazy(() => import('../brmRules/percentages')));
const ListFormulas = Loadable(lazy(() => import('../brmRules/fomulations')));
const ListCommissions = Loadable(lazy(() => import('../commissions/listCommissions')));



const dashboardRoutes = [
  { path: '/dashboard/default', element: <Analytics /> },
  { path: '/dashboard/stores', element: <Stores /> },
  { path: '/dashboard/stores/regions', element: <Regions /> },
  { path: '/dashboard/stores/cities', element: <Cities /> },
  { path: '/dashboard/listUser', element: <ListUser /> },
  { path: '/dashboard/userComercial', element: <UserCommercial /> },
  { path: '/dashboard/menuSale', element: <MenuSale /> },
  { path: '/dashboard/listProducts', element: <ListProducts /> },
  { path: '/dashboard/indicatorSale', element: <SaleIndicator /> },
  { path: '/dashboard/rulesCreate', element: <CreateRules /> },
  { path: '/dashboard/rulesList', element: <ListFormulas /> },
  { path: '/dashboard/commissionsList', element: <ListCommissions /> },
];

export default dashboardRoutes;
