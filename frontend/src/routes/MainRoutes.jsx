import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import ProtectedRoute from './ProtectedRoute';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// utilities routing
const Expenses = Loadable(lazy(() => import('views/utilities/expenses')));
const Incomes = Loadable(lazy(() => import('views/utilities/income')));
const Reports = Loadable(lazy(() => import('views/utilities/reports')));
const Exports = Loadable(lazy(() => import('views/utilities/exports')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: (
      <MainLayout />
  ),
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      element: <DashboardDefault />
    },
    {
      path: 'utils',
      children: [
        {
          path: 'expenses',
          element: <Expenses />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'income',
          element: <Incomes />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'reports',
          element: <Reports />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'exports',
          element: <Exports />
        }
      ]
    }
  ]
};

export default MainRoutes;
