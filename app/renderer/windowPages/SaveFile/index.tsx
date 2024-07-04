import React, { Suspense } from 'react';
import {createRoot} from "react-dom/client";
import { Provider } from 'react-redux';
import {ConfigProvider} from "antd";
import zhCN from 'antd/locale/zh_CN';
import store from "@/store";
import SaveFile from './app';
import "@/tailwind.css";

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container!);

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

function App() {
  return (
    <Provider store={store}>
        <ConfigProvider locale={zhCN}>
          <Suspense fallback={<div>loading...</div>}>
            <SaveFile />
          </Suspense>
        </ConfigProvider>
    </Provider>
  );
}

root.render(<App />);
