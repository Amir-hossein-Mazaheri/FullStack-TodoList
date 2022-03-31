import React from "react";

import { Provider } from "react-redux";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterMoment";
import "moment/locale/en-ca";
import store from "../Store/configStore";
import App from "./App";
import moment from "moment";

function TodoList() {
  return (
    <Provider store={store}>
      <LocalizationProvider
        dateAdapter={DateAdapter}
        locale={moment.locale("en-ca")}
      >
        <App />
      </LocalizationProvider>
    </Provider>
  );
}

export default TodoList;
