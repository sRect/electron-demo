import React, { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import {ConfigProvider} from "antd";
import store from "@/store";
import router from './router';
import "./main.css";

import zhCN from 'antd/locale/zh_CN';

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <Suspense fallback={<div>loading...</div>}>
            <RouterProvider router={router} />
        </Suspense>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
