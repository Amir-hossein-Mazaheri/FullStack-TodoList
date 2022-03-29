import { combineReducers } from "@reduxjs/toolkit";
import uiReducer from "./ui";

const reducers = combineReducers({
  ui: uiReducer,
});

export default reducers;
