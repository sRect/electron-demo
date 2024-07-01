import React from 'react';
// import ReactDOM from 'react-dom';
// https://stackoverflow.com/questions/71925618/uncaught-typeerror-dispatcher-usesyncexternalstore-is-not-a-function
import {createRoot} from "react-dom/client";
import App from './app';
const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container!);

root.render(<App />);
