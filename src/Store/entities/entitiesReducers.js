import { combineReducers } from "redux";
import addTodoReducer from "./addTodo";

const entitiesReducers = combineReducers({
  addTodo: addTodoReducer,
});

export default entitiesReducers;
