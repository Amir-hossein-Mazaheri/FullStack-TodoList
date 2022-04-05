import { combineReducers } from "redux";
import addTodoReducer from "./addTodo";
import userReducer from "./user";

const entitiesReducers = combineReducers({
  user: userReducer,
  addTodo: addTodoReducer,
});

export default entitiesReducers;
