import React, { lazy } from 'react';
import { createHashRouter } from 'react-router-dom';
import MyErrorBoundary from "@/components/MyErrorBoundary";

import Home from '@/views/Home';
import Foo from '@/views/Foo';
import { TSRouter } from '@/types/router';

const OpenBrowser = lazy(() => import('@/views/OpenBrowser'));
const ResultPage = lazy(() => import('@/views/ResultPage'));
const ReadFile = lazy(() => import('@/views/ReadFile'));
const Todolist = lazy(() => import('@/views/Todolist'));
const LoginDemo = lazy(() => import('@/views/LoginDemo'));
const MyUpload = lazy(() => import('@/views/MyUpload'));

// type RoutesTypes = {
//   path: string;
//   exact?: boolean;
//   element?: React.FC;
// }

// const routes:RoutesTypes[]= [
const routes: TSRouter.Router[] = [
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
        element: <LoginDemo />
      },
    ]
  },
  {
    path: "/myupload",
    element: <MyUpload />
  },
  {
    path: '/result/:code',
    element: <ResultPage />,
  },
  {
    path: '*',
    element: <MyErrorBoundary />,
  },
];

const router = createHashRouter(routes);

export default router;
