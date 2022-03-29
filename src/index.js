import React from "react";
import ReactDOM from "react-dom";

import TodoList from "./Containers/TodoList";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <TodoList />
  </React.StrictMode>,
  document.getElementById("root")
);
