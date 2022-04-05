import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    userId: undefined,
    firstName: "",
    lastName: "",
    email: "",
  },
  reducers: {
    SET_USER_DETAIL: (store, action) => {
      store.userId = action.payload.details.id;
      store.firstName = action.payload.details.first_name;
      store.lastName = action.payload.details.last_name;
      store.email = action.payload.details.email;
    },
  },
});

export default user.reducer;

export const { SET_USER_DETAIL } = user.actions;
