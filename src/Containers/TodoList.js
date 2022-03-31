import React from "react";

import { Provider } from "react-redux";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterMoment";
import store from "../Store/configStore";
import App from "./App";

function TodoList() {
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <App />
      </LocalizationProvider>
    </Provider>
  );
}

export default TodoList;
