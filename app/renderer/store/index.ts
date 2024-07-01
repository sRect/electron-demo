// import {legacy_createStore as createStore, applyMiddleware} from "redux";
import { configureStore } from '@reduxjs/toolkit';
// import { thunk } from 'redux-thunk';
// import logger from 'redux-logger';
import rootReducer from "./reducer"; 

// ----------
const store = configureStore({
  reducer: rootReducer
});

// https://github.com/reduxjs/redux-thunk
// The thunk middleware was automatically added
// -------

// const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
