import React from "react";

import { Provider } from "react-redux";
import store from "../Store/configStore";
import App from "./App";

function TodoList() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default TodoList;
