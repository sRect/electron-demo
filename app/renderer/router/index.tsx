import React, { lazy } from 'react';
import { createHashRouter } from 'react-router-dom';
import MyErrorBoundary from "@/components/MyErrorBoundary";

import Home from '@/views/Home';
import Foo from '@/views/Foo';

const OpenBrowser = lazy(() => import('@/views/OpenBrowser'));
const ResultPage = lazy(() => import('@/views/ResultPage'));
const ReadFile = lazy(() => import('@/views/ReadFile'));
const Todolist = lazy(() => import('@/views/Todolist'));
const LoginDemo = lazy(() => import('@/views/LoginDemo'));

// type RoutesTypes = {
//   path: string;
//   exact?: boolean;
//   element?: React.FC;
// }

// const routes:RoutesTypes[]= [
const routes= [
  {
    path: '/',
    element: <Home />,
    // errorElement: <MyErrorBoundary />,
    children: [
      {
        path: 'foo',
        element: <Foo />,
      },
      {
        path: 'openBrowser',
        element: <OpenBrowser />,
      },
      {
        path: 'readFile',
        element: <ReadFile />,
      },
      {
        path: 'todolist',
        element: <Todolist />
      },
      {
        path: '/loginReduxDemo',
        exact: true,
        element: <LoginDemo />
      },
    ]
  },
  {
    path: '/result/:code',
    exact: true,
    element: <ResultPage />,
  },
  {
    path: '*',
    element: <MyErrorBoundary />,
  },
];

const router = createHashRouter(routes);

export default router;
