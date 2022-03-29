import React from "react";

import AddTodo from "../Components/AddTodo";
import "./App.css";

function App() {
  return (
    <div
      style={{ backgroundImage: 'url("background.jpg")' }}
      className="bg-fixed bg-center h-screen w-screen"
    >
      <AddTodo />
    </div>
  );
}

export default App;
