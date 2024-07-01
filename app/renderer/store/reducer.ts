import {combineReducers} from "redux";
import {loginReducer} from "@/views/LoginDemo/store";

const allReducer = {
  loginReducer
};
const rootReducer = combineReducers(allReducer);

export default rootReducer;

