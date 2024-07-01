import * as types from "./actionTypes";
import {UnknownAction} from "redux";

export interface ActionReturnType {
  type: NonNullable<typeof types.SET_TOKEN>;
  payload: unknown
}
// 用交叉类型（&）复用UnknownAction类型
export type ReduxAction<T = unknown> = (payload: T) => ActionReturnType & UnknownAction;

export const setLoginToken: ReduxAction<unknown> = payload => ({
  type: types.SET_TOKEN,
  payload
});

export const setUserName: ReduxAction<unknown> = payload => ({
  type: types.SET_USERNAME,
  payload
});
