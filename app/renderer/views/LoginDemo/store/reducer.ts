import {produce} from "immer";
import * as types from "./actionTypes";
import {loginInitialState, LoginStateTypes} from "./state";
import {ActionReturnType} from "./actions";

// function LoginReducer<T extends LoginStateTypes, A extends ActionReturnType>(state: T, action: A):T {
//   switch(action.type) {
//     case types.SET_TOKEN:
//       return produce(state, draft => {
//         // draft.token = action.payload;
//         draft.token = action.payload as string;
//       }) as T;
//     default: 
//       return state;
//   }
// }

// export default LoginReducer(loginInitialState, {type: ""} as ActionReturnType);

export default (state = loginInitialState, action: ActionReturnType):LoginStateTypes => {
    switch(action.type) {
      case types.SET_TOKEN:
        return produce(state, draft => {
          // draft.token = action.payload;
          draft.token = action.payload as string;
        });
      case types.SET_USERNAME:
        console.log("enter==>", action);
        return produce(state, draft => {
          draft.username = action.payload as string;
        });
      default: 
        return state;
    }
}
