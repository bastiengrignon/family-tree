import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Account from '@pages/Account';
import Home from '@pages/Home';
import Layout from '@pages/Layout';
import ResetPassword from '@pages/ResetPassword';
import Tree from '@pages/Tree';

export const routersPath = {
  home: '/',
  account: '/account',
  resetPassword: '/resetPassword',
  tree: '/tree/:treeId',
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: routersPath.account,
        element: <Account />,
      },
      {
        path: routersPath.resetPassword,
        element: <ResetPassword />,
      },
      {
        path: routersPath.tree,
        element: <Tree />,
      },
      {
        path: routersPath.home,
        element: <Home />,
      },
    ],
  },
]);

export default router;
