import React from 'react';
import { Redirect } from 'react-router-dom';

import Home from '@/views/Home';
import Foo from '@/views/Foo';

const routes = [
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
    path: '*',
    render: () => <Redirect to="/result/404" />,
  },
];

export default routes;
