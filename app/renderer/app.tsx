import React, { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {ConfigProvider} from "antd";
import store, {persistor} from "@/store";
import router from './router';
import "./main.css";

import zhCN from 'antd/locale/zh_CN';

function App() {
  return (
    <Provider store={store}>
        <ConfigProvider locale={zhCN}>
          <Suspense fallback={<div>loading...</div>}>
            <PersistGate loading={null} persistor={persistor}>
              <RouterProvider router={router} />
            </PersistGate>
          </Suspense>
        </ConfigProvider>
    </Provider>
  );
}

export default App;
