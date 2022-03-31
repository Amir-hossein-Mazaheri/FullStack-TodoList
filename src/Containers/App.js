import { lazy, Suspense } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Spinner from "../Common/Spinner";
import MainLayout from "../Layouts/MainLayout";
// import AddTodo from "../Components/AddTodo";
import "./App.css";

const AddTodoPage = lazy(() => import("../Pages/AddTodo"));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout asRoute={true} />}>
            <Route path="add-todo" element={<AddTodoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
