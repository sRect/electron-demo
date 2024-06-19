import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';

import Home from '@/views/Home';
import Foo from '@/views/Foo';

const OpenBrowser = lazy(() => import('@/views/OpenBrowser'));
const ResultPage = lazy(() => import('@/views/ResultPage'));
const ReadFile = lazy(() => import('@/views/ReadFile'));
const Todolist = lazy(() => import('@/views/Todolist'));

type RoutesTypes = {
  path: string;
  exact?: boolean;
  component?: React.FC;
  render?: React.FC
}

const routes:RoutesTypes[]= [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/foo',
    exact: true,
    component: Foo,
  },
  {
    path: '/openBrowser',
    exact: true,
    component: OpenBrowser,
  },
  {
    path: '/readFile',
    exact: true,
    component: ReadFile,
  },
  {
    path: '/todolist',
    exact: true,
    component: Todolist
  },
  {
    path: '/result/:code',
    exact: true,
    component: ResultPage,
  },
  {
    path: '*',
    render: () => <Redirect to="/result/404" />,
  },
];

export default routes;
