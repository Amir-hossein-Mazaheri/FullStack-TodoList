import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
  todoTypeId: 0,
  todo: {
    title: "",
    description: "",
    deadline: moment().toISOString(), // UTC timezone
  },
  isTodoSaved: false,
  generatedTodoId: undefined,
  subTodos: [],
};

let uniqueId = 1; // unique id for sub todos

const findSetSubTodo = (store, id, item, value) => {
  const subTodoIndex = store.subTodos.findIndex((subTodo) => subTodo.id === id);
  store.subTodos[subTodoIndex][item] = value;
};

const addTodo = createSlice({
  name: "add-todo",
  initialState,
  reducers: {
    SET_TODO_TYPE: (store, action) => {
      store.todoTypeId = action.payload.id;
    },
    SET_SUB_TODO: (store, action) => {
      findSetSubTodo(store, action.payload.id, "title", action.payload.title);
    },
    SAVE_SUB_TODO: (store, action) => {
      const subTodoIndex = store.subTodos.findIndex(
        (subTodo) => subTodo.id === action.payload.id
      );
      store.subTodos[subTodoIndex].isSaved = true;
      store.subTodos[subTodoIndex].dbId = action.payload.dbId;
    },
    ADD_EMPTY_SUB_TODO: (store) => {
      store.subTodos.push({
        id: uniqueId++,
        dbId: null,
        title: "",
        isSaved: false,
      });
    },
    DELETE_SUB_TODO: (store, action) => {
      store.subTodos = store.subTodos.filter(
        (subTodo) => subTodo.id !== action.payload.id
      );
    },
    SET_TODO_PROPERTY: (store, action) => {
      store.todo[action.payload.property] = action.payload.value;
    },
    SAVE_TODO: (store, action) => {
      store.isTodoSaved = true;
      store.generatedTodoId = action.payload.id;
    },
    RESET_ADD_TODO: (store) => {
      for (const key in initialState) {
        store[key] = initialState[key];
      }
    },
  },
});

export default addTodo.reducer;

export const {
  SET_TODO_TYPE,
  SET_TODO_PROPERTY,
  ADD_EMPTY_SUB_TODO,
  SAVE_TODO,
  SAVE_SUB_TODO,
  DELETE_SUB_TODO,
  SET_SUB_TODO,
  RESET_ADD_TODO,
} = addTodo.actions;
