import {legacy_createStore as createStore, applyMiddleware} from "redux";
// import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import createElectronStorage from "redux-persist-electron-storage";
import Store from "electron-store";
import rootReducer from "./reducer"; 

// https://github.com/psperber/redux-persist-electron-storage

const electronStore = new Store();

const persistConfig = {
  key: 'root',
  // https://github.com/rt2zz/redux-persist/blob/master/docs/migrations.md
  version: 1,
  storage: createElectronStorage({electronStore}),
  whitelist: ["loginReducer"] // loginReducer会被缓存
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
// -------


// ----------
// const store = configureStore({
//   reducer: rootReducer
// });

// https://github.com/reduxjs/redux-thunk
// The thunk middleware was automatically added
// -------

const store = createStore(persistedReducer, applyMiddleware(thunk, logger));
const persistor = persistStore(store);

export {persistor};
export default store;
