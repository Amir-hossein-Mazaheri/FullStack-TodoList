import React from "react";

import Header from "../Common/Header";
import AddTodo from "../Components/AddTodo";
import "./App.css";

function App() {
  return (
    <div
      style={{ backgroundImage: 'url("background.jpg")' }}
      className="bg-fixed bg-center min-h-screen"
    >
      <Header />
      <AddTodo />
    </div>
  );
}

export default App;
