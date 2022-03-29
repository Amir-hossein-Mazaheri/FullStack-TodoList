import { createSlice } from "@reduxjs/toolkit";

const addTodo = createSlice({
  name: "add-todo",
  initialState: {
    todoTypeId: 0,
  },
  reducers: {
    SET_TODO_TYPE: (store, action) => {
      store.todoTypeId = action.payload.id;
    },
  },
});

export default addTodo.reducer;

export const { SET_TODO_TYPE } = addTodo.actions;
